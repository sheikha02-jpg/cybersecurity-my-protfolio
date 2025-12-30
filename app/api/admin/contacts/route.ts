import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { verifyAuth } from "@/lib/auth";
import { addSecurityHeaders } from "@/lib/securityHeaders";

export async function GET(request: NextRequest) {
  const user = verifyAuth(request);
  if (!user) {
    const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return addSecurityHeaders(response);
  }

  try {
    await connectDB();
    // Optimized query - only fetch needed fields, limit to 100 most recent
    const contacts = await Contact.find({})
      .select("name email subject message read createdAt")
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    const response = NextResponse.json(contacts);
    return addSecurityHeaders(response);
  } catch (error: any) {
    console.error("Contact fetch error:", error);
    const response = NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
    return addSecurityHeaders(response);
  }
}

