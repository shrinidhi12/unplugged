"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MAP_STYLE } from "@/lib/map";
import { kindColor, markerSize, type VenueSummary } from "@/lib/venue-filters";

type Props = {
  venues: VenueSummary[];
  visible: Set<string>;
  selectedId: string | null;
  onSelect: (id: string) => void;
};

/** All venues as round, focusable markers: color = kind, size = Off Tech use. */
export default function VenueMap({ venues, visible, selectedId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef(new Map<string, HTMLButtonElement>());
  const onSelectRef = useRef(onSelect);
  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  // Build the map and markers once.
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    const bounds = new maplibregl.LngLatBounds();
    venues.forEach((v) => bounds.extend([v.lng, v.lat]));
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      bounds,
      fitBoundsOptions: { padding: 40 },
      attributionControl: { compact: true },
      cooperativeGestures: true,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    // Biggest first, so small markers sit on top and stay clickable.
    const markers = markersRef.current;
    [...venues]
      .sort((a, b) => b.listings - a.listings)
      .forEach((v) => {
        const size = markerSize(v.listings);
        const el = document.createElement("button");
        el.type = "button";
        el.className = "venue-marker";
        el.style.width = el.style.height = `${size}px`;
        el.style.background = kindColor(v.type);
        el.setAttribute(
          "aria-label",
          `${v.name}, ${v.type}${v.listings ? `, ${v.listings} Off Tech listings` : ""}`
        );
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onSelectRef.current(v.id);
        });
        new maplibregl.Marker({ element: el }).setLngLat([v.lng, v.lat]).addTo(map);
        markers.set(v.id, el);
      });

    mapRef.current = map;
    return () => {
      map.remove();
      markers.clear();
      mapRef.current = null;
    };
    // Venues are static for the life of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hide filtered-out markers (which also drops them from the tab order).
  useEffect(() => {
    markersRef.current.forEach((el, id) => {
      el.style.display = visible.has(id) ? "" : "none";
    });
  }, [visible]);

  // Highlight and pan to the selected venue.
  useEffect(() => {
    markersRef.current.forEach((el, id) => {
      const on = id === selectedId;
      el.classList.toggle("is-selected", on);
      el.setAttribute("aria-pressed", String(on));
    });
    const v = venues.find((x) => x.id === selectedId);
    const map = mapRef.current;
    if (v && map && !map.getBounds().contains([v.lng, v.lat])) {
      map.easeTo({ center: [v.lng, v.lat], duration: 400 });
    }
  }, [selectedId, venues]);

  return <div ref={containerRef} className="h-full w-full" />;
}
