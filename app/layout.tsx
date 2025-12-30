import "./globals.css";
import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import Link from "next/link";
import { HamburgerMenu } from "@/components/HamburgerMenu";

/**
 * RootLayout Component
 * 
 * Main application layout with:
 * - Sticky header with responsive navigation
 * - Desktop navigation (≥1024px) - horizontal links
 * - Mobile/Tablet navigation (<1024px) - hamburger menu
 * - Safe area support for iOS devices
 * - Proper semantic HTML structure
 * - SEO optimized with comprehensive metadata
 */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    default: "Sheikh Abdullah Alvi | Red Team & Offensive Security",
    template: "%s | Alvi Red Team",
  },
  description:
    "Red Team Operator, Penetration Tester, and cybersecurity expert specializing in web, network, API, and cloud security. CEH certified, 5+ years experience. Open for remote roles and consulting.",
  keywords: [
    "red team",
    "penetration testing",
    "cybersecurity",
    "VAPT",
    "OSINT",
    "bug bounty",
    "security consultant",
    "CEH",
    "offensive security",
  ],
  authors: [{ name: "Sheikh Abdullah Alvi" }],
  creator: "Sheikh Abdullah Alvi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    siteName: "Alvi Red Team Portfolio",
    title: "Sheikh Abdullah Alvi | Red Team & Offensive Security",
    description:
      "Red Team Operator, Penetration Tester, and cybersecurity expert. CEH certified, 5+ years experience in VAPT, OSINT, and bug hunting.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sheikh Abdullah Alvi - Red Team Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheikh Abdullah Alvi | Red Team & Offensive Security",
    description: "Red Team Operator, Penetration Tester, and cybersecurity expert.",
    creator: "@alvi_redteam",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-dvh bg-background text-neutral-100">
        {/* 
          FULL-SCREEN HAMBURGER MENU OVERLAY
          ═══════════════════════════════════════════════════════════════════════
          CRITICAL: Rendered at BODY level (not inside header/nav/div) to escape
          all parent stacking contexts and be a TRUE full-screen overlay.
          
          Z-INDEX: 999999 (HIGHEST - above ALL page content)
          POSITION: fixed (attached to viewport)
          SIZE: 100vw × 100vh (covers entire viewport)
          
          This component MUST NOT be inside any element with:
          ✗ position + z-index
          ✗ transform
          ✗ filter
          ✗ opacity < 1
          ✗ perspective
        */}
        <HamburgerMenu />
        
        <div className="relative min-h-dvh cyber-grid">
          <header className="sticky top-0 z-30 border-b border-neutral-800 bg-background/95 backdrop-blur-md safe-area-top overflow-x-hidden">
            <div className="container mx-auto flex items-center justify-between py-3 sm:py-4 px-4 sm:px-6 max-w-full">
              <Link href="/" className="font-display text-base sm:text-lg md:text-xl tracking-tight text-accent whitespace-nowrap flex-shrink-0">
                &lt;Alvi<span className="text-neutral-200">.redteam</span>&gt;
              </Link>
              
              {/* Desktop Navigation (1024px+) */}
              <nav className="hidden lg:flex gap-4 xl:gap-6 text-sm text-neutral-300 overflow-x-hidden" aria-label="Main navigation">
                <Link href="/" className="hover:text-accent transition-colors whitespace-nowrap">
                  Home
                </Link>
                <Link href="/skills" className="hover:text-accent transition-colors whitespace-nowrap">
                  Skills
                </Link>
                <Link href="/services" className="hover:text-accent transition-colors whitespace-nowrap">
                  Services
                </Link>
                <Link href="/projects" className="hover:text-accent transition-colors whitespace-nowrap">
                  Projects
                </Link>
                <Link href="/blog" className="hover:text-accent transition-colors whitespace-nowrap">
                  Blog
                </Link>
                <Link href="/contact" className="hover:text-accent transition-colors whitespace-nowrap">
                  Contact
                </Link>
              </nav>
            </div>
          </header>
          <main className="container pb-12 sm:pb-16 pt-6 sm:pt-8 overflow-x-hidden max-w-full">{children}</main>
          <footer className="border-t border-neutral-800 bg-background/80 py-4 sm:py-6 px-4 text-center text-xs text-neutral-500 safe-area-bottom overflow-x-hidden max-w-full">
            © {new Date().getFullYear()} Sheikh Abdullah Alvi — Offensive Security & Red Teaming
          </footer>
        </div>
      </body>
    </html>
  );
}


