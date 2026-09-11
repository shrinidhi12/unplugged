import { buildEventIcs } from "@/lib/ics";
import { getEvent } from "@/lib/queries";
import { splashUrl } from "@/lib/urls";

type Context = { params: Promise<{ slug: string }> };

/**
 * Serves the event as an .ics file. Guests can open it to drop the event into
 * whatever calendar they use; Proton Calendar users can either import the file
 * or point "Add calendar from URL" at this address (Proton re-fetches it on its
 * own 4-16 hour cycle, so treat the feed as eventually consistent).
 */
export async function GET(_request: Request, { params }: Context) {
  const { slug } = await params;
  const event = await getEvent(slug).catch(() => null);
  if (!event) return new Response("Event not found", { status: 404 });

  const ics = buildEventIcs(event, splashUrl(slug));

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      // The slug alphabet is restricted, so it's safe to interpolate directly.
      "Content-Disposition": `attachment; filename="unplugg-me-${slug}.ics"`,
      // Short shared-cache window: host edits show up quickly without every
      // subscriber's poll hitting the database.
      "Cache-Control": "public, max-age=0, s-maxage=300",
    },
  });
}
