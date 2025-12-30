"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * HamburgerMenu Component
 * 
 * Mobile-first responsive navigation:
 * - Full-screen overlay on mobile/tablet (<1024px)
 * - Slide-in animation from right
 * - Auto-closes on route change, Escape key, or backdrop click
 * - z-index: 50 (menu panel), 45 (backdrop) - sits below chatbot (z-60)
 * - Prevents body scroll when open
 * - Touch-friendly targets (min 44x44px)
 * - Safe area support for iOS notch
 */
export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Auto-close menu when navigating to a new page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle Escape key and prevent background scroll when menu is open
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    
    if (isOpen) {
      // Lock body scroll to prevent background scrolling
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      // Restore body scroll
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* 
        Hamburger Button
        - Visible only on mobile/tablet (<1024px)
        - Animated icon transformation (hamburger ↔ X)
        - z-index: 50 (above backdrop, below chatbot)
        - Touch target: 44x44px minimum
      */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex flex-col gap-1.5 w-11 h-11 sm:w-12 sm:h-12 items-center justify-center rounded-md hover:bg-neutral-800/50 active:bg-neutral-800/70 transition-colors z-50 min-h-[44px] min-w-[44px] relative"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        type="button"
      >
        {/* Top bar - rotates to form X */}
        <span
          className={`block h-0.5 w-6 sm:w-7 bg-neutral-200 transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        {/* Middle bar - fades out */}
        <span
          className={`block h-0.5 w-6 sm:w-7 bg-neutral-200 transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        {/* Bottom bar - rotates to form X */}
        <span
          className={`block h-0.5 w-6 sm:w-7 bg-neutral-200 transition-all duration-300 ease-in-out ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* 
        Backdrop Overlay
        - Full-screen dark overlay behind menu panel
        - z-index: 45 (above page content, below menu panel)
        - Closes menu when clicked
        - Blur effect for visual depth
        - Only visible on mobile/tablet
      */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[45] lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
        />
      )}

      {/* 
        Slide-in Menu Panel
        - Mobile (<640px): 85vw width (leaves small gap to see background)
        - Tablet (≥640px, <1024px): Fixed 320px width
        - Slides from right edge
        - z-index: 50 (above backdrop, below chatbot)
        - Smooth transform animation
        - Prevents viewport overflow with max-width constraint
        - Safe area support for iOS notch
      */}
      <nav
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full max-h-[100dvh] w-[85vw] sm:w-80 max-w-[min(85vw,320px)] bg-background-alt border-l border-neutral-800 z-50 lg:hidden transition-transform duration-300 ease-in-out shadow-2xl overflow-x-hidden overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        role="navigation"
      >
        <div className="flex flex-col h-full w-full overflow-hidden">
          {/* 
            Menu Header
            - Logo and close button
            - Sticky at top
            - Border separator
          */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-800 flex-shrink-0">
            {/* Logo - truncates on very small screens */}
            <div className="font-display text-base sm:text-lg text-accent truncate">
              &lt;Alvi<span className="text-neutral-200">.redteam</span>&gt;
            </div>
            {/* Close button - 44x44px touch target */}
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-md hover:bg-neutral-800/50 active:bg-neutral-800/70 transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Close menu"
              type="button"
            >
              <span className="text-2xl sm:text-3xl text-neutral-400" aria-hidden="true">×</span>
            </button>
          </div>

          {/* 
            Menu Links
            - Scrollable if content exceeds viewport
            - Active state highlighting
            - 44px minimum height per link
            - Smooth hover transitions
          */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:gap-4 w-full">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3.5 rounded-lg text-base font-medium transition-colors min-h-[44px] flex items-center ${
                  pathname === "/"
                    ? "bg-accent text-white"
                    : "text-neutral-300 hover:bg-neutral-800/50 hover:text-accent active:bg-neutral-800/70"
                }`}
              >
                Home
              </Link>
              <Link
                href="/skills"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3.5 rounded-lg text-base font-medium transition-colors min-h-[44px] flex items-center ${
                  pathname === "/skills"
                    ? "bg-accent text-white"
                    : "text-neutral-300 hover:bg-neutral-800/50 hover:text-accent active:bg-neutral-800/70"
                }`}
              >
                Skills
              </Link>
              <Link
                href="/services"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3.5 rounded-lg text-base font-medium transition-colors min-h-[44px] flex items-center ${
                  pathname === "/services"
                    ? "bg-accent text-white"
                    : "text-neutral-300 hover:bg-neutral-800/50 hover:text-accent active:bg-neutral-800/70"
                }`}
              >
                Services
              </Link>
              <Link
                href="/projects"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3.5 rounded-lg text-base font-medium transition-colors min-h-[44px] flex items-center ${
                  pathname === "/projects"
                    ? "bg-accent text-white"
                    : "text-neutral-300 hover:bg-neutral-800/50 hover:text-accent active:bg-neutral-800/70"
                }`}
              >
                Projects
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3.5 rounded-lg text-base font-medium transition-colors min-h-[44px] flex items-center ${
                  pathname === "/blog"
                    ? "bg-accent text-white"
                    : "text-neutral-300 hover:bg-neutral-800/50 hover:text-accent active:bg-neutral-800/70"
                }`}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3.5 rounded-lg text-base font-medium transition-colors min-h-[44px] flex items-center ${
                  pathname === "/contact"
                    ? "bg-accent text-white"
                    : "text-neutral-300 hover:bg-neutral-800/50 hover:text-accent active:bg-neutral-800/70"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* 
            Menu Footer
            - Copyright notice
            - Sticky at bottom
            - Border separator
          */}
          <div className="p-4 sm:p-6 border-t border-neutral-800 flex-shrink-0">
            <p className="text-xs text-neutral-500 text-center">
              © {new Date().getFullYear()} Sheikh Abdullah Alvi
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}
