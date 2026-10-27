import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { ShieldCheck, Settings2, KeyRound } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { PublishedTeam } from "@/components/PublishedContent";
import { CmsContent } from "@/components/CmsContent";
import { getCmsPage, pageMetadata } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("about");
  return pageMetadata(page, {
    path: "/about",
    title: "About",
    description: "Learn why EEE Property Management was built by local property owners for property owners."
  });
}

export default async function AboutPage() {
  const cmsPage = await getCmsPage("about");

  return (
    <>
      <Hero
        useGlobalPhoto={false}
        primaryFromCms={!!cmsPage?.cta?.label && !!cmsPage.cta.destination}
        image={cmsPage?.heroImage}
        subheadline={cmsPage?.heroSubheadline}
        title={cmsPage?.heroHeadline || "Property Management Built by Property Owners"}
        body={cmsPage?.heroBody || "EEE Property Management was created by local real estate investors who understand firsthand the challenges and responsibilities that come with owning rental property."}
        primary={cmsPage?.cta?.label && cmsPage.cta.destination ? { label: cmsPage.cta.label, href: cmsPage.cta.destination } : { label: "Talk With Our Team", href: "/contact" }}
      />
      <Section title="Why We Started EEE Property Management">
        <p className="max-w-3xl text-lg leading-8 text-brand-muted">After years of owning and managing rental properties, we saw many of the same frustrations repeated throughout the property-management experience. Owners struggled with delayed communication, unclear reporting, unexpected charges, poor follow-through and managers who felt disconnected from the owner's actual priorities. We created EEE to provide the kind of property management experience we wanted for our own investments.</p>
      </Section>
      <Section title="Ethics. Efficiency. Expertise." tone="white">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: "Ethics", body: "Do the right thing, communicate honestly and treat owners, residents and partners with respect.", Icon: ShieldCheck },
            { title: "Efficiency", body: "Respond quickly, solve problems practically and avoid unnecessary cost or complexity.", Icon: Settings2 },
            { title: "Expertise", body: "Apply real ownership and management experience to everyday decisions.", Icon: KeyRound }
          ].map(({ title, body, Icon }) => <article key={title} className="border-t-2 border-brand-gold pt-5">
            <Icon className="mb-4 h-7 w-7 text-brand-forest" aria-hidden />
            <h3 className="text-xl font-semibold text-brand-ink">{title}</h3>
            <p className="mt-3 leading-7 text-brand-muted">{body}</p>
          </article>)}
        </div>
      </Section>
      <Section title="Owners Managing for Owners">
        <p className="max-w-3xl text-lg leading-8 text-brand-muted">EEE's investor-owner perspective shapes the way we think about communication, property condition, expenses, and long-term value. The team brings more than 30 years of combined real estate and property experience to everyday decisions.</p>
      </Section>
      <Section title="Hands-On by Design" tone="white">
        <p className="max-w-3xl text-lg leading-8 text-brand-muted">EEE emphasizes direct owner communication, in-person showings, in-person inspections, maintenance coordination, and proactive problem solving.</p>
        <div className="mt-8"><ButtonLink href="/contact">Talk With Our Team</ButtonLink></div>
      </Section>
      <PublishedTeam />
      {cmsPage?.body?.length ? <Section><CmsContent value={cmsPage.body} /></Section> : null}
    </>
  );
}
