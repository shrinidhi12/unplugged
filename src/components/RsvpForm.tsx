"use client";

import { useActionState, useState } from "react";
import { submitRsvp, updateRsvp, type FormState } from "@/app/actions";

/** A guest's saved reply; present only on their private change-your-reply page. */
export type ExistingReply = {
  token: string;
  name: string;
  email: string;
  status: "going" | "cant";
  partySize: number;
  note: string | null;
};

export default function RsvpForm({
  slug,
  existing,
}: {
  slug: string;
  existing?: ExistingReply;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    existing ? updateRsvp : submitRsvp,
    {}
  );
  const [party, setParty] = useState(existing?.partySize ?? 1);

  if (state.ok) {
    return (
      <div className="card p-6 text-center">
        {state.status === "going" ? (
          <>
            <div className="u-hl text-3xl">You&apos;re in.</div>
            <p className="mt-3 text-ink-soft">
              {existing
                ? "Your reply is updated. See you there!"
                : "Check your inbox. We've emailed you the details and a private link in case your plans change. See you there!"}
            </p>
          </>
        ) : (
          <>
            <div className="font-display text-2xl">Maybe next time.</div>
            <p className="mt-3 text-ink-soft">
              {existing
                ? "Your reply is updated. Thanks for letting the host know."
                : "Thanks for letting the host know. We've emailed you a private link in case you change your mind."}
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="card p-6">
      <input type="hidden" name="slug" value={slug} />
      {existing && <input type="hidden" name="token" value={existing.token} />}
      {/* Honeypot: hidden from humans, catches bots that fill every field. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <h2 className="font-display text-xl">
        {existing ? "Change your reply" : "Let us know if you're coming!"}
      </h2>
      <p className="mt-1 text-sm text-ink-soft">
        {existing
          ? `Replying as ${existing.email}. You're currently ${
              existing.status === "going" ? "coming" : "not coming"
            }.`
          : "Just add your name and email. Only the host sees your reply."}
      </p>

      <div className={`mt-4 grid gap-3 ${existing ? "" : "sm:grid-cols-2"}`}>
        <input
          name="name"
          required
          placeholder="Your name"
          defaultValue={existing?.name}
          className="field"
        />
        {!existing && (
          <input
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className="field"
          />
        )}
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
        defaultValue={existing?.note ?? ""}
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
