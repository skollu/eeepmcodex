import { settings } from "@/lib/content";

export function stagingNoIndex() {
  // A Vercel production build on a staging hostname is still staging.
  return process.env.SITE_INDEXING !== "enabled" || process.env.VERCEL_ENV === "preview";
}
export function canonicalUrl(path: string) {
  return new URL(path, settings.siteUrl).toString();
}
