"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-[220px] animate-pulse rounded-xl border border-line bg-paper-2" />
  ),
});

export default function MapViewClient({ lat, lng }: { lat: number; lng: number }) {
  return <MapView lat={lat} lng={lng} />;
}
