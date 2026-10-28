import Link from "next/link";

export default function VenueNotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-1 flex-col items-start justify-center px-6 py-20">
      <p className="eyebrow">Nothing here</p>
      <h1 className="font-display mt-3 text-4xl">We don&apos;t list that venue.</h1>
      <p className="mt-3 text-ink-soft">
        The link might be mistyped, or the venue was taken off the list.
      </p>
      <Link href="/find-a-venue" className="btn mt-6">
        See all venues →
      </Link>
    </main>
  );
}
