ALTER TABLE "rsvps" ADD COLUMN "edit_token_hash" text;--> statement-breakpoint
ALTER TABLE "rsvps" ADD COLUMN "link_sent_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_edit_token_hash_unique" UNIQUE("edit_token_hash");