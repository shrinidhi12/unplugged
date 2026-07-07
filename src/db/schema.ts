import {
  pgTable,
  text,
  integer,
  timestamp,
  doublePrecision,
  pgEnum,
} from "drizzle-orm/pg-core";

// RSVP is a commitment: you're in, or you're not. No "maybe".
export const rsvpStatus = pgEnum("rsvp_status", ["going", "cant"]);

export const events = pgTable("events", {
  id: text("id").primaryKey(), // public slug (short, unguessable-ish)
  editToken: text("edit_token").notNull(), // secret host manage token
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
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type Rsvp = typeof rsvps.$inferSelect;
export type NewRsvp = typeof rsvps.$inferInsert;
