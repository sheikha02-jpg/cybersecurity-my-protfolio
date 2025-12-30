"use client";

import { useEffect, useState } from "react";

/**
 * FloatingContacts Component
 * 
 * Floating action buttons for WhatsApp and Telegram:
 * - Fixed position: bottom-left
 * - z-index: 30 (BELOW chatbot at z-60 and menu at z-50)
 * - Auto-hides when chatbot is open to prevent UI overlap
 * - Touch-friendly targets (44x44px minimum)
 * - Smooth hover animations
 * - Safe area support for iOS notch
 * - Glass morphism design
 */

export function FloatingContacts() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  /**
   * Monitor chatbot state via body data attribute
   * Hides floating contacts when chatbot is open on mobile/tablet
   * Prevents overlapping UI elements
   */
  useEffect(() => {
    const checkChatbotState = () => {
      const isOpen = document.body.getAttribute('data-chatbot-open') === 'true';
      setIsChatbotOpen(isOpen);
    };

    // Check initial state
    checkChatbotState();

    // Create observer for attribute changes
    const observer = new MutationObserver(checkChatbotState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-chatbot-open']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className={`fixed bottom-4 left-4 md:bottom-6 md:left-6 z-30 flex flex-col gap-2 sm:gap-3 transition-all duration-300 ${
        isChatbotOpen ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100'
      }`}
      style={{
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(1rem, env(safe-area-inset-left))',
      }}
    >
      {/* 
        WhatsApp Button
        - Glass panel with emerald theme
        - Opens in new tab
        - 44x44px minimum touch target
        - Hover scale effect
      */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="glass-panel flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 shadow-accent-glow transition-all duration-200 hover:scale-110 hover:bg-emerald-500/30 active:scale-95 min-h-[44px] min-w-[44px]"
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
      >
        <span className="text-xs sm:text-sm font-semibold" aria-hidden="true">WA</span>
      </a>
      
      {/* 
        Telegram Button
        - Glass panel with sky blue theme
        - Opens in new tab
        - 44x44px minimum touch target
        - Hover scale effect
      */}
      <a
        href="https://t.me/your_handle"
        target="_blank"
        rel="noopener noreferrer"
        className="glass-panel flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-sky-500/20 text-sky-300 shadow-accent-glow transition-all duration-200 hover:scale-110 hover:bg-sky-500/30 active:scale-95 min-h-[44px] min-w-[44px]"
        aria-label="Contact on Telegram"
        title="Telegram"
      >
        <span className="text-xs sm:text-sm font-semibold" aria-hidden="true">TG</span>
      </a>
    </div>
  );
}


