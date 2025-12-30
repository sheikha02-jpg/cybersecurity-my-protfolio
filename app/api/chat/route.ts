import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { sanitizeText } from "@/lib/sanitize";
import { addSecurityHeaders } from "@/lib/securityHeaders";
import { readFileSync } from "fs";
import path from "path";

// PRODUCTION: Explicitly use Node.js runtime (required for fs access)
export const runtime = "nodejs";

// SECURITY: Constants for limits and messages
const SAFE_FALLBACK_MESSAGE =
  "This information is not available. I am an AI model created by Alvi. For further questions, please contact Alvi directly.";

const MAX_MESSAGE_LENGTH = 500; // Maximum user input length
const RATE_LIMIT_MAX = 20; // Max requests per window
const RATE_LIMIT_WINDOW = 60000; // 1 minute window

// Knowledge file paths
const KNOWLEDGE_DIR = path.join(process.cwd(), "knowledge");
const FILES = {
  about: path.join(KNOWLEDGE_DIR, "about.json"),
  services: path.join(KNOWLEDGE_DIR, "services.json"),
  experience: path.join(KNOWLEDGE_DIR, "experience.json"),
  blogs: path.join(KNOWLEDGE_DIR, "blogs.json"),
} as const;

// TypeScript interfaces for knowledge data
type AboutData = {
  name: string;
  profession: string;
  experience: string;
  platform: string;
  summary: string;
  skills: string[];
  tech: string[];
};

type ServicesData = {
  services: { title: string; description: string }[];
};

type ExperienceData = {
  experienceYears: string;
  platform: string;
  focus: string;
  learning: string;
};

type BlogsData = {
  topics: string[];
  note?: string;
};

type KnowledgeCache = {
  about: AboutData | null;
  services: ServicesData | null;
  experience: ExperienceData | null;
  blogs: BlogsData | null;
  loaded: boolean;
  error?: string;
};

// PERFORMANCE: In-memory knowledge cache (loaded once, reused for all requests)
let knowledgeCache: KnowledgeCache = {
  about: null,
  services: null,
  experience: null,
  blogs: null,
  loaded: false,
};

// Load knowledge files into memory cache (called once on first request)
function loadKnowledgeCache(): void {
  if (knowledgeCache.loaded) return; // Already loaded

  try {
    knowledgeCache.about = loadJson<AboutData>(FILES.about);
    knowledgeCache.services = loadJson<ServicesData>(FILES.services);
    knowledgeCache.experience = loadJson<ExperienceData>(FILES.experience);
    knowledgeCache.blogs = loadJson<BlogsData>(FILES.blogs);
    knowledgeCache.loaded = true;
    console.log("✅ Knowledge cache loaded successfully");
  } catch (error) {
    knowledgeCache.error = "Failed to load knowledge files";
    console.error("❌ Knowledge cache load failed:", error);
  }
}

// Utility: Load and parse JSON file
function loadJson<T>(filePath: string): T | null {
  try {
    const raw = readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`Failed to load: ${filePath}`, error);
    return null;
  }
}

