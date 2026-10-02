import type { Metadata } from "next";
import "./globals.css";
import { AnalyticsScript } from "@/components/AnalyticsScript";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { settings } from "@/lib/content";
import { organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(settings.siteUrl),
  title: {
    default: "EEE Property Management | Greater Seattle Property Management",
    template: "%s | EEE Property Management"
  },
  description: "Local, responsive, transparent property management for owners across King, Snohomish, and Pierce counties.",
  openGraph: {
    type: "website",
    url: settings.siteUrl,
    title: "EEE Property Management",
    description: "Property management built by property owners for property owners.",
    images: ["/images/eee-placeholder.svg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AnalyticsScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
