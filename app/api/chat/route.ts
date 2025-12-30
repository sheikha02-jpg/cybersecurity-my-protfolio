import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { rateLimit } from "@/lib/rateLimit";
import { sanitizeText } from "@/lib/sanitize";
import { addSecurityHeaders } from "@/lib/securityHeaders";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a cybersecurity assistant representing Sheikh Abdullah Alvi (Alvi).

About Alvi:
- Professional penetration tester and red teamer
- 5+ years of experience working on Fiverr and local markets
- CEH (Certified Ethical Hacker) certified
- Currently restarting Red Team journey to become job-ready for remote roles
- Goal: Master offensive security from beginner → advanced → expert level
- Pursuing advanced offensive security certifications and Red Team roles
- Full-stack developer (React, Next.js, Node.js, Django)
- Fiverr Level 2 Seller
- Expert in OWASP Top 10, manual exploitation, VAPT, OSINT, bug hunting
- Writes blogs on penetration testing tips and tricks
- Focused on performance, system design, and DSA

Learning Preferences:
- Deep, structured, step-by-step learning
- Hands-on labs (prefers FREE or affordable ones)
- TryHackMe first, then Hack The Box for advanced skills
- Real-world attacker mindset, not theory-only
- Job-ready skills, interview questions, attack chains, report writing
- Daily plans, checklists, and clear milestones
- Professional-level answers, not beginner fluff

How to respond:
- Be precise, direct, and practical
- Explain WHY something matters in real attacks
- Recommend specific labs (TryHackMe paths, HTB machines) when relevant
- Map skills to job roles and advanced offensive security certifications
- Include tools, commands, techniques, and red team logic
- Explain attack chains end-to-end with MITRE ATT&CK mapping where relevant
- Prefer real-world enterprise scenarios (Windows AD focus)
- If multiple options exist, recommend the BEST one and explain briefly
- If unsure, suggest contacting Alvi directly via WhatsApp or Telegram
- Do not hallucinate or make up information
- Focus on Alvi's actual skills, experience, and learning journey
- Do NOT mention specific certification names or acronyms

Tone:
- Professional and mentor-like
- No unnecessary motivation talk
- No vague advice
- Treat users as serious Red Team operators in training

Primary Goal:
Help users understand Alvi's expertise and connect with him for:
- Red Team mentorship and guidance
- Penetration testing services
- Security consulting
- Learning resources and career advice`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { message, conversation = [] } = body;

    if (!message || typeof message !== "string") {
      const response = NextResponse.json({ error: "Message is required" }, { status: 400 });
      return addSecurityHeaders(response);
    }

    // Sanitize and validate message
    message = sanitizeText(message);
    if (message.length === 0 || message.length > 1000) {
      const response = NextResponse.json({ error: "Invalid message length" }, { status: 400 });
      return addSecurityHeaders(response);
    }

    // Validate conversation array
    if (!Array.isArray(conversation) || conversation.length > 20) {
      conversation = [];
    }

    if (!process.env.OPENAI_API_KEY) {
      const response = NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
      return addSecurityHeaders(response);
    }

    // Rate limiting - stricter for chat API
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateLimitResult = rateLimit(`chat:${ip}`, 20, 60000); // 20 requests per minute

    if (!rateLimitResult.allowed) {
      const response = NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
      response.headers.set("Retry-After", Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString());
      return addSecurityHeaders(response);
    }

    // Sanitize conversation history
    const sanitizedConversation = conversation
      .slice(-10) // Limit to last 10 messages
      .filter((msg: any) => msg.role && msg.content && typeof msg.content === "string")
      .map((msg: any) => ({
        role: msg.role === "user" || msg.role === "assistant" ? msg.role : "user",
        content: sanitizeText(msg.content).slice(0, 1000),
      }));

    const messages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...sanitizedConversation,
      { role: "user" as const, content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.6,
      max_tokens: 800,
    });

    const responseContent = completion.choices[0]?.message?.content || "I apologize, I couldn't generate a response.";

    const response = NextResponse.json({ response: responseContent });
    return addSecurityHeaders(response);
  } catch (error: any) {
    console.error("Chat API error:", error);
    const response = NextResponse.json(
      { error: "Failed to process chat message. Please try again or contact Alvi directly." },
      { status: 500 }
    );
    return addSecurityHeaders(response);
  }
}

