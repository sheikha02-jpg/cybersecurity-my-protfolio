import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { rateLimit } from "@/lib/rateLimit";
import { sanitizeText, isValidEmail } from "@/lib/sanitize";
import { addSecurityHeaders } from "@/lib/securityHeaders";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Sanitize inputs
    name = sanitizeText(name);
    email = sanitizeText(email);
    subject = sanitizeText(subject);
    message = sanitizeText(message);

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Validate lengths
    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }

    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateLimitResult = rateLimit(`contact:${ip}`, 5, 60000); // 5 requests per minute

    if (!rateLimitResult.allowed) {
      const response = NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
      response.headers.set("Retry-After", Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString());
      return addSecurityHeaders(response);
    }

    await connectDB();
    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    const response = NextResponse.json({ success: true, message: "Contact form submitted successfully" });
    return addSecurityHeaders(response);
  } catch (error: any) {
    console.error("Contact form error:", error);
    const response = NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 });
    return addSecurityHeaders(response);
  }
}

