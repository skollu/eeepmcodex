import type { MetadataRoute } from "next";
import { blogPosts, settings } from "@/lib/content";

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
  "/terms",
  "/thank-you/rental-estimate"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map((route) => ({
      url: `${settings.siteUrl}${route}`,
      lastModified: new Date()
    })),
    ...blogPosts.map((post) => ({
      url: `${settings.siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date)
    }))
  ];
}
