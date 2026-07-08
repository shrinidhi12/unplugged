import { Resend } from "resend";
import type { Event, Rsvp } from "@/db/schema";
import { buildEventIcs } from "./ics";
import { formatEventDate, formatEventTime } from "./datetime";
import { manageUrl, splashUrl } from "./urls";

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
}) {
  if (!resend) {
    // Dev fallback: no API key configured, so log instead of sending.
    console.log(
      `\n[email:dev] would send to ${opts.to}\n  subject: ${opts.subject}\n  ${opts.text.replace(/\n/g, "\n  ")}\n`
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

/** Emailed to the host on creation: their private manage link. */
export async function sendHostManageLink(event: Event) {
  const manage = manageUrl(event.id, event.editToken);
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
export async function sendGuestConfirmation(event: Event, rsvp: Rsvp) {
  const splash = splashUrl(event.id);
  const ics = buildEventIcs(event, splash);
  const plus = rsvp.partySize > 1 ? ` (+${rsvp.partySize - 1})` : "";
  const html = shell(
    `You're in: ${esc(event.title)}`,
    `<p>See you there${plus ? `, and your +${rsvp.partySize - 1}` : ""}.</p>
     <p><strong>${whenLine(event)}</strong>${
       event.locationName || event.address
         ? `<br/>${esc([event.locationName, event.address].filter(Boolean).join(", "))}`
         : ""
     }</p>
     <p style="margin:20px 0">${button(splash, "See the details")}</p>
     <p style="font-size:14px;color:#6b6459">We've attached a calendar invite so it's already on your calendar.</p>`
  );
  const text = `You're in for "${event.title}"${plus}.
${whenLine(event)}
Details: ${splash}`;
  await send({
    to: rsvp.email,
    subject: `You're in: ${event.title}`,
    html,
    text,
    attachments: [{ filename: "event.ics", content: Buffer.from(ics, "utf-8") }],
  });
}

/** Emailed to the host on each new RSVP. */
export async function sendHostRsvpNotice(event: Event, rsvp: Rsvp) {
  const manage = manageUrl(event.id, event.editToken);
  const verb = rsvp.status === "going" ? "is in" : "can't make it";
  const plus = rsvp.status === "going" && rsvp.partySize > 1 ? ` (+${rsvp.partySize - 1})` : "";
  const html = shell(
    `${esc(rsvp.name)} ${verb}${plus}`,
    `<p><strong>${esc(rsvp.name)}</strong> ${verb}${plus} for <strong>${esc(event.title)}</strong>.</p>
     ${rsvp.note ? `<p style="font-size:14px;color:#6b6459">"${esc(rsvp.note)}"</p>` : ""}
     <p style="margin:20px 0">${button(manage, "See your guest list")}</p>`
  );
  const text = `${rsvp.name} ${verb}${plus} for "${event.title}".${
    rsvp.note ? `\nNote: ${rsvp.note}` : ""
  }\nGuest list: ${manage}`;
  await send({
    to: event.hostEmail,
    subject: `${rsvp.name} ${verb}: ${event.title}`,
    html,
    text,
  });
}

/** Emailed to all "going" guests if the host cancels. */
export async function sendCancellationNotice(event: Event, guestEmail: string) {
  const html = shell(
    `Canceled: ${esc(event.title)}`,
    `<p>Sorry — <strong>${esc(event.title)}</strong> (${whenLine(event)}) has been called off by the host.</p>`
  );
  const text = `"${event.title}" (${whenLine(event)}) has been called off by the host.`;
  await send({ to: guestEmail, subject: `Canceled: ${event.title}`, html, text });
}
