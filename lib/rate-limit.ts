/**
 * 服务端兜底限流。客户端额度可被清 localStorage 绕过，
 * 这里按 IP 再拦一层，防止脚本刷爆上游账单。
 *
 * 注意：serverless 实例内存不共享，只能挡住单实例内的高频请求，
 * 要做强一致限流需换 Redis / Upstash。
 */

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 20;
const MAX_TRACKED_IPS = 10_000;

const hits = new Map<string, number[]>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
}

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    const retryAfterSec = Math.ceil((WINDOW_MS - (now - recent[0])) / 1000);
    hits.set(ip, recent);
    return { allowed: false, remaining: 0, retryAfterSec };
  }

  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > MAX_TRACKED_IPS) evictStale(now);

  return { allowed: true, remaining: MAX_PER_WINDOW - recent.length, retryAfterSec: 0 };
}

function evictStale(now: number) {
  for (const [ip, times] of hits) {
    if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(ip);
  }
}

export function clientIpFrom(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
