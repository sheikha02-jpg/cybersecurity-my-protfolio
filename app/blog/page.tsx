import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog | Penetration Testing Tips & Security Insights",
  description:
    "Expert insights on penetration testing, red team methodologies, security tools, performance optimization, and system design.",
};

async function getBlogPosts() {
  try {
    const { default: connectDB } = await import("@/lib/mongodb");
    const { default: Blog } = await import("@/models/Blog");
    await connectDB();
    // Optimized query with projection - only fetch needed fields
    const posts = await Blog.find({ published: true })
      .select("title excerpt slug image publishedAt createdAt category")
      .sort({ publishedAt: -1 })
      .limit(20)
      .lean();
    return posts.map((post: any) => ({
      id: post._id?.toString() || "",
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      image: post.image || null,
      publishedAt: post.publishedAt?.toISOString() || post.createdAt?.toISOString() || new Date().toISOString(),
      category: post.category,
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// ISR: Revalidate every hour
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold text-accent">Security Blog</h1>
        <p className="mt-4 max-w-2xl text-neutral-300">
          Penetration testing tips, red team methodologies, security tool reviews, and insights on
          performance optimization and system design.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="glass-panel p-12 text-center">
          <p className="text-neutral-400">No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-12">
          {posts.map((post, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <article
                key={post.id}
                className={`grid gap-8 md:grid-cols-2 items-center ${
                  !isEven ? "md:grid-flow-dense" : ""
                }`}
              >
                {post.image && (
                  <div
                    className={`aspect-video bg-neutral-900 rounded border border-neutral-800 ${
                      !isEven ? "md:col-start-2" : ""
                    }`}
                  />
                )}
                <div className={!isEven ? "md:col-start-1 md:row-start-1" : ""}>
                  <div className="text-xs uppercase tracking-wide text-accent mb-2">
                    {post.category}
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-neutral-100 mb-3">
                    <Link href={`/blog/${post.slug}`} className="hover:text-accent">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-neutral-300 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-neutral-400">
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-accent hover:text-red-400 font-semibold"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

