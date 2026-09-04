import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Sparkles, Loader2 } from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

const quickReplies = [
  "Equipment status today?",
  "Most urgent Work Orders?",
  "Spareparts to reorder?",
  "What is the PM compliance?",
];

const aiResponses: Record<string, string> = {
  "Equipment status today?":
    "🟢 4 out of 5 equipments are Running.\n\n⚠️ Conveyor L2 is under Maintenance — WO-2609-014 (Drive motor bearing noisy) handled by Andi P.\n\n📊 Overall Equipment Availability: 96.2% (+1.1% since last week).",
  "Most urgent Work Orders?":
    "🔴 WO-2609-013 — Boiler 01\nDescription: Steam header pipe leak\nPriority: Critical | Status: Assigned\nTechnician: Budi S. | Target: 04 Sep 2026\n\n⚠️ This WO requires immediate action as it directly impacts safety and operations.",
  "Spareparts to reorder?":
    "🤖 Based on AI prediction:\n\n1. Bearing SKF-6205 — stock 6 (min 10), depletes in ± 3 days\n   → Create PO now!\n2. Hydraulic Oil ISO 68 — stock 3 (min 8), depletes in ± 4 days\n   → Create PO now!\n3. V-Belt A-45 — stock 9 (min 8), depletes in ± 5 days\n   → Monitor",
  "What is the PM compliance?":
    "📊 PM Compliance this month: 92%\nTarget: 95%\n\n✅ Completed on time: 92%\n⚠️ Late: 6%\n❌ Missed: 2%\n\n📌 PM-2609-001 (Compressor A) status is Overdue — please follow up immediately.",
};

function getAIResponse(input: string): string {
  if (aiResponses[input]) return aiResponses[input];

  const lower = input.toLowerCase();
  if (lower.includes("equipment") || lower.includes("machine") || lower.includes("status"))
    return aiResponses["Equipment status today?"];
  if (lower.includes("wo") || lower.includes("work order") || lower.includes("urgent"))
    return aiResponses["Most urgent Work Orders?"];
  if (lower.includes("spare") || lower.includes("part") || lower.includes("reorder") || lower.includes("stock"))
    return aiResponses["Spareparts to reorder?"];
  if (lower.includes("pm") || lower.includes("compliance") || lower.includes("preventive"))
    return aiResponses["What is the PM compliance?"];

  return "Thank you for asking! 🤖\n\nCurrently, I can assist you with:\n• Equipment status & availability\n• Urgent/critical work orders\n• Sparepart prediction & reordering\n• PM compliance & schedule\n\nPlease ask me about one of the topics above!";
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hello! 👋 I am the AI Assistant for the Maintenance Monitoring System.\n\nI can help you check equipment status, work orders, spareparts, and PM schedules.\n\nHow can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: getAIResponse(text.trim()),
      };
      setMessages((prev) => [...prev, reply]);
      setTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed right-6 bottom-24 z-50 flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-primary to-primary/80 px-5 py-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Bot className="size-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">AI Assistant</p>
              <p className="flex items-center gap-1.5 text-[11px] text-white/80">
                <span className="size-1.5 rounded-full bg-green-400" />
                Online — Ready to help
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-line ${
                    m.role === "user"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-muted text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-muted px-4 py-3 text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  <span className="text-xs">Typing...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary/15"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-border px-4 py-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Type a message..."
              className="h-10 flex-1 rounded-xl border border-input bg-surface px-4 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || typing}
              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div className="fixed right-6 bottom-6 z-50 flex items-center gap-3">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-full border border-primary/20 bg-background/90 px-4 py-2.5 text-sm font-semibold text-primary shadow-lg backdrop-blur-sm transition-all hover:shadow-xl hover:border-primary/40 animate-in fade-in slide-in-from-right-2 duration-300"
          >
            Ask AI Assistant <Sparkles className="size-4" />
          </button>
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          className="group relative flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping opacity-25" />
          <span className="absolute -inset-1 rounded-full border-2 border-primary/30 animate-pulse" />
          {open ? (
            <X className="size-6 transition-transform group-hover:rotate-90" />
          ) : (
            <Bot className="size-6 transition-transform group-hover:scale-110" />
          )}
        </button>
      </div>
    </>
  );
}
