"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { submitVenueSuggestion, type FormState } from "@/app/actions";
import { MAX_SUGGESTION_LENGTH } from "@/lib/suggestions";

type Option = { id: string; name: string };

export default function VenueSuggestionForm({
  venues,
  initialVenueId,
}: {
  venues: Option[];
  initialVenueId: string | null;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    submitVenueSuggestion,
    {}
  );
  // Controlled, so a long note survives an error response.
  const [kind, setKind] = useState<"new" | "edit">(initialVenueId ? "edit" : "new");
  const [venueId, setVenueId] = useState(initialVenueId ?? "");
  const [venueName, setVenueName] = useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (state.ok) {
    return (
      <div aria-live="polite">
        <p className="font-display text-xl">
          Thanks{state.name ? `, ${state.name}` : ""}. Got it.
        </p>
        <p className="mt-2 text-ink-soft">
          A maintainer will check it before anything changes on the site.
          {email && " If there's a question, we'll write back."}
        </p>
        <Link href="/find-a-venue" className="btn btn-sm mt-4">
          Back to venues
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* Honeypot: hidden from humans, catches bots that fill every field. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <fieldset>
        <legend className="mb-2 text-sm font-bold">What are you suggesting?</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {(
            [
              ["new", "A new venue"],
              ["edit", "An edit to a venue"],
            ] as const
          ).map(([value, label]) => (
            <label key={value} className="flex items-center gap-2">
              <input
                type="radio"
                name="kind"
                value={value}
                checked={kind === value}
                onChange={() => setKind(value)}
                className="h-4 w-4 accent-blue"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {kind === "edit" ? (
        <div>
          <label htmlFor="venueId" className="mb-1 block text-sm font-bold">
            Venue
          </label>
          <select
            id="venueId"
            name="venueId"
            required
            value={venueId}
            onChange={(e) => setVenueId(e.target.value)}
            className="field"
          >
            <option value="">Pick a venue…</option>
            {venues.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="venueName" className="mb-1 block text-sm font-bold">
              Venue name
            </label>
            <input
              id="venueName"
              name="venueName"
              required
              maxLength={120}
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              className="field"
            />
          </div>
          <div>
            <label htmlFor="address" className="mb-1 block text-sm font-bold">
              Street address or cross streets
            </label>
            <input
              id="address"
              name="address"
              maxLength={200}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="field"
            />
          </div>
        </div>
      )}

      <div>
        <label htmlFor="details" className="mb-1 block text-sm font-bold">
          {kind === "edit" ? "What should change?" : "What should hosts know?"}
        </label>
        <textarea
          id="details"
          name="details"
          required
          rows={6}
          maxLength={MAX_SUGGESTION_LENGTH}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder={
            kind === "edit"
              ? "e.g. Capacity is about 40 seated; book by emailing the events team 3 weeks ahead."
              : "What kind of place it is, how many people fit, cost, how to book, what events have worked there."
          }
          className="field"
        />
        <p className="mt-1 text-xs text-ink-soft">
          Public places only. Please don&apos;t send a private home, or an
          address someone shared with you just for an RSVP.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-bold">
            Your name <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <input
            id="name"
            name="name"
            maxLength={80}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="field"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-bold">
            Email <span className="font-normal text-ink-soft">(if you want a reply)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field"
          />
        </div>
      </div>

      {state.error && (
        <p className="border-2 border-pink bg-pink/10 px-3 py-2 text-sm font-medium" role="alert">
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn">
        {pending ? "Sending…" : "Send suggestion"}
      </button>
    </form>
  );
}
