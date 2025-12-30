import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { StructuredData } from "@/components/StructuredData";

async function getProject(slug: string) {
  try {
    const { default: connectDB } = await import("@/lib/mongodb");
    const { default: Project } = await import("@/models/Project");
    await connectDB();
    // Optimized query - only fetch needed fields
    const project: any = await Project.findOne({ slug, published: true })
      .select("title description tools category content slug")
      .lean();
    if (!project) return null;
    return {
      id: project._id?.toString() || "",
      title: project.title,
      description: project.description,
      tools: project.tools || [],
      category: project.category,
      content: project.content || project.description,
      slug: project.slug,
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

// ISR: Revalidate every hour
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return { title: "Project Not Found" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const url = `${siteUrl}/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url,
    },
    twitter: {
      card: "summary",
      title: project.title,
      description: project.description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const url = `${siteUrl}/projects/${project.slug}`;

  const projectSchema = {
    name: project.title,
    description: project.description,
    url,
    category: project.category,
    creator: {
      "@type": "Person",
      name: "Sheikh Abdullah Alvi",
    },
  };

  return (
    <>
      <StructuredData type="Article" data={projectSchema} />
      <div>
        <Link href="/projects" className="text-sm text-neutral-400 hover:text-accent mb-6 inline-block">
          ← Back to Projects
        </Link>

      <div className="mb-8">
        <div className="text-xs uppercase tracking-wide text-accent mb-2">{project.category}</div>
        <h1 className="font-display text-4xl font-bold text-accent mb-4">{project.title}</h1>
        <p className="text-neutral-300 max-w-2xl">{project.description}</p>
      </div>

      <div className="glass-panel p-6 mb-6">
        <h2 className="font-display text-xl font-semibold text-accent mb-4">Tools Used</h2>
        <div className="flex flex-wrap gap-2">
          {project.tools.map((tool: string, idx: number) => (
            <span
              key={idx}
              className="text-sm px-3 py-1 rounded border border-neutral-800 bg-neutral-900/60 text-neutral-200"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="glass-panel p-6">
        <div className="prose prose-invert max-w-none">
          <p className="text-neutral-300">{project.content}</p>
        </div>
      </div>
    </div>
    </>
  );
}

