import {
  pgTable,
  text,
  integer,
  timestamp,
  doublePrecision,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

// RSVP is a commitment: you're in, or you're not. No "maybe".
export const rsvpStatus = pgEnum("rsvp_status", ["going", "cant"]);

export const events = pgTable("events", {
  id: text("id").primaryKey(), // public slug (short, unguessable-ish)
  // SHA-256 hex of the host's secret manage token; the token itself only lives
  // in the host's email. Rows from before hashing hold the 32-char plaintext
  // until drizzle/manual/hash-manage-tokens.sql runs.
  editTokenHash: text("edit_token").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  eventDate: text("event_date").notNull(), // YYYY-MM-DD (local to `timezone`)
  startTime: text("start_time"), // HH:mm (local to `timezone`)
  timezone: text("timezone").notNull(), // IANA tz, e.g. America/Los_Angeles
  locationName: text("location_name"), // e.g. "Dolores Park"
  address: text("address"), // human-readable address
  lat: doublePrecision("lat"),
  lng: doublePrecision("lng"),
  hostName: text("host_name").notNull(),
  hostEmail: text("host_email").notNull(),
  // Host opt-ins, off by default: guests see neither the name nor the email unless asked.
  showHostName: boolean("show_host_name").notNull().default(false), // "Hosted by" on the invite
  allowContact: boolean("allow_contact").notNull().default(false), // guest emails link/reply to the host
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  canceledAt: timestamp("canceled_at", { withTimezone: true }),
});

export const rsvps = pgTable("rsvps", {
  id: text("id").primaryKey(),
  eventId: text("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  status: rsvpStatus("status").notNull(),
  partySize: integer("party_size").notNull().default(1), // includes the guest (+1s allowed)
  note: text("note"),
  // SHA-256 hex of the guest's private "change your reply" token (emailed to them).
  editTokenHash: text("edit_token_hash").unique(),
  linkSentAt: timestamp("link_sent_at", { withTimezone: true }), // throttles re-sending that link
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Per-client request counters for rate limiting. Keys hold a SHA-256 of the
// client IP (never the IP itself), and rows are deleted once their window ends.
export const rateLimits = pgTable("rate_limits", {
  key: text("key").primaryKey(), // "<action>:<sha256 of client IP>"
  count: integer("count").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type Rsvp = typeof rsvps.$inferSelect;
export type NewRsvp = typeof rsvps.$inferInsert;
