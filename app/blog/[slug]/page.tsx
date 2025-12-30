import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { StructuredData } from "@/components/StructuredData";

async function getBlogPost(slug: string) {
  try {
    const { default: connectDB } = await import("@/lib/mongodb");
    const { default: Blog } = await import("@/models/Blog");
    await connectDB();
    // Optimized query - only fetch needed fields
    const post: any = await Blog.findOne({ slug, published: true })
      .select("title excerpt slug content publishedAt createdAt category image")
      .lean();
    if (!post) return null;
    return {
      id: post._id?.toString() || "",
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      content: post.content,
      publishedAt: post.publishedAt?.toISOString() || post.createdAt?.toISOString() || new Date().toISOString(),
      category: post.category,
      image: post.image || null,
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
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
  const post = await getBlogPost(params.slug);
  if (!post) return { title: "Post Not Found" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const url = `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Sheikh Abdullah Alvi"],
      tags: [post.category],
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const url = `${siteUrl}/blog/${post.slug}`;

  const articleSchema = {
    headline: post.title,
    description: post.excerpt,
    image: post.image || `${siteUrl}/og-image.jpg`,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: "Sheikh Abdullah Alvi",
    },
    publisher: {
      "@type": "Person",
      name: "Sheikh Abdullah Alvi",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: post.category,
  };

  return (
    <>
      <StructuredData type="BlogPosting" data={articleSchema} />
      <div>
        <Link href="/blog" className="text-sm text-neutral-400 hover:text-accent mb-6 inline-block">
          ← Back to Blog
        </Link>

        <article itemScope itemType="https://schema.org/BlogPosting">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-wide text-accent mb-2">{post.category}</div>
          <h1 className="font-display text-4xl font-bold text-accent mb-4">{post.title}</h1>
          <time
            dateTime={post.publishedAt}
            className="text-sm text-neutral-400"
          >
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        <div className="glass-panel p-6 md:p-8">
          <div className="prose prose-invert max-w-none">
            <div
              className="text-neutral-200 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#x27;")
                  .replace(/\n/g, "<br />"),
              }}
            />
          </div>
        </div>
      </article>
    </div>
    </>
  );
}

