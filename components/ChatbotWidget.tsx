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
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 z-40 rounded-full bg-accent px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 font-semibold text-white shadow-accent-glow hover:bg-red-500 transition-colors min-h-[44px] min-w-[44px] max-w-[calc(100vw-2rem)] overflow-hidden"
        style={{
          paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
          paddingRight: 'max(1rem, env(safe-area-inset-right))',
        }}
        aria-label={open ? "Close chatbot" : "Open chatbot"}
      >
        <span className="text-xs sm:text-sm lg:text-base whitespace-nowrap truncate">
          {open ? "Close" : "Chat with Alvi Bot"}
        </span>
      </button>

      {/* Chatbot Modal */}
      {open && (
        <div 
          className="fixed bottom-[4.5rem] right-4 left-4 sm:bottom-20 sm:right-5 sm:left-5 md:right-6 md:left-auto md:bottom-24 md:w-[min(calc(100vw-3rem),400px)] lg:w-[min(calc(100vw-4rem),480px)] xl:w-[min(calc(100vw-5rem),520px)] z-40 rounded-xl border border-neutral-800 bg-background-alt/95 p-3 sm:p-4 md:p-5 xl:p-6 shadow-accent-glow backdrop-blur max-h-[min(70vh,600px)] sm:max-h-[min(65vh,520px)] md:max-h-[min(60vh,520px)] lg:max-h-[min(65vh,640px)] xl:max-h-[min(70vh,680px)] flex flex-col overflow-hidden"
          style={{
            paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
            paddingRight: 'max(1rem, env(safe-area-inset-right))',
            maxWidth: 'calc(100vw - 2rem)',
            boxSizing: 'border-box',
          }}
        >
          <div className="mb-2 sm:mb-3 font-display text-xs sm:text-sm md:text-base lg:text-lg text-accent flex-shrink-0 truncate">
            Cybersecurity Assistant
          </div>
          <div className="mb-2 sm:mb-3 flex-1 min-h-[180px] sm:min-h-[200px] md:min-h-[240px] lg:min-h-[320px] xl:min-h-[360px] overflow-y-auto overflow-x-hidden rounded border border-neutral-800/80 bg-black/40 p-2 sm:p-3 md:p-4 lg:p-5 space-y-2 lg:space-y-3">
            {messages.length === 0 && (
              <p className="text-neutral-500 text-xs lg:text-sm xl:text-base leading-relaxed">
                Ask about Alvi&apos;s Red Team expertise, penetration testing services, advanced certifications, learning resources, or connect for mentorship.
              </p>
            )}
            {messages.map((m, idx) => (
              <div key={idx} className={m.role === "user" ? "text-right" : "text-left"}>
                <span
                  className={`inline-block rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 max-w-[90%] sm:max-w-[85%] md:max-w-xs lg:max-w-sm xl:max-w-md break-words overflow-wrap-anywhere text-xs sm:text-sm md:text-base ${
                    m.role === "user"
                      ? "bg-accent text-white"
                      : "bg-neutral-900 text-neutral-100"
                  }`}
                  style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                >
                  {m.content}
                </span>
              </div>
            ))}
            {loading && <p className="text-neutral-500 text-xs lg:text-sm xl:text-base">Thinking...</p>}
          </div>
          <div className="flex gap-2 lg:gap-3 flex-shrink-0 w-full">
            <input
              className="flex-1 min-w-0 rounded-lg border border-neutral-800 bg-black/60 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base outline-none focus:border-accent min-h-[44px]"
              placeholder="Ask about Red Team..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              aria-label="Chat input"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="flex-shrink-0 rounded-lg bg-accent px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold text-white hover:bg-red-500 disabled:opacity-60 transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}


