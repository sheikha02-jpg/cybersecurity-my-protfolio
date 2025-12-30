export function FloatingContacts() {
  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-40 flex flex-col gap-2 sm:gap-3 safe-area-padding">
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noreferrer"
        className="glass-panel flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 shadow-accent-glow transition hover:scale-105 hover:bg-emerald-500/30 active:scale-95 min-h-[44px] min-w-[44px]"
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
      >
        <span className="text-xs sm:text-sm font-semibold">WA</span>
      </a>
      <a
        href="https://t.me/your_handle"
        target="_blank"
        rel="noreferrer"
        className="glass-panel flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-sky-500/20 text-sky-300 shadow-accent-glow transition hover:scale-105 hover:bg-sky-500/30 active:scale-95 min-h-[44px] min-w-[44px]"
        aria-label="Contact on Telegram"
        title="Telegram"
      >
        <span className="text-xs sm:text-sm font-semibold">TG</span>
      </a>
    </div>
  );
}


