/** 免登录站点的额度控制：以设备为单位记在 localStorage */

export const DAILY_LIMIT = 30;
export const COOLDOWN_MS = 5 * 60 * 1000;

const KEY = "aishorts-quota";

interface QuotaState {
  /** 本地日期 YYYY-MM-DD，跨天自动重置 */
  date: string;
  used: number;
  lastAt: number;
}

export interface QuotaSnapshot {
  used: number;
  remaining: number;
  limit: number;
  /** 冷却剩余毫秒，0 表示可立即生成 */
  cooldownMs: number;
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function read(): QuotaState {
  const fresh: QuotaState = { date: today(), used: 0, lastAt: 0 };
  if (typeof window === "undefined") return fresh;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fresh;
    const parsed = JSON.parse(raw) as QuotaState;
    return parsed.date === today() ? parsed : fresh;
  } catch {
    return fresh;
  }
}

function write(state: QuotaState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* 隐私模式下写入会失败，忽略即可 */
  }
}

export function getQuota(): QuotaSnapshot {
  const s = read();
  const elapsed = Date.now() - s.lastAt;
  return {
    used: s.used,
    remaining: Math.max(0, DAILY_LIMIT - s.used),
    limit: DAILY_LIMIT,
    cooldownMs: s.lastAt === 0 || elapsed >= COOLDOWN_MS ? 0 : COOLDOWN_MS - elapsed,
  };
}

export function consumeQuota(): QuotaSnapshot {
  const s = read();
  write({ date: today(), used: s.used + 1, lastAt: Date.now() });
  return getQuota();
}

export function formatCooldown(ms: number) {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const sec = total % 60;
  return m > 0 ? `${m}分${String(sec).padStart(2, "0")}秒` : `${sec}秒`;
}
