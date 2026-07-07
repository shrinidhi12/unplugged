import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: NeonHttpDatabase<typeof schema> | null = null;

/**
 * Lazily construct the Neon-backed Drizzle client so that pages which don't
 * touch the database (e.g. the landing page) still render when DATABASE_URL
 * isn't configured yet.
 */
export function getDb(): NeonHttpDatabase<typeof schema> {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Add it to .env.local (see .env.example)."
      );
    }
    _db = drizzle(neon(url), { schema });
  }
  return _db;
}

export { schema };
