import type { Metadata } from "next";
import { cache } from "react";
import { cmsFetch, getSiteData } from "@/lib/cms";
import { canonicalUrl, stagingNoIndex } from "@/lib/indexing";
import { imageUrl } from "@/lib/images";
import { safeHref, type CmsImage } from "@/lib/site-types";
import type { RichBlock } from "@/components/CmsContent";

export type CmsPage = {
  title?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  heroBody?: string;
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  heroImage?: CmsImage;
  openGraphImage?: CmsImage;
  body?: RichBlock[];
  cta?: { label: string; destination: string };
};

export const getCmsPage = cache(async (slug: string): Promise<CmsPage | null> => {
  return cmsFetch<CmsPage>(
    `*[_type == "page" && published == true && slug.current == $slug][0]{
      title,
      heroHeadline,
      heroSubheadline,
      heroBody,
      seoTitle,
      metaDescription,
      canonicalUrl,
      noIndex, heroImage, openGraphImage, body, cta
    }`,
    { slug }
  );
});

export async function pageMetadata(page: CmsPage | null, fallback: { title: string; description: string; path: string }): Promise<Metadata> {
  const { settings, seo } = await getSiteData();
  const canonical = page?.canonicalUrl?.startsWith("https://") && safeHref(page.canonicalUrl) || canonicalUrl(fallback.path);
  const socialImage = page?.openGraphImage || seo.defaultSocialImage || settings.defaultSeoImage;
  const image = imageUrl(socialImage, 1400, false);
  const globalTitle = fallback.path === "/" ? seo.defaultTitle : undefined;
  const title = page?.seoTitle || globalTitle || fallback.title;
  const description = page?.metaDescription || (fallback.path === "/" ? seo.defaultMetaDescription : undefined) || fallback.description;
  return {
    title: !page?.seoTitle && globalTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    robots: { index: !stagingNoIndex() && !page?.noIndex, follow: !stagingNoIndex() && !page?.noIndex },
    openGraph: {
      title,
      description,
      url: canonical,
      images: image ? [{ url: image, alt: socialImage?.alt || settings.company }] : []
    }
  };
}
