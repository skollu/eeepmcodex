import { blogPosts, settings } from "@/lib/content";
import { hasSanityConfig, sanityClient } from "@/lib/sanity";

export type BlogPostSummary = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  updatedDate?: string;
  seoTitle?: string;
  metaDescription?: string;
  body?: Array<{ _type: string; style?: string; children?: Array<{ text?: string; marks?: string[] }> }>;
};

const postFields = `{
  title,
  "slug": slug.current,
  excerpt,
  "category": coalesce(category->title, "Property Management"),
  "date": coalesce(publishDate, _createdAt),
  updatedDate,
  seoTitle,
  metaDescription,
  body
}`;

export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  if (!hasSanityConfig) return blogPosts;

  const posts = await sanityClient.fetch<BlogPostSummary[]>(
    `*[_type == "blogPost" && published == true && defined(slug.current)] | order(publishDate desc) ${postFields}`,
    {},
    { next: { revalidate: 60 } }
  );

  return posts.length ? posts : blogPosts;
}

export async function getBlogPost(slug: string): Promise<BlogPostSummary | null> {
  if (!hasSanityConfig) return blogPosts.find((post) => post.slug === slug) || null;

  const post = await sanityClient.fetch<BlogPostSummary | null>(
    `*[_type == "blogPost" && published == true && slug.current == $slug][0] ${postFields}`,
    { slug },
    { next: { revalidate: 60 } }
  );

  return post || blogPosts.find((item) => item.slug === slug) || null;
}

export function articleJsonLd(post: BlogPostSummary) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updatedDate || post.date,
    mainEntityOfPage: `${settings.siteUrl}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: settings.company,
      url: settings.siteUrl
    }
  };
}

export function renderPortableText(blocks: BlogPostSummary["body"]) {
  if (!blocks?.length) return null;

  return blocks.map((block, index) => {
    const text = block.children?.map((child) => child.text || "").join("") || "";
    if (!text) return null;
    if (block.style === "h2") return <h2 key={index}>{text}</h2>;
    if (block.style === "h3") return <h3 key={index}>{text}</h3>;
    return <p key={index}>{text}</p>;
  });
}
