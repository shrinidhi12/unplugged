CREATE TYPE "public"."rsvp_status" AS ENUM('going', 'cant');--> statement-breakpoint
CREATE TABLE "events" (
	"id" text PRIMARY KEY NOT NULL,
	"edit_token" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"event_date" text NOT NULL,
	"start_time" text,
	"timezone" text NOT NULL,
	"location_name" text,
	"address" text,
	"lat" double precision,
	"lng" double precision,
	"host_name" text NOT NULL,
	"host_email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"canceled_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "rsvps" (
	"id" text PRIMARY KEY NOT NULL,
	"event_id" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"status" "rsvp_status" NOT NULL,
	"party_size" integer DEFAULT 1 NOT NULL,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;