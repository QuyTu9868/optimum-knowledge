import { ask } from "@/lib/ask";
import { takeSlot } from "@/lib/limit";

export const maxDuration = 30; // seconds; Vercel free plan allows up to 60, the default is 10 and Gemini can take 5-10

const MAX_QUESTION = 500; // characters; keeps one request inside the token budget

// POST /api/ask { question } -> { html } or { error }
export async function POST(req: Request) {
  const { question } = (await req.json().catch(() => ({}))) as { question?: unknown };
  if (typeof question !== "string" || !question.trim()) {
    return Response.json({ error: "Type a question first." }, { status: 400 });
  }
  if (question.length > MAX_QUESTION) {
    return Response.json({ error: `Keep the question under ${MAX_QUESTION} characters.` }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local"; // Vercel sets x-forwarded-for
  const slot = takeSlot(ip);
  if (!slot.ok) return Response.json({ error: slot.error }, { status: 429 });

  const result = await ask(question.trim());
  return result.ok
    ? Response.json({ html: result.html, usage: result.usage })
    : Response.json({ error: result.error }, { status: result.status });
}
