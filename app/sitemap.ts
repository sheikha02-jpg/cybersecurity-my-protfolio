import { MetadataRoute } from "next";

async function getBlogSlugs() {
  try {
    const { default: connectDB } = await import("@/lib/mongodb");
    const { default: Blog } = await import("@/models/Blog");
    await connectDB();
    const blogs = await Blog.find({ published: true }).select("slug publishedAt updatedAt").lean();
    return blogs.map((blog: any) => ({
      slug: blog.slug,
      publishedAt: blog.publishedAt || blog.createdAt,
      updatedAt: blog.updatedAt || blog.createdAt,
    }));
  } catch (error) {
    return [];
  }
}

async function getProjectSlugs() {
  try {
    const { default: connectDB } = await import("@/lib/mongodb");
    const { default: Project } = await import("@/models/Project");
    await connectDB();
    const projects = await Project.find({ published: true }).select("slug updatedAt createdAt").lean();
    return projects.map((project: any) => ({
      slug: project.slug,
      updatedAt: project.updatedAt || project.createdAt,
    }));
  } catch (error) {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const [blogs, projects] = await Promise.all([getBlogSlugs(), getProjectSlugs()]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...projectPages];
}

