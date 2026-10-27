import "server-only";
import { cache } from "react";
import { sanityClient, hasSanityConfig } from "@/lib/sanity";
import { settings as defaults, navItems } from "@/lib/content";
import { safeHref, isExternal, type SiteData, type NavItem } from "@/lib/site-types";

// Published-only reads are request-deduplicated, never served from a stale CDN.
export async function cmsFetch<T>(query: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!hasSanityConfig) return null;
  try {
    return await sanityClient
      .withConfig({ useCdn: false, perspective: "published", token: process.env.SANITY_API_READ_TOKEN })
      .fetch<T>(query, params, { cache: "no-store" });
  } catch {
    console.error("Public CMS read unavailable.");
    return null;
  }
}

type CmsLink = { label?: string; url?: string; openInNewTab?: boolean; children?: CmsLink[] };
type RawSite = {
  companyName?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  streetAddress?: string;
  suite?: string;
  city?: string;
  state?: string;
  zip?: string;
  serviceAreaDescription?: string;
  primaryCtaLabel?: string;
  primaryCtaDestination?: string;
  appfolioRentalUrl?: string;
  appfolioOwnerPortalUrl?: string;
  appfolioTenantPortalUrl?: string;
  logo?: SiteData["settings"]["logo"];
  favicon?: SiteData["settings"]["favicon"];
  defaultSeoImage?: SiteData["settings"]["defaultSeoImage"];
  photography?: SiteData["settings"]["photography"];
  socialLinks?: Array<{ label: string; url: string }>;
};
type RawGlobals = {
  site: RawSite | null;
  navigation: { items?: CmsLink[] } | null;
  footer: { footerNote?: string; links?: Array<CmsLink & { group?: string }> } | null;
  seo: SiteData["seo"] | null;
};

