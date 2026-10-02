import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { Section } from "@/components/Section";
import { articleJsonLd, getBlogPost, getBlogPosts, renderPortableText } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: "article"
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const cmsBody = renderPortableText(post.body);

  return (
    <Section eyebrow={post.category} title={post.title}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
      />
      <article className="prose prose-lg max-w-3xl prose-headings:text-brand-ink prose-p:text-brand-muted">
        <p className="text-xl leading-8">{post.excerpt}</p>
        {cmsBody || (
          <>
            <h2>Start with the owner's real question</h2>
            <p>Strong EEE articles should answer the searcher's question early, then add local context for King, Snohomish, and Pierce county owners. This starter article is intentionally concise so editors can replace it in Sanity with a full monthly post before publication.</p>
            <h2>What owners should compare</h2>
            <p>Owners should look at communication, service scope, maintenance coordination, applicant screening process, reporting, and fee transparency. EEE should avoid unsupported statistics and avoid promising outcomes that depend on the market, property condition, or applicant activity.</p>
            <h2>Talk with a local manager</h2>
            <p>A practical next step is a direct conversation about the property, owner goals, and current management situation.</p>
          </>
        )}
      </article>
      <div className="mt-8"><ButtonLink href="/rental-estimate">Get My Free Rental Estimate</ButtonLink></div>
    </Section>
  );
}
