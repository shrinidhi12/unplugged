"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { events, rsvps } from "@/db/schema";
import { newSlug, newEditToken, newId } from "@/lib/slug";
import {
  sendHostManageLink,
  sendGuestConfirmation,
  sendHostRsvpNotice,
  sendCancellationNotice,
} from "@/lib/email";

export type FormState = {
  error?: string;
  ok?: boolean;
  status?: "going" | "cant";
  name?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const id = newSlug();
  const editToken = newEditToken();

  const db = getDb();
  const [event] = await db
    .insert(events)
    .values({
      id,
      editToken,
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
    })
    .returning();

  await sendHostManageLink(event);

  redirect(`/e/${id}/manage/${editToken}?created=1`);
}

// ---- RSVP -------------------------------------------------------------------

export async function submitRsvp(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const slug = str(formData, "slug");
  const name = str(formData, "name");
  const email = str(formData, "email");
  const statusRaw = str(formData, "status");
  const status = statusRaw === "cant" ? "cant" : "going";
  const partySize = Math.min(
    Math.max(1, Math.round(num(formData, "partySize") ?? 1)),
    20
  );
  const note = str(formData, "note");

  if (!name) return { error: "Add your name." };
  if (!EMAIL_RE.test(email)) return { error: "Add a real email." };

  const db = getDb();
  const [event] = await db.select().from(events).where(eq(events.id, slug));
  if (!event) return { error: "This event no longer exists." };
  if (event.canceledAt) return { error: "This event has been canceled." };

  const [rsvp] = await db
    .insert(rsvps)
    .values({
      id: newId(),
      eventId: slug,
      name,
      email,
      status,
      partySize: status === "going" ? partySize : 1,
      note: note || null,
    })
    .returning();

  if (status === "going") {
    await sendGuestConfirmation(event, rsvp);
  }
  await sendHostRsvpNotice(event, rsvp);

  revalidatePath(`/e/${slug}/manage/${event.editToken}`);
  return { ok: true, status, name };
}

// ---- Host management (token-gated) -----------------------------------------

async function requireHost(slug: string, token: string) {
  const db = getDb();
  const [event] = await db.select().from(events).where(eq(events.id, slug));
  if (!event || event.editToken !== token) {
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
