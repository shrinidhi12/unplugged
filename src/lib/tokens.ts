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

/** Constant-time check of a presented token against its stored SHA-256 hash. */
export function tokenMatches(presented: string, storedHash: string): boolean {
  const a = Buffer.from(hashToken(presented));
  const b = Buffer.from(storedHash);
  return a.length === b.length && timingSafeEqual(a, b);
}
