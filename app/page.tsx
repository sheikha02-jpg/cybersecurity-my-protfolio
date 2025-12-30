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
      <section className="mt-10 grid gap-10 md:grid-cols-[3fr,2fr] items-center">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">
            Red Team / Offensive Security
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-50">
            Sheikh Abdullah <span className="text-accent">Alvi</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-neutral-300">
            Red Team Operator, penetration tester, and cybersecurity engineer specializing in
            real-world exploitation, VAPT, OSINT, and secure system design. CEH certified, Fiverr
            Level 2 Seller, and full‑stack developer (React, Next.js, Node.js, Django).
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-accent">
              Red Team Ops
            </span>
            <span className="rounded-full border border-neutral-700 bg-neutral-900/60 px-3 py-1">
              Web & API Pentesting
            </span>
            <span className="rounded-full border border-neutral-700 bg-neutral-900/60 px-3 py-1">
              OSINT & Bug Bounty
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <Link
              href="/contact"
              className="rounded-lg bg-accent px-5 py-2 font-semibold text-white shadow-accent-glow hover:bg-red-500"
            >
              Contact Alvi
            </Link>
            <Link
              href="/blog"
              className="rounded-lg border border-neutral-700 bg-transparent px-5 py-2 font-semibold text-neutral-200 hover:border-accent hover:text-accent"
            >
              Read Blogs
            </Link>
            <Link
              href="/projects"
              className="rounded-lg border border-neutral-700 bg-transparent px-5 py-2 font-semibold text-neutral-200 hover:border-accent hover:text-accent"
            >
              View Projects
            </Link>
          </div>
        </div>
        <div className="glass-panel relative p-5">
          <div className="absolute inset-x-0 -top-6 flex justify-center text-[10px] uppercase tracking-[0.3em] text-neutral-500">
            <span className="rounded-full border border-neutral-800 bg-background-alt px-3 py-1">
              Offensive Security Console
            </span>
          </div>
          <div className="mt-2 space-y-2 text-xs text-neutral-200 font-mono">
            <p>&gt; initializing red-team profile...</p>
            <p>&gt; loading VAPT methodologies...</p>
            <p>&gt; status: READY_FOR_EXPLOITATION_▁</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="rounded border border-neutral-800 bg-black/40 px-3 py-3">
              <div className="text-lg font-bold text-accent">5+</div>
              <div className="text-neutral-400">Years Experience</div>
            </div>
            <div className="rounded border border-neutral-800 bg-black/40 px-3 py-3">
              <div className="text-lg font-bold text-accent">200+</div>
              <div className="text-neutral-400">Vulns Found</div>
            </div>
            <div className="rounded border border-neutral-800 bg-black/40 px-3 py-3">
              <div className="text-lg font-bold text-accent">100%</div>
              <div className="text-neutral-400">Manual Focus</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-accent">Core Offensive Skillset</h2>
          <p className="mt-3 text-sm text-neutral-300">
            Web, network, API, and cloud security with deep expertise in OWASP Top 10, manual
            exploitation, and attack surface mapping.
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-neutral-200 md:grid-cols-2">
            <li>Web application penetration testing</li>
            <li>Network & infrastructure security</li>
            <li>API & authentication testing</li>
            <li>Red team engagement lifecycle</li>
            <li>OSINT & recon automation</li>
            <li>Secure system design & performance</li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl text-accent">Services at a Glance</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="glass-panel p-3">
              <div className="font-semibold text-neutral-100">Penetration Testing & VAPT</div>
              <p className="mt-1 text-neutral-300 text-xs">
                Comprehensive web, API, and network testing with detailed, developer‑friendly
                reports.
              </p>
            </div>
            <div className="glass-panel p-3">
              <div className="font-semibold text-neutral-100">Red Team Engagements</div>
              <p className="mt-1 text-neutral-300 text-xs">
                Realistic adversary simulations mapping from initial foothold to impact.
              </p>
            </div>
            <div className="glass-panel p-3">
              <div className="font-semibold text-neutral-100">Security Consulting</div>
              <p className="mt-1 text-neutral-300 text-xs">
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


