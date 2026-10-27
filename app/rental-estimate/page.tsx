import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForms";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { Section } from "@/components/Section";
import { getSiteData } from "@/lib/cms";
import { PageExtras } from "@/components/PageExtras";
import { getCmsPage, pageMetadata } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("rental-estimate");
  return pageMetadata(page, {
    path: "/rental-estimate",
    title: "Free Rental Estimate",
    description: "Call or email EEE to discuss a free rental estimate for your Greater Seattle property. Online submissions are temporarily paused."
  });
}

export default async function RentalEstimatePage() {
  const cmsPage = await getCmsPage("rental-estimate");
  const { settings } = await getSiteData();

  return (
    <Section headingLevel={1} eyebrow="Free rental estimate" title={cmsPage?.heroHeadline || "Find Out What Your Property Could Rent For"} tone="linen">
      <PageExtras page={cmsPage ? { ...cmsPage, heroImage: undefined } : null} />
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="order-2 space-y-5 lg:order-1">
          <div className="rounded-md border border-brand-line bg-white p-6 shadow-card">
            <p className="text-lg leading-8 text-brand-muted">{cmsPage?.heroBody || "Call or email EEE to discuss a free rental estimate for your Greater Seattle property. Our team brings 30+ years of combined relevant real estate and property experience."}</p>
            <p className="mt-4 text-lg leading-8 text-brand-muted">Whether you're renting your home for the first time, comparing management options or evaluating an investment property's potential, EEE can provide practical rental-pricing guidance based on the property and current market conditions.</p>
            <h2 className="pt-5 text-2xl font-semibold text-brand-ink">Speak Directly With a Local Property Manager</h2>
            <p className="mt-3 leading-7 text-brand-muted">Talk with EEE about your property, your questions and the next steps. Rental estimates provide pricing guidance, not a guarantee of the rent a property will achieve.</p>
          </div>
          <div className="hidden md:block">
            <PhotoPlaceholder
              compact
              image={cmsPage?.heroImage}
              slot="inspectionPhoto"
            />
          </div>
          <div className="rounded-md border border-brand-line bg-brand-mist p-5">
            <h2 className="font-semibold text-brand-ink">Talk With EEE About Your Property</h2>
            <p className="mt-2 leading-7 text-brand-muted">Call <a className="font-semibold text-brand-forest underline" href={settings.phoneHref}>{settings.phone}</a> or email <a className="font-semibold text-brand-forest underline" href={settings.emailHref}>{settings.email}</a> to discuss your rental. Online submissions are temporarily paused.</p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <LeadForm kind="rental-estimate" />
        </div>
      </div>
    </Section>
  );
}
