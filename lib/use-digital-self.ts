"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import posthog from "posthog-js";

// Everything the digital self does, with no opinion about how it looks: ask
// the question, stream the answer, speak it in her cloned voice, and animate
// her face for the one animated answer each visitor gets.
//
// The UI on top only renders state and calls ask().

export type DigitalSelfState = "idle" | "thinking" | "speaking";

export type Turn = { role: "user" | "assistant"; content: string };

export function useDigitalSelf(didImageSrc: string) {
  const [state, setState] = useState<DigitalSelfState>("idle");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [animating, setAnimating] = useState(false);
  const [animationSpent, setAnimationSpent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Safari and iOS can refuse to start audio even after a tap. A silent
  // portrait is indistinguishable from a broken one, so the UI needs to know.
  const [audioBlocked, setAudioBlocked] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const didAudioRef = useRef<HTMLAudioElement | null>(null);
  const localAudioRef = useRef<HTMLAudioElement | null>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const streamRef = useRef<{ id: string; sessionId: string } | null>(null);
  const readyRef = useRef(false);
  const turnsRef = useRef<Turn[]>([]);
  const busyRef = useRef(false);

  useEffect(() => { turnsRef.current = turns; }, [turns]);

  useEffect(() => {
    try {
      if (localStorage.getItem("ds_anim_used") === "1") setAnimationSpent(true);
    } catch {}
  }, []);

  const closeStream = useCallback((keepalive = false) => {
    const s = streamRef.current;
    streamRef.current = null;
    readyRef.current = false;
    pcRef.current?.close();
    pcRef.current = null;
    if (s) {
      fetch("/api/did", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "close", streamId: s.id, sessionId: s.sessionId }),
        keepalive,
      }).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onHide = () => closeStream(true);
    window.addEventListener("pagehide", onHide);
    return () => {
      window.removeEventListener("pagehide", onHide);
      closeStream();
    };
  }, [closeStream]);

  // Opens a D-ID stream for this one answer. Returns false whenever animation
  // cannot happen — no key, no credits, already spent, http, bad connection —
  // and every caller then falls through to voice over the still photo. The
  // answer is never lost to a failed animation.
  const startStream = useCallback(async (): Promise<boolean> => {
    if (streamRef.current) return readyRef.current;
    if (typeof window === "undefined" || window.location.protocol !== "https:") return false;

    try {
      const createRes = await fetch("/api/did", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", imageUrl: window.location.origin + didImageSrc }),
      });
      if (!createRes.ok) {
        const body = await createRes.json().catch(() => ({}));
        if (body?.error === "animation_used") setAnimationSpent(true);
        return false;
      }
      const { id, session_id, offer, ice_servers } = await createRes.json();
      if (!id || !offer) return false;

      const pc = new RTCPeerConnection({
        iceServers: [...(ice_servers ?? []), { urls: "stun:stun.l.google.com:19302" }],
      });
      pcRef.current = pc;
      streamRef.current = { id, sessionId: session_id };

      pc.addEventListener("track", (event) => {
        if (event.track.kind === "audio") {
          // Her voice rides its own <audio> element. A <video> playing a live
          // stream does not start until it decodes a video frame, so on a
          // lossy connection the voice would be lost along with the picture.
          const a = didAudioRef.current;
          if (a) {
            a.muted = true;
            a.srcObject = new MediaStream([event.track]);
            a.play().catch(() => {});
          }
        }
        if (event.track.kind === "video" && videoRef.current) {
          videoRef.current.muted = true; // imperative: React re-asserts the prop
          videoRef.current.srcObject = event.streams[0];
          videoRef.current.play().catch(() => {});
        }
      }, true);

      pc.oniceconnectionstatechange = () => {
        const st = pc.iceConnectionState;
        readyRef.current = st === "connected" || st === "completed";
      };

      type Ice = { candidate: string; sdpMid: string | null; sdpMLineIndex: number | null };
      const queued: Ice[] = [];
      let sdpSent = false;
      const sendIce = (ice: Ice) =>
        fetch("/api/did", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "ice", streamId: id, sessionId: session_id, ...ice }),
        }).catch(() => {});

      pc.addEventListener("icecandidate", ({ candidate }) => {
        if (!candidate) return;
        const ice = {
          candidate: candidate.candidate,
          sdpMid: candidate.sdpMid,
          sdpMLineIndex: candidate.sdpMLineIndex,
        };
        if (sdpSent) sendIce(ice); else queued.push(ice);
      }, true);

      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      await fetch("/api/did", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sdp",
          streamId: id,
          sessionId: session_id,
          answer: { type: "answer", sdp: answer.sdp },
        }),
      });
      sdpSent = true;
      for (const c of queued) sendIce(c);

      for (let i = 0; i < 40 && !readyRef.current; i++) await new Promise((r) => setTimeout(r, 150));
      return readyRef.current;
    } catch (err) {
      console.warn("[digital self] stream failed, voice only:", err);
      return false;
    }
  }, [didImageSrc]);

  const speak = useCallback(async (text: string, withAnimation: boolean) => {
    const res = await fetch("/api/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) { setState("idle"); return; }
    const { audio } = (await res.json()) as { audio?: string };
    if (!audio) { setState("idle"); return; }

    if (withAnimation && streamRef.current && readyRef.current) {
      try {
        const up = await fetch("/api/did", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "upload", audio }),
        });
        const { url } = (await up.json()) as { url?: string };
        if (url) {
          // Unmute before the talk is requested, never after: audio that
          // arrives while the element is muted is simply lost.
          if (didAudioRef.current) {
            didAudioRef.current.muted = false;
            setAudioBlocked(false);
            didAudioRef.current.play().catch(() => setAudioBlocked(true));
          }
          const talk = await fetch("/api/did", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "talk",
              streamId: streamRef.current.id,
              sessionId: streamRef.current.sessionId,
              audioUrl: url,
            }),
          });
          if (talk.ok) {
            setAnimationSpent(true);
            setState("speaking");
            try { localStorage.setItem("ds_anim_used", "1"); } catch {}
            posthog.capture("digital_self_animated_answer");

            // Cross-fade to the video only once it is really playing frames.
            // Revealing it when the POST returns fades to an empty element,
            // and on a connection that never decodes a frame it would stay
            // empty for the whole answer.
            const video = videoRef.current;
            const reveal = () => setAnimating(true);
            if (video) {
              if (video.readyState >= 2 && !video.paused) reveal();
              else {
                video.addEventListener("timeupdate", reveal, { once: true });
                video.addEventListener("playing", reveal, { once: true });
                setTimeout(() => {
                  video.removeEventListener("timeupdate", reveal);
                  video.removeEventListener("playing", reveal);
                }, 6000);
              }
            }

            const ms = Math.max(4000, text.length * 75);
            setTimeout(() => {
              // Fade back to the still first; tearing the stream down in the
              // same tick cuts the picture to black mid-fade.
              setAnimating(false);
              setState("idle");
              setTimeout(() => closeStream(), 500); // one animation each, free the session
            }, ms + 2500);
            return;
          }
        }
      } catch (err) {
        console.warn("[digital self] animation failed, voice only:", err);
      }
    }

    const el = localAudioRef.current;
    if (el) {
      el.src = `data:audio/mpeg;base64,${audio}`;
      el.onended = () => setState("idle");
      setState("speaking");
      setAudioBlocked(false);
      el.play()
        .then(() => setAudioBlocked(false))
        .catch(() => setAudioBlocked(true)); // the UI offers a tap to hear it
    } else {
      setState("idle");
    }
  }, [closeStream]);

  const ask = useCallback(async (raw: string) => {
    const question = raw.trim();
    if (!question || busyRef.current) return;
    busyRef.current = true;
    setError(null);
    setTurns((t) => [...t, { role: "user", content: question }, { role: "assistant", content: "" }]);
    setState("thinking");
    posthog.capture("digital_self_question", { length: question.length });

    // Animation takes a few seconds to negotiate, so it starts alongside the
    // answer rather than after it.
    const wantAnimation = !animationSpent;
    const streamPromise = wantAnimation ? startStream() : Promise.resolve(false);

    let answer = "";
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history: turnsRef.current.slice(-6) }),
      });
      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Something went wrong.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";
        for (const chunk of chunks) {
          const line = chunk.split("\n").find((l) => l.startsWith("data: "));
          if (!line) continue;
          const payload = JSON.parse(line.slice(6));
          if (payload.text) {
            answer += payload.text;
            setTurns((t) => {
              const next = [...t];
              next[next.length - 1] = { role: "assistant", content: answer };
              return next;
            });
          }
          if (payload.error) throw new Error(payload.error);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setTurns((t) => t.slice(0, -2));
      setState("idle");
      busyRef.current = false;
      return;
    }

    const animated = await streamPromise;
    await speak(answer, animated);
    busyRef.current = false;
  }, [animationSpent, speak, startStream]);

  // Called from a tap, which is the gesture the browser was waiting for.
  const retryAudio = useCallback(() => {
    const did = didAudioRef.current;
    const local = localAudioRef.current;
    const target = did?.srcObject ? did : local?.src ? local : null;
    if (!target) return;
    if (target === did) did!.muted = false;
    target.play().then(() => setAudioBlocked(false)).catch(() => {});
  }, []);

  const reset = useCallback(() => {
    setTurns([]);
    setError(null);
    setState("idle");
    setAudioBlocked(false);
    closeStream();
  }, [closeStream]);

  const last = turns.length ? turns[turns.length - 1] : null;

  return {
    state,
    turns,
    question: turns.length >= 2 ? turns[turns.length - 2].content : null,
    answer: last?.role === "assistant" ? last.content : "",
    animating,
    animationSpent,
    error,
    audioBlocked,
    ask,
    reset,
    retryAudio,
    videoRef,
    didAudioRef,
    localAudioRef,
  };
}
