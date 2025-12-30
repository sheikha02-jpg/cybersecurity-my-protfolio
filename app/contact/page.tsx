"use client";

import type { Metadata } from "next";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div>
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-accent">Get In Touch</h1>
        <p className="mt-4 max-w-2xl text-neutral-300">
          Interested in penetration testing, red team engagement, or security consulting? Let's
          discuss your security needs.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="glass-panel p-6">
          <h2 className="font-display text-xl font-semibold text-accent mb-4">Contact Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-200 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded border border-neutral-800 bg-neutral-900/60 px-4 py-2 text-neutral-100 focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-200 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded border border-neutral-800 bg-neutral-900/60 px-4 py-2 text-neutral-100 focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-200 mb-1">
                Subject *
              </label>
              <select
                id="subject"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full rounded border border-neutral-800 bg-neutral-900/60 px-4 py-2 text-neutral-100 focus:border-accent focus:outline-none"
              >
                <option value="">Select a subject</option>
                <option value="penetration-testing">Penetration Testing</option>
                <option value="red-team">Red Team Engagement</option>
                <option value="vulnerability-assessment">Vulnerability Assessment</option>
                <option value="security-audit">Security Audit</option>
                <option value="bug-bounty">Bug Bounty Assistance</option>
                <option value="osint">OSINT Investigation</option>
                <option value="consulting">Security Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-200 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded border border-neutral-800 bg-neutral-900/60 px-4 py-2 text-neutral-100 focus:border-accent focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-lg bg-accent px-6 py-3 font-semibold text-white shadow-accent-glow hover:bg-red-500 disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-sm text-green-400">Message sent successfully! I'll get back to you soon.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">
                Failed to send message. Please try again or contact via WhatsApp/Telegram.
              </p>
            )}
          </form>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h2 className="font-display text-xl font-semibold text-accent mb-4">Quick Contact</h2>
            <p className="text-sm text-neutral-300 mb-4">
              For urgent inquiries or quick questions, reach out via:
            </p>
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-semibold text-neutral-100">WhatsApp</div>
                <a
                  href="https://wa.me/YOUR_PHONE_NUMBER"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-red-400"
                >
                  Click to chat
                </a>
              </div>
              <div>
                <div className="font-semibold text-neutral-100">Telegram</div>
                <a
                  href="https://t.me/YOUR_USERNAME"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-red-400"
                >
                  @your_username
                </a>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h2 className="font-display text-xl font-semibold text-accent mb-4">Response Time</h2>
            <p className="text-sm text-neutral-300">
              I typically respond within 24-48 hours. For urgent security incidents, please use
              WhatsApp or Telegram for faster response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

