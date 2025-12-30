import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills | Red Team & Offensive Security",
  description: "Comprehensive offensive security skillset: Web, Network, API, Cloud, OSINT, Red Team methodologies, and secure development.",
};

export default function SkillsPage() {
  const skillCategories = [
    {
      title: "Web Penetration Testing",
      skills: [
        "OWASP Top 10 exploitation",
        "IDOR & access control bypass",
        "Authentication & session management flaws",
        "Business logic vulnerabilities",
        "SQL injection & XSS (reflected/stored/DOM)",
        "CSRF & SSRF exploitation",
        "File upload vulnerabilities",
        "Manual exploitation techniques",
      ],
    },
    {
      title: "Network Security",
      skills: [
        "Internal & external network pentesting",
        "Privilege escalation (Windows/Linux)",
        "Active Directory exploitation",
        "Network misconfigurations",
        "Firewall & IDS evasion",
        "Wireless security assessment",
      ],
    },
    {
      title: "API Security",
      skills: [
        "REST & GraphQL API testing",
        "Broken authentication & authorization",
        "Token manipulation & JWT flaws",
        "Rate limiting bypass",
        "API endpoint enumeration",
        "Mass assignment vulnerabilities",
      ],
    },
    {
      title: "Cloud Security",
      skills: [
        "AWS/Azure/GCP security assessment",
        "IAM misconfigurations",
        "S3 bucket enumeration",
        "Cloud-native vulnerabilities",
        "Container security",
      ],
    },
    {
      title: "OSINT & Reconnaissance",
      skills: [
        "Attack surface discovery",
        "Digital footprint mapping",
        "Subdomain enumeration",
        "Social engineering intelligence",
        "Automated recon workflows",
      ],
    },
    {
      title: "Red Team Methodology",
      skills: [
        "Adversary simulation",
        "Kill chain execution",
        "Persistence & lateral movement",
        "Post-exploitation techniques",
        "Report writing & remediation guidance",
      ],
    },
    {
      title: "Programming & Development",
      skills: [
        "React & Next.js (full-stack)",
        "Node.js & Express",
        "Django & Python",
        "System design & architecture",
        "Performance optimization",
        "Data structures & algorithms",
      ],
    },
  ];

  return (
    <div>
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-accent">Offensive Security Skillset</h1>
        <p className="mt-4 max-w-2xl text-neutral-300">
          Comprehensive expertise in penetration testing, red team operations, and secure system design.
          Focused on manual exploitation, real-world attack scenarios, and developer-friendly remediation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="glass-panel p-6">
            <h2 className="font-display text-xl font-semibold text-accent mb-4">{category.title}</h2>
            <ul className="space-y-2 text-sm text-neutral-200">
              {category.skills.map((skill, skillIdx) => (
                <li key={skillIdx} className="flex items-start gap-2">
                  <span className="text-accent mt-1">▸</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 glass-panel p-6">
        <h2 className="font-display text-xl font-semibold text-accent mb-4">Certifications & Credentials</h2>
        <div className="grid gap-4 md:grid-cols-2 text-sm">
          <div>
            <div className="font-semibold text-neutral-100">CEH (Certified Ethical Hacker)</div>
            <p className="text-neutral-400 text-xs mt-1">Ethical hacking methodologies & tools</p>
          </div>
          <div>
            <div className="font-semibold text-neutral-100">Fiverr Level 2 Seller</div>
            <p className="text-neutral-400 text-xs mt-1">Proven track record in security services</p>
          </div>
        </div>
      </div>
    </div>
  );
}

