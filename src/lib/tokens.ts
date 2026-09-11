import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Secret link tokens (host manage links, guest change-your-reply links) are
 * stored as SHA-256 hex, so a database leak doesn't hand out working links.
 * The tokens are 32 random characters, so a plain fast hash is enough — there's
 * nothing to brute-force the way there would be with a human password.
 */
export function hashToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

/**
 * Constant-time check of a presented token against what's stored.
 *
 * Transitional: host tokens created before hashing are still 32-char plaintext
 * until drizzle/manual/hash-manage-tokens.sql runs. Hashes are always 64 chars,
 * so the length tells the two apart. Remove the plaintext branch after the
 * backfill has run in production.
 */
export function tokenMatches(presented: string, stored: string): boolean {
  const candidate = stored.length === 64 ? hashToken(presented) : presented;
  const a = Buffer.from(candidate);
  const b = Buffer.from(stored);
  return a.length === b.length && timingSafeEqual(a, b);
}
