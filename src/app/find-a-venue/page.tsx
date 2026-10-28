import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import VenueBrowser from "@/components/venues/VenueBrowser";
import { NEWSLETTER_URL, OPTIONS, SYNCED_AT, summaries } from "@/lib/venues";
import { formatSyncDate } from "@/lib/venue-dates";

export const metadata: Metadata = {
  title: "Find a venue · Unplugg Me",
  description:
    "Parks, libraries, cafes and community spaces in NYC where offline, phone-free events have already worked, with what hosts need to know.",
};

export default function FindAVenuePage() {
  const venues = summaries();
  return (
    <main className="venue-page mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
      <header className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
        <Link href="/" className="font-display text-lg text-blue">
          Unplugg Me
        </Link>
        <Link
          href="/find-a-venue/suggest"
          className="text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
        >
          Suggest a venue
        </Link>
      </header>

      <section className="max-w-3xl">
        <p className="eyebrow">A resource for hosts</p>
        <h1 className="u-hl mt-3 text-4xl sm:text-6xl">Find a venue</h1>
        <p className="mt-4 text-lg text-ink-soft">
          Places in New York City that already work for offline, phone-free
          events: what kind of space each one is, how many people it holds,
          what it costs, and how hosts have booked it.
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          Event history comes from the{" "}
          <a href={NEWSLETTER_URL} className="underline underline-offset-4 hover:text-ink">
            NYC Off Tech newsletter
          </a>
          . Venue details are added by volunteer collaborators, and many are
          still blank. Data last synced {formatSyncDate(SYNCED_AT)}.
        </p>
      </section>

      <div className="mt-8">
        <Suspense fallback={<div className="h-[640px] md:h-[760px]" />}>
          <VenueBrowser venues={venues} options={OPTIONS} />
        </Suspense>
      </div>

      <section className="mt-12 border-t-2 border-ink pt-6 text-sm text-ink-soft">
        <p>
          Know a space that should be here, or spotted something out of date?{" "}
          <Link href="/find-a-venue/suggest" className="font-bold text-blue underline underline-offset-4">
            Suggest a venue or an edit
          </Link>
          . Public places only: never a private home.
        </p>
      </section>
    </main>
  );
}
