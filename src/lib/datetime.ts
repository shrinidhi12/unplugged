import type { Event } from "@/db/schema";

/**
 * Convert a wall-clock date/time in a given IANA timezone to a UTC Date.
 * Uses Intl to read the zone's offset at that instant (handles DST for the
 * common case; ignores the rare fold/gap ambiguity, which is fine for an MVP).
 */
export function zonedTimeToUtc(
  dateStr: string, // YYYY-MM-DD
  timeStr: string | null, // HH:mm
  timeZone: string
): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = (timeStr ?? "00:00").split(":").map(Number);
  const utcGuess = Date.UTC(y, m - 1, d, hh, mm, 0);

  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = Object.fromEntries(
    dtf.formatToParts(new Date(utcGuess)).map((p) => [p.type, p.value])
  ) as Record<string, string>;

  const asSeenUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour === "24" ? "0" : parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  const offset = asSeenUtc - utcGuess;
  return new Date(utcGuess - offset);
}

/** e.g. "Saturday, July 12, 2026" */
export function formatEventDate(event: Pick<Event, "eventDate" | "timezone">): string {
  const dt = zonedTimeToUtc(event.eventDate, "12:00", event.timezone);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: event.timezone,
  }).format(dt);
}

/** e.g. "7:00 PM PDT" (or null if no start time) */
export function formatEventTime(
  event: Pick<Event, "eventDate" | "startTime" | "timezone">
): string | null {
  if (!event.startTime) return null;
  const dt = zonedTimeToUtc(event.eventDate, event.startTime, event.timezone);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: event.timezone,
  }).format(dt);
}
