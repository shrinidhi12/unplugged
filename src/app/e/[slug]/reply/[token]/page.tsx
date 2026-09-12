import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvent, getRsvpByToken } from "@/lib/queries";
import { formatEventDate, formatEventTime } from "@/lib/datetime";
import RsvpForm from "@/components/RsvpForm";
import SuggestionBoxButton from "@/components/SuggestionBoxButton";

export const metadata: Metadata = {
  title: "Change your reply · Unplugg Me",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ slug: string; token: string }> };

/**
 * A guest's private page for changing their RSVP, reached only through the
 * link in their email. The token is the guest's proof that the reply is theirs.
 */
export default async function ReplyPage({ params }: Props) {
  const { slug, token } = await params;
  const found = await getRsvpByToken(slug, token).catch(() => null);
  if (!found) {
    // A retired or mistyped link for an event that still exists gets its own
    // explanation; only a missing event falls through to the generic 404.
    const event = await getEvent(slug).catch(() => null);
    if (!event) notFound();
    return <ExpiredLink slug={slug} />;
  }

  const { event, rsvp } = found;
  const date = formatEventDate(event);
  const time = formatEventTime(event);
  const canceled = Boolean(event.canceledAt);

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="font-display text-lg font-semibold">
          Unplugg Me
        </Link>
        <div className="flex items-center gap-4">
          <span className="eyebrow">Your reply</span>
          <SuggestionBoxButton />
        </div>
      </div>

      {canceled && (
        <div className="mb-6 border-2 border-pink bg-pink/10 px-4 py-3 text-sm font-medium">
          The host has called this event off. Stay tuned for new details...
        </div>
      )}

      <header className="mb-6">
        <h1 className="u-hl text-3xl leading-tight">{event.title}</h1>
        <p className="mt-3 text-ink-soft">
          {date}
          {time && ` · ${time}`}
        </p>
        <Link
          href={`/e/${slug}`}
          className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-clay hover:text-clay-dark"
        >
          See the event details →
        </Link>
      </header>

      {!canceled && (
        <RsvpForm
          slug={slug}
          existing={{
            token,
            name: rsvp.name,
            email: rsvp.email,
            status: rsvp.status,
            partySize: rsvp.partySize,
            note: rsvp.note,
          }}
        />
      )}
    </main>
  );
}

/**
 * Shown for a change-your-reply link that doesn't match a reply. The usual
 * cause is an older email: sending a guest a fresh link retires the previous one.
 */
function ExpiredLink({ slug }: { slug: string }) {
  return (
    <main className="mx-auto flex max-w-xl flex-1 flex-col items-start justify-center px-6 py-20">
      <p className="eyebrow">Link expired</p>
      <h1 className="font-display mt-3 text-4xl">
        This link doesn&apos;t work anymore.
      </h1>
      <p className="mt-3 text-ink-soft">
        Each time we email you a new link to change your reply, the older one
        stops working. Use the link in your most recent email, or reply again
        from the event page with the same email and we&apos;ll send you a fresh
        one.
      </p>
      <Link href={`/e/${slug}`} className="btn mt-6">
        Go to the event →
      </Link>
    </main>
  );
}
