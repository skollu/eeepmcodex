import { cache } from "react";
import { cmsFetch } from "@/lib/cms";
import { settings } from "@/lib/content";
import { CmsContent, type RichBlock } from "@/components/CmsContent";
import type { CmsImage } from "@/lib/site-types";

export type BlogPostSummary = {
  title: string; slug: string; excerpt: string; category: string; date: string; updatedDate?: string;
  seoTitle?: string; metaDescription?: string; canonicalUrl?: string; socialImage?: CmsImage;
  featuredImage?: CmsImage; author?: { name: string }; body?: RichBlock[];
  cta?: { label: string; destination: string };
};

export function articleReady(post: BlogPostSummary) {
  return !!post.body?.length && !/starter article|editors can replace|EEE should avoid|Strong EEE articles should|before publication|launch placeholder/i.test(JSON.stringify(post));
}

export const getBlogPosts = cache(async (): Promise<BlogPostSummary[]> => {
  const posts = await cmsFetch<BlogPostSummary[]>(`*[_type == "blogPost" && published == true && approvedForWebsite == true && defined(slug.current) && count(body)>0] | order(publishDate desc){
    title,"slug":slug.current,excerpt,"category":coalesce(category->title,"Property Management"),
    "date":coalesce(publishDate,_createdAt),updatedDate,seoTitle,metaDescription,canonicalUrl,socialImage,featuredImage,
    "author":author->{name},body,cta
  }`);
  return (posts || []).filter(articleReady);
});

export async function getBlogPost(slug: string) { return (await getBlogPosts()).find(post => post.slug === slug) || null; }
export function renderPortableText(body: BlogPostSummary["body"]) { return <CmsContent value={body} />; }
export function articleJsonLd(post: BlogPostSummary) {
  return { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt,
    datePublished: post.date, dateModified: post.updatedDate || post.date,
    mainEntityOfPage: new URL(`/blog/${post.slug}`, settings.siteUrl).toString(),
    ...(post.author?.name ? { author: { "@type": "Person", name: post.author.name } } : {}),
    publisher: { "@type": "Organization", name: settings.company, url: settings.siteUrl } };
}
