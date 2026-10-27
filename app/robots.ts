import type { MetadataRoute } from "next";
import { settings } from "@/lib/content";
import { stagingNoIndex } from "@/lib/indexing";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: stagingNoIndex() ? undefined : `${settings.siteUrl}/sitemap.xml`
  };
}
