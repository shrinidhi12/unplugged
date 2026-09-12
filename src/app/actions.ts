"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq, gte, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { events, rsvps } from "@/db/schema";
import { newSlug, newEditToken, newGuestToken, newId } from "@/lib/slug";
import { hashToken, tokenMatches } from "@/lib/tokens";
import { getRsvpByToken } from "@/lib/queries";
import { allow, clientIp } from "@/lib/ratelimit";
import {
  sendHostManageLink,
  sendGuestConfirmation,
  sendHostRsvpNotice,
  sendCancellationNotice,
  sendGuestDeclineReceipt,
  sendGuestChangeLink,
  sendSuggestionNote,
} from "@/lib/email";
import { MAX_SUGGESTION_LENGTH } from "@/lib/suggestions";

export type FormState = {
  error?: string;
  ok?: boolean;
  status?: "going" | "cant";
  name?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A tripped honeypot means a bot filled a field humans never see. We reject
// without saying why, so scripts can't tell they've been caught.
const SPAM_MSG = "Something went wrong. Please try again.";
const RATE_MSG =
  "You're going a little fast. Give it a minute and try again.";

function str(formData: FormData, key: string): string {
  return (formData.get(key) ?? "").toString().trim();
}

function num(formData: FormData, key: string): number | null {
  const v = str(formData, key);
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

// ---- Create event -----------------------------------------------------------

export async function createEvent(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const title = str(formData, "title");
  const eventDate = str(formData, "eventDate");
  const locationName = str(formData, "locationName");
  const hostName = str(formData, "hostName");
  const hostEmail = str(formData, "hostEmail");
  const timezone =
    str(formData, "timezone") || "America/Los_Angeles";

  if (!title) return { error: "Your event needs a name." };
  if (!eventDate) return { error: "Pick a date." };
  if (!locationName) return { error: "Add a location." };
  if (!hostName) return { error: "Add your name." };
  if (!EMAIL_RE.test(hostEmail))
    return { error: "Add a real email — that's where your host link goes." };

  // Bot friction (free, no infra): honeypot field.
  if (str(formData, "company")) return { error: SPAM_MSG };

  // Per-IP limit: cap events per client.
  if (!(await allow("create", await clientIp(), 8, 60 * 60)))
    return { error: RATE_MSG };

  const db = getDb();

  // Per-host-email cap as well: no more than 8 events per
  // host email per hour, so one address can't be used to blast invites.
  const since = new Date(Date.now() - 60 * 60 * 1000);
  const [recent] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(events)
    .where(and(eq(events.hostEmail, hostEmail), gte(events.createdAt, since)));
  if (recent && recent.n >= 8) return { error: RATE_MSG };

  const id = newSlug();
  const editToken = newEditToken();
  const [event] = await db
    .insert(events)
    .values({
      id,
      editTokenHash: hashToken(editToken),
      title,
      description: str(formData, "description") || null,
      eventDate,
      startTime: str(formData, "startTime") || null,
      timezone,
      locationName: str(formData, "locationName") || null,
      address: str(formData, "address") || null,
      lat: num(formData, "lat"),
      lng: num(formData, "lng"),
      hostName,
      hostEmail,
      showHostName: formData.get("showHostName") === "on",
      allowContact: formData.get("allowContact") === "on",
    })
    .returning();

  // The plaintext token exists only here and in the host's email.
  await sendHostManageLink(event, editToken);

  redirect(`/e/${id}/manage/${editToken}?created=1`);
}

// ---- RSVP -------------------------------------------------------------------

// Caps on top of the per-IP limit so the RSVP form can't be used as a spam
// relay: one event can't email unbounded strangers, and one inbox can't be
// emailed over and over.
const RSVPS_PER_EVENT_PER_HOUR = 60;
const RSVPS_PER_EMAIL_PER_DAY = 10;
const REPLY_LINK_COOLDOWN_MS = 10 * 60 * 1000;

/** The guest-editable fields, shared by a first RSVP and later changes. */
function replyValues(formData: FormData) {
  const status: "going" | "cant" =
    str(formData, "status") === "cant" ? "cant" : "going";
  const partySize = Math.min(
    Math.max(1, Math.round(num(formData, "partySize") ?? 1)),
    20
  );
  return {
    name: str(formData, "name"),
    status,
    partySize: status === "going" ? partySize : 1,
    note: str(formData, "note") || null,
  } satisfies Partial<typeof rsvps.$inferInsert>;
}

export async function submitRsvp(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const slug = str(formData, "slug");
  const email = str(formData, "email").toLowerCase();
  const values = replyValues(formData);
  const { name, status } = values;

  if (!name) return { error: "Add your name." };
  if (!EMAIL_RE.test(email)) return { error: "Add a real email." };

  // Bot friction (free, no infra): honeypot field.
  if (str(formData, "company")) return { error: SPAM_MSG };

  // Per-IP limit: cap RSVPs per client.
  if (!(await allow("rsvp", await clientIp(), 20, 60 * 60)))
    return { error: RATE_MSG };

  const db = getDb();
  const [event] = await db.select().from(events).where(eq(events.id, slug));
  if (!event) return { error: "This event no longer exists." };
  if (event.canceledAt) return { error: "This event has been canceled." };

  const [existing] = await db
    .select()
    .from(rsvps)
    .where(and(eq(rsvps.eventId, slug), eq(rsvps.email, email)));

  if (existing) {
    // Never overwrite a reply from the public form: anyone with the event link
    // could type a guest's email. Instead, mail that inbox a fresh private link
    // (which retires the old one), throttled so it can't be used to spam them.
    // The response matches a new RSVP, so the form can't reveal who's replied.
    const lastSent = existing.linkSentAt?.getTime() ?? 0;
    if (Date.now() - lastSent > REPLY_LINK_COOLDOWN_MS) {
      const token = newGuestToken();
      await db
        .update(rsvps)
        .set({ editTokenHash: hashToken(token), linkSentAt: new Date() })
        .where(eq(rsvps.id, existing.id));
      await sendGuestChangeLink(event, existing, token);
    }
    return { ok: true, status, name };
  }

  const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [[perEvent], [perEmail]] = await Promise.all([
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(rsvps)
      .where(and(eq(rsvps.eventId, slug), gte(rsvps.createdAt, hourAgo))),
    db
      .select({ n: sql<number>`count(*)::int` })
      .from(rsvps)
      .where(and(eq(rsvps.email, email), gte(rsvps.createdAt, dayAgo))),
  ]);
  if (
    (perEvent?.n ?? 0) >= RSVPS_PER_EVENT_PER_HOUR ||
    (perEmail?.n ?? 0) >= RSVPS_PER_EMAIL_PER_DAY
  )
    return { error: RATE_MSG };

  const token = newGuestToken();
  const [rsvp] = await db
    .insert(rsvps)
    .values({
      id: newId(),
      eventId: slug,
      email,
      editTokenHash: hashToken(token),
      linkSentAt: new Date(),
      ...values,
    })
    .returning();

  if (status === "going") {
    await sendGuestConfirmation(event, rsvp, token);
  } else {
    await sendGuestDeclineReceipt(event, rsvp, token);
  }
  await sendHostRsvpNotice(event, rsvp);

  revalidatePath("/e/[slug]/manage/[token]", "page");
  return { ok: true, status, name };
}

/** A guest changing their reply through the private link from their email. */
export async function updateRsvp(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const slug = str(formData, "slug");
  const token = str(formData, "token");
  const values = replyValues(formData);
  const { name, status } = values;

  if (!name) return { error: "Add your name." };

  // Bot friction (free, no infra): honeypot field.
  if (str(formData, "company")) return { error: SPAM_MSG };

  // Per-IP limit: shares the RSVP budget per client.
  if (!(await allow("rsvp", await clientIp(), 20, 60 * 60)))
    return { error: RATE_MSG };

  const found = await getRsvpByToken(slug, token);
  if (!found) {
    return {
      error:
        "This link isn't valid anymore. Reply again from the event page and we'll email you a new one.",
    };
  }
  const { event, rsvp: before } = found;
  if (event.canceledAt) return { error: "This event has been canceled." };

  const db = getDb();
  const [rsvp] = await db
    .update(rsvps)
    .set(values)
    .where(eq(rsvps.id, before.id))
    .returning();

  // Only email when something the host counts actually changed, and only send
  // a fresh calendar invite when switching to "going".
  if (rsvp.status !== before.status || rsvp.partySize !== before.partySize) {
    if (rsvp.status === "going" && before.status !== "going") {
      await sendGuestConfirmation(event, rsvp, token);
    }
    await sendHostRsvpNotice(event, rsvp);
  }

  revalidatePath("/e/[slug]/manage/[token]", "page");
  return { ok: true, status, name };
}

// ---- Host management (token-gated) -----------------------------------------

async function requireHost(slug: string, token: string) {
  const db = getDb();
  const [event] = await db.select().from(events).where(eq(events.id, slug));
  if (!event || !tokenMatches(token, event.editTokenHash)) {
    throw new Error("Not authorized");
  }
  return { db, event };
}

export async function updateEvent(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const slug = str(formData, "slug");
  const token = str(formData, "token");
  const { db } = await requireHost(slug, token);

  const title = str(formData, "title");
  const eventDate = str(formData, "eventDate");
  if (!title) return { error: "Your event needs a name." };
  if (!eventDate) return { error: "Pick a date." };
  if (!str(formData, "locationName"))
    return { error: "Add a location." };

  await db
    .update(events)
    .set({
      title,
      description: str(formData, "description") || null,
      eventDate,
      startTime: str(formData, "startTime") || null,
      locationName: str(formData, "locationName") || null,
      address: str(formData, "address") || null,
      lat: num(formData, "lat"),
      lng: num(formData, "lng"),
    })
    .where(eq(events.id, slug));

  revalidatePath(`/e/${slug}/manage/${token}`);
  revalidatePath(`/e/${slug}`);
  return { ok: true };
}

export async function removeRsvp(formData: FormData): Promise<void> {
  const slug = str(formData, "slug");
  const token = str(formData, "token");
  const rsvpId = str(formData, "rsvpId");
  const { db } = await requireHost(slug, token);
  await db
    .delete(rsvps)
    .where(and(eq(rsvps.id, rsvpId), eq(rsvps.eventId, slug)));
  revalidatePath(`/e/${slug}/manage/${token}`);
}

export async function cancelEvent(formData: FormData): Promise<void> {
  const slug = str(formData, "slug");
  const token = str(formData, "token");
  const { db, event } = await requireHost(slug, token);

  await db
    .update(events)
    .set({ canceledAt: new Date() })
    .where(eq(events.id, slug));

  const going = await db
    .select()
    .from(rsvps)
    .where(and(eq(rsvps.eventId, slug), eq(rsvps.status, "going")));
  const seen = new Set<string>();
  for (const g of going) {
    if (seen.has(g.email)) continue;
    seen.add(g.email);
    await sendCancellationNotice(event, g.email);
  }

  revalidatePath(`/e/${slug}/manage/${token}`);
  revalidatePath(`/e/${slug}`);
}

// ---- Suggestion box ---------------------------------------------------------

/** A note from the /suggest page, emailed to the site owner. */
export async function submitSuggestion(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const message = str(formData, "message");
  const name = str(formData, "name").replace(/\s+/g, " ").slice(0, 80);
  const email = str(formData, "email");

  if (!message) return { error: "Write something first." };
  if (message.length > MAX_SUGGESTION_LENGTH)
    return { error: "That's too long. Keep it under 5,000 characters." };
  if (email && (email.length > 254 || !EMAIL_RE.test(email)))
    return { error: "That email doesn't look right. Fix it, or leave it blank." };

  // Bot friction (free, no infra): honeypot field.
  if (str(formData, "company")) return { error: SPAM_MSG };

  // Per-IP limit: a handful of notes per client per hour.
  if (!(await allow("suggest", await clientIp(), 5, 60 * 60)))
    return { error: RATE_MSG };

  const sent = await sendSuggestionNote({ message, name, email });
  if (!sent)
    return {
      error: "The suggestion box is closed for a moment. Please try again later.",
    };
  return { ok: true, name };
}
