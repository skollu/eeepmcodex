import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { CardGrid } from "@/components/Cards";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { serviceDetails } from "@/lib/content";
import { getCmsPage, pageMetadata } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("property-management-services");
  return pageMetadata(page, {
    title: "Property Management Services",
    description: "Reliable property management for Greater Seattle homeowners, including marketing, screening, leasing, maintenance coordination, inspections, and owner reporting."
  });
}

export default async function ServicesPage() {
  const cmsPage = await getCmsPage("property-management-services");

  return (
    <>
      <Hero
        title={cmsPage?.heroHeadline || "Reliable Property Management for Greater Seattle Homeowners"}
        body={cmsPage?.heroBody || "EEE Property Management helps rental property owners reduce stress, protect their properties and stay informed through responsive, transparent management."}
        primary={{ label: "Get My Free Rental Estimate", href: "/rental-estimate" }}
        secondary={{ label: "Ask a Question", href: "/contact" }}
      />
      <Section title="Full-Service Support">
        <CardGrid items={serviceDetails.map(([title, body]) => [title, body])} />
      </Section>
      <Section title="Let's Talk About Your Property" tone="green">
        <p className="max-w-2xl text-lg leading-8 text-white/80">Share a few details about your property and EEE will help you understand practical next steps.</p>
        <div className="mt-8"><ButtonLink href="/rental-estimate" variant="secondary">Get My Free Rental Estimate</ButtonLink></div>
      </Section>
    </>
  );
}
