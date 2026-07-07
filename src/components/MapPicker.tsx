"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const pinIcon = L.divIcon({
  className: "unplugged-pin",
  html: `<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg"><path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 13 23.5 14 24.4a1.5 1.5 0 0 0 2 0C17 38.5 30 25.5 30 15 30 6.7 23.3 0 15 0z" fill="#c65d3b"/><circle cx="15" cy="15" r="5.5" fill="#fffdf9"/></svg>`,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

type LatLng = { lat: number; lng: number };

function ClickToPlace({ onPick }: { onPick: (p: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onPick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function Recenter({ center }: { center: LatLng }) {
  const map = useMap();
  map.setView([center.lat, center.lng], map.getZoom(), { animate: true });
  return null;
}

export default function MapPicker({
  value,
  onChange,
  onAddress,
}: {
  value: LatLng | null;
  onChange: (p: LatLng) => void;
  onAddress?: (address: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const center: LatLng = value ?? { lat: 37.7749, lng: -122.4194 };

  async function search() {
    if (!query.trim()) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
          query
        )}`,
        { headers: { Accept: "application/json" } }
      );
      const data = (await res.json()) as Array<{
        lat: string;
        lon: string;
        display_name: string;
      }>;
      if (data[0]) {
        onChange({ lat: Number(data[0].lat), lng: Number(data[0].lon) });
        onAddress?.(data[0].display_name);
      }
    } catch {
      // Search is best-effort; ignore failures.
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              search();
            }
          }}
          placeholder="Search an address or place…"
          className="field flex-1 text-sm"
        />
        <button
          type="button"
          onClick={search}
          disabled={searching}
          className="btn-outline px-3 py-2 text-sm disabled:opacity-50"
        >
          {searching ? "…" : "Find"}
        </button>
      </div>
      <div className="overflow-hidden border-2 border-ink">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={13}
          style={{ height: 260, width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickToPlace onPick={onChange} />
          {value && (
            <>
              <Recenter center={value} />
              <Marker
                position={[value.lat, value.lng]}
                icon={pinIcon}
                draggable
                eventHandlers={{
                  dragend: (e) => {
                    const m = e.target as L.Marker;
                    const ll = m.getLatLng();
                    onChange({ lat: ll.lat, lng: ll.lng });
                  },
                }}
              />
            </>
          )}
        </MapContainer>
      </div>
      <p className="text-xs text-ink-soft">
        Tap the map to drop a pin, or drag it to fine-tune.
      </p>
    </div>
  );
}
