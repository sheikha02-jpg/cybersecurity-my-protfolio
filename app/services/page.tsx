import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | Red Team & Security Consulting",
  description: "Penetration testing, red team engagements, vulnerability assessments, security audits, bug bounty assistance, OSINT, and cybersecurity consulting.",
};

export default function ServicesPage() {
  const services = [
    {
      title: "Penetration Testing",
      description:
        "Comprehensive security assessment of web applications, APIs, networks, and infrastructure. Manual exploitation focused on real-world attack scenarios.",
      useCases: [
        "Pre-deployment security validation",
        "Compliance requirements (PCI-DSS, HIPAA, etc.)",
        "Regular security health checks",
        "Third-party vendor assessments",
      ],
      for: "Organizations launching new products, undergoing compliance audits, or requiring periodic security validation.",
    },
    {
      title: "Red Team Engagement",
      description:
        "Full-spectrum adversary simulation mimicking real-world attackers. From initial foothold to data exfiltration and impact assessment.",
      useCases: [
        "Testing incident response capabilities",
        "Validating security controls effectiveness",
        "Executive-level security awareness",
        "Purple team collaboration",
      ],
      for: "Mature security organizations seeking to validate their defensive capabilities against sophisticated adversaries.",
    },
    {
      title: "Vulnerability Assessment",
      description:
        "Systematic identification and prioritization of security vulnerabilities across your attack surface. Automated scanning combined with manual verification.",
      useCases: [
        "Asset inventory & risk mapping",
        "Vulnerability prioritization",
        "Remediation planning",
        "Continuous security monitoring",
      ],
      for: "Organizations needing a comprehensive view of their security posture without full exploitation testing.",
    },
    {
      title: "Security Audit",
      description:
        "In-depth review of security policies, configurations, architecture, and code. Focus on secure design principles and industry best practices.",
      useCases: [
        "Architecture security review",
        "Configuration audit",
        "Code security assessment",
        "Policy & procedure evaluation",
      ],
      for: "Development teams and organizations requiring security guidance during design and implementation phases.",
    },
    {
      title: "Bug Bounty Assistance",
      description:
        "Expert guidance for bug bounty hunters and programs. Methodology refinement, report quality improvement, and vulnerability validation.",
      useCases: [
        "Bug bounty program setup",
        "Hunter training & mentorship",
        "Report triage & validation",
        "Exploitation technique guidance",
      ],
      for: "Bug bounty platforms, individual hunters seeking to improve their skills, and organizations launching programs.",
    },
    {
      title: "OSINT Investigation",
      description:
        "Open-source intelligence gathering for attack surface discovery, threat intelligence, and digital footprint analysis.",
      useCases: [
        "Attack surface mapping",
        "Threat actor profiling",
        "Digital footprint assessment",
        "Reconnaissance automation",
      ],
      for: "Security teams, threat intelligence units, and organizations needing comprehensive visibility into their external exposure.",
    },
    {
      title: "Security Consulting",
      description:
        "Strategic security guidance for development teams, architecture reviews, threat modeling, and secure development lifecycle integration.",
      useCases: [
        "Secure architecture design",
        "Threat modeling workshops",
        "SDLC security integration",
        "Security training & awareness",
      ],
      for: "Development teams, startups, and organizations building security into their products from the ground up.",
    },
  ];

  return (
    <div>
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-accent">Security Services</h1>
        <p className="mt-4 max-w-2xl text-neutral-300">
          Comprehensive offensive security services tailored to your needs. From penetration testing to
          red team engagements, focused on real-world exploitation and actionable remediation.
        </p>
      </div>

      <div className="space-y-8">
        {services.map((service, idx) => (
          <div key={idx} className="glass-panel p-6 md:p-8">
            <h2 className="font-display text-2xl font-semibold text-accent mb-3">{service.title}</h2>
            <p className="text-neutral-200 mb-6">{service.description}</p>

            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <div>
                <h3 className="text-sm font-semibold text-neutral-100 mb-3 uppercase tracking-wide">
                  Use Cases
                </h3>
                <ul className="space-y-2 text-sm text-neutral-300">
                  {service.useCases.map((useCase, ucIdx) => (
                    <li key={ucIdx} className="flex items-start gap-2">
                      <span className="text-accent mt-1">▸</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-100 mb-3 uppercase tracking-wide">
                  Who It's For
                </h3>
                <p className="text-sm text-neutral-300">{service.for}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 glass-panel p-6 text-center">
        <h2 className="font-display text-xl font-semibold text-accent mb-4">
          Ready to Secure Your Systems?
        </h2>
        <p className="text-neutral-300 mb-6">
          Let's discuss your security needs and design a tailored engagement.
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-white shadow-accent-glow hover:bg-red-500"
        >
          Get In Touch
        </Link>
      </div>
    </div>
  );
}

