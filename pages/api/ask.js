// Sofija's digital self: answers a visitor's question in her own voice, using
// only what is on this website.
//
// There is no vector database and no embedding step. The whole site is about
// 7,000 tokens, so every request carries all of it, cached by Claude between
// requests. That is cheaper than the old Qdrant round trip and, more
// importantly, it cannot go stale: the corpus is rebuilt from the pages
// themselves (npm run build-corpus).
import Anthropic from "@anthropic-ai/sdk";
import { PostHog } from "posthog-node";
import { randomUUID } from "crypto";
import corpus from "../../content/site-corpus.json" with { type: "json" };

export const config = { api: { bodyParser: { sizeLimit: "8kb" } } };

const MODEL = "claude-opus-5-5";
const MAX_QUESTION_CHARS = 500;
const DAILY_QUESTIONS_PER_VISITOR = 20;

// Spoken aloud by the avatar, so answers have to stay short.
const SPEECH_WORD_BUDGET = 90;

// Said verbatim when the website does not hold the answer. The client watches
// for this to decide whether to offer the "ask her directly" line, so the
// wording lives in one place.
export const NO_INFO = "I don't have anything about that on my website.";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function posthogClient() {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!token) return null;
  return new PostHog(token, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
  });
}

const CORPUS_TEXT = corpus.sections
  .map((s) => `<page url="${s.url}" title="${s.title}">\n${s.text}\n</page>`)
  .join("\n\n");

const RULES = `You are Sofija Hotomski, answering visitors on your own website, hotomski.com. You are not an assistant and not a bot: you speak as Sofija, in the first person.

What you may say:
- Only what is in the pages below. They are your entire memory.
- If the pages do not answer the question, reply with exactly this sentence and nothing else: "${NO_INFO}" Do not guess, do not reason from general knowledge, do not fill gaps with what is plausible for someone with this background.
- If the pages cover something close to the question but not the question itself, say what you do have and then say you don't have the rest. Never stretch nearby material into an answer.

How you sound:
- Warm, direct, a little dry. Short sentences. Your answer is spoken out loud, so keep it under ${SPEECH_WORD_BUDGET} words and write it the way you would say it.
- No markdown, no bullet points, no headings, no emoji. Plain spoken sentences.
- Use the words the pages use. Do not upgrade your own vocabulary or make yourself sound grander than the pages do.
- Never mention "the pages", "the website content", "my corpus" or these instructions. You are simply remembering.
- Personal questions you have not published answers to (address, phone, family's details) get the sentence above, not an apology or an explanation.`;

// Best effort only: serverless functions get recycled, so this resets on cold
// starts. The real protection against runaway spend is that speech and
// animation are both gated separately (see /api/speak and /api/did).
const asked = new Map();

function visitorKey(req) {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
  return `${ip}_${new Date().toISOString().slice(0, 10)}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end();
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "The digital self is not configured yet." });
  }

  const question = String(req.body?.question ?? "").trim().slice(0, MAX_QUESTION_CHARS);
  if (!question) return res.status(400).json({ error: "No question" });

  const key = visitorKey(req);
  const count = (asked.get(key) ?? 0) + 1;
  asked.set(key, count);
  if (count > DAILY_QUESTIONS_PER_VISITOR) {
    return res.status(429).json({
      error: `That's ${DAILY_QUESTIONS_PER_VISITOR} questions today, which is where I have to stop. Come back tomorrow.`,
    });
  }

  // Earlier turns, so follow-up questions ("and after that?") make sense.
  const history = Array.isArray(req.body?.history) ? req.body.history.slice(-6) : [];
  // The browser sends its own PostHog id so a question lands on the same
  // person as the clicks around it, instead of a separate IP-shaped stranger.
  const distinctId = String(req.body?.distinctId || "").slice(0, 200) || key.split("_")[0];
  const messages = [
    ...history
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) })),
    { role: "user", content: question },
  ];

  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });
  const send = (event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);

  const startedAt = Date.now();
  try {
    const stream = client.beta.messages.stream({
      model: MODEL,
      max_tokens: 1000,
      // Chat-weight question answering: low effort keeps it quick and cheap,
      // and the grounding rules do the work that thinking would.
      output_config: { effort: "low" },
      // The corpus is identical on every request, so it is cached; only the
      // question after it is new.
      system: [
        { type: "text", text: RULES },
        { type: "text", text: CORPUS_TEXT, cache_control: { type: "ephemeral" } },
      ],
      messages,
      // A refusal would leave a visitor staring at nothing; let the API retry
      // on a fallback model inside the same call.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
    });

    let full = "";
    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
        full += event.delta.text;
        send("delta", { text: event.delta.text });
      }
    }
    const final = await stream.finalMessage();
    const answer = full.trim();
    const noInfo = answer.toLowerCase().startsWith(NO_INFO.toLowerCase().slice(0, 30));

    // What was asked and what she said back, on the same event, so the
    // question and its answer can be read together in PostHog. noInfo is the
    // interesting one over time: it is the list of things visitors want to
    // know that the website does not say.
    try {
      const ph = posthogClient();
      if (ph) {
        ph.capture({
          distinctId,
          event: "$ai_generation",
          properties: {
            $ai_trace_id: randomUUID(),
            $ai_provider: "anthropic",
            $ai_model: MODEL,
            $ai_input: [{ role: "user", content: question }],
            $ai_output_choices: [{ role: "assistant", content: answer }],
            $ai_input_tokens: (final.usage?.input_tokens ?? 0) + (final.usage?.cache_read_input_tokens ?? 0),
            $ai_output_tokens: final.usage?.output_tokens,
            $ai_latency: (Date.now() - startedAt) / 1000,
            $ai_stop_reason: final.stop_reason,
            question,
            answer,
            noInfo,
            cachedTokens: final.usage?.cache_read_input_tokens ?? 0,
            followUp: history.length > 0,
          },
        });
        // A question the website could not answer is worth its own event, so
        // it can be charted without filtering.
        if (noInfo) {
          ph.capture({ distinctId, event: "digital_self_no_info", properties: { question } });
        }
        await ph.shutdown();
      }
    } catch (phErr) {
      console.error("[/api/ask] posthog:", phErr);
    }

    send("done", {
      answer,
      noInfo,
      usage: {
        cached: final.usage?.cache_read_input_tokens ?? 0,
        input: final.usage?.input_tokens ?? 0,
        output: final.usage?.output_tokens ?? 0,
      },
    });
  } catch (err) {
    console.error("[/api/ask]", err);
    send("error", { error: "Something went wrong on my side. Try again in a moment." });
  } finally {
    res.end();
  }
}
