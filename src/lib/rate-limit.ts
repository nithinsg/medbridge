/**
 * Best-effort in-memory sliding window per key (per server instance).
 * Stops casual abuse; put Vercel Firewall / Upstash in front for hard limits.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit = 6, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) {
    hits.set(key, arr);
    return false;
  }
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) hits.clear();
  return true;
}
