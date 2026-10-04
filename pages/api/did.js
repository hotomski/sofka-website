// D-ID WebRTC proxy: the animated answer.
//
// Ported from HoloPal's app/api/did-stream/route.ts, minus the accounts and
// quotas it has and this site doesn't. Every visitor gets exactly ONE animated
// answer; after that the page keeps her voice and shows the still photo, plus
// the invitation to build their own digital self on HoloPal.
//
// The one-animation rule is enforced with an httpOnly cookie rather than an
// in-memory counter, because serverless functions are recycled constantly and
// an in-memory count would reset with them.
export const config = { api: { bodyParser: { sizeLimit: "6mb" } } };

const DID_API = "https://api.d-id.com";
const ANIM_COOKIE = "ds_anim";

// D-ID allows 150-1280. HoloPal streams at 384 because its avatar is small on
// screen and a lossy connection could not decode the default bitrate. Here the
// portrait is the whole interface and Sofija's face is only ~18% of the frame
// height in it, so 384 would leave a ~71px head and mushy lip-sync. A test
// render at full size was sharp, so this streams at 720: the head lands around
// 133px and the picture is crisp at the size it is displayed. If a visitor's
// connection cannot carry it, the video simply never decodes and the still
// photo keeps the answer going, which is the same fallback as before.
const OUTPUT_RESOLUTION = Number(process.env.DID_OUTPUT_RESOLUTION || 720);

// Backstop against a burst of traffic: a whole-site ceiling on animated
// answers per day. Best effort (resets with the instance), on top of the
// per-visitor cookie, which is the real limit.
const GLOBAL_DAILY_ANIMATIONS = Number(process.env.DIGITAL_SELF_DAILY_ANIMATIONS || 60);
let globalDay = "";
let globalCount = 0;

function animationsLeftToday() {
  const today = new Date().toISOString().slice(0, 10);
  if (globalDay !== today) { globalDay = today; globalCount = 0; }
  return GLOBAL_DAILY_ANIMATIONS - globalCount;
}

function hasUsedAnimation(req) {
  return String(req.headers.cookie || "").split(";").some((c) => c.trim().startsWith(`${ANIM_COOKIE}=`));
}

function markAnimationUsed(res) {
  res.setHeader("Set-Cookie", [
    `${ANIM_COOKIE}=1; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  ]);
}

function authHeader() {
  return `Basic ${Buffer.from(process.env.DID_API_KEY || "").toString("base64")}`;
}
const jsonHeaders = () => ({ Authorization: authHeader(), "Content-Type": "application/json" });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end();
  }
  if (!process.env.DID_API_KEY || process.env.DIGITAL_SELF_ANIMATION === "off") {
    return res.status(503).json({ error: "animation_unavailable" });
  }

  const { action, streamId, sessionId } = req.body || {};

  try {
    // Standing up the stream is what costs a D-ID session slot, so the gate
    // runs here too, not only on the talk.
    if (action === "create") {
      if (hasUsedAnimation(req)) return res.status(403).json({ error: "animation_used" });
      if (animationsLeftToday() <= 0) return res.status(403).json({ error: "animation_busy" });

      const imageUrl = String(req.body?.imageUrl || "");
      if (!/^https:\/\//.test(imageUrl)) return res.status(400).json({ error: "bad_image" });

      const r = await fetch(`${DID_API}/talks/streams`, {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify({ source_url: imageUrl, output_resolution: OUTPUT_RESOLUTION }),
      });
      const data = await r.json();
      if (!r.ok) console.error("[did create]", r.status, data);
      return res.status(r.status).json(data);
    }

    if (action === "sdp") {
      const r = await fetch(`${DID_API}/talks/streams/${streamId}/sdp`, {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify({ answer: req.body.answer, session_id: sessionId }),
      });
      return res.status(r.status).json(await r.json().catch(() => ({})));
    }

    if (action === "ice") {
      const r = await fetch(`${DID_API}/talks/streams/${streamId}/ice`, {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify({
          // Flat fields — D-ID rejects a nested candidate object.
          candidate: req.body.candidate,
          sdpMid: req.body.sdpMid,
          sdpMLineIndex: req.body.sdpMLineIndex,
          session_id: sessionId,
        }),
      });
      return res.status(r.status).json(await r.json().catch(() => ({})));
    }

    // The answer is spoken by ElevenLabs in her cloned voice; D-ID only ever
    // lip-syncs to that audio and never generates speech of its own.
    if (action === "upload") {
      const binary = Buffer.from(String(req.body.audio || ""), "base64");
      const form = new FormData();
      form.append("audio", new Blob([binary], { type: "audio/mpeg" }), "speech.mp3");
      const r = await fetch(`${DID_API}/audios`, {
        method: "POST",
        headers: { Authorization: authHeader() },
        body: form,
      });
      const data = await r.json();
      if (!r.ok) console.error("[did upload]", r.status, data);
      return res.status(r.status).json(data);
    }

    if (action === "talk") {
      if (hasUsedAnimation(req)) return res.status(403).json({ error: "animation_used" });
      if (animationsLeftToday() <= 0) return res.status(403).json({ error: "animation_busy" });

      const audioUrl = String(req.body.audioUrl || "");
      if (!/^https?:\/\//.test(audioUrl)) return res.status(400).json({ error: "bad_audio" });

      const r = await fetch(`${DID_API}/talks/streams/${streamId}`, {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify({
          script: { type: "audio", audio_url: audioUrl },
          config: { stitch: true },
          session_id: sessionId,
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        console.error("[did talk]", r.status, data);
        return res.status(r.status).json(data);
      }
      // Spend the visitor's one animation only once D-ID has accepted it.
      globalCount += 1;
      markAnimationUsed(res);
      return res.status(200).json({ ...data, animationSpent: true });
    }

    if (action === "close") {
      const r = await fetch(`${DID_API}/talks/streams/${streamId}`, {
        method: "DELETE",
        headers: jsonHeaders(),
        body: JSON.stringify({ session_id: sessionId }),
      });
      return res.status(r.status).json(await r.json().catch(() => ({})));
    }

    return res.status(400).json({ error: "unknown_action" });
  } catch (err) {
    console.error("[/api/did]", err);
    return res.status(500).json({ error: "did_failed" });
  }
}
