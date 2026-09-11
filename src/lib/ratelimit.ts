import { createHash } from "node:crypto";
import { lte, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { getDb } from "@/db";
import { rateLimits } from "@/db/schema";

/**
 * The client IP as seen by Netlify's edge. Only x-nf-client-connection-ip is
 * set by Netlify itself; X-Forwarded-For can be sent by the client, so trusting
 * it would let anyone dodge per-IP limits with a made-up value. Outside Netlify
 * (local dev) every request shares the "unknown" bucket.
 */
export async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-nf-client-connection-ip") ?? "unknown";
}

/**
 * True if the action is allowed, false if the caller is over the limit.
 *
 * A fixed-window counter in Postgres: one row per (action, client) counting
 * requests until its window expires. The batch runs as one transaction, and the
 * delete goes first, so an expired row for this key is gone before the upsert
 * and its window restarts at 1.
 *
 * Keys hold a SHA-256 of the IP, never the IP itself, and expired rows are
 * deleted on every check, so an address is kept for at most one window. A hashed
 * IPv4 address can still be brute-forced; short retention is the real privacy
 * protection here, not the hash.
 *
 * Fails OPEN: if the check itself errors, the request is allowed, so a limiter
 * problem can never block legitimate hosting.
 */
export async function allow(
  action: string,
  identifier: string,
  limit: number,
  windowSeconds: number
): Promise<boolean> {
  const key = `${action}:${createHash("sha256").update(identifier).digest("hex")}`;
  const now = new Date();
  try {
    const db = getDb();
    const [, counted] = await db.batch([
      db.delete(rateLimits).where(lte(rateLimits.expiresAt, now)),
      db
        .insert(rateLimits)
        .values({
          key,
          count: 1,
          expiresAt: new Date(now.getTime() + windowSeconds * 1000),
        })
        .onConflictDoUpdate({
          target: rateLimits.key,
          set: { count: sql`${rateLimits.count} + 1` },
        })
        .returning({ count: rateLimits.count }),
    ]);
    return (counted[0]?.count ?? 0) <= limit;
  } catch (err) {
    console.error("[ratelimit] check failed, allowing:", err);
    return true;
  }
}
