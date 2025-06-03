"use client";

import { useState, useEffect, useRef } from "react";

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
    } catch {
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
          <div className="relative bg-gray-100 text-gray-700 px-3 py-2 rounded-full shadow-md max-w-[200px] text-sm text-center">
            Hey there! Ask me anything about Sofija.
          </div>
          <div
            className="cursor-pointer hover:opacity-90"
            onClick={() => setIsChatOpen(true)}
          >
            <img
              src="/chatbotIcon.png"
              alt="Chat Icon"
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
        </>
      )}

      {/* Open Chat */}
      {isChatOpen && (
        <div
          className={`bg-white shadow-lg rounded-lg p-4 ${
            isMobile ? "w-full max-w-md" : "w-80"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="text-lg font-bold">Ask Sofija</h3>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsChatOpen(false)}
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
                  className={`px-4 py-2 rounded-2xl max-w-[70%] whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Animated "typing" message */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-2xl max-w-[70%] bg-gray-200 text-black">
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
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
              placeholder="Ask me anything..."
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              className={`ml-2 px-4 py-2 rounded-lg transition ${
                isLoading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
