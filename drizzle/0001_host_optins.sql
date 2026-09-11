ALTER TABLE "events" ADD COLUMN "show_host_name" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "allow_contact" boolean DEFAULT false NOT NULL;