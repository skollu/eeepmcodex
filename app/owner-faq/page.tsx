import type { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { Section } from "@/components/Section";
import { faqs } from "@/lib/content";
import { getCmsPage, pageMetadata } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("owner-faq");
  return pageMetadata(page, {
    title: "Owner FAQ",
    description: "Property management questions answered for Greater Seattle rental property owners."
  });
}

const moreFaqs = [
  ["How much does property management cost?", "Costs vary by property and service scope. EEE can discuss management needs directly and provide clear information before an owner makes a decision."],
  ["What should I look for in a property manager?", "Look for responsive communication, clear reporting, consistent screening procedures, local knowledge, and a transparent approach to maintenance and fees."],
  ["How long does it take to rent a property?", "Timing depends on pricing, condition, location, seasonality, and market demand. EEE avoids promising a fixed leasing timeline."],
  ["How does EEE screen applicants?", "EEE uses consistently applied, lawful screening procedures designed to evaluate applications fairly and professionally."],
  ["What happens when rent isn't paid?", "EEE follows appropriate communication, documentation, and legal processes. Outcomes depend on the specific situation and applicable requirements."],
  ["Can EEE manage just one property?", "Yes. EEE works with owners of single rental homes as well as owners with multiple investment properties."],
  ["Does EEE conduct inspections?", "Yes, EEE emphasizes in-person inspections as part of hands-on local management."],
  ["Does EEE offer in-person showings?", "Yes. EEE emphasizes personal property showings rather than relying exclusively on unattended self-tour access."],
  ["Does EEE manage luxury rentals?", "Yes. EEE manages luxury single-family homes as part of its residential management services."],
  ["Can EEE work with my home warranty company?", "Where applicable, EEE can coordinate service needs with an owner's home-warranty provider."],
  ["Does EEE manage properties for owners outside Washington?", "Yes. EEE supports out-of-state and international owners who need dependable local oversight."]
] as const;

export default async function OwnerFaqPage() {
  const cmsPage = await getCmsPage("owner-faq");

  return (
    <Section title={cmsPage?.heroHeadline || "Property Management Questions, Answered"}>
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {["Getting Started", "Management Services", "Applicant Screening", "Maintenance", "Pricing", "Remote Ownership", "Switching Managers", "Communication", "Leasing"].map((category) => (
          <div className="rounded-md border border-brand-line bg-white p-4 text-sm font-semibold text-brand-forest" key={category}>{category}</div>
        ))}
      </div>
      <FAQ items={[...faqs, ...moreFaqs]} />
    </Section>
  );
}
