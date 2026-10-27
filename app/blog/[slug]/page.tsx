import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { Section } from "@/components/Section";
import { articleJsonLd, getBlogPost, getBlogPosts, renderPortableText } from "@/lib/blog";
import { pageMetadata } from "@/lib/pages";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { safeHref } from "@/lib/site-types";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  const metadata = await pageMetadata({ seoTitle: post.seoTitle, metaDescription: post.metaDescription, canonicalUrl: post.canonicalUrl, openGraphImage: post.socialImage || post.featuredImage }, { title: post.title, description: post.excerpt, path: `/blog/${slug}` });
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article" } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const cmsBody = renderPortableText(post.body);

  return (
    <Section headingLevel={1} eyebrow={post.category} title={post.title}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)).replace(/</g, "\\u003c") }}
      />
      <article className="prose prose-lg max-w-3xl prose-headings:text-brand-ink prose-p:text-brand-muted">
        <p className="text-xl leading-8">{post.excerpt}</p>
        {post.author?.name && <p className="text-sm">{post.author.name}</p>}
        <PhotoPlaceholder image={post.featuredImage} />
        {cmsBody}
      </article>
      <div className="mt-8"><ButtonLink href={safeHref(post.cta?.destination) || "/rental-estimate"}>{post.cta?.label || "Get My Free Rental Estimate"}</ButtonLink></div>
    </Section>
  );
}
