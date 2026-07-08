import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <span className="font-display text-xl text-blue">Unplugg Me</span>
        <Link href="/create" className="btn btn-sm">
          Create an event
        </Link>
      </header>

      <section className="relative overflow-hidden">
        <div
          className="halftone pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-6 pt-16 pb-20 sm:pt-24">
          <p className="eyebrow">Social infrastructure outside big tech</p>
          <h1 className="u-hl mt-4 text-5xl sm:text-7xl">
            Host and find events for your community
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink-soft">
            A simple way to host events
          </p>
          <div className="mt-8">
            <Link href="/create" className="btn text-lg">
              Create an event →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t-2 border-ink bg-paper-2">
        <div className="mx-auto grid max-w-3xl gap-8 px-6 py-14 sm:grid-cols-3">
          {[
            { n: "01", t: "Plan the event" },
            { n: "02", t: "Invite others" },
            { n: "03", t: "Hang up, hang out :)" },
          ].map((s) => (
            <div key={s.n}>
              <div className="font-display text-3xl text-pink">{s.n}</div>
              <h3 className="mt-2 font-display text-lg">{s.t}</h3>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-3xl px-6 py-10 text-sm text-ink-soft">
        The event is the medium
      </footer>
    </main>
  );
}
