"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import { useDigitalSelf } from "../lib/use-digital-self";

// The picture visitors already know from the top of the home page. One file
// for both the still and the image D-ID animates: a test render proved D-ID
// finds and animates the face in this exact crop, and using one file means the
// swap from photo to video cannot shift her position or scale.
const PORTRAIT = "/images/profile/portrait.jpg";
const AVATAR = "/images/profile/avatar.jpg";

// Every one of these was checked against the live endpoint: each returns a
// real answer, not "I don't have anything about that on my website."
const TOPICS = [
  "What are you working on now?",
  "What is HoloPal?",
  "What was your PhD about?",
  "What is StrongME?",
  "Where have you worked?",
  "What do you do for fun?",
];

export default function DigitalSelf() {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const [showText, setShowText] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const ds = useDigitalSelf(PORTRAIT);
  const { state, question, answer, answerReady, animating, animationSpent, error, audioBlocked, ask, reset, retryAudio } = ds;

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // A question can arrive with the open event, from the suggestion chips on
  // the home page.
  useEffect(() => {
    const openMe = (event: Event) => {
      setOpen(true);
      const q = (event as CustomEvent<{ question?: string }>).detail?.question;
      if (q) setPending(q);
    };
    window.addEventListener("open-allma", openMe);     // older links still point here
    window.addEventListener("open-digital-self", openMe);
    return () => {
      window.removeEventListener("open-allma", openMe);
      window.removeEventListener("open-digital-self", openMe);
    };
  }, []);

  useEffect(() => {
    if (!open || !pending) return;
    const q = pending;
    setPending(null);
    void ask(q);
  }, [open, pending, ask]);

  // The page behind must not scroll while the picture is up.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = useCallback(() => { setOpen(false); reset(); }, [reset]);

  const submit = useCallback(() => {
    const q = input.trim();
    if (!q) return;
    setInput("");
    void ask(q);
  }, [ask, input]);

  const busy = state !== "idle";
  const statusLine =
    state === "answering" ? "Preparing answer…"
    : state === "preparing" ? "Preparing speech and animation…"
    : state === "speaking" ? "Speaking…"
    : answer ? "Ask me something else" : "Ask me anything about my work or my life";

  const launcher = (
    <button
      onClick={() => { setOpen(true); posthog.capture("digital_self_opened"); }}
      className="flex items-center gap-3 rounded-full py-2 pl-2 pr-5 text-sm shadow-lg transition hover:opacity-90"
      style={{ background: "var(--card)", border: "1px solid var(--line)", color: "var(--ink-2)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={AVATAR} alt="" className="h-10 w-10 rounded-full object-cover" />
      Ask my digital self
    </button>
  );

  return (
    <>
      {!open && (
        mobile
          ? <div className="mt-10 flex w-full justify-center px-4 pb-4">{launcher}</div>
          : <div className="fixed bottom-4 right-4 z-40">{launcher}</div>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Sofija's digital self"
          className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6"
          style={{
            height: "100dvh",
            background: "color-mix(in srgb, var(--deep) 70%, transparent)",
            backdropFilter: "blur(6px)",
          }}
          onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <div
            className="flex h-full w-full max-w-[560px] flex-col overflow-y-auto sm:h-auto sm:rounded-[28px]"
            style={{
              background: "var(--paper)",
              border: "1px solid var(--line)",
              boxShadow: "var(--shadow)",
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            <div
              className="sticky top-0 z-10 flex items-start justify-between gap-4 px-5 pt-5 pb-3 sm:px-7 sm:pt-7"
              style={{ background: "var(--paper)" }}
            >
              <div>
                <p className="display-sm text-xl">Sofija</p>
                <p className="mt-1 text-sm" style={{ color: "var(--ink-3)" }}>{statusLine}</p>
              </div>
              <button
                onClick={close}
                aria-label="Close"
                className="-mr-1 -mt-1 rounded-full px-3 py-1 text-lg transition hover:opacity-70"
                style={{ color: "var(--ink-3)" }}
              >
                ✕
              </button>
            </div>

            {/* The picture is the interface. The video sits exactly on top of
                the still, same box, same framing, so when she starts talking
                nothing jumps. */}
            <div className="px-5 pt-5 sm:px-7">
              <div className="relative mx-auto w-full max-w-[360px]">
                <div className="arch relative aspect-[4/5]" style={{ border: "1px solid var(--line)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={PORTRAIT} alt="Sofija Hotomski" className="absolute inset-0 h-full w-full object-cover" />
                  <video
                    ref={ds.videoRef}
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
                    style={{ opacity: animating ? 1 : 0 }}
                  />
                  {audioBlocked && (
                    <button
                      onClick={retryAudio}
                      className="absolute inset-0 flex items-end justify-center pb-4"
                      aria-label="Play the answer"
                    >
                      <span
                        className="rounded-full px-4 py-1.5 text-xs"
                        style={{ background: "var(--spot)", color: "#fff" }}
                      >
                        Tap to hear me
                      </span>
                    </button>
                  )}
                  {(state === "answering" || state === "preparing") && (
                    <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4">
                      <span
                        className="rounded-full px-3 py-1 text-xs"
                        style={{ background: "color-mix(in srgb, var(--deep) 72%, transparent)", color: "var(--deep-ink)" }}
                      >
                        {state === "answering" ? "Preparing answer…" : "Preparing speech and animation…"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Her answer is spoken. The text underneath is a caption, not a
                transcript: no history, no scrollback, and it only appears once
                there is something to caption. */}
            {/* Directly under her face, where the change is noticed: a still
                photo after an animated one reads as something broken unless
                the visitor is told why it changed. */}
            {animationSpent && (
              <div className="px-5 pt-5 sm:px-7">
                <div
                  className="rounded-2xl px-4 py-3 text-center text-sm leading-relaxed"
                  style={{
                    background: "var(--spot-soft)",
                    border: "1px solid var(--spot)",
                    color: "var(--ink)",
                  }}
                >
                  That was your one animated answer. From here on it is my voice over a still
                  photo.{" "}
                  <a
                    href="https://holopal.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => posthog.capture("holopal_link_clicked", { source: "digital_self_cta" })}
                    className="font-semibold underline underline-offset-4"
                    style={{ color: "var(--spot)" }}
                  >
                    Talk to me face to face on HoloPal
                  </a>
                  , where you can also build a digital self of your own.
                </div>
              </div>
            )}

            {question && (
              <div className="px-5 pt-6 sm:px-7">
                <p className="text-xs uppercase tracking-[0.14em]" style={{ color: "var(--ink-3)" }}>
                  {question}
                </p>
                {answerReady && !showText && (
                  <button
                    onClick={() => { setShowText(true); posthog.capture("digital_self_show_text"); }}
                    className="mt-3 text-sm underline underline-offset-4 transition hover:opacity-70"
                    style={{ color: "var(--spot)" }}
                  >
                    Show text
                  </button>
                )}
                {answerReady && showText && (
                  <>
                    <p
                      className="mt-2 max-h-[30vh] overflow-y-auto text-[0.95rem] leading-relaxed"
                      style={{ color: "var(--ink-2)" }}
                    >
                      {answer}
                    </p>
                    <button
                      onClick={() => setShowText(false)}
                      className="mt-2 text-xs underline underline-offset-4 transition hover:opacity-70"
                      style={{ color: "var(--ink-3)" }}
                    >
                      Hide text
                    </button>
                  </>
                )}
              </div>
            )}

            {error && (
              <p className="px-5 pt-4 text-sm sm:px-7" style={{ color: "var(--spot)" }}>{error}</p>
            )}

            <div className="px-5 pb-6 pt-6 sm:px-7 sm:pb-7">
              <p className="eyebrow">{answer ? "Ask something else" : "Pick a topic"}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    disabled={busy}
                    onClick={() => { posthog.capture("digital_self_topic", { topic: t }); void ask(t); }}
                    className="chip !py-1.5 !text-xs disabled:opacity-40"
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
                  placeholder="or ask me something else…"
                  maxLength={500}
                  disabled={busy}
                  className="flex-1 rounded-full px-4 py-2.5 text-sm"
                  style={{ border: "1px solid var(--line)", background: "var(--card)", color: "var(--ink)" }}
                />
                <button onClick={submit} disabled={busy} className="btn !px-5 !py-2.5 !text-sm disabled:opacity-50">
                  {busy ? "…" : "Ask"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <audio ref={ds.didAudioRef} autoPlay playsInline className="hidden" />
      <audio ref={ds.localAudioRef} className="hidden" />
    </>
  );
}
