import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { getBlogPosts } from "@/lib/blog";
import { getCmsPage, pageMetadata } from "@/lib/pages";
import { PageExtras } from "@/components/PageExtras";

export async function generateMetadata(): Promise<Metadata> { return pageMetadata(await getCmsPage("blog"), { title: "Blog", description: "Property management resources for Greater Seattle owners.", path: "/blog" }); }

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const cmsPage = await getCmsPage("blog");

  return (
    <Section headingLevel={1} title={cmsPage?.heroHeadline || "Property Management Resources for Greater Seattle Owners"}>
      <p className="mb-8 max-w-3xl text-lg leading-8 text-brand-muted">{cmsPage?.heroBody || "Practical guidance, rental-market insights and property-management resources for homeowners and real estate investors."}</p>
      <PageExtras page={cmsPage} />
      {!!posts.length && <div className="mb-8 flex flex-wrap gap-3">
        {[...new Set(posts.map(post => post.category))].map((category) => (
          <span className="rounded-md border border-brand-line bg-white px-3 py-2 text-sm font-semibold text-brand-forest" key={category}>{category}</span>
        ))}
      </div>}
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="rounded-md border border-brand-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
            <p className="text-sm font-semibold text-brand-gold">{post.category}</p>
            <h2 className="mt-3 text-xl font-semibold text-brand-ink">{post.title}</h2>
            <p className="mt-3 leading-7 text-brand-muted">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
