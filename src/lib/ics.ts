import type { Event } from "@/db/schema";
import { zonedTimeToUtc } from "./datetime";

function formatUtc(date: Date): string {
  // YYYYMMDDTHHMMSSZ
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/**
 * RFC 5545 caps a content line at 75 octets; longer ones are folded onto
 * continuation lines starting with a single space. Length is counted in UTF-8
 * octets, and a multi-byte character must never be split across a fold, so we
 * walk code points rather than slicing the string.
 */
function foldLine(line: string): string {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;

  const out: string[] = [];
  let current = "";
  let octets = 0;
  let limit = 75; // continuations get 74 — the leading space counts toward it

  for (const char of line) {
    const size = encoder.encode(char).length;
    if (octets + size > limit) {
      out.push(current);
      current = "";
      octets = 0;
      limit = 74;
    }
    current += char;
    octets += size;
  }
  out.push(current);

  return out.join("\r\n ");
}

/**
 * Build a minimal RFC 5545 VEVENT for the guest's calendar. Times are emitted
 * in UTC (with a trailing Z) computed from the event's local time + timezone,
 * so it lands correctly regardless of the attendee's own zone. Defaults to a
 * 2-hour duration since we don't collect an end time.
 */
export function buildEventIcs(event: Event, splashUrl: string): string {
  const start = zonedTimeToUtc(
    event.eventDate,
    event.startTime ?? "18:00",
    event.timezone
  );
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

  const location = [event.locationName, event.address]
    .filter(Boolean)
    .join(", ");
  const description = [event.description, `\nRSVP / details: ${splashUrl}`]
    .filter(Boolean)
    .join("\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Unplugg Me//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@unplugged`,
    `DTSTAMP:${formatUtc(new Date())}`,
    `DTSTART:${formatUtc(start)}`,
    `DTEND:${formatUtc(end)}`,
    `SUMMARY:${escapeText(event.title)}`,
    // Called-off events still get served, so mark them cancelled rather than
    // letting them land in someone's calendar as a live event.
    event.canceledAt ? "STATUS:CANCELLED" : "STATUS:CONFIRMED",
    description ? `DESCRIPTION:${escapeText(description)}` : "",
    location ? `LOCATION:${escapeText(location)}` : "",
    `URL:${splashUrl}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  // ICS lines are CRLF-delimited.
  return lines.map(foldLine).join("\r\n");
}
