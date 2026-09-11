import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRsvpByToken } from "@/lib/queries";
import { formatEventDate, formatEventTime } from "@/lib/datetime";
import RsvpForm from "@/components/RsvpForm";

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
  if (!found) notFound();

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
        <span className="eyebrow">Your reply</span>
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
