"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * ═══════════════════════════════════════════════════════════════════════════════════
 * HAMBURGER MENU - Full-Screen Mobile Overlay Navigation
 * ═══════════════════════════════════════════════════════════════════════════════════
 * 
 * RENDERED AT BODY LEVEL to escape all parent stacking contexts.
 * 
 * ARCHITECTURE:
 * ✓ position: fixed (viewport-attached, not document-attached)
 * ✓ inset: 0 (top: 0, right: 0, bottom: 0, left: 0)
 * ✓ width: 100vw, height: 100vh (full viewport coverage)
 * ✓ z-index: 999999 (HIGHEST - above ALL page content)
 * ✓ Slides from RIGHT (translateX(100%) → translateX(0))
 * ✓ No parent stacking context (placed at <body> root)
 * 
 * Z-INDEX HIERARCHY:
 * • Hamburger button:  z-1000000  ⭐ CLICKABLE ABOVE OVERLAY
 * • Menu overlay:      z-999999   ✓ FULL-SCREEN MENU
 * • Menu backdrop:     z-999998   ✓ DARK OVERLAY
 * • Page content:      z-0        ✗ HIDDEN
 * • Chatbot:           z-60       ✗ HIDDEN
 * • Icons:             z-30       ✗ HIDDEN
 */
