import type { Metadata } from "next";
import "./globals.css";
import { AnalyticsScript } from "@/components/AnalyticsScript";
import { SiteChrome } from "@/components/SiteChrome";
import { getSiteData } from "@/lib/cms";
import { SiteSettingsProvider } from "@/components/SiteSettingsProvider";
import { imageUrl } from "@/lib/images";
import { stagingNoIndex } from "@/lib/indexing";
import { organizationJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, seo } = await getSiteData();
  const socialImage = imageUrl(seo.defaultSocialImage || settings.defaultSeoImage, 1400, false);
  return {
  metadataBase: new URL(settings.siteUrl),
  title: {
    default: seo.defaultTitle || "EEE Property Management | Greater Seattle Property Management",
    template: "%s | EEE Property Management"
  },
  description: seo.defaultMetaDescription || "Local, responsive, transparent property management for owners across King, Snohomish, and Pierce counties.",
  robots: { index: !stagingNoIndex(), follow: !stagingNoIndex() },
  icons: imageUrl(settings.favicon, 64, false) ? { icon: imageUrl(settings.favicon, 64, false) } : undefined,
  openGraph: {
    type: "website",
    url: settings.siteUrl,
    title: "EEE Property Management",
    description: "Property management built by property owners for property owners.",
    images: socialImage ? [socialImage] : []
  }
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteData();
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AnalyticsScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(site.settings)).replace(/</g, "\\u003c") }}
        />
        <SiteSettingsProvider value={site}><SiteChrome>{children}</SiteChrome></SiteSettingsProvider>
      </body>
    </html>
  );
}
