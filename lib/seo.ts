import { settings } from "@/lib/content";

export function canonical(path = "") {
  return `${settings.siteUrl}${path}`;
}

export function organizationJsonLd(business = settings) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.company,
    url: business.siteUrl,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.street} ${business.address.suite}`,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "US"
    },
    areaServed: ["King County, WA", "Snohomish County, WA", "Pierce County, WA"]
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
