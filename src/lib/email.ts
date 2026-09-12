import { Resend } from "resend";
import type { Event, Rsvp } from "@/db/schema";
import { buildEventIcs } from "./ics";
import { formatEventDate, formatEventTime } from "./datetime";
import { manageUrl, replyUrl, splashUrl } from "./urls";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.EMAIL_FROM ?? "Unplugg Me <onboarding@resend.dev>";

/**
 * Escape user-controlled text before interpolating it into email HTML.
 * Guest-supplied fields (RSVP name/note) land in the host's inbox and host
 * fields (title/description) land in guests' inboxes, so every dynamic value
 * that isn't our own trusted markup must be run through this.
 */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function send(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
  attachments?: { filename: string; content: Buffer }[];
  replyTo?: string;
}) {
  if (!resend) {
    // Dev fallback: no API key configured, so log instead of sending.
    console.log(
      `\n[email:dev] would send to ${opts.to}${opts.replyTo ? ` (reply-to ${opts.replyTo})` : ""}\n  subject: ${opts.subject}\n  ${opts.text.replace(/\n/g, "\n  ")}\n`
    );
    return;
  }
  try {
    await resend.emails.send({
      from: FROM,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      replyTo: opts.replyTo,
      attachments: opts.attachments?.map((a) => ({
        filename: a.filename,
        content: a.content,
      })),
    });
  } catch (err) {
    // Never let an email failure break the user-facing flow.
    console.error("[email] send failed:", err);
  }
}

function whenLine(event: Event): string {
  const date = formatEventDate(event);
  const time = formatEventTime(event);
  return time ? `${date} · ${time}` : date;
}

function shell(title: string, body: string): string {
  return `<div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px;margin:0 auto;color:#2b2622;line-height:1.6">
  <div style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#c65d3b;font-weight:600">Unplugg Me</div>
  <h1 style="font-size:22px;margin:12px 0 4px">${title}</h1>
  ${body}
  <hr style="border:none;border-top:1px solid #eae2d6;margin:28px 0 12px" />
  <div style="font-size:12px;color:#8a8178">Sent with Unplugg Me — a forever-free events platform.</div>
</div>`;
}

function button(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:#2b2622;color:#f5f1ea;text-decoration:none;padding:11px 18px;border-radius:10px;font-weight:600;font-size:15px">${label}</a>`;
}

/**
 * Opt-in "Contact the organizer" block for guest-facing emails. Empty unless
 * the host ticked "Let guests contact me", since it exposes their address.
 * When on, replies are routed to the host too, so hitting Reply just works.
 */
function contactHost(event: Event): { html: string; text: string; replyTo?: string } {
  if (!event.allowContact) return { html: "", text: "" };
  const href = esc(
    `mailto:${event.hostEmail}?subject=${encodeURIComponent(`Re: ${event.title}`)}`
  );
  return {
    html: `<p style="font-size:14px">Questions? <a href="${href}" style="color:#c65d3b">Contact the organizer</a> — or just reply to this email.</p>`,
    text: `\nQuestions? Contact the organizer at ${event.hostEmail}, or just reply to this email.`,
    replyTo: event.hostEmail,
  };
}

/**
 * A guest's private "change your reply" link. Whoever holds it can edit the
 * reply, hence the don't-forward warning.
 */
function changeLine(href: string): string {
  return `<p style="font-size:14px">Plans changed? <a href="${href}" style="color:#c65d3b">Change your reply</a>. This link is just for you, so don't forward this email.</p>`;
}

/**
 * Emailed to the host on creation: their private manage link. This is the only
 * email that carries it, since only a hash of the token is stored.
 */
export async function sendHostManageLink(event: Event, token: string) {
  const manage = manageUrl(event.id, token);
  const splash = splashUrl(event.id);
  const html = shell(
    `Your event is live: ${esc(event.title)}`,
    `<p>All set — <strong>${esc(event.title)}</strong> is on for ${whenLine(event)}.</p>
     <p style="margin:20px 0">${button(manage, "Manage your event")}</p>
     <p style="font-size:14px;color:#6b6459">This link is your only way back in to see who's coming and edit the details. Keep it to yourself.</p>
     <p style="font-size:14px">Invite people by sharing this link:<br/><a href="${splash}" style="color:#c65d3b">${splash}</a></p>`
  );
  const text = `Your event "${event.title}" is live for ${whenLine(event)}.
Manage it (private link — keep safe): ${manage}
Invite people with this public link: ${splash}`;
  await send({ to: event.hostEmail, subject: `You're hosting: ${event.title}`, html, text });
}

/** Emailed to a guest who RSVPs "going": confirmation + calendar invite. */
export async function sendGuestConfirmation(event: Event, rsvp: Rsvp, token: string) {
  const splash = splashUrl(event.id);
  const ics = buildEventIcs(event, splash);
  const plus = rsvp.partySize > 1 ? ` (+${rsvp.partySize - 1})` : "";
  const contact = contactHost(event);
  const change = replyUrl(event.id, token);
  const html = shell(
    `You're in: ${esc(event.title)}`,
    `<p>See you there${plus ? `, and your +${rsvp.partySize - 1}` : ""}.</p>
     <p><strong>${whenLine(event)}</strong>${
       event.locationName || event.address
         ? `<br/>${esc([event.locationName, event.address].filter(Boolean).join(", "))}`
         : ""
     }</p>
     <p style="margin:20px 0">${button(splash, "See the details")}</p>
     <p style="font-size:14px;color:#6b6459">We've attached a calendar invite so it's already on your calendar.</p>
     ${changeLine(change)}
     ${contact.html}`
  );
  const text = `You're in for "${event.title}"${plus}.
${whenLine(event)}
Details: ${splash}
Plans changed? Change your reply (private link, don't forward): ${change}${contact.text}`;
  await send({
    to: rsvp.email,
    replyTo: contact.replyTo,
    subject: `You're in: ${event.title}`,
    html,
    text,
    attachments: [{ filename: "event.ics", content: Buffer.from(ics, "utf-8") }],
  });
}

