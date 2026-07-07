/**
 * Build a keyless, free "Open in Google Maps" link. No API key, no billing —
 * just the public Maps URL scheme. Prefers exact coordinates, falls back to
 * the typed address.
 */
export function googleMapsLink(opts: {
  lat?: number | null;
  lng?: number | null;
  address?: string | null;
  locationName?: string | null;
}): string | null {
  const hasCoords =
    typeof opts.lat === "number" && typeof opts.lng === "number";
  const query = hasCoords
    ? `${opts.lat},${opts.lng}`
    : opts.address || opts.locationName || "";
  if (!query) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query
  )}`;
}
