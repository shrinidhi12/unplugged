import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MapViewClient from "@/components/MapViewClient";
import {
  NEWSLETTER_URL,
  VENUES,
  capacityText,
  getVenue,
  isStale,
  type Venue,
} from "@/lib/venues";
import { instagramUrl, osmDirections, osmLink } from "@/lib/venue-filters";
import { formatSyncDate } from "@/lib/venue-dates";

// Every synced venue is prerendered; any other ID hits notFound() below and
// gets the venue-specific 404 page.
export function generateStaticParams() {
  return VENUES.map((v) => ({ id: v.id }));
}

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
  const used = v.history
    ? ` Used for ${v.history.listings} NYC Off Tech event listing${v.history.listings === 1 ? "" : "s"}.`
    : "";
  return {
    title: `${v.name} · Find a venue · Unplugg Me`,
    description: `${v.type}${where ? ` in ${where}` : ""}. Hosting details for offline events: capacity, cost, booking and accessibility.${used}`,
  };
}

const NOT_KNOWN = <span className="text-ink-soft italic">Not yet known</span>;

/** One labelled detail. Empty values read "Not yet known", never a blank gap. */
function Row({ label, value }: { label: string; value: React.ReactNode }) {
  const empty = value === null || value === undefined || value === "" || value === "Unknown";
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

function withNotes(value: string | null, notes: string | null) {
  if (!value && !notes) return null;
  return (
    <>
      {value}
      {value && notes ? ". " : ""}
      {notes && <span className="text-ink-soft">{notes}</span>}
    </>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-blue underline underline-offset-4" rel="noopener noreferrer">
      {children}
    </a>
  );
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
  const links = [
    v.website && { label: "Website", href: v.website },
    v.instagram && { label: "Instagram", href: instagramUrl(v.instagram) },
    v.bookingLink && { label: "Booking or inquiries", href: v.bookingLink },
  ].filter(Boolean) as { label: string; href: string }[];

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
        <Section title="At a glance">
          <Row label="Type" value={v.type} />
          <Row label="Address" value={v.address} />
          <Row label="Neighborhood" value={place(v)} />
          <Row label="Indoor / outdoor" value={v.indoorOutdoor} />
          <Row label="Capacity (estimate)" value={capacityText(v)} />
          <Row label="Seating" value={v.seating} />
          <Row label="Private room / buyout" value={v.privateRoom} />
          <Row label="Noise level" value={v.noise} />
          <Row label="Cost" value={withNotes(v.cost === "Unknown" ? null : v.cost, v.costNotes)} />
          {(v.indoorOutdoor === "Outdoor" || v.weatherBackup) && (
            <Row label="Rain plan" value={v.weatherBackup} />
          )}
        </Section>

        {/* Filled in by collaborators on the sheet. Contact details stay
            collaborator-only unless the venue agreed to show them. */}
        <Section title="Venue notes">
          <Row label="About the space" value={v.notes} />
          <Row label="Food & drink" value={v.food} />
          <Row label="Alcohol" value={v.alcohol} />
          <Row
            label="Contact"
            value={
              v.contact ? (
                <>
                  {[v.contact.name, v.contact.role].filter(Boolean).join(", ")}
                  {v.contact.email && (
                    <>
                      {" "}
                      <ExternalLink href={`mailto:${v.contact.email}`}>{v.contact.email}</ExternalLink>
                    </>
                  )}
                  {v.contact.phone && <> {v.contact.phone}</>}
                </>
              ) : v.bookingLink ? (
                <ExternalLink href={v.bookingLink}>Use the venue&apos;s booking or inquiry link</ExternalLink>
              ) : null
            }
          />
          <Row label="Links" value={
            links.length ? (
              <span className="flex flex-wrap gap-x-4">
                {links.map((l) => (
                  <ExternalLink key={l.label} href={l.href}>{l.label}</ExternalLink>
                ))}
              </span>
            ) : null
          } />
          <Row label="Last verified" value={v.lastVerified && formatSyncDate(v.lastVerified)} />
        </Section>

        <Section title="Hosting here">
          <Row label="How to book" value={v.howToBook} />
          <Row label="Booking lead time" value={v.leadTime} />
          <Row label="Permits" value={v.permitNotes} />
          <Row label="Best times" value={v.bestTimes} />
          <Row label="All ages" value={v.allAges} />
          <Row label="Restrooms" value={v.restrooms} />
          <Row label="Amplified sound" value={v.amplifiedSound} />
          <Row label="Phone-free friendly" value={v.phoneFree} />
        </Section>

        <Section title="Accessibility">
          <Row label="Step-free access" value={v.stepFree} />
          <Row label="Accessible restroom" value={v.accessibleRestroom} />
          <Row label="Notes" value={v.accessibilityNotes} />
        </Section>

        <Section title="Equipment">
          <Row label="Power outlets" value={v.power} />
          <Row label="Sound system / mic" value={v.soundSystem} />
          <Row label="Projector / screen" value={v.projector} />
          <Row label="Tables" value={v.tables} />
        </Section>

        <section className="card p-4 sm:p-5" aria-labelledby="h-getting-there">
          <h2 id="h-getting-there" className="font-display text-xl">
            Getting there
          </h2>
          <dl className="mt-2">
            <Row label="Nearest transit" value={v.transit} />
          </dl>
          {v.precision === "approx" && (
            <p className="mt-3 border-2 border-dashed border-pink p-2 text-sm">
              Approximate location: this pin is placed by neighborhood or cross
              street, not an exact address.
            </p>
          )}
          <div className="mt-3">
            <MapViewClient lat={v.lat} lng={v.lng} />
          </div>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            <ExternalLink href={osmLink(v)}>Open in OpenStreetMap</ExternalLink>
            <ExternalLink href={osmDirections(v)}>Directions</ExternalLink>
          </p>
        </section>

        <section className="card p-4 sm:p-5" aria-labelledby="h-history">
          <h2 id="h-history" className="font-display text-xl">
            Off Tech history
          </h2>
          {h ? (
            <>
              <p className="mt-2 text-sm">
                Listed {h.listings} time{h.listings === 1 ? "" : "s"} across {h.issues} issue
                {h.issues === 1 ? "" : "s"} of the{" "}
                <ExternalLink href={NEWSLETTER_URL}>NYC Off Tech newsletter</ExternalLink>, from{" "}
                {h.firstIssue} to {h.latestIssue}.
              </p>
              {h.topActivities.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Top activities">
                  {h.topActivities.map((a) => (
                    <li key={a.activity} className="border-2 border-ink bg-paper px-2 py-0.5 text-sm">
                      {a.activity} <span className="text-ink-soft">({a.count})</span>
                    </li>
                  ))}
                </ul>
              )}
              <dl className="mt-3">
                <Row label="Signature events" value={h.signatureEvents.join(", ")} />
                <Row label="Most common host" value={h.topHost} />
                <Row label="Latest event" value={h.latestEvent} />
              </dl>
            </>
          ) : (
            <p className="mt-2 text-sm text-ink-soft">
              No NYC Off Tech events listed here yet.
            </p>
          )}
        </section>

      </div>

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
