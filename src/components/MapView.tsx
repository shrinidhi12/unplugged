"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MAP_STYLE, makePinElement } from "@/lib/map";

export default function MapView({ lat, lng }: { lat: number; lng: number }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: [lng, lat],
      zoom: 14,
      interactive: false,
      attributionControl: { compact: true },
    });
    new maplibregl.Marker({ element: makePinElement(), anchor: "bottom" })
      .setLngLat([lng, lat])
      .addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng]);

  return (
    <div className="overflow-hidden border-2 border-ink">
      <div ref={containerRef} style={{ height: 220, width: "100%" }} />
    </div>
  );
}
