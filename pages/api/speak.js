// Turns an answer into speech in Sofija's cloned voice.
//
// Same ElevenLabs account and the same voice settings as HoloPal: those were
// tuned against her own recordings (stability 0.4 / style 0.3 keeps her
// rhythm instead of ironing it into a flat narrator).
export const config = { api: { bodyParser: { sizeLimit: "16kb" } } };

const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "0gPzqwSPNEp5yajLls30";
const MODEL_ID = "eleven_multilingual_v2";
const MAX_CHARS = 900;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end();
  }
  const key = process.env.ELEVENLABS_GRANT_API_KEY;
  if (!key) return res.status(503).json({ error: "no_voice" });

  // Emoji and markdown leftovers get read out loud as noise.
  const text = String(req.body?.text ?? "")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/[*_`#>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_CHARS);
  if (!text) return res.status(400).json({ error: "No text" });

  try {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: { stability: 0.4, similarity_boost: 0.8, style: 0.3, use_speaker_boost: true },
      }),
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error("[/api/speak] ElevenLabs:", r.status, detail.slice(0, 300));
      return res.status(502).json({ error: "tts_failed" });
    }
    const audio = Buffer.from(await r.arrayBuffer()).toString("base64");
    return res.status(200).json({ audio });
  } catch (err) {
    console.error("[/api/speak]", err);
    return res.status(500).json({ error: "tts_failed" });
  }
}
