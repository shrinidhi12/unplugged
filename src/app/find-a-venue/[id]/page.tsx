import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  NEWSLETTER_URL,
  VENUES,
  getVenue,
  isStale,
  publicCostText,
  type Venue,
} from "@/lib/venues";
import { formatSyncDate } from "@/lib/venue-dates";

// Every synced venue is prerendered; any other ID hits notFound() below and
// gets the venue-specific 404 page.
export function generateStaticParams() {
  return VENUES.map((v) => ({ id: v.id }));
}

// How many past events the "events held here" line names.
const EVENTS_SHOWN = 6;

function place(v: Venue): string {
  return [v.neighborhood, v.borough].filter(Boolean).join(", ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const v = getVenue((await params).id);
  if (!v) return {};
  const where = place(v);
  const events = v.history?.recentEvents.slice(0, 3) ?? [];
  return {
    title: `${v.name} · Find a venue · Unplugg Me`,
    description: `${v.type}${where ? ` in ${where}` : ""}. Hosting notes for offline events: booking, contact, food, accessibility and A/V.${
      events.length ? ` Past events: ${events.join(", ")}.` : ""
    }`,
  };
}

const NOT_KNOWN = <span className="text-ink-soft italic">Not yet known</span>;

/** One labelled detail. Empty values read "Not yet known", never a blank gap. */
function Row({ label, value }: { label: string; value: React.ReactNode }) {
  const empty = value === null || value === undefined || value === "";
  return (
    <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3 border-b border-line py-2 last:border-b-0">
      <dt className="text-sm font-bold">{label}</dt>
      <dd className="text-sm">{empty ? NOT_KNOWN : value}</dd>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const id = `h-${title.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <section className="card p-4 sm:p-5" aria-labelledby={id}>
      <h2 id={id} className="font-display text-xl">
        {title}
      </h2>
      <dl className="mt-2">{children}</dl>
    </section>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-blue underline underline-offset-4" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const LINKABLE = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;

/** Freeform text from the sheet: keeps line breaks, links URLs and emails. */
function Freeform({ text }: { text: string | null }) {
  if (!text) return null;
  return (
    <span className="whitespace-pre-line">
      {text.split(LINKABLE).map((part, i) =>
        i % 2 === 0 ? (
          part
        ) : (
          <ExternalLink key={i} href={part.includes("@") && !part.startsWith("http") ? `mailto:${part}` : part}>
            {part}
          </ExternalLink>
        )
      )}
    </span>
  );
}

/** A notes value for <Row>: null when blank, so the row reads "Not yet known". */
function note(text: string | null) {
  return text ? <Freeform text={text} /> : null;
}

/** "A, B and C" */
function listOf(items: string[]): string {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

export default async function VenuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const v = getVenue((await params).id);
  if (!v) notFound();
  const h = v.history;
  const stale = isStale(v.lastVerified);
  const events = h?.recentEvents.slice(0, EVENTS_SHOWN) ?? [];

  return (
    <main className="venue-page mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6">
      <nav className="mb-8 flex flex-wrap items-baseline justify-between gap-4 text-sm">
        <Link href="/" className="font-display text-lg text-blue">
          Unplugg Me
        </Link>
        <Link href="/find-a-venue" className="text-ink-soft underline-offset-4 hover:text-ink hover:underline">
          ← All venues
        </Link>
      </nav>

      <header>
        <p className="eyebrow">{v.type}</p>
        <h1 className="font-display mt-2 text-4xl sm:text-5xl">{v.name}</h1>
        {place(v) && <p className="mt-2 text-lg text-ink-soft">{place(v)}</p>}
        <p className="mt-3 text-sm">
          {v.lastVerified ? (
            <>
              Details last verified {formatSyncDate(v.lastVerified)}.
              {stale && (
                <strong className="ml-1 border-2 border-pink px-1.5 py-0.5 text-xs uppercase tracking-wider">
                  May be out of date
                </strong>
              )}
            </>
          ) : (
            <span className="text-ink-soft">
              Details not yet verified by a collaborator. Check with the venue before you book.
            </span>
          )}
        </p>
      </header>

      <div className="mt-8 grid gap-5">
        <Section title="Venue details">
          <Row label="Type" value={v.type} />
          <Row label="Address" value={v.address} />
          <Row label="Neighborhood" value={place(v)} />
          <Row label="Indoor / outdoor" value={v.indoorOutdoor} />
          <Row label="Capacity (estimate)" value={v.capacity ? `About ${v.capacity} people` : null} />
          <Row label="Public / cost" value={publicCostText(v)} />
        </Section>

        {/* Freeform notes collaborators write on the sheet. */}
        <Section title="Venue notes">
          <Row label="How to book" value={note(v.howToBook)} />
          <Row label="Contact" value={note(v.contact)} />
          <Row label="Food & drink" value={note(v.food)} />
          <Row label="Accessibility" value={note(v.accessibility)} />
          <Row label="A/V equipment" value={note(v.av)} />
          <Row label="Other" value={note(v.notes)} />
        </Section>
      </div>

      <section className="mt-8" aria-labelledby="h-events">
        <h2 id="h-events" className="font-display text-xl">
          Events held here
        </h2>
        <p className="mt-2 max-w-2xl">
          {events.length > 0 && h ? (
            <>
              {listOf(events)}
              {h.recentEvents.length > EVENTS_SHOWN ? ", among others" : ""}. Listed in the{" "}
              <ExternalLink href={NEWSLETTER_URL}>NYC Off Tech newsletter</ExternalLink> between{" "}
              {h.firstIssue} and {h.latestIssue}.
            </>
          ) : (
            <span className="text-ink-soft">No NYC Off Tech events listed here yet.</span>
          )}
        </p>
      </section>

      <p className="mt-8 text-sm text-ink-soft">
        Something wrong or missing?{" "}
        <Link
          href={`/find-a-venue/suggest?venue=${v.id}`}
          className="font-bold text-blue underline underline-offset-4"
        >
          Suggest an edit
        </Link>
        .
      </p>
    </main>
  );
}
