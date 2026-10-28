// "Find a venue": NYC spaces for offline events. The data is prebuilt by
// `npm run venues:sync` from the collaborators' sheet; nothing is fetched at
// runtime. See tools/find-a-venue/README.md.
import data from "@/data/venues.json";
import type { VenueSummary } from "./venue-filters";

export type { VenueSummary };

export type ActivityCount = { activity: string; count: number };

export type VenueHistory = {
  listings: number;
  issues: number;
  firstIssue: string;
  latestIssue: string;
  latestEvent: string;
  topActivities: ActivityCount[];
  activities: ActivityCount[];
  signatureEvents: string[];
  topHost: string | null;
};

type Text = string | null;

export type Venue = {
  id: string;
  name: string;
  type: string;
  address: Text;
  neighborhood: Text;
  borough: Text;
  lat: number;
  lng: number;
  precision: "exact" | "approx";
  indoorOutdoor: Text;
  capacityStanding: number | null;
  capacitySeated: number | null;
  seating: Text;
  tables: Text;
  privateRoom: Text;
  weatherBackup: Text;
  noise: Text;
  amplifiedSound: Text;
  phoneFree: Text;
  cost: Text;
  costNotes: Text;
  howToBook: Text;
  permitNotes: Text;
  leadTime: Text;
  bestTimes: Text;
  food: Text;
  alcohol: Text;
  allAges: Text;
  restrooms: Text;
  stepFree: Text;
  accessibleRestroom: Text;
  accessibilityNotes: Text;
  power: Text;
  soundSystem: Text;
  projector: Text;
  transit: Text;
  website: Text;
  instagram: Text;
  bookingLink: Text;
  notes: Text;
  lastVerified: Text;
  contact?: { name?: string; role?: string; email?: string; phone?: string };
  history: VenueHistory | null;
};

type VenueData = {
  syncedAt: string;
  options: Record<string, string[]>;
  venues: Venue[];
};

const DATA = data as unknown as VenueData;

/** Allowed values from the sheet's Field guide, keyed by venue field. */
export const OPTIONS = DATA.options;

export const VENUES: Venue[] = DATA.venues;
export const SYNCED_AT = DATA.syncedAt;
export const NEWSLETTER_URL = "https://buttondown.com/nycofftech/archive/";

export function getVenue(id: string): Venue | undefined {
  return VENUES.find((v) => v.id === id);
}

// ---- Browse view -------------------------------------------------------------

export function summaries(): VenueSummary[] {
  return VENUES.map((v) => ({
    id: v.id,
    name: v.name,
    type: v.type,
    neighborhood: v.neighborhood,
    borough: v.borough,
    lat: v.lat,
    lng: v.lng,
    indoorOutdoor: v.indoorOutdoor,
    capacityStanding: v.capacityStanding,
    capacitySeated: v.capacitySeated,
    cost: v.cost,
    listings: v.history?.listings ?? 0,
  }));
}

// ---- Venue page --------------------------------------------------------------

/** True when lastVerified is more than 12 months before `now`. */
export function isStale(lastVerified: string | null, now = new Date()): boolean {
  if (!lastVerified) return false;
  const d = new Date(`${lastVerified}T00:00:00`);
  const cutoff = new Date(now);
  cutoff.setFullYear(cutoff.getFullYear() - 1);
  return d < cutoff;
}

export function capacityText(v: Pick<Venue, "capacityStanding" | "capacitySeated">): string | null {
  const parts = [
    v.capacityStanding ? `~${v.capacityStanding} standing` : null,
    v.capacitySeated ? `~${v.capacitySeated} seated` : null,
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}

