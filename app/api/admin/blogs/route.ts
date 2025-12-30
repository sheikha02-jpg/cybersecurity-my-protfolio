import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { verifyAuth } from "@/lib/auth";
import { sanitizeText, isValidSlug } from "@/lib/sanitize";
import { addSecurityHeaders } from "@/lib/securityHeaders";

export async function GET(request: NextRequest) {
  const user = verifyAuth(request);
  if (!user) {
    const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return addSecurityHeaders(response);
  }

  try {
    await connectDB();
    // Optimized query - only fetch needed fields
    const blogs = await Blog.find({})
      .select("title slug excerpt category published publishedAt createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean();
    const response = NextResponse.json(blogs);
    return addSecurityHeaders(response);
  } catch (error: any) {
    console.error("Blog fetch error:", error);
    const response = NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    return addSecurityHeaders(response);
  }
}

export async function POST(request: NextRequest) {
  const user = verifyAuth(request);
  if (!user) {
    const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return addSecurityHeaders(response);
  }

  try {
    const body = await request.json();
    let { title, slug, excerpt, content, category, image, published } = body;

    // Validation
    if (!title || !slug || !excerpt || !content || !category) {
      const response = NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      return addSecurityHeaders(response);
    }

    // Sanitize inputs
    title = sanitizeText(title);
    slug = slug.toLowerCase().trim();
    excerpt = sanitizeText(excerpt);
    content = sanitizeText(content);
    category = sanitizeText(category);
    image = image ? sanitizeText(image) : undefined;

    // Validate lengths
    if (title.length > 200 || excerpt.length > 500 || content.length > 50000) {
      const response = NextResponse.json({ error: "Input too long" }, { status: 400 });
      return addSecurityHeaders(response);
    }

    // Validate slug format
    if (!isValidSlug(slug)) {
      const response = NextResponse.json({ error: "Invalid slug format" }, { status: 400 });
      return addSecurityHeaders(response);
    }

    await connectDB();

    // Check if slug already exists
    const existing = await Blog.findOne({ slug });
    if (existing) {
      const response = NextResponse.json({ error: "Slug already exists" }, { status: 400 });
      return addSecurityHeaders(response);
    }

    const blog = new Blog({
      title,
      slug,
      excerpt,
      content,
      category,
      image,
      published: published || false,
      publishedAt: published ? new Date() : null,
    });
    await blog.save();

    const response = NextResponse.json({ success: true, blog: { id: blog._id, slug: blog.slug } });
    return addSecurityHeaders(response);
  } catch (error: any) {
    console.error("Blog creation error:", error);
    if (error.code === 11000) {
      const response = NextResponse.json({ error: "Slug already exists" }, { status: 400 });
      return addSecurityHeaders(response);
    }
    const response = NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
    return addSecurityHeaders(response);
  }
}

