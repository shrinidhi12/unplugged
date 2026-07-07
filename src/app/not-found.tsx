import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-1 flex-col items-start justify-center px-6 py-20">
      <p className="eyebrow">Nothing here</p>
      <h1 className="font-display mt-3 text-4xl">
        This event isn&apos;t around anymore.
      </h1>
      <p className="mt-3 text-ink-soft">
        The link might be mistyped, or the host called the event off and it&apos;s
        been cleared away.
      </p>
      <Link href="/create" className="btn mt-6">
        Make your own event →
      </Link>
    </main>
  );
}
