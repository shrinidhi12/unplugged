"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  MAP_STYLE,
  NYC_CENTER,
  CITY_ZOOM,
  PIN_ZOOM,
  makePinElement,
} from "@/lib/map";

type LatLng = { lat: number; lng: number };

export default function MapPicker({
  value,
  onChange,
  onAddress,
}: {
  value: LatLng | null;
  onChange: (p: LatLng) => void;
  onAddress?: (address: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  // Initialize the map once.
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: value ? [value.lng, value.lat] : [NYC_CENTER.lng, NYC_CENTER.lat],
      zoom: value ? PIN_ZOOM : CITY_ZOOM,
      attributionControl: { compact: true },
    });
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right"
    );
    map.on("click", (e) => {
      onChangeRef.current({ lat: e.lngLat.lat, lng: e.lngLat.lng });
    });
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the marker in sync with `value`.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!value) {
      markerRef.current?.remove();
      markerRef.current = null;
      return;
    }

    if (!markerRef.current) {
      const marker = new maplibregl.Marker({
        element: makePinElement(),
        draggable: true,
        anchor: "bottom",
      })
        .setLngLat([value.lng, value.lat])
        .addTo(map);
      marker.on("dragend", () => {
        const ll = marker.getLngLat();
        onChangeRef.current({ lat: ll.lat, lng: ll.lng });
      });
      markerRef.current = marker;
    } else {
      markerRef.current.setLngLat([value.lng, value.lat]);
    }
    map.easeTo({ center: [value.lng, value.lat], duration: 400 });
  }, [value?.lat, value?.lng]);

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
        const p = { lat: Number(data[0].lat), lng: Number(data[0].lon) };
        mapRef.current?.flyTo({ center: [p.lng, p.lat], zoom: PIN_ZOOM });
        onChange(p);
        onAddress?.(data[0].display_name);
      }
    } catch {
      /* search is best-effort */
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
        <div ref={containerRef} style={{ height: 260, width: "100%" }} />
      </div>
      <p className="text-xs text-ink-soft">
        Tap the map to drop a pin, or drag it to fine-tune.
      </p>
    </div>
  );
}
