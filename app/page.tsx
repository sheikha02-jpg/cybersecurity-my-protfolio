import { FloatingContacts } from "@/components/FloatingContacts";
import dynamic from "next/dynamic";
import Link from "next/link";
import { StructuredData } from "@/components/StructuredData";

// Lazy load chatbot widget - only load when needed
const ChatbotWidget = dynamic(() => import("@/components/ChatbotWidget").then((mod) => ({ default: mod.ChatbotWidget })), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const personSchema = {
    name: "Sheikh Abdullah Alvi",
    jobTitle: "Red Team Operator & Penetration Tester",
    description: "Professional penetration tester and red teamer with 5+ years of experience. CEH certified.",
    url: siteUrl,
    sameAs: [
      // Add your social media links here
    ],
    knowsAbout: [
      "Penetration Testing",
      "Red Team Operations",
      "VAPT",
      "OSINT",
      "Bug Bounty",
      "Web Security",
      "Network Security",
    ],
  };

  const websiteSchema = {
    name: "Alvi Red Team Portfolio",
    url: siteUrl,
    description: "Red Team Operator, Penetration Tester, and cybersecurity expert portfolio.",
    publisher: {
      "@type": "Person",
      name: "Sheikh Abdullah Alvi",
    },
  };
  return (
    <>
      <StructuredData type="Person" data={personSchema} />
      <StructuredData type="WebSite" data={websiteSchema} />
      <section className="mt-4 sm:mt-6 md:mt-10 grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 lg:grid-cols-[1.5fr,1fr] items-start lg:items-center overflow-x-hidden max-w-full">
        <div className="w-full overflow-x-hidden">
          <p className="mb-2 sm:mb-3 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-accent">
            Red Team / Offensive Security
          </p>
          <h1 className="font-display text-neutral-50 break-words hyphens-auto">
            Sheikh Abdullah <span className="text-accent">Alvi</span>
          </h1>
          <p className="mt-3 sm:mt-4 max-w-full sm:max-w-2xl text-neutral-300 break-words">
            Red Team Operator, penetration tester, and cybersecurity engineer specializing in
            real-world exploitation, VAPT, OSINT, and secure system design. CEH certified, Fiverr
            Level 2 Seller, and full‑stack developer (React, Next.js, Node.js, Django).
          </p>
          <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 text-[10px] sm:text-xs">
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2 sm:px-3 py-1 sm:py-1.5 text-accent whitespace-nowrap">
              Red Team Ops
            </span>
            <span className="rounded-full border border-neutral-700 bg-neutral-900/60 px-2 sm:px-3 py-1 sm:py-1.5 whitespace-nowrap">
              Web & API Pentesting
            </span>
            <span className="rounded-full border border-neutral-700 bg-neutral-900/60 px-2 sm:px-3 py-1 sm:py-1.5 whitespace-nowrap">
              OSINT & Bug Bounty
            </span>
          </div>
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
            <Link
              href="/contact"
              className="rounded-lg bg-accent px-4 sm:px-5 py-2.5 sm:py-3 font-semibold text-white shadow-accent-glow hover:bg-red-500 transition-all hover:scale-105 active:scale-95 min-h-[44px] inline-flex items-center justify-center whitespace-nowrap"
            >
              Contact Alvi
            </Link>
            <Link
              href="/blog"
              className="rounded-lg border border-neutral-700 bg-transparent px-4 sm:px-5 py-2.5 sm:py-3 font-semibold text-neutral-200 hover:border-accent hover:text-accent transition-all hover:scale-105 active:scale-95 min-h-[44px] inline-flex items-center justify-center whitespace-nowrap"
            >
              Read Blogs
            </Link>
            <Link
              href="/projects"
              className="rounded-lg border border-neutral-700 bg-transparent px-4 sm:px-5 py-2.5 sm:py-3 font-semibold text-neutral-200 hover:border-accent hover:text-accent transition-all hover:scale-105 active:scale-95 min-h-[44px] inline-flex items-center justify-center whitespace-nowrap"
            >
              View Projects
            </Link>
          </div>
        </div>
        <div className="glass-panel relative p-3 sm:p-4 md:p-5 w-full overflow-x-hidden">
          <div className="absolute inset-x-0 -top-3 sm:-top-4 md:-top-6 flex justify-center text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-neutral-500">
            <span className="rounded-full border border-neutral-800 bg-background-alt px-2 sm:px-3 py-0.5 sm:py-1 whitespace-nowrap text-center">
              Offensive Security Console
            </span>
          </div>
          <div className="mt-2 space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs md:text-sm text-neutral-200 font-mono overflow-x-auto scrollbar-hide">
            <p className="whitespace-nowrap">&gt; initializing red-team profile...</p>
            <p className="whitespace-nowrap">&gt; loading VAPT methodologies...</p>
            <p className="whitespace-nowrap">&gt; status: READY_FOR_EXPLOITATION_▁</p>
          </div>
          <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-2 sm:gap-3 text-center text-xs">
            <div className="rounded border border-neutral-800 bg-black/40 px-1.5 sm:px-2 py-2 sm:py-3">
              <div className="text-sm sm:text-base md:text-lg font-bold text-accent">5+</div>
              <div className="text-neutral-400 text-[9px] sm:text-[10px] md:text-xs">Years</div>
            </div>
            <div className="rounded border border-neutral-800 bg-black/40 px-1.5 sm:px-2 py-2 sm:py-3">
              <div className="text-sm sm:text-base md:text-lg font-bold text-accent">200+</div>
              <div className="text-neutral-400 text-[9px] sm:text-[10px] md:text-xs">Vulns</div>
            </div>
            <div className="rounded border border-neutral-800 bg-black/40 px-1.5 sm:px-2 py-2 sm:py-3">
              <div className="text-sm sm:text-base md:text-lg font-bold text-accent">100%</div>
              <div className="text-neutral-400 text-[9px] sm:text-[10px] md:text-xs">Manual</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 sm:mt-12 md:mt-16 grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-2 overflow-x-hidden max-w-full">
        <div className="w-full overflow-x-hidden">
          <h2 className="font-display text-accent break-words">Core Offensive Skillset</h2>
          <p className="mt-2 sm:mt-3 text-neutral-300 break-words">
            Web, network, API, and cloud security with deep expertise in OWASP Top 10, manual
            exploitation, and attack surface mapping.
          </p>
          <ul className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-200">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">▸</span>
              <span>Web application penetration testing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">▸</span>
              <span>Network & infrastructure security</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">▸</span>
              <span>API & authentication testing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">▸</span>
              <span>Red team engagement lifecycle</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">▸</span>
              <span>OSINT & recon automation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">▸</span>
              <span>Secure system design & performance</span>
            </li>
          </ul>
        </div>
        <div className="w-full overflow-x-hidden">
          <h2 className="font-display text-accent break-words">Services at a Glance</h2>
          <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
            <div className="glass-panel p-2.5 sm:p-3 md:p-4 transition-all hover:border-accent/50">
              <div className="font-semibold text-neutral-100 text-xs sm:text-sm md:text-base break-words">Penetration Testing & VAPT</div>
              <p className="mt-1 text-neutral-300 text-[11px] sm:text-xs md:text-sm break-words">
                Comprehensive web, API, and network testing with detailed, developer‑friendly
                reports.
              </p>
            </div>
            <div className="glass-panel p-2.5 sm:p-3 md:p-4 transition-all hover:border-accent/50">
              <div className="font-semibold text-neutral-100 text-xs sm:text-sm md:text-base break-words">Red Team Engagements</div>
              <p className="mt-1 text-neutral-300 text-[11px] sm:text-xs md:text-sm break-words">
                Realistic adversary simulations mapping from initial foothold to impact.
              </p>
            </div>
            <div className="glass-panel p-2.5 sm:p-3 md:p-4 transition-all hover:border-accent/50">
              <div className="font-semibold text-neutral-100 text-xs sm:text-sm md:text-base break-words">Security Consulting</div>
              <p className="mt-1 text-neutral-300 text-[11px] sm:text-xs md:text-sm break-words">
                Architecture reviews, threat modelling, and secure development guidance for teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ChatbotWidget />
      <FloatingContacts />
    </>
  );
}


