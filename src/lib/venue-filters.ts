// Client-safe helpers for "Find a venue": filters, marker styling, links.
// No venue data is imported here, so the browse bundle stays small.
import type { Venue } from "./venues";

/** The slice of a venue the map + list need, so the client bundle stays small. */
export type VenueSummary = Pick<
  Venue,
  | "id"
  | "name"
  | "type"
  | "neighborhood"
  | "borough"
  | "lat"
  | "lng"
  | "indoorOutdoor"
  | "capacityStanding"
  | "capacitySeated"
  | "cost"
> & { listings: number };

export const UNKNOWN = "Unknown";

/** Turn an option label into a short URL value: "Bar / cafe / restaurant" -> "bar-cafe-restaurant". */
export function optionSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const CAPACITY_BUCKETS = [
  { label: "Under 20", min: 1, max: 19 },
  { label: "20–50", min: 20, max: 50 },
  { label: "50–100", min: 50, max: 100 },
  { label: "100+", min: 100, max: Infinity },
] as const;

export type Filter = {
  /** URL query key */
  key: string;
  label: string;
  options: string[];
  /** Optional <optgroup>s for long lists, e.g. neighborhoods by borough. */
  groups?: { label: string; options: string[] }[];
  /** The venue's value(s) for this filter. An empty list means unknown. */
  values: (v: VenueSummary) => string[];
};

function one(value: string | null): string[] {
  return value && value !== UNKNOWN ? [value] : [];
}

function capacities(v: VenueSummary): string[] {
  const nums = [v.capacityStanding, v.capacitySeated].filter(
    (n): n is number => typeof n === "number"
  );
  return CAPACITY_BUCKETS.filter((b) =>
    nums.some((n) => n >= b.min && n <= b.max)
  ).map((b) => b.label);
}

// "Free / public?" groups the sheet's Cost values into a yes/no answer.
const FREE_COSTS = ["Free", "Donation"];

/**
 * Host-facing filters. Venue type, indoor/outdoor and cost values come from
 * the Field guide (via the sync); neighborhoods come from the venues
 * themselves, grouped by borough. Every filter also offers "Unknown", so
 * venues missing a detail stay findable.
 */
export function buildFilters(
  all: VenueSummary[],
  o: Record<string, string[]>
): Filter[] {
  const groups = o.borough
    .map((borough) => ({
      label: borough,
      options: [
        ...new Set(
          all
            .filter((v) => v.borough === borough && v.neighborhood)
            .map((v) => v.neighborhood!)
        ),
      ].sort(),
    }))
    .filter((g) => g.options.length);
  return [
    { key: "type", label: "Venue type", options: o.type, values: (v) => one(v.type) },
    {
      key: "area",
      label: "Neighborhood",
      options: groups.flatMap((g) => g.options),
      groups,
      values: (v) => one(v.neighborhood),
    },
    {
      key: "space",
      label: "Indoor / outdoor",
      // "Both" venues show up under Indoor and under Outdoor.
      options: ["Indoor", "Outdoor"],
      values: (v) =>
        v.indoorOutdoor === "Both" ? ["Indoor", "Outdoor"] : one(v.indoorOutdoor),
    },
    { key: "capacity", label: "Capacity", options: CAPACITY_BUCKETS.map((b) => b.label), values: capacities },
    {
      key: "free",
      label: "Free / public?",
      options: ["Free to use", "Costs money"],
      values: (v) =>
        !v.cost || v.cost === UNKNOWN
          ? []
          : [FREE_COSTS.includes(v.cost) ? "Free to use" : "Costs money"],
    },
  ];
}

/** Does the venue pass this filter's selected option (a label or "Unknown")? */
export function matches(f: Filter, v: VenueSummary, selected: string): boolean {
  const vals = f.values(v);
  if (selected === UNKNOWN) return vals.length === 0;
  return vals.includes(selected);
}

export function osmLink(v: Pick<Venue, "lat" | "lng">): string {
  return `https://www.openstreetmap.org/?mlat=${v.lat}&mlon=${v.lng}#map=17/${v.lat}/${v.lng}`;
}

export function osmDirections(v: Pick<Venue, "lat" | "lng">): string {
  return `https://www.openstreetmap.org/directions?to=${v.lat}%2C${v.lng}`;
}

export function instagramUrl(handle: string): string {
  return /^https?:\/\//.test(handle)
    ? handle
    : `https://www.instagram.com/${handle.replace(/^@/, "")}/`;
}

// ---- Marker colors -----------------------------------------------------------

/**
 * Venue types share colors by broad kind, so the map legend stays readable.
 * Colors sit alongside the riso blue/pink and hold up on the light basemap.
 */
export const KINDS = [
  { label: "Parks & plazas", color: "#2f8f4e", types: ["Park / public space", "Privately owned public space (POPS)"] },
  { label: "Libraries, bookstores & universities", color: "#2637c9", types: ["Library", "Bookstore", "University"] },
  { label: "Bars, cafes & clubs", color: "#ff4f8b", types: ["Bar / cafe / restaurant", "Club / event venue"] },
  { label: "Arts, community & making", color: "#e07b00", types: ["Arts / community space", "Gallery / museum", "Makerspace", "Community tech space", "Radio station / studio"] },
  { label: "Churches & meeting houses", color: "#7a3fb8", types: ["Church / meeting house"] },
  { label: "Other", color: "#565566", types: ["Other"] },
] as const;

export function kindColor(type: string): string {
  return (KINDS.find((k) => (k.types as readonly string[]).includes(type)) ?? KINDS[KINDS.length - 1]).color;
}

/** Marker diameter in px: sqrt of Off Tech listings, small default when none. */
export function markerSize(listings: number): number {
  if (!listings) return 12;
  return Math.round(Math.min(40, 12 + Math.sqrt(listings) * 2.6));
}
