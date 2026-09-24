"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string; sources?: string[] };

const SUGGESTIONS = [
  "What kind of AI engineer is he?",
  "Which project best demonstrates his RAG knowledge?",
  "What's his experience with deployment?",
  "Has he done any open-source work?",
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Ask me anything about Govinda — his projects, experience, or technical skills. I only answer from his verified portfolio data, so if something isn't documented, I'll say so instead of guessing.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages
            .slice(-7, -1)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Something went wrong.");
        setMessages((m) => m.slice(0, -1));
        return;
      }

      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.answer, sources: data.sources },
      ]);
    } catch {
      setError("Couldn't reach the assistant. Check your connection and try again.");
      setMessages((m) => m.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="chat" className="border-b border-line">
      <div className="max-w-col mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
          <div className="pt-1">
            <h2 className="text-sm font-mono text-faint">07 — Ask the AI</h2>
            <p className="text-muted text-sm mt-4 leading-relaxed max-w-[26ch]">
              Grounded in Govinda&apos;s actual portfolio data via retrieval —
              not a hardcoded prompt. It won&apos;t make things up.
            </p>
          </div>

          <div className="border border-line bg-surface">
            <div
              ref={scrollRef}
              className="h-80 md:h-96 overflow-y-auto px-5 py-5 space-y-5"
              aria-live="polite"
            >
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "text-right" : ""}>
                  <div
                    className={`inline-block max-w-[85%] text-left px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-signal text-base"
                        : "bg-surface2 text-ink border border-line"
                    }`}
                  >
                    {m.content}
                  </div>
                  {m.sources && m.sources.length > 0 && (
                    <p className="font-mono text-[11px] text-faint mt-1.5">
                      grounded in: {m.sources.slice(0, 3).join(", ")}
                    </p>
                  )}
                </div>
              ))}
              {loading && (
                <div className="inline-block bg-surface2 border border-line px-4 py-2.5">
                  <span className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-faint animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </span>
                </div>
              )}
              {error && (
                <p className="text-sm text-danger border border-danger/40 px-4 py-2.5">
                  {error}
                </p>
              )}
            </div>

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 px-5 pb-4">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="focus-ring font-mono text-xs text-muted border border-line px-3 py-1.5 hover:border-trace hover:text-trace transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-line p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about his projects, skills, or experience…"
                className="focus-ring flex-1 bg-transparent text-sm text-ink placeholder:text-faint px-2 py-2"
                maxLength={800}
                aria-label="Ask a question about Govinda"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="focus-ring bg-signal text-base text-sm font-medium px-4 py-2 disabled:opacity-40 hover:bg-[#ffb54a] transition-colors"
              >
                Ask
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
