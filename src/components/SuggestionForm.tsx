"use client";

import { useActionState, useState } from "react";
import { submitSuggestion, type FormState } from "@/app/actions";
import { MAX_SUGGESTION_LENGTH } from "@/lib/suggestions";

export default function SuggestionForm() {
  // Bumping the key remounts an empty form for another note.
  const [round, setRound] = useState(0);
  return <Note key={round} onAnother={() => setRound((r) => r + 1)} />;
}

function Note({ onAnother }: { onAnother: () => void }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    submitSuggestion,
    {}
  );
  // Controlled, so a long note survives an error response.
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (state.ok) {
    return (
      <div aria-live="polite">
        <p className="font-display text-xl">
          Got it, thanks{state.name ? `, ${state.name}` : ""}.
        </p>
        <p className="mt-2 text-ink-soft">
          Your note is on its way to me.
          {email && " If it needs a reply, I'll write back."}
        </p>
        <button
          type="button"
          onClick={onAnother}
          className="mt-4 text-sm text-ink-soft underline underline-offset-4 hover:text-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      {/* Honeypot: hidden from humans, catches bots that fill every field. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <textarea
        name="message"
        required
        rows={6}
        maxLength={MAX_SUGGESTION_LENGTH}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="What's on your mind?"
        aria-label="Your note"
        className="field"
      />
      <div className="grid gap-3 sm:grid-cols-2">
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
        <p className="border-2 border-pink bg-pink/10 px-3 py-2 text-sm font-medium">
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn">
        {pending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
