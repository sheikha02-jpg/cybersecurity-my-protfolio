export function FloatingContacts() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noreferrer"
        className="glass-panel flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 shadow-accent-glow transition hover:scale-105 hover:bg-emerald-500/30"
        aria-label="Chat on WhatsApp"
      >
        WA
      </a>
      <a
        href="https://t.me/your_handle"
        target="_blank"
        rel="noreferrer"
        className="glass-panel flex h-11 w-11 items-center justify-center rounded-full bg-sky-500/20 text-sky-300 shadow-accent-glow transition hover:scale-105 hover:bg-sky-500/30"
        aria-label="Contact on Telegram"
      >
        TG
      </a>
    </div>
  );
}


