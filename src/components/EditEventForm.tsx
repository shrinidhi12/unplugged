"use client";

import { useActionState, useState } from "react";
import dynamic from "next/dynamic";
import { updateEvent, type FormState } from "@/app/actions";
import type { Event } from "@/db/schema";

const MapPicker = dynamic(() => import("./MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] animate-pulse border-2 border-ink bg-paper-2" />
  ),
});

const label = "block text-sm font-semibold mb-1";

export default function EditEventForm({
  event,
  token,
}: {
  event: Event;
  token: string;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    updateEvent,
    {}
  );
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(
    typeof event.lat === "number" && typeof event.lng === "number"
      ? { lat: event.lat, lng: event.lng }
      : null
  );
  const [address, setAddress] = useState(event.address ?? "");
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm font-semibold text-blue hover:text-blue-dark"
      >
        Edit event details
      </button>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="slug" value={event.id} />
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="lat" value={pin?.lat ?? ""} />
      <input type="hidden" name="lng" value={pin?.lng ?? ""} />

      <div>
        <label className={label} htmlFor="e-title">
          Title
        </label>
        <input
          id="e-title"
          name="title"
          defaultValue={event.title}
          required
          className="field"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={label} htmlFor="e-date">
            Date
          </label>
          <input
            id="e-date"
            name="eventDate"
            type="date"
            defaultValue={event.eventDate}
            required
            className="field"
          />
        </div>
        <div>
          <label className={label} htmlFor="e-time">
            Time
          </label>
          <input
            id="e-time"
            name="startTime"
            type="time"
            defaultValue={event.startTime ?? ""}
            className="field"
          />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="e-desc">
          Description
        </label>
        <textarea
          id="e-desc"
          name="description"
          rows={3}
          defaultValue={event.description ?? ""}
          className="field"
        />
      </div>

      <div>
        <label className={label} htmlFor="e-place">
          Place
        </label>
        <input
          id="e-place"
          name="locationName"
          defaultValue={event.locationName ?? ""}
          required
          className="field"
        />
      </div>

      <div>
        <label className={label}>Pin</label>
        <MapPicker value={pin} onChange={setPin} onAddress={setAddress} />
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="field mt-2"
        />
      </div>

      {state.error && (
        <p className="border-2 border-pink bg-pink/10 px-3 py-2 text-sm font-medium">
          {state.error}
        </p>
      )}
      {state.ok && (
        <p className="border-2 border-blue bg-blue/10 px-3 py-2 text-sm font-medium">
          Saved.
        </p>
      )}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={pending} className="btn">
          {pending ? "Saving…" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-ink-soft hover:text-ink"
        >
          Close
        </button>
      </div>
    </form>
  );
}
