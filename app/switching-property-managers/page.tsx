import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { CardGrid } from "@/components/Cards";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { getCmsPage, pageMetadata } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("switching-property-managers");
  return pageMetadata(page, {
    title: "Switching Property Managers",
    description: "A practical guide for owners thinking about changing property management companies."
  });
}

export default async function SwitchingPage() {
  const cmsPage = await getCmsPage("switching-property-managers");

  return (
    <>
      <Hero
        title={cmsPage?.heroHeadline || "Thinking About Switching Property Management Companies?"}
        body={cmsPage?.heroBody || "Changing property managers can feel complicated, especially when tenants are already in place. But staying with a management company that consistently leaves you frustrated can create even more stress."}
        primary={{ label: "Talk With EEE About Switching", href: "/contact" }}
      />
      <Section title="Common Reasons Owners Consider Switching">
        <CardGrid items={["Slow or inconsistent communication", "Maintenance delays", "Unexpected charges", "Unclear financial reporting", "Limited follow-through", "Difficulty reaching the manager", "Impersonal service", "Concerns about property oversight"]} />
      </Section>
      <Section title="A More Responsive Management Experience" tone="white">
        <p className="max-w-3xl text-lg leading-8 text-brand-muted">EEE focuses on direct communication, hands-on local management, transparent expectations, and an investor-owned perspective. Through this proactive approach, EEE Property Management has maintained an eviction rate of zero to date.</p>
      </Section>
      <Section title="What Happens When You Switch?">
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {["Initial conversation", "Review existing management situation", "Determine transition requirements", "Coordinate records/document transfer", "Establish owner communication", "Begin ongoing management"].map((step, index) => (
            <li key={step} className="rounded-md border border-brand-line bg-white p-5"><span className="text-sm font-semibold text-brand-gold">Step {index + 1}</span><p className="mt-2 font-semibold">{step}</p></li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-brand-muted">Transition options depend on the owner's current management agreement and circumstances. EEE does not provide legal advice or guarantee contract termination outcomes.</p>
        <div className="mt-8"><ButtonLink href="/contact">Talk With EEE About Switching</ButtonLink></div>
      </Section>
    </>
  );
}
