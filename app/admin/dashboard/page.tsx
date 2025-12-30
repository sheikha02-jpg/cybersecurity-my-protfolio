import { redirect } from "next/navigation";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import Blog from "@/models/Blog";
import Project from "@/models/Project";

async function getDashboardData() {
  try {
    await connectDB();
    const [contacts, blogs, projects] = await Promise.all([
      Contact.countDocuments(),
      Blog.countDocuments(),
      Project.countDocuments(),
    ]);
    return { contacts, blogs, projects };
  } catch (error: any) {
    console.error("Database connection error:", error.message);
    // Return zeros if database is not available
    return { contacts: 0, blogs: 0, projects: 0 };
  }
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-accent">Admin Dashboard</h1>
        <Link
          href="/admin/logout"
          className="text-sm text-neutral-400 hover:text-accent"
        >
          Logout
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="glass-panel p-6">
          <div className="text-2xl font-bold text-accent">{data.contacts}</div>
          <div className="text-sm text-neutral-400 mt-1">Contact Messages</div>
          <Link href="/admin/contacts" className="text-xs text-accent hover:text-red-400 mt-2 inline-block">
            View All →
          </Link>
        </div>
        <div className="glass-panel p-6">
          <div className="text-2xl font-bold text-accent">{data.blogs}</div>
          <div className="text-sm text-neutral-400 mt-1">Blog Posts</div>
          <Link href="/admin/blogs" className="text-xs text-accent hover:text-red-400 mt-2 inline-block">
            Manage →
          </Link>
        </div>
        <div className="glass-panel p-6">
          <div className="text-2xl font-bold text-accent">{data.projects}</div>
          <div className="text-sm text-neutral-400 mt-1">Projects</div>
          <Link href="/admin/projects" className="text-xs text-accent hover:text-red-400 mt-2 inline-block">
            Manage →
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-panel p-6">
          <h2 className="font-display text-xl font-semibold text-accent mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link
              href="/admin/blogs/new"
              className="block rounded border border-neutral-800 bg-neutral-900/60 px-4 py-2 text-sm hover:border-accent"
            >
              + New Blog Post
            </Link>
            <Link
              href="/admin/projects/new"
              className="block rounded border border-neutral-800 bg-neutral-900/60 px-4 py-2 text-sm hover:border-accent"
            >
              + New Project
            </Link>
          </div>
        </div>
        <div className="glass-panel p-6">
          <h2 className="font-display text-xl font-semibold text-accent mb-4">Recent Activity</h2>
          <p className="text-sm text-neutral-400">Activity log will appear here</p>
        </div>
      </div>
    </div>
  );
}

