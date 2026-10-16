// Simple in-memory limits for /api/ask, so one visitor cannot use up the free Gemini quota for everyone.
// Free tier is 15 requests/min and 500/day. On Vercel each server instance keeps its own counters, so this is a
// best-effort guard, not an exact one. A shared store (KV) would make it exact, but we do not add that until asked.

const PER_IP_LIMIT = 5; // questions per IP per window
const PER_IP_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const DAILY_CAP = 400; // below the 500/day quota so some room is left for testing

const hits = new Map<string, number[]>(); // ip -> timestamps of recent questions
let day = new Date().toISOString().slice(0, 10);
let today = 0;

export type LimitResult = { ok: true } | { ok: false; error: string };

// Counts one question for this visitor, or says why it is refused. Our helper.
export function takeSlot(ip: string): LimitResult {
  const now = Date.now();
  const d = new Date(now).toISOString().slice(0, 10);
  if (d !== day) { day = d; today = 0; } // new UTC day

  if (today >= DAILY_CAP) {
    return { ok: false, error: "The AI assistant reached its daily limit for all visitors. Try again tomorrow. Docs pages and search still work." };
  }
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < PER_IP_WINDOW_MS);
  if (recent.length >= PER_IP_LIMIT) {
    const waitMin = Math.ceil((PER_IP_WINDOW_MS - (now - recent[0])) / 60000);
    return { ok: false, error: `You asked ${PER_IP_LIMIT} questions in the last 10 minutes. Wait about ${waitMin} minute(s), then ask again.` };
  }
  recent.push(now);
  hits.set(ip, recent);
  today++;
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= PER_IP_WINDOW_MS)) hits.delete(k); // keep memory small
  return { ok: true };
}
