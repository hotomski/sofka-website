"use client";

import { useState, useEffect, useRef } from "react";
import posthog from "posthog-js";

type Message = {
  role: "user" | "bot";
  content: string;
};

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dots, setDots] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Open chatbot when triggered externally (e.g. clicking "Allma" link)
  useEffect(() => {
    const handleOpen = (event: Event) => {
      setIsChatOpen(true);
      const question = (event as CustomEvent<{ question?: string }>).detail?.question;
      if (question) setInput(question);
      posthog.capture("chatbot_opened");
    };
    window.addEventListener("open-allma", handleOpen);
    return () => window.removeEventListener("open-allma", handleOpen);
  }, []);

  // Animated dots while loading
  useEffect(() => {
    if (!isLoading) {
      setDots("");
      return;
    }
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Focus input when chat opens or after message sent
  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatOpen]);

  // Scroll to bottom on user message only
  useEffect(() => {
    if (containerRef.current && messages[messages.length - 1]?.role === "user") {
      setTimeout(() => {
        containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
      }, 50);
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const messageLength = input.trim().length;
    posthog.capture("chatbot_message_sent", { message_length: messageLength });

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    inputRef.current?.focus();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      const botMessage: Message = { role: "bot", content: data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      posthog.captureException(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage();
    }
  };

  return (
    <div
      className={`${
        isMobile
          ? "relative mt-6 w-full px-4 flex flex-col items-center"
          : "fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2"
      }`}
    >
      {/* Closed Chat - Show Icon */}
      {!isChatOpen && (
        <>
          <div
            className="relative px-4 py-2 rounded-full shadow-md max-w-[210px] text-sm text-center"
            style={{ background: "var(--card)", color: "var(--ink-2)", border: "1px solid var(--line)" }}
          >
            Hey! I&apos;m Allma. Ask me anything about Sofija.
          </div>
          <div
            className="cursor-pointer hover:opacity-90"
            onClick={() => { setIsChatOpen(true); posthog.capture("chatbot_opened"); }}
          >
            <img
              src="/chatbotIcon.png"
              alt="Chat Icon"
              className="w-16 h-16 rounded-full object-cover shadow-md"
              style={{ border: "1px solid var(--line)" }}
            />
          </div>
        </>
      )}

      {/* Open Chat */}
      {isChatOpen && (
        <div
          className={`shadow-xl rounded-2xl p-4 ${isMobile ? "w-full max-w-md" : "w-80"}`}
          style={{ background: "var(--card)", border: "1px solid var(--line)" }}
        >
          {/* Header */}
          <div className="flex justify-between items-center pb-2 mb-2" style={{ borderBottom: "1px solid var(--line)" }}>
            <h3 className="display-sm text-lg">Allma</h3>
            <button
              className="transition hover:opacity-70"
              style={{ color: "var(--ink-3)" }}
              onClick={() => { setIsChatOpen(false); posthog.capture("chatbot_closed"); }}
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div
            ref={containerRef}
            className="h-64 overflow-y-auto space-y-3 pr-1"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className="px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-wrap text-sm"
                  style={
                    msg.role === "user"
                      ? { background: "var(--spot)", color: "#fff" }
                      : { background: "var(--paper-2)", color: "var(--ink)" }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Animated "typing" message */}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-2 rounded-2xl max-w-[80%] text-sm"
                  style={{ background: "var(--paper-2)", color: "var(--ink-2)" }}
                >
                  Generating response{dots}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex mt-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              className="flex-1 rounded-xl px-3 py-2 text-sm"
              style={{ border: "1px solid var(--line)", background: "var(--paper)", color: "var(--ink)" }}
              placeholder="Ask me anything..."
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              className={`ml-2 px-4 py-2 rounded-xl text-sm text-white transition ${
                isLoading ? "cursor-not-allowed opacity-60" : "hover:opacity-90"
              }`}
              style={{ background: "var(--spot)" }}
              disabled={isLoading}
            >
              {isLoading ? "..." : "Send"}
            </button>
          </div>
          {/* Suggestions */}
          <div className="text-xs mt-2 text-center" style={{ color: "var(--ink-3)" }}>
            <span className="font-semibold">Examples:</span> Summarize her working experience &middot; What does she like?
          </div>
        </div>
      )}
    </div>
  );
}