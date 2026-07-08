import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvent, getRsvps, headcount } from "@/lib/queries";
import { formatEventDate, formatEventTime } from "@/lib/datetime";
import { splashUrl } from "@/lib/urls";
import { removeRsvp, cancelEvent } from "@/app/actions";
import ShareLink from "@/components/ShareLink";
import EditEventForm from "@/components/EditEventForm";
import type { Rsvp } from "@/db/schema";

export const metadata: Metadata = {
  title: "Manage your event · Unplugg Me",
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{ slug: string; token: string }>;
  searchParams: Promise<{ created?: string }>;
};

export default async function ManagePage({ params, searchParams }: Props) {
  const { slug, token } = await params;
  const { created } = await searchParams;

  const event = await getEvent(slug).catch(() => null);
  if (!event || event.editToken !== token) notFound();

  const rsvps = await getRsvps(slug);
  const going = rsvps.filter((r) => r.status === "going");
  const cant = rsvps.filter((r) => r.status === "cant");
  const counts = headcount(rsvps);

  const date = formatEventDate(event);
  const time = formatEventTime(event);
  const share = splashUrl(slug);
  const canceled = Boolean(event.canceledAt);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="font-display text-lg text-blue">
          Unplugg Me
        </Link>
        <span className="eyebrow">Host view</span>
      </div>

      {created && (
        <div className="mb-6 border-2 border-blue bg-blue/10 px-4 py-3 text-sm">
          Your event is live. We&apos;ve emailed you this link too — bookmark it,
          it&apos;s the only way back in.
        </div>
      )}

      <header className="mb-6">
        <h1 className="u-hl text-3xl leading-tight">{event.title}</h1>
        <p className="mt-3 text-ink-soft">
          {date}
          {time && ` · ${time}`}
          {canceled && " · Canceled"}
        </p>
      </header>

      <section className="card mb-8 p-5">
        <h2 className="text-sm font-semibold">Share this link to invite people</h2>
        <p className="mb-3 mt-1 text-sm text-ink-soft">
          Guests see the plan and RSVP — they never see the guest list.
        </p>
        <ShareLink url={share} />
      </section>

      <section className="mb-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-xl">
            {counts.heads} coming
            {counts.heads !== counts.going && (
              <span className="text-ink-soft"> ({counts.going} RSVPs + plus-ones)</span>
            )}
          </h2>
          {counts.cant > 0 && (
            <span className="text-sm text-ink-soft">{counts.cant} can&apos;t</span>
          )}
        </div>

        {going.length === 0 && cant.length === 0 ? (
          <p className="border-2 border-dashed border-line px-4 py-8 text-center text-ink-soft">
            No replies yet. Share the link above to get the first yes.
          </p>
        ) : (
          <ul className="card divide-y divide-line">
            {going.map((r) => (
              <GuestRow key={r.id} r={r} slug={slug} token={token} />
            ))}
            {cant.map((r) => (
              <GuestRow key={r.id} r={r} slug={slug} token={token} muted />
            ))}
          </ul>
        )}
      </section>

      {!canceled && (
        <section className="card mb-8 p-5">
          <EditEventForm event={event} token={token} />
        </section>
      )}

      {!canceled && (
        <section className="border-2 border-pink bg-pink/10 p-5">
          <details>
            <summary className="cursor-pointer text-sm font-semibold text-pink">
              Cancel this event
            </summary>
            <p className="mt-2 text-sm text-ink-soft">
              This calls the event off and emails everyone who said they&apos;re
              coming. It can&apos;t be undone.
            </p>
            <form action={cancelEvent} className="mt-3">
              <input type="hidden" name="slug" value={slug} />
              <input type="hidden" name="token" value={token} />
              <button
                type="submit"
                className="border-2 border-pink px-4 py-2 text-sm font-bold text-pink hover:bg-pink hover:text-card"
              >
                Yes, cancel the event
              </button>
            </form>
          </details>
        </section>
      )}
    </main>
  );
}

function GuestRow({
  r,
  slug,
  token,
  muted,
}: {
  r: Rsvp;
  slug: string;
  token: string;
  muted?: boolean;
}) {
  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <div className={`flex-1 ${muted ? "text-ink-soft" : ""}`}>
        <div className="font-medium">
          {r.name}
          {r.status === "going" && r.partySize > 1 && (
            <span className="text-pink"> +{r.partySize - 1}</span>
          )}
          {r.status === "cant" && (
            <span className="text-xs text-ink-soft"> · can&apos;t make it</span>
          )}
        </div>
        <a
          href={`mailto:${r.email}`}
          className="text-sm text-ink-soft hover:text-blue"
        >
          {r.email}
        </a>
        {r.note && (
          <p className="mt-0.5 text-sm text-ink-soft">&ldquo;{r.note}&rdquo;</p>
        )}
      </div>
      <form action={removeRsvp}>
        <input type="hidden" name="slug" value={slug} />
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="rsvpId" value={r.id} />
        <button
          type="submit"
          className="text-xs text-ink-soft hover:text-pink"
          aria-label={`Remove ${r.name}`}
        >
          Remove
        </button>
      </form>
    </li>
  );
}
