"use client";

import { useActionState, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { createEvent, type FormState } from "@/app/actions";

const MapPicker = dynamic(() => import("./MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] animate-pulse border-2 border-ink bg-paper-2" />
  ),
});

const label = "block text-sm font-semibold mb-1";

export default function CreateForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    createEvent,
    {}
  );
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState("");
  const [tz, setTz] = useState("America/Los_Angeles");

  useEffect(() => {
    try {
      setTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch {
      /* keep default */
    }
  }, []);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="timezone" value={tz} />
      <input type="hidden" name="lat" value={pin?.lat ?? ""} />
      <input type="hidden" name="lng" value={pin?.lng ?? ""} />

      <div>
        <label className={label} htmlFor="title">
          What&apos;s the plan?
        </label>
        <input
          id="title"
          name="title"
          required
          placeholder="Rooftop dinner, board game night, morning hike…"
          className="field"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label} htmlFor="eventDate">
            Date
          </label>
          <input id="eventDate" name="eventDate" type="date" required className="field" />
        </div>
        <div>
          <label className={label} htmlFor="startTime">
            Time
          </label>
          <input id="startTime" name="startTime" type="time" className="field" />
        </div>
      </div>
      <p className="-mt-3 text-xs text-ink-soft">Times shown in {tz}.</p>

      <div>
        <label className={label} htmlFor="description">
          A line about it{" "}
          <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="What to bring, the vibe, the door code…"
          className="field"
        />
      </div>

      <div>
        <label className={label} htmlFor="locationName">
          Place
        </label>
        <input
          id="locationName"
          name="locationName"
          required
          placeholder="e.g. Dolores Park, or my place"
          className="field"
        />
      </div>

      <div>
        <label className={label}>Pin it on the map</label>
        <MapPicker value={pin} onChange={setPin} onAddress={setAddress} />
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address (guests get an 'Open in Google Maps' link)"
          className="field mt-2"
        />
      </div>

      <hr className="border-t-2 border-ink" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="hostName">
            Your name
          </label>
          <input id="hostName" name="hostName" required className="field" />
        </div>
        <div>
          <label className={label} htmlFor="hostEmail">
            Your email
          </label>
          <input
            id="hostEmail"
            name="hostEmail"
            type="email"
            required
            className="field"
          />
        </div>
      </div>
      <p className="-mt-3 text-xs text-ink-soft">
        We&apos;ll email you a private link to manage the event. No account, no
        password.
      </p>

      {state.error && (
        <p className="border-2 border-pink bg-pink/10 px-3 py-2 text-sm font-medium">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={pending} className="btn text-lg">
          {pending ? "Creating…" : "Create event"}
        </button>
        <Link href="/" className="text-sm text-ink-soft hover:text-ink">
          Cancel
        </Link>
      </div>
    </form>
  );
}