export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Auto-close menu when navigating to a new page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle Escape key and lock/unlock body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    
    if (isOpen) {
      // LOCK BODY SCROLL when overlay is open
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      // UNLOCK BODY SCROLL when overlay closes
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      {/* 
        ═══════════════════════════════════════════════════════════════════════
        HAMBURGER BUTTON - Fixed Top-Right Corner (z-1000000)
        ═══════════════════════════════════════════════════════════════════════
        - Position: fixed (attached to viewport)
        - Location: top-right corner
        - z-index: 1000000 (ULTRA HIGH - clickable above overlay 999999)
        - Visible only on mobile (<1024px)
        - Animated icon transformation (☰ ↔ ✕)
        - Touch target: 44x44px minimum (WCAG AAA)
        
        CRITICAL: z-index must be higher than overlay (999999) to ensure
        users can always close the menu.
      */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hamburger-btn fixed top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 lg:hidden flex flex-col gap-1.5 w-12 h-12 items-center justify-center rounded-lg bg-background-alt/90 hover:bg-neutral-800/80 active:bg-neutral-800 transition-all duration-200 z-[1000000] min-h-[44px] min-w-[44px] border border-neutral-700/60 shadow-xl backdrop-blur-sm"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="menu-overlay-root"
        type="button"
      >
        {/* Top bar - rotates to form X when open */}
        <span
          className={`block h-0.5 w-7 bg-neutral-100 transition-all duration-300 ease-out ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
          aria-hidden="true"
        />
        {/* Middle bar - fades out when open */}
        <span
          className={`block h-0.5 w-7 bg-neutral-100 transition-all duration-300 ease-out ${
            isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
          aria-hidden="true"
        />
        {/* Bottom bar - rotates to form X when open */}
        <span
          className={`block h-0.5 w-7 bg-neutral-100 transition-all duration-300 ease-out ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* 
        ═══════════════════════════════════════════════════════════════════════
        DARK BACKDROP OVERLAY - Behind Menu Content
        ═══════════════════════════════════════════════════════════════════════
        - Position: fixed, inset: 0 (fills entire viewport)
        - Size: 100vw × 100vh
        - z-index: 999998 (just below menu overlay 999999)
        - Dark overlay (black/85) with blur effect
        - Click outside to close (outside click detection)
        - Covers all page content (chatbot, icons, etc)
        - Mobile/Tablet only (<1024px)
      */}
      {isOpen && (
        <div
          className="fixed inset-0 top-0 left-0 w-screen h-screen bg-black/85 backdrop-blur-lg z-[999998] lg:hidden"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") {
              e.preventDefault();
              setIsOpen(false);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close menu overlay"
        />
      )}

      {/* 
        ═══════════════════════════════════════════════════════════════════════
        FULL-SCREEN MENU OVERLAY - True Overlay Above All Content
        ═══════════════════════════════════════════════════════════════════════
        CRITICAL REQUIREMENTS:
        ✓ position: fixed (viewport-attached)
        ✓ inset: 0 (top/right/bottom/left: 0)
        ✓ width: 100vw, height: 100vh (full coverage)
        ✓ z-index: 999999 (HIGHEST - above ALL content)
        ✓ Slides from RIGHT (translateX(100%) → translateX(0))
        ✓ No parent stacking context (body-level)
        
        STACKING:
        • Hamburger button: z-1000000 (clickable above overlay)
        • Menu overlay:     z-999999  (visible, highest)
        • Dark backdrop:    z-999998  (supports menu)
        • Page content:     z-0       (hidden)
        • Chatbot:          z-60      (hidden)
        • Icons:            z-30      (hidden)
      */}
      <nav
        id="menu-overlay-root"
        className={`fixed inset-0 top-0 left-0 w-screen h-screen bg-gradient-to-br from-background via-background to-background-alt z-[999999] lg:hidden transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation menu"
        aria-hidden={!isOpen}
        role="navigation"
      >
        {/* Main container - Flexbox for vertical & horizontal centering */}
        <div className="flex flex-col items-center justify-center h-full w-full px-6 sm:px-8 md:px-12 py-8 relative overflow-hidden">
          
          {/* Close Button - Fixed in top-right corner of overlay */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 md:top-8 md:right-8 flex items-center justify-center w-14 h-14 rounded-full bg-neutral-900/60 hover:bg-accent/80 active:bg-accent transition-all duration-200 min-h-[44px] min-w-[44px] z-20 border-2 border-neutral-700/40 hover:border-accent/60 shadow-2xl group"
            aria-label="Close menu"
            type="button"
          >
            <span className="text-4xl text-neutral-300 group-hover:text-white font-light leading-none" aria-hidden="true">×</span>
          </button>

          {/* Logo - Positioned at top center */}
          <div className="absolute top-8 sm:top-10 md:top-12 left-1/2 -translate-x-1/2 font-display text-xl sm:text-2xl md:text-3xl text-accent text-center animate-slideDown">
            &lt;Alvi<span className="text-neutral-200">.redteam</span>&gt;
          </div>

          {/* 
            ═══════════════════════════════════════════════════════════
            MENU ITEMS - Centered Vertically & Horizontally
            ═══════════════════════════════════════════════════════════
            - Flexbox centers all items in viewport
            - Large touch targets (60px minimum)
            - Active page highlighted with accent color
            - Smooth hover/active scale effects
            - Auto-closes on any link click
          */}
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 w-full max-w-md animate-slideUp">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`menu-item w-full text-center px-10 py-4 rounded-2xl text-lg sm:text-xl md:text-2xl font-bold transition-all duration-200 min-h-[60px] flex items-center justify-center group ${
                  pathname === "/"
                    ? "bg-accent text-white shadow-[0_0_30px_rgba(255,46,46,0.5)] scale-105"
                    : "text-neutral-200 bg-neutral-900/40 hover:bg-accent/20 hover:text-accent hover:scale-105 hover:shadow-[0_0_20px_rgba(255,46,46,0.3)] active:scale-95 border border-neutral-800/60 hover:border-accent/50"
                }`}
              >
                <span className="group-hover:tracking-wider transition-all duration-200">Home</span>
              </Link>
              <Link
                href="/skills"
                onClick={() => setIsOpen(false)}
                className={`menu-item w-full text-center px-10 py-4 rounded-2xl text-lg sm:text-xl md:text-2xl font-bold transition-all duration-200 min-h-[60px] flex items-center justify-center group ${
                  pathname === "/skills"
                    ? "bg-accent text-white shadow-[0_0_30px_rgba(255,46,46,0.5)] scale-105"
                    : "text-neutral-200 bg-neutral-900/40 hover:bg-accent/20 hover:text-accent hover:scale-105 hover:shadow-[0_0_20px_rgba(255,46,46,0.3)] active:scale-95 border border-neutral-800/60 hover:border-accent/50"
                }`}
              >
                <span className="group-hover:tracking-wider transition-all duration-200">Skills</span>
              </Link>
              <Link
                href="/services"
                onClick={() => setIsOpen(false)}
                className={`menu-item w-full text-center px-10 py-4 rounded-2xl text-lg sm:text-xl md:text-2xl font-bold transition-all duration-200 min-h-[60px] flex items-center justify-center group ${
                  pathname === "/services"
                    ? "bg-accent text-white shadow-[0_0_30px_rgba(255,46,46,0.5)] scale-105"
                    : "text-neutral-200 bg-neutral-900/40 hover:bg-accent/20 hover:text-accent hover:scale-105 hover:shadow-[0_0_20px_rgba(255,46,46,0.3)] active:scale-95 border border-neutral-800/60 hover:border-accent/50"
                }`}
              >
                <span className="group-hover:tracking-wider transition-all duration-200">Services</span>
              </Link>
              <Link
                href="/projects"
                onClick={() => setIsOpen(false)}
                className={`menu-item w-full text-center px-10 py-4 rounded-2xl text-lg sm:text-xl md:text-2xl font-bold transition-all duration-200 min-h-[60px] flex items-center justify-center group ${
                  pathname === "/projects"
                    ? "bg-accent text-white shadow-[0_0_30px_rgba(255,46,46,0.5)] scale-105"
                    : "text-neutral-200 bg-neutral-900/40 hover:bg-accent/20 hover:text-accent hover:scale-105 hover:shadow-[0_0_20px_rgba(255,46,46,0.3)] active:scale-95 border border-neutral-800/60 hover:border-accent/50"
                }`}
              >
                <span className="group-hover:tracking-wider transition-all duration-200">Projects</span>
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsOpen(false)}
                className={`menu-item w-full text-center px-10 py-4 rounded-2xl text-lg sm:text-xl md:text-2xl font-bold transition-all duration-200 min-h-[60px] flex items-center justify-center group ${
                  pathname === "/blog"
                    ? "bg-accent text-white shadow-[0_0_30px_rgba(255,46,46,0.5)] scale-105"
                    : "text-neutral-200 bg-neutral-900/40 hover:bg-accent/20 hover:text-accent hover:scale-105 hover:shadow-[0_0_20px_rgba(255,46,46,0.3)] active:scale-95 border border-neutral-800/60 hover:border-accent/50"
                }`}
              >
                <span className="group-hover:tracking-wider transition-all duration-200">Blog</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className={`menu-item w-full text-center px-10 py-4 rounded-2xl text-lg sm:text-xl md:text-2xl font-bold transition-all duration-200 min-h-[60px] flex items-center justify-center group ${
                  pathname === "/contact"
                    ? "bg-accent text-white shadow-[0_0_30px_rgba(255,46,46,0.5)] scale-105"
                    : "text-neutral-200 bg-neutral-900/40 hover:bg-accent/20 hover:text-accent hover:scale-105 hover:shadow-[0_0_20px_rgba(255,46,46,0.3)] active:scale-95 border border-neutral-800/60 hover:border-accent/50"
                }`}
              >
                <span className="group-hover:tracking-wider transition-all duration-200">Contact</span>
              </Link>
            </div>

          {/* Footer - Fixed at bottom center */}
          <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 animate-slideUp">
            <p className="text-xs sm:text-sm text-neutral-500 text-center whitespace-nowrap">
              © {new Date().getFullYear()} Sheikh Abdullah Alvi
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}
