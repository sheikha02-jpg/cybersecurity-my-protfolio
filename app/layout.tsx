import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Link from "next/link";

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
      <body className="min-h-screen bg-background text-neutral-100">
        <div className="relative min-h-screen cyber-grid">
          <header className="sticky top-0 z-30 border-b border-neutral-800 bg-background/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
              <div className="font-display text-lg tracking-tight text-accent">
                &lt;Alvi<span className="text-neutral-200">.redteam</span>&gt;
              </div>
              <nav className="flex gap-6 text-sm text-neutral-300" aria-label="Main navigation">
                <Link href="/" className="hover:text-accent">
                  Home
                </Link>
                <Link href="/skills" className="hover:text-accent">
                  Skills
                </Link>
                <Link href="/services" className="hover:text-accent">
                  Services
                </Link>
                <Link href="/projects" className="hover:text-accent">
                  Projects
                </Link>
                <Link href="/blog" className="hover:text-accent">
                  Blog
                </Link>
                <Link href="/contact" className="hover:text-accent">
                  Contact
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-4 pb-16 pt-8">{children}</main>
          <footer className="border-t border-neutral-800 bg-background/80 py-6 text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} Sheikh Abdullah Alvi — Offensive Security & Red Teaming
          </footer>
        </div>
      </body>
    </html>
  );
}


