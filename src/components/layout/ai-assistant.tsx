import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Sparkles, Loader2 } from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

const quickReplies = [
  "Status equipment hari ini?",
  "WO mana yang paling urgent?",
  "Sparepart apa yang perlu reorder?",
  "Berapa PM compliance bulan ini?",
];

const aiResponses: Record<string, string> = {
  "Status equipment hari ini?":
    "🟢 4 dari 5 equipment berstatus Running.\n\n⚠️ Conveyor L2 sedang dalam Maintenance — WO-2609-014 (Bearing motor berisik) ditangani oleh Andi P.\n\n📊 Equipment Availability keseluruhan: 96.2% (+1.1% dari minggu lalu).",
  "WO mana yang paling urgent?":
    "🔴 WO-2609-013 — Boiler 01\nDeskripsi: Kebocoran pipa steam header\nPrioritas: Critical | Status: Assigned\nTeknisi: Budi S. | Target: 04 Sep 2026\n\n⚠️ WO ini memerlukan tindakan segera karena berdampak langsung pada safety dan operasional.",
  "Sparepart apa yang perlu reorder?":
    "🤖 Berdasarkan prediksi AI:\n\n1. Bearing SKF-6205 — stok 6 (min 10), habis ± 3 hari\n   → Buat PO sekarang!\n2. Oli Hidrolik ISO 68 — stok 3 (min 8), habis ± 4 hari\n   → Buat PO sekarang!\n3. V-Belt A-45 — stok 9 (min 8), habis ± 5 hari\n   → Pantau",
  "Berapa PM compliance bulan ini?":
    "📊 PM Compliance bulan ini: 92%\nTarget: 95%\n\n✅ Selesai tepat waktu: 92%\n⚠️ Terlambat: 6%\n❌ Terlewat: 2%\n\n📌 PM-2609-001 (Compressor A) statusnya Overdue — segera tindak lanjuti.",
};

function getAIResponse(input: string): string {
  if (aiResponses[input]) return aiResponses[input];

  const lower = input.toLowerCase();
  if (lower.includes("equipment") || lower.includes("mesin"))
    return aiResponses["Status equipment hari ini?"];
  if (lower.includes("wo") || lower.includes("work order") || lower.includes("urgent"))
    return aiResponses["WO mana yang paling urgent?"];
  if (lower.includes("spare") || lower.includes("part") || lower.includes("reorder") || lower.includes("stok"))
    return aiResponses["Sparepart apa yang perlu reorder?"];
  if (lower.includes("pm") || lower.includes("compliance") || lower.includes("preventive"))
    return aiResponses["Berapa PM compliance bulan ini?"];

  return "Terima kasih atas pertanyaannya! 🤖\n\nSaat ini saya bisa membantu Anda dengan:\n• Status equipment & availability\n• Work order urgent/kritis\n• Prediksi kebutuhan sparepart\n• PM compliance & jadwal\n\nSilakan tanyakan salah satu topik di atas!";
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Halo! 👋 Saya AI Assistant untuk Maintenance Monitoring System.\n\nSaya bisa membantu Anda mengecek status equipment, work order, sparepart, dan jadwal PM.\n\nAda yang bisa saya bantu?",
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
                Online — Siap membantu
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
                  <span className="text-xs">Sedang mengetik...</span>
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
              placeholder="Ketik pertanyaan..."
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
