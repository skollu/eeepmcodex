import type { MetadataRoute } from "next";
import { settings } from "@/lib/content";
import { getBlogPosts } from "@/lib/blog";
import { getCmsPage } from "@/lib/pages";

export const dynamic = "force-dynamic";

const routes = [
  "",
  "/property-management-services",
  "/rental-estimate",
  "/owner-faq",
  "/switching-property-managers",
  "/about",
  "/blog",
  "/contact",
  "/privacy",
  "/accessibility",
  "/fair-housing",
  "/terms"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const visible = await Promise.all(routes.map(async route => ({ route, page: await getCmsPage(route.slice(1) || "home") })));
  return [
    ...visible.filter(({ page }) => !page?.noIndex).map(({ route }) => ({
      url: `${settings.siteUrl}${route}`,
    })),
    ...posts.map((post) => ({
      url: `${settings.siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedDate || post.date)
    }))
  ];
}
