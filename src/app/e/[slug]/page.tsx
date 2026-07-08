import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvent } from "@/lib/queries";
import { formatEventDate, formatEventTime } from "@/lib/datetime";
import { googleMapsLink } from "@/lib/maps";
import { splashUrl } from "@/lib/urls";
import MapViewClient from "@/components/MapViewClient";
import RsvpForm from "@/components/RsvpForm";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug).catch(() => null);
  if (!event) return { title: "Event not found · Unplugg Me" };

  const date = formatEventDate(event);
  const time = formatEventTime(event);
  const when = time ? `${date} · ${time}` : date;
  const description = event.description
    ? `${when} — ${event.description}`
    : when;

  return {
    title: `${event.title} · Unplugg Me`,
    description,
    openGraph: {
      title: event.title,
      description,
      url: splashUrl(slug),
      siteName: "Unplugg Me",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: event.title, description },
  };
}

export default async function SplashPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEvent(slug).catch(() => null);
  if (!event) notFound();

  const date = formatEventDate(event);
  const time = formatEventTime(event);
  const mapsHref = googleMapsLink(event);
  const hasPin = typeof event.lat === "number" && typeof event.lng === "number";
  const place = [event.locationName, event.address].filter(Boolean).join(" · ");
  const canceled = Boolean(event.canceledAt);

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="font-display text-lg font-semibold">
          Unplugg Me
        </Link>
        <span className="eyebrow">You&apos;re invited!</span>
      </div>

      {canceled && (
        <div className="mb-6 border-2 border-pink bg-pink/10 px-4 py-3 text-sm font-medium">
          The host has called this event off. Stay tuned for new details...
        </div>
      )}

      <article className="space-y-6">
        <header>
          <h1 className="u-hl text-4xl leading-tight sm:text-5xl">{event.title}</h1>
          <p className="mt-3 text-lg">
            <span className="font-medium">{date}</span>
            {time && <span className="text-ink-soft"> · {time}</span>}
          </p>
          {place && <p className="mt-1 text-ink-soft">{place}</p>}
        </header>

        {event.description && (
          <p className="whitespace-pre-line leading-relaxed">
            {event.description}
          </p>
        )}

        {hasPin && (
          <div className="space-y-2">
            <MapViewClient lat={event.lat as number} lng={event.lng as number} />
            {mapsHref && (
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-clay hover:text-clay-dark"
              >
                Open in Maps app →
              </a>
            )}
          </div>
        )}

        {!hasPin && mapsHref && (
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-clay hover:text-clay-dark"
          >
            Open in Maps app →
          </a>
        )}

        {!canceled && <RsvpForm slug={slug} />}
      </article>

      <footer className="mt-10 border-t border-line pt-6 text-sm text-ink-soft">
        Made with{" "}
        <Link href="/" className="text-clay hover:underline">
          Unplugg Me
        </Link>{" "}
        — a free events platform.{" "}
        <Link href="/create" className="text-clay hover:underline">
          Host your own events! →
        </Link>
      </footer>
    </main>
  );
}
