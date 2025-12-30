import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects | Red Team & Security Portfolio",
  description: "Showcase of penetration testing projects, red team engagements, security research, and secure development work.",
};

async function getProjects() {
  try {
    const { default: connectDB } = await import("@/lib/mongodb");
    const { default: Project } = await import("@/models/Project");
    await connectDB();
    // Optimized query with projection - only fetch needed fields
    const projects = await Project.find({ published: true })
      .select("title description tools category image slug")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();
    return projects.map((project: any) => ({
      id: project._id?.toString() || "",
      title: project.title,
      description: project.description,
      tools: project.tools || [],
      category: project.category,
      image: project.image || null,
      slug: project.slug,
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// ISR: Revalidate every hour
export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-accent">Security Projects</h1>
        <p className="mt-4 max-w-2xl text-neutral-300">
          Real-world penetration testing engagements, red team operations, and security research
          projects. Each engagement focuses on manual exploitation and actionable remediation.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="glass-panel p-12 text-center">
          <p className="text-neutral-400">No projects available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="glass-panel p-6 hover:border-accent/50 transition-colors block"
            >
              {project.image && (
                <div className="mb-4 aspect-video bg-neutral-900 rounded border border-neutral-800" />
              )}
              <div className="text-xs uppercase tracking-wide text-accent mb-2">{project.category}</div>
              <h2 className="font-display text-xl font-semibold text-neutral-100 mb-2">
                {project.title}
              </h2>
              <p className="text-sm text-neutral-300 mb-4 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded border border-neutral-800 bg-neutral-900/60 text-neutral-400"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

