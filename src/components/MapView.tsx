"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const pinIcon = L.divIcon({
  className: "unplugged-pin",
  html: `<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg"><path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 13 23.5 14 24.4a1.5 1.5 0 0 0 2 0C17 38.5 30 25.5 30 15 30 6.7 23.3 0 15 0z" fill="#c65d3b"/><circle cx="15" cy="15" r="5.5" fill="#fffdf9"/></svg>`,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

export default function MapView({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div className="overflow-hidden border-2 border-ink">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: 220, width: "100%" }}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]} icon={pinIcon} />
      </MapContainer>
    </div>
  );
}
