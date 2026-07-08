// Keyless, free vector basemap (OpenFreeMap — open data, self-hostable later).
// "liberty" is the full-color style: blue water, green parks, subtle roads.
export const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

// Default view: NYC centroid, zoomed to show all five boroughs.
export const NYC_CENTER = { lng: -73.95, lat: 40.7 };
export const CITY_ZOOM = 10;
export const PIN_ZOOM = 15;

const PIN_SVG = `<svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg"><path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 13 23.5 14 24.4a1.5 1.5 0 0 0 2 0C17 38.5 30 25.5 30 15 30 6.7 23.3 0 15 0z" fill="#2637c9"/><circle cx="15" cy="15" r="5.5" fill="#fffdf9"/></svg>`;

/** Build the DOM element MapLibre uses for a custom marker. Client-only. */
export function makePinElement(): HTMLDivElement {
  const el = document.createElement("div");
  el.innerHTML = PIN_SVG;
  el.style.width = "30px";
  el.style.height = "40px";
  el.style.filter = "drop-shadow(0 2px 2px rgba(0,0,0,0.25))";
  return el;
}
