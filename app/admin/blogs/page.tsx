import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

async function getBlogs() {
  try {
    await connectDB();
    return await Blog.find({}).sort({ createdAt: -1 });
  } catch (error: any) {
    console.error("Database connection error:", error.message);
    return [];
  }
}

export default async function AdminBlogsPage() {
  const blogs = await getBlogs();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-accent">Manage Blog Posts</h1>
        <Link
          href="/admin/blogs/new"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
        >
          + New Post
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="glass-panel p-12 text-center">
          <p className="text-neutral-400 mb-4">No blog posts yet.</p>
          <Link href="/admin/blogs/new" className="text-accent hover:text-red-400">
            Create your first post →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog: any) => (
            <div key={blog._id?.toString() || blog.id} className="glass-panel p-6 flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-neutral-100">{blog.title}</h2>
                <p className="text-sm text-neutral-400 mt-1">{blog.excerpt}</p>
                <div className="flex gap-4 mt-2 text-xs text-neutral-500">
                  <span>{blog.published ? "Published" : "Draft"}</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/blogs/${blog._id?.toString() || blog.id}/edit`}
                  className="text-sm text-accent hover:text-red-400"
                >
                  Edit
                </Link>
                <Link
                  href={`/admin/blogs/${blog._id?.toString() || blog.id}/delete`}
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

