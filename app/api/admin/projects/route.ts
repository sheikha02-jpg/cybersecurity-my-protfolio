import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
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
    const projects = await Project.find({})
      .select("title slug description category tools published createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean();
    const response = NextResponse.json(projects);
    return addSecurityHeaders(response);
  } catch (error: any) {
    console.error("Project fetch error:", error);
    const response = NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
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
    let { title, slug, description, content, tools, category, image, published } = body;

    // Validation
    if (!title || !slug || !description || !category) {
      const response = NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      return addSecurityHeaders(response);
    }

    // Sanitize inputs
    title = sanitizeText(title);
    slug = slug.toLowerCase().trim();
    description = sanitizeText(description);
    content = content ? sanitizeText(content) : undefined;
    category = sanitizeText(category);
    image = image ? sanitizeText(image) : undefined;

    // Validate lengths
    if (title.length > 200 || description.length > 1000 || (content && content.length > 50000)) {
      const response = NextResponse.json({ error: "Input too long" }, { status: 400 });
      return addSecurityHeaders(response);
    }

    // Validate slug format
    if (!isValidSlug(slug)) {
      const response = NextResponse.json({ error: "Invalid slug format" }, { status: 400 });
      return addSecurityHeaders(response);
    }

    // Validate tools array
    if (!Array.isArray(tools)) {
      tools = [];
    }
    tools = tools.slice(0, 20).map((tool: any) => sanitizeText(String(tool))).filter(Boolean);

    await connectDB();

    // Check if slug already exists
    const existing = await Project.findOne({ slug });
    if (existing) {
      const response = NextResponse.json({ error: "Slug already exists" }, { status: 400 });
      return addSecurityHeaders(response);
    }

    const project = new Project({
      title,
      slug,
      description,
      content,
      tools,
      category,
      image,
      published: published || false,
    });
    await project.save();

    const response = NextResponse.json({ success: true, project: { id: project._id, slug: project.slug } });
    return addSecurityHeaders(response);
  } catch (error: any) {
    console.error("Project creation error:", error);
    if (error.code === 11000) {
      const response = NextResponse.json({ error: "Slug already exists" }, { status: 400 });
      return addSecurityHeaders(response);
    }
    const response = NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    return addSecurityHeaders(response);
  }
}

