import { asc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { events, rsvps, type Event, type Rsvp } from "@/db/schema";

export async function getEvent(slug: string): Promise<Event | null> {
  const db = getDb();
  const [event] = await db.select().from(events).where(eq(events.id, slug));
  return event ?? null;
}

export async function getRsvps(slug: string): Promise<Rsvp[]> {
  const db = getDb();
  return db
    .select()
    .from(rsvps)
    .where(eq(rsvps.eventId, slug))
    .orderBy(asc(rsvps.createdAt));
}

export function headcount(list: Rsvp[]): { going: number; heads: number; cant: number } {
  let going = 0;
  let heads = 0;
  let cant = 0;
  for (const r of list) {
    if (r.status === "going") {
      going += 1;
      heads += r.partySize;
    } else {
      cant += 1;
    }
  }
  return { going, heads, cant };
}