/** Emailed to a guest who replies "can't make it": a receipt plus their change link. */
export async function sendGuestDeclineReceipt(event: Event, rsvp: Rsvp, token: string) {
  const change = replyUrl(event.id, token);
  const contact = contactHost(event);
  const html = shell(
    "Thanks for letting the host know",
    `<p>You're down as can't make it for <strong>${esc(event.title)}</strong> (${whenLine(event)}).</p>
     ${changeLine(change)}
     ${contact.html}`
  );
  const text = `You're down as can't make it for "${event.title}" (${whenLine(event)}).
Plans changed? Change your reply (private link, don't forward): ${change}${contact.text}`;
  await send({
    to: rsvp.email,
    subject: `Got it: ${event.title}`,
    html,
    text,
    replyTo: contact.replyTo,
  });
}

/**
 * Emailed when the public RSVP form is submitted with an address that has
 * already replied. Nothing is changed; the inbox owner gets a fresh link.
 */
export async function sendGuestChangeLink(event: Event, rsvp: Rsvp, token: string) {
  const change = replyUrl(event.id, token);
  const html = shell(
    `Change your reply: ${esc(event.title)}`,
    `<p>Someone, hopefully you, tried to reply to <strong>${esc(event.title)}</strong> (${whenLine(event)}) with this email address. You'd already replied, so nothing was changed.</p>
     <p style="margin:20px 0">${button(change, "Change your reply")}</p>
     <p style="font-size:14px;color:#6b6459">This link is just for you, so don't forward this email. Any older link for this reply no longer works. If this wasn't you, you can ignore this email.</p>`
  );
  const text = `Someone, hopefully you, tried to reply to "${event.title}" (${whenLine(event)}) with this email address. You'd already replied, so nothing was changed.
Change your reply (private link, don't forward): ${change}
If this wasn't you, you can ignore this email.`;
  await send({ to: rsvp.email, subject: `Change your reply: ${event.title}`, html, text });
}

/** Emailed to the host on each new or changed RSVP. */
export async function sendHostRsvpNotice(event: Event, rsvp: Rsvp) {
  const verb = rsvp.status === "going" ? "is in" : "can't make it";
  const plus = rsvp.status === "going" && rsvp.partySize > 1 ? ` (+${rsvp.partySize - 1})` : "";
  const html = shell(
    `${esc(rsvp.name)} ${verb}${plus}`,
    `<p><strong>${esc(rsvp.name)}</strong> ${verb}${plus} for <strong>${esc(event.title)}</strong>.</p>
     ${rsvp.note ? `<p style="font-size:14px;color:#6b6459">"${esc(rsvp.note)}"</p>` : ""}
     <p style="font-size:14px;color:#6b6459">Your full guest list is on your manage page. Use the private link from your "You're hosting" email.</p>`
  );
  const text = `${rsvp.name} ${verb}${plus} for "${event.title}".${
    rsvp.note ? `\nNote: ${rsvp.note}` : ""
  }\nYour full guest list is on your manage page (use the private link from your "You're hosting" email).`;
  await send({
    to: event.hostEmail,
    subject: `${rsvp.name} ${verb}: ${event.title}`,
    html,
    text,
  });
}

/** Emailed to all "going" guests if the host cancels. */
export async function sendCancellationNotice(event: Event, guestEmail: string) {
  const contact = contactHost(event);
  const html = shell(
    `Canceled: ${esc(event.title)}`,
    `<p>Sorry — <strong>${esc(event.title)}</strong> (${whenLine(event)}) has been called off by the host.</p>
     ${contact.html}`
  );
  const text = `"${event.title}" (${whenLine(event)}) has been called off by the host.${contact.text}`;
  await send({
    to: guestEmail,
    subject: `Canceled: ${event.title}`,
    html,
    text,
    replyTo: contact.replyTo,
  });
}

/**
 * A note from the /suggest suggestion box, sent to the site owner's inbox
 * (SUGGESTIONS_TO). Replies go to the sender when they left an email. Returns
 * false when no inbox is configured, so the form can say so instead of
 * pretending the note arrived.
 */
export async function sendSuggestionNote(note: {
  message: string;
  name: string;
  email: string;
}): Promise<boolean> {
  const to = process.env.SUGGESTIONS_TO;
  if (!to) {
    console.error("[email] SUGGESTIONS_TO is not set; suggestion dropped");
    return false;
  }
  const from = note.name || "Anonymous";
  const html = shell(
    `Note from ${esc(from)}`,
    `<p style="white-space:pre-wrap">${esc(note.message)}</p>
     <p style="font-size:14px;color:#6b6459">${
       note.email
         ? `Hit reply to answer ${esc(note.email)}.`
         : "No email left, so there's no way to reply."
     }</p>`
  );
  const text = `Note from ${from}

${note.message}

${note.email ? `Reply to answer ${note.email}.` : "No email left, so there's no way to reply."}`;
  await send({
    to,
    subject: `Suggestion box: note from ${from}`,
    html,
    text,
    replyTo: note.email || undefined,
  });
  return true;
}
