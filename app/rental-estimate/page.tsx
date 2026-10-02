import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForms";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { Section } from "@/components/Section";
import { settings } from "@/lib/content";
import { getCmsPage, pageMetadata } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("rental-estimate");
  return pageMetadata(page, {
    title: "Free Rental Estimate",
    description: "Request a free rental estimate from EEE Property Management for your Greater Seattle rental property."
  });
}

export default async function RentalEstimatePage() {
  const cmsPage = await getCmsPage("rental-estimate");

  return (
    <Section eyebrow="Free rental estimate" title={cmsPage?.heroHeadline || "Find Out What Your Property Could Rent For"} tone="linen">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="order-2 space-y-5 lg:order-1">
          <div className="rounded-md border border-brand-line bg-white p-6 shadow-card">
            <p className="text-lg leading-8 text-brand-muted">Get a free rental estimate from local property owners and managers with more than 30 years of combined experience in the Greater Seattle area.</p>
            <p className="mt-4 text-lg leading-8 text-brand-muted">Whether you're renting your home for the first time, comparing management options or evaluating an investment property's potential, EEE can provide practical rental-pricing guidance based on the property and current market conditions.</p>
            <h2 className="pt-5 text-2xl font-semibold text-brand-ink">Speak Directly With a Local Property Manager</h2>
            <p className="mt-3 leading-7 text-brand-muted">No call centers. No automated sales teams. Just practical guidance from experienced local property owners and managers who understand the Greater Seattle rental market.</p>
          </div>
          <div className="hidden md:block">
            <PhotoPlaceholder
              compact
              label="Estimate page photography needed"
              requirement="EEE team member reviewing a rental home exterior, property condition, or owner-preparation checklist."
            />
          </div>
          <div className="rounded-md border border-brand-line bg-brand-mist p-5">
            <h2 className="font-semibold text-brand-ink">Prefer to talk first?</h2>
            <p className="mt-2 leading-7 text-brand-muted">Call EEE directly at <a className="font-semibold text-brand-forest underline" href={settings.phoneHref}>{settings.phone}</a> or use WhatsApp for an owner conversation.</p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <LeadForm kind="rental-estimate" />
        </div>
      </div>
    </Section>
  );
}
