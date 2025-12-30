import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";

async function getProjects() {
  try {
    await connectDB();
    return await Project.find({}).sort({ createdAt: -1 });
  } catch (error: any) {
    console.error("Database connection error:", error.message);
    return [];
  }
}

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-accent">Manage Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
        >
          + New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="glass-panel p-12 text-center">
          <p className="text-neutral-400 mb-4">No projects yet.</p>
          <Link href="/admin/projects/new" className="text-accent hover:text-red-400">
            Create your first project →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project: any) => (
            <div key={project._id?.toString() || project.id} className="glass-panel p-6 flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-neutral-100">{project.title}</h2>
                <p className="text-sm text-neutral-400 mt-1">{project.description}</p>
                <div className="flex gap-4 mt-2 text-xs text-neutral-500">
                  <span>{project.published ? "Published" : "Draft"}</span>
                  <span>{project.category}</span>
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/projects/${project._id?.toString() || project.id}/edit`}
                  className="text-sm text-accent hover:text-red-400"
                >
                  Edit
                </Link>
                <Link
                  href={`/admin/projects/${project._id?.toString() || project.id}/delete`}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

