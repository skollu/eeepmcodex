import { settings as defaults } from "@/lib/content";

export type CmsImage = {
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
  sourceType?: "eee" | "stock" | "graphic";
  sourceUrl?: string;
  creator?: string;
  licenseName?: string;
  licenseUrl?: string;
  attributionRequired?: boolean;
  attributionText?: string;
  rightsVerified?: boolean;
  approvedForWebsite?: boolean;
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; width: number; height: number };
};
export type NavItem = { label: string; href: string; external?: boolean; children?: NavItem[] };
export type FooterColumn = { title: string; links: NavItem[] };
export type SiteSettings = typeof defaults & {
  primaryCtaLabel: string;
  primaryCtaDestination: string;
  logo?: CmsImage;
  favicon?: CmsImage;
  defaultSeoImage?: CmsImage;
  photography?: Record<string, CmsImage>;
  socialLinks?: Array<{ label: string; url: string }>;
};
export type SiteData = {
  settings: SiteSettings;
  navigation: NavItem[];
  footer: { note: string; columns: FooterColumn[] };
  seo: { defaultTitle?: string; defaultMetaDescription?: string; defaultSocialImage?: CmsImage };
};

export function safeHref(value?: string): string | undefined {
  if (!value || /[\u0000-\u0020\u007f\\]/.test(value)) return undefined;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const url = new URL(value);
    return ["https:", "mailto:", "tel:"].includes(url.protocol) ? value : undefined;
  } catch {
    return undefined;
  }
}

export function isExternal(href: string) {
  return href.startsWith("https://");
}
