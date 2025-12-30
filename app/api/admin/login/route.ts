import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import jwt from "jsonwebtoken";
import { rateLimit } from "@/lib/rateLimit";
import { sanitizeText } from "@/lib/sanitize";
import { addSecurityHeaders } from "@/lib/securityHeaders";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { username, password } = body;

    if (!username || !password) {
      const response = NextResponse.json({ error: "Username and password are required" }, { status: 400 });
      return addSecurityHeaders(response);
    }

    // Sanitize inputs
    username = sanitizeText(username);
    password = sanitizeText(password);

    // Validate lengths
    if (username.length > 50 || password.length > 200) {
      const response = NextResponse.json({ error: "Invalid input length" }, { status: 400 });
      return addSecurityHeaders(response);
    }

    // Rate limiting - very strict for login
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateLimitResult = rateLimit(`admin-login:${ip}`, 5, 900000); // 5 attempts per 15 minutes

    if (!rateLimitResult.allowed) {
      const response = NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429 }
      );
      response.headers.set("Retry-After", Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString());
      return addSecurityHeaders(response);
    }

    await connectDB();
    const admin = await Admin.findOne({ username }).select("+password"); // Explicitly select password

    // Always return same error message to prevent username enumeration
    if (!admin) {
      // Simulate password comparison timing to prevent timing attacks
      await new Promise((resolve) => setTimeout(resolve, 100));
      const response = NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      return addSecurityHeaders(response);
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      const response = NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      return addSecurityHeaders(response);
    }

    const token = jwt.sign({ id: admin._id.toString(), username: admin.username }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return addSecurityHeaders(response);
  } catch (error: any) {
    console.error("Admin login error:", error);
    const response = NextResponse.json({ error: "Login failed" }, { status: 500 });
    return addSecurityHeaders(response);
  }
}

