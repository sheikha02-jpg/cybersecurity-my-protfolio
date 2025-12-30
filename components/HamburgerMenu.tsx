"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button (Mobile/Tablet only) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex flex-col gap-1.5 w-11 h-11 sm:w-12 sm:h-12 items-center justify-center rounded-md hover:bg-neutral-800/50 active:bg-neutral-800/70 transition-colors z-50 min-h-[44px] min-w-[44px]"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span
          className={`block h-0.5 w-6 sm:w-7 bg-neutral-200 transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 sm:w-7 bg-neutral-200 transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 sm:w-7 bg-neutral-200 transition-all duration-300 ease-in-out ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-in Menu Panel */}
      <nav
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full max-h-[100dvh] w-[min(85vw,320px)] bg-background-alt border-l border-neutral-800 z-50 lg:hidden transition-transform duration-300 ease-in-out shadow-2xl overflow-x-hidden overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full w-full overflow-hidden">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-800 flex-shrink-0">
            <div className="font-display text-base sm:text-lg text-accent truncate">
              &lt;Alvi<span className="text-neutral-200">.redteam</span>&gt;
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-md hover:bg-neutral-800/50 active:bg-neutral-800/70 transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Close menu"
            >
              <span className="text-2xl sm:text-3xl text-neutral-400">×</span>
            </button>
          </div>

          {/* Menu Links */}
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

          {/* Menu Footer */}
          <div className="p-6 border-t border-neutral-800">
            <p className="text-xs text-neutral-500 text-center">
              © {new Date().getFullYear()} Sheikh Abdullah Alvi
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}
