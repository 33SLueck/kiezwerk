/**
 * In-Memory Sliding Window Rate Limiter
 * Zero-dependency rate limiter for Next.js server actions and API routes.
 *
 * Limitations (documented for upgrade path):
 * - In-memory: resets on server restart, not shared across instances
 * - For production multi-instance deployments, upgrade to Redis-based limiting
 *
 * @example
 * ```ts
 * const limiter = createRateLimiter({ maxRequests: 5, windowMs: 60_000 });
 *
 * // In a server action:
 * const clientIp = headers().get('x-forwarded-for') || 'unknown';
 * const { allowed } = limiter.check(clientIp);
 * if (!allowed) return { success: false, error: 'Too many requests' };
 * ```
 */

interface RateLimitEntry {
  timestamps: number[];
}

interface RateLimiterConfig {
  /** Maximum number of requests allowed within the time window */
  maxRequests: number;
  /** Time window in milliseconds (e.g. 60_000 for 1 minute) */
  windowMs: number;
}

interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Remaining requests in the current window */
  remaining: number;
  /** Milliseconds until the client can retry (only set when blocked) */
  retryAfterMs?: number;
}

export const createRateLimiter = (config: RateLimiterConfig) => {
  const store = new Map<string, RateLimitEntry>();

  // Periodic cleanup of expired entries to prevent memory leaks
  const CLEANUP_INTERVAL_MS = Math.max(config.windowMs * 2, 60_000);
  let lastCleanup = Date.now();

  const cleanup = () => {
    const now = Date.now();
    if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
    lastCleanup = now;

    const cutoff = now - config.windowMs;
    for (const [key, entry] of store.entries()) {
      entry.timestamps = entry.timestamps.filter((ts) => ts > cutoff);
      if (entry.timestamps.length === 0) {
        store.delete(key);
      }
    }
  };

  const check = (identifier: string): RateLimitResult => {
    cleanup();

    const now = Date.now();
    const cutoff = now - config.windowMs;

    let entry = store.get(identifier);
    if (!entry) {
      entry = { timestamps: [] };
      store.set(identifier, entry);
    }

    // Remove timestamps outside the current window
    entry.timestamps = entry.timestamps.filter((ts) => ts > cutoff);

    if (entry.timestamps.length >= config.maxRequests) {
      // Blocked: calculate when the oldest request in the window expires
      const oldestInWindow = entry.timestamps[0];
      const retryAfterMs = oldestInWindow + config.windowMs - now;

      return {
        allowed: false,
        remaining: 0,
        retryAfterMs: Math.max(retryAfterMs, 0),
      };
    }

    // Allowed: record this request
    entry.timestamps.push(now);

    return {
      allowed: true,
      remaining: config.maxRequests - entry.timestamps.length,
    };
  };

  const reset = (identifier: string): void => {
    store.delete(identifier);
  };

  return { check, reset };
};
