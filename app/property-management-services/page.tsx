import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { CardGrid } from "@/components/Cards";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { CmsContent } from "@/components/CmsContent";
import { ServicePhotography } from "@/components/ServicePhotography";
import { serviceDetails } from "@/lib/content";
import { getCmsPage, pageMetadata } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("property-management-services");
  return pageMetadata(page, {
    path: "/property-management-services",
    title: "Property Management Services",
    description: "Reliable property management for Greater Seattle homeowners, including marketing, screening, leasing, maintenance coordination, inspections, and owner reporting."
  });
}

export default async function ServicesPage() {
  const cmsPage = await getCmsPage("property-management-services");

  return (
    <>
      <Hero
        showContactNotice
        primaryFromCms={!!cmsPage?.cta?.label && !!cmsPage.cta.destination}
        image={cmsPage?.heroImage}
        subheadline={cmsPage?.heroSubheadline}
        title={cmsPage?.heroHeadline || "Reliable Property Management for Greater Seattle Homeowners"}
        body={cmsPage?.heroBody || "EEE supports rental owners with marketing, in-person showings, leasing, rent collection, maintenance coordination and owner reporting across King, Snohomish, and Pierce counties."}
        primary={cmsPage?.cta?.label && cmsPage.cta.destination ? { label: cmsPage.cta.label, href: cmsPage.cta.destination } : { label: "Get My Free Rental Estimate", href: "/rental-estimate" }}
        secondary={{ label: "Ask a Question", href: "/contact" }}
      />
      <Section title="Full-Service Support">
        <CardGrid items={serviceDetails.map(([title, body]) => [title, body])} />
      </Section>
      <Section title="Let's Talk About Your Property" tone="green">
        <p className="max-w-2xl text-lg leading-8 text-white/80">Call or email EEE to discuss your property and a free rental estimate. Online submissions are temporarily paused.</p>
        <div className="mt-8"><ButtonLink href="/rental-estimate" variant="secondary">Get My Free Rental Estimate</ButtonLink></div>
      </Section>
      {cmsPage?.body?.length ? <Section><CmsContent value={cmsPage.body} /></Section> : null}
      <ServicePhotography />
    </>
  );
}
