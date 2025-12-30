"use client";

import { useState } from "react";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    const userMsgObj: Message = { role: "user", content: userMessage };
    const nextMessages = [...messages, userMsgObj];
    
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    
    try {
      const res = await axios.post("/api/chat", {
        message: userMessage,
        conversation: messages.map(m => ({ role: m.role, content: m.content }))
      });
      
      if (res.data?.error) {
        throw new Error(res.data.error);
      }
      
      const reply = res.data?.response || "I'm currently unavailable. Please reach out to Alvi directly.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e: any) {
      console.error("Chatbot error:", e);
      const errorMsg = e.response?.data?.error || e.message || "Connection error";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${errorMsg}. Please check your OpenAI API key in .env.local or contact Alvi via WhatsApp/Telegram.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-4 left-4 z-40 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white shadow-accent-glow hover:bg-red-500"
      >
        {open ? "Close Alvi Bot" : "Chat with Alvi Bot"}
      </button>
      {open && (
        <div className="fixed bottom-16 left-4 z-40 w-80 max-w-[90vw] rounded-xl border border-neutral-800 bg-background-alt/95 p-3 text-xs shadow-accent-glow backdrop-blur">
          <div className="mb-2 font-display text-sm text-accent">Cybersecurity Assistant</div>
          <div className="mb-2 h-48 overflow-y-auto rounded border border-neutral-800/80 bg-black/40 p-2 space-y-1">
            {messages.length === 0 && (
              <p className="text-neutral-500 text-xs">
                Ask about Alvi&apos;s Red Team expertise, penetration testing services, advanced certifications, learning resources, or connect for mentorship.
              </p>
            )}
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === "user" ? "text-right" : "text-left"}>
                <span
                  className={`inline-block rounded px-2 py-1 ${
                    m.role === "user"
                      ? "bg-accent text-white"
                      : "bg-neutral-900 text-neutral-100"
                  }`}
                >
                  {m.content}
                </span>
              </div>
            ))}
            {loading && <p className="text-neutral-500">Thinking...</p>}
          </div>
          <div className="flex gap-1">
            <input
              className="flex-1 rounded border border-neutral-800 bg-black/60 px-2 py-1 text-xs outline-none focus:border-accent"
              placeholder="Ask about Red Team, pentesting, certs..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="rounded bg-accent px-2 py-1 text-xs font-semibold text-white hover:bg-red-500 disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}