// INTENT MATCHING: Deterministic rule-based responses using cached knowledge
function ruleBasedResponse(query: string): string | null {
  const lowerQuery = query.toLowerCase().trim();

  // SECURITY: Reject empty queries
  if (!lowerQuery) return null;

  // Greetings
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)[!. ]*$/i.test(lowerQuery)) {
    return "Hello! I'm Alvi's AI assistant. Ask about his background, services, experience, or blog topics.";
  }

  // Who is Alvi / About
  if (lowerQuery.includes("who is alvi") || lowerQuery.includes("about alvi") || lowerQuery.includes("who are you")) {
    const about = knowledgeCache.about;
    if (!about) return SAFE_FALLBACK_MESSAGE;
    return `${about.name} is a ${about.profession} with ${about.experience} of experience on ${about.platform}. ${about.summary}`;
  }

  // Experience
  if (lowerQuery.includes("experience") || lowerQuery.includes("how long") || lowerQuery.includes("years")) {
    const exp = knowledgeCache.experience;
    if (!exp) return SAFE_FALLBACK_MESSAGE;
    return `Experience: ${exp.experienceYears}. Platform: ${exp.platform}. Focus: ${exp.focus} Learning: ${exp.learning}`;
  }

  // Services
  if (lowerQuery.includes("service") || lowerQuery.includes("offer") || lowerQuery.includes("hire")) {
    const services = knowledgeCache.services;
    if (!services || !services.services?.length) return SAFE_FALLBACK_MESSAGE;
    const list = services.services.map((s) => `${s.title} – ${s.description}`).join(" | ");
    return `Services: ${list}`;
  }

  // Skills / Expertise
  if (lowerQuery.includes("skill") || lowerQuery.includes("expertise") || lowerQuery.includes("tech stack") || lowerQuery.includes("tools")) {
    const about = knowledgeCache.about;
    if (!about) return SAFE_FALLBACK_MESSAGE;
    const skills = about.skills.join(", ");
    const tech = about.tech.join(", ");
    return `Core expertise: ${skills}. Tools & stack: ${tech}.`;
  }

  // Blogs / Topics
  if (lowerQuery.includes("blog") || lowerQuery.includes("article") || lowerQuery.includes("write")) {
    const blogs = knowledgeCache.blogs;
    if (!blogs) return SAFE_FALLBACK_MESSAGE;
    return `Blog topics: ${blogs.topics.join(", ")}.`;
  }

  // Location (unknown by design)
  if (lowerQuery.includes("where") && (lowerQuery.includes("from") || lowerQuery.includes("location") || lowerQuery.includes("country"))) {
    return SAFE_FALLBACK_MESSAGE;
  }

  return null; // No rule matched
}

// PRODUCTION-GRADE POST handler with security, caching, and error handling
export async function POST(request: NextRequest) {
  try {
    // PERFORMANCE: Load knowledge cache on first request (lazy initialization)
    loadKnowledgeCache();

    // SECURITY: Validate knowledge cache loaded successfully
    if (!knowledgeCache.loaded) {
      console.error("Knowledge cache failed to load");
      const response = NextResponse.json({ response: SAFE_FALLBACK_MESSAGE });
      return addSecurityHeaders(response);
    }

    // SECURITY: Parse and validate request body
    let body: any;
    try {
      body = await request.json();
    } catch {
      const response = NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
      return addSecurityHeaders(response);
    }

    let { message } = body;

    // SECURITY: Validate message exists and is string
    if (!message || typeof message !== "string") {
      const response = NextResponse.json({ error: "Message is required" }, { status: 400 });
      return addSecurityHeaders(response);
    }

    // SECURITY: Sanitize and validate message length
    message = sanitizeText(message);
    if (message.length === 0 || message.length > MAX_MESSAGE_LENGTH) {
      const response = NextResponse.json({ 
        error: `Message must be between 1 and ${MAX_MESSAGE_LENGTH} characters` 
      }, { status: 400 });
      return addSecurityHeaders(response);
    }

    // SECURITY: Rate limiting with IP detection
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";
    
    const rateLimitResult = rateLimit(`chat:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);

    if (!rateLimitResult.allowed) {
      const response = NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
      response.headers.set(
        "Retry-After", 
        Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
      );
      return addSecurityHeaders(response);
    }

    // INTENT MATCHING: Deterministic rule-based response using cached knowledge
    const ruleReply = ruleBasedResponse(message);
    if (ruleReply) {
      const response = NextResponse.json({ response: ruleReply });
      return addSecurityHeaders(response);
    }

    // FALLBACK: No match in knowledge -> safe fallback (no hallucination)
    const response = NextResponse.json({ response: SAFE_FALLBACK_MESSAGE });
    return addSecurityHeaders(response);

  } catch (error: any) {
    // ERROR HANDLING: Log error code only (not user data for privacy)
    console.error("Chat API error:", error?.code || "UNKNOWN");
    
    // Always return safe fallback on any error
    const response = NextResponse.json({ response: SAFE_FALLBACK_MESSAGE });
    return addSecurityHeaders(response);
  }
}

