import Link from "next/link";
import type { Metadata } from "next";
import VenueSuggestionForm from "@/components/venues/VenueSuggestionForm";
import { VENUES, getVenue } from "@/lib/venues";

export const metadata: Metadata = {
  title: "Suggest a venue · Unplugg Me",
  description:
    "Suggest a NYC venue for offline events, or an edit to one that's already listed.",
};

export default async function SuggestVenuePage({
  searchParams,
}: {
  searchParams: Promise<{ venue?: string }>;
}) {
  const { venue } = await searchParams;
  const initial = venue && getVenue(venue) ? venue : null;
  const options = [...VENUES]
    .map((v) => ({ id: v.id, name: v.name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="venue-page mx-auto w-full max-w-xl flex-1 px-6 py-10">
      <header className="mb-8">
        <nav className="flex flex-wrap items-baseline justify-between gap-4 text-sm">
          <Link href="/" className="font-display text-lg text-blue">
            Unplugg Me
          </Link>
          <Link href="/find-a-venue" className="text-ink-soft underline-offset-4 hover:text-ink hover:underline">
            ← All venues
          </Link>
        </nav>
        <h1 className="font-display mt-6 text-3xl">Suggest a venue or an edit</h1>
        <p className="mt-2 text-ink-soft">
          Know a space that works for offline events, or spotted something
          wrong? Send it here. A maintainer reviews every suggestion before it
          appears on the site.
        </p>
      </header>
      <VenueSuggestionForm venues={options} initialVenueId={initial} />
    </main>
  );
}
