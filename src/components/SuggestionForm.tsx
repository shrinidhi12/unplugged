"use client";

import Link from "next/link";
import { useActionState, useState, type CSSProperties } from "react";
import { submitSuggestion, type FormState } from "@/app/actions";
import SuggestionBoxArt from "@/components/SuggestionBoxArt";
import {
  MAX_SUGGESTION_LENGTH,
  SUGGESTION_KINDS,
  type SuggestionKind,
} from "@/lib/suggestions";

const KINDS = Object.keys(SUGGESTION_KINDS) as SuggestionKind[];
const TILTS = ["-2deg", "1.5deg", "-1deg", "2deg"];

export default function SuggestionForm() {
  // Bumping the key remounts a fresh form (and a hungry box) for another note.
  const [round, setRound] = useState(0);
  return <Round key={round} onAnother={() => setRound((r) => r + 1)} />;
}

function Round({ onAnother }: { onAnother: () => void }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    submitSuggestion,
    {}
  );
  // Controlled, so a long note survives an error response.
  const [kind, setKind] = useState<SuggestionKind>("idea");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="grid items-start gap-10 md:grid-cols-[5fr_6fr]">
      <div>
        <h1 className="u-hl text-5xl sm:text-6xl">
          Got an idea? Feed the box.
        </h1>
        <p className="mt-5 max-w-sm text-lg text-ink-soft">
          Ideas, bugs, hot takes, love notes. Every note lands straight in my
          inbox, and I read them all.
        </p>
        <div className="mx-auto mt-6 max-w-[280px] md:max-w-none">
          <SuggestionBoxArt kind={kind} fed={Boolean(state.ok)} />
        </div>
      </div>

      {state.ok ? (
        <div className="card p-8 md:mt-10" aria-live="polite">
          <span className="sb-stamp">Yum!</span>
          <h2 className="u-hl mt-6 text-4xl">
            Thanks{state.name ? `, ${state.name}` : ""}!
          </h2>
          <p className="mt-4 text-ink-soft">
            Your note is in the box and on its way to me.
            {email && " If it needs a reply, I'll write back."}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="button" onClick={onAnother} className="btn">
              Drop in another
            </button>
            <Link
              href="/"
              className="text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
            >
              Back to Unplugg Me →
            </Link>
          </div>
        </div>
      ) : (
        <form action={formAction} className="card relative p-6 sm:p-8 md:mt-10">
          {/* Honeypot: hidden from humans, catches bots that fill every field. */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <h2 className="font-display text-2xl">What&apos;s on your mind?</h2>

          <fieldset className="mt-4">
            <legend className="sr-only">What kind of note is it?</legend>
            <div className="flex flex-wrap gap-2.5">
              {KINDS.map((k, i) => (
                <label
                  key={k}
                  className="sticker"
                  style={{ "--tilt": TILTS[i] } as CSSProperties}
                >
                  <input
                    type="radio"
                    name="kind"
                    value={k}
                    checked={kind === k}
                    onChange={() => setKind(k)}
                    className="sr-only"
                  />
                  <span aria-hidden="true">{SUGGESTION_KINDS[k].emoji}</span>
                  {SUGGESTION_KINDS[k].label}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="mt-6 block">
            <span className="sr-only">Your note</span>
            <textarea
              name="message"
              required
              rows={6}
              maxLength={MAX_SUGGESTION_LENGTH}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={SUGGESTION_KINDS[kind].placeholder}
              className="notecard"
            />
          </label>
          <p className="mt-2 text-right text-xs text-ink-soft">
            {message.length}/{MAX_SUGGESTION_LENGTH}
          </p>

          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <input
              name="name"
              maxLength={80}
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="field"
            />
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email, if you want a reply"
              className="field"
            />
          </div>

          {state.error && (
            <p className="mt-4 border-2 border-pink bg-pink/10 px-3 py-2 text-sm font-medium">
              {state.error}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="submit" disabled={pending} className="btn text-lg">
              {pending ? "Munching…" : "Drop it in the box ↓"}
            </button>
            <span className="text-sm text-ink-soft">
              Anonymous is fine too.
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
