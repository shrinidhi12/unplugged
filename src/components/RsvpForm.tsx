"use client";

import { useActionState, useState } from "react";
import { submitRsvp, type FormState } from "@/app/actions";

export default function RsvpForm({ slug }: { slug: string }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    submitRsvp,
    {}
  );
  const [party, setParty] = useState(1);

  if (state.ok) {
    return (
      <div className="card p-6 text-center">
        {state.status === "going" ? (
          <>
            <div className="u-hl text-3xl">You&apos;re in.</div>
            <p className="mt-3 text-ink-soft">
              We&apos;ve sent a confirmation and a calendar invite to your inbox.
              See you there!
            </p>
          </>
        ) : (
          <>
            <div className="font-display text-2xl">Maybe next time.</div>
            <p className="mt-3 text-ink-soft">
              Thanks for letting the host know. No hard feelings.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="card p-6">
      <input type="hidden" name="slug" value={slug} />
      {/* Honeypot: hidden from humans, catches bots that fill every field. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <h2 className="font-display text-xl">Let us know if you&apos;re coming!</h2>
      <p className="mt-1 text-sm text-ink-soft">
        Just add your name and email. Only the host sees your reply.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className="field" />
        <input
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          className="field"
        />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className="text-sm text-ink-soft">Bringing anyone?</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setParty((p) => Math.max(1, p - 1))}
            className="h-8 w-8 border-2 border-ink text-lg leading-none hover:bg-paper-2"
            aria-label="Fewer"
          >
            −
          </button>
          <span className="w-14 text-center text-sm">
            {party === 1 ? "Just me" : `+${party - 1}`}
          </span>
          <button
            type="button"
            onClick={() => setParty((p) => Math.min(20, p + 1))}
            className="h-8 w-8 border-2 border-ink text-lg leading-none hover:bg-paper-2"
            aria-label="More"
          >
            +
          </button>
        </div>
        <input type="hidden" name="partySize" value={party} />
      </div>

      <textarea
        name="note"
        rows={2}
        placeholder="A note for the host (optional)"
        className="field mt-3"
      />

      {state.error && (
        <p className="mt-3 border-2 border-pink bg-pink/10 px-3 py-2 text-sm font-medium">
          {state.error}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          name="status"
          value="going"
          disabled={pending}
          className="btn text-lg"
        >
          {pending ? "…" : "I'm in →"}
        </button>
        <button
          type="submit"
          name="status"
          value="cant"
          disabled={pending}
          className="text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline disabled:opacity-50"
        >
          Can&apos;t make it
        </button>
      </div>
    </form>
  );
}