export const getSiteData = cache(async (): Promise<SiteData> => {
  const raw = await cmsFetch<RawGlobals>(`{
    "site": *[_type == "siteSettings"] | order(_updatedAt desc)[0]{companyName,phone,email,whatsapp,streetAddress,suite,city,state,zip,serviceAreaDescription,primaryCtaLabel,primaryCtaDestination,logo,favicon,defaultSeoImage,photography,socialLinks,appfolioRentalUrl,appfolioOwnerPortalUrl,appfolioTenantPortalUrl},
    "navigation": *[_type == "navigationSettings"] | order(_updatedAt desc)[0]{items},
    "footer": *[_type == "footerSettings"] | order(_updatedAt desc)[0]{footerNote,links},
    "seo": *[_type == "seoSettings"] | order(_updatedAt desc)[0]{defaultTitle,defaultMetaDescription,defaultSocialImage}
  }`);
  const s = raw?.site;
  const phone = s?.phone && /\d{7}/.test(s.phone.replace(/\D/g, "")) ? s.phone : defaults.phone;
  const email = s?.email && safeHref(`mailto:${s.email}`) ? s.email : defaults.email;
  const digits = phone.replace(/\D/g, "");
  const phoneHref = s?.phone ? `tel:+${digits.length === 10 ? "1" : ""}${digits}` : defaults.phoneHref;
  const settings: SiteData["settings"] = {
    ...defaults,
    company: s?.companyName || defaults.company,
    phone,
    phoneHref,
    email,
    emailHref: `mailto:${email}`,
    whatsappHref:
      safeHref(s?.whatsapp) || (s?.whatsapp ? `https://wa.me/${s.whatsapp.replace(/\D/g, "")}` : defaults.whatsappHref),
    address: {
      street: s?.streetAddress || defaults.address.street,
      suite: s?.suite ?? defaults.address.suite,
      city: s?.city || defaults.address.city,
      state: s?.state || defaults.address.state,
      zip: s?.zip || defaults.address.zip
    },
    serviceArea: s?.serviceAreaDescription || defaults.serviceArea,
    primaryCtaLabel: s?.primaryCtaLabel || "Get Free Rental Estimate",
    primaryCtaDestination: safeHref(s?.primaryCtaDestination) || "/rental-estimate",
    appfolioRentals: s?.appfolioRentalUrl === defaults.appfolioRentals ? s.appfolioRentalUrl : defaults.appfolioRentals,
    appfolioOwnerPortal:
      s?.appfolioOwnerPortalUrl === defaults.appfolioOwnerPortal
        ? s.appfolioOwnerPortalUrl
        : defaults.appfolioOwnerPortal,
    appfolioTenantPortal:
      s?.appfolioTenantPortalUrl === defaults.appfolioTenantPortal
        ? s.appfolioTenantPortalUrl
        : defaults.appfolioTenantPortal,
    logo: s?.logo,
    favicon: s?.favicon,
    photography: s?.photography,
    defaultSeoImage: s?.defaultSeoImage,
    socialLinks: s?.socialLinks?.filter((link) => safeHref(link.url))
  };
  // AppFolio destinations stay fixed to the owner-approved account URLs.
  const portal = (label: string) =>
    label === "Owner Portal"
      ? settings.appfolioOwnerPortal
      : label === "Tenant Portal"
        ? settings.appfolioTenantPortal
        : label === "Available Rentals"
          ? settings.appfolioRentals
          : undefined;
  const link = (item: CmsLink): NavItem | null => {
    const children = item.children?.map(link).filter((v): v is NavItem => !!v);
    const href = portal(item.label || "") || safeHref(item.url) || children?.[0]?.href;
    return item.label && href
      ? { label: item.label, href, external: isExternal(href) || item.openInNewTab, children }
      : null;
  };
  const configured = raw?.navigation?.items?.filter(
    (c) => c.label !== "Available Rentals" && c.label !== "Owner Portal" && c.label !== "Tenant Portal"
  );
  const ordered = configured?.length
    ? [
        ...configured,
        ...navItems.filter(
          (i) => ["Owners", "Tenants"].includes(i.label) && !configured.some((c) => c.label === i.label)
        )
      ]
    : navItems.map((i) => ({ ...i, url: i.href }));
  const unique = ordered.filter((item, index) => ordered.findIndex((other) => other.label === item.label) === index);
  const navigation: NavItem[] = unique
    .map((custom) => {
      const item = navItems.find((i) => i.label === custom.label);
      if (item?.children) {
        const children = item.children.map(
          (child) =>
            link({ label: child.label, url: child.href, ...custom.children?.find((c) => c.label === child.label) }) ||
            child
        );
        const extra =
          custom.children
            ?.filter((c) => !item.children.some((child) => child.label === c.label))
            .map(link)
            .filter((v): v is NavItem => !!v) || [];
        return { label: item.label, href: item.href, children: [...children, ...extra] };
      }
      return link({ url: item?.href, ...custom });
    })
    .filter((item): item is NavItem => !!item);
  const footer: SiteData["footer"] = {
    note: raw?.footer?.footerNote || "Information on this site is general and not legal advice.",
    columns: [
      { title: "Owners", links: [...navigation.find((i) => i.label === "Owners")!.children!] },
      { title: "Tenants", links: [...navigation.find((i) => i.label === "Tenants")!.children!] },
      {
        title: "Company",
        links: ["About", "Blog", "Contact", "Privacy", "Accessibility", "Fair Housing", "Terms"].map((label, i) => ({
          label,
          href: ["/about", "/blog", "/contact", "/privacy", "/accessibility", "/fair-housing", "/terms"][i]
        }))
      }
    ]
  };
  for (const entry of raw?.footer?.links || []) {
    const resolved = link(entry);
    if (!resolved || !entry.group) continue;
    let column = footer.columns.find((c) => c.title === entry.group);
    if (!column) {
      column = { title: entry.group, links: [] };
      footer.columns.push(column);
    }
    const index = column.links.findIndex((l) => l.label === resolved.label);
    if (index < 0) column.links.push(resolved);
    else column.links[index] = resolved;
  }
  return { settings, navigation, footer, seo: raw?.seo || {} };
});
