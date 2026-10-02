import type { Metadata } from "next";
import { hasSanityConfig, sanityClient } from "@/lib/sanity";

export type CmsPage = {
  title?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  heroBody?: string;
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
};

export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  if (!hasSanityConfig) return null;

  return sanityClient.fetch<CmsPage | null>(
    `*[_type == "page" && published == true && slug.current == $slug][0]{
      title,
      heroHeadline,
      heroSubheadline,
      heroBody,
      seoTitle,
      metaDescription,
      canonicalUrl,
      noIndex
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export function pageMetadata(page: CmsPage | null, fallback: { title: string; description: string }): Metadata {
  return {
    title: page?.seoTitle || fallback.title,
    description: page?.metaDescription || fallback.description,
    alternates: page?.canonicalUrl ? { canonical: page.canonicalUrl } : undefined,
    robots: page?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: page?.seoTitle || fallback.title,
      description: page?.metaDescription || fallback.description
    }
  };
}
