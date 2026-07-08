import { Ratelimit, type Duration } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const hasUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

// One sliding-window limiter per (action, limit, window), created lazily.
// When Upstash isn't configured the limiter is null and every check passes,
// so local dev and an un-provisioned prod still work — the same
// graceful-degradation approach the email layer uses.
const limiters = new Map<string, Ratelimit>();

function limiter(name: string, limit: number, window: Duration): Ratelimit | null {
  if (!hasUpstash) return null;
  const key = `${name}:${limit}:${window}`;
  let l = limiters.get(key);
  if (!l) {
    l = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(limit, window),
      prefix: `unplugg:${name}`,
      analytics: false,
    });
    limiters.set(key, l);
  }
  return l;
}

/** Best-effort client IP from the edge/proxy headers Netlify sets. */
export async function clientIp(): Promise<string> {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return (
    h.get("x-nf-client-connection-ip") ??
    h.get("x-real-ip") ??
    "unknown"
  );
}

/**
 * True if the action is allowed, false if the caller is over the limit.
 * Fails OPEN — if Upstash is unconfigured or the check throws, we allow the
 * request so a rate-limiter outage can never block legitimate hosting.
 */
export async function allow(
  name: string,
  identifier: string,
  limit: number,
  window: Duration
): Promise<boolean> {
  const l = limiter(name, limit, window);
  if (!l) return true;
  try {
    const { success } = await l.limit(identifier);
    return success;
  } catch (err) {
    console.error("[ratelimit] check failed, allowing:", err);
    return true;
  }
}
