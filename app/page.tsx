import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { CardGrid, StatStrip } from "@/components/Cards";
import { PublishedFAQs, PublishedTestimonials } from "@/components/PublishedContent";
import { CmsContent } from "@/components/CmsContent";
import { Hero } from "@/components/Hero";
import { HandsOnApproach, ServiceBands, ValuesTriad } from "@/components/HomepageRefinements";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Section } from "@/components/Section";
import { stats } from "@/lib/content";
import { getSiteData } from "@/lib/cms";
import { getCmsPage, pageMetadata } from "@/lib/pages";

const audiences: Array<[string, string]> = [
  ["Renting Out Your Home for the First Time?", "EEE guides owners through pricing, marketing, applicants, leases, maintenance, and tenant communication so they can make informed decisions without handling every detail alone."],
  ["Managing Property From Out of State?", "EEE helps remote owners stay informed with responsive communication, local oversight, and practical management even when they are far from the property."],
  ["Frustrated With Your Current Property Manager?", "EEE provides a more personal, transparent management experience for owners tired of slow communication, unexpected charges, and poor follow-through."]
];

const process = ["Rental Evaluation", "Property Preparation", "Professional Marketing", "In-Person Showings", "Applicant Screening", "Leasing & Move-In", "Ongoing Management"];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("home");
  return pageMetadata(page, {
    path: "/",
    title: "Greater Seattle Property Management",
    description: "Local, responsive, transparent property management for owners across King, Snohomish, and Pierce counties."
  });
}

export default async function HomePage() {
  const cmsPage = await getCmsPage("home");
  const { settings } = await getSiteData();

  return (
    <>
      <Hero
        showContactNotice
        primaryFromCms={!!cmsPage?.cta?.label && !!cmsPage.cta.destination}
        image={cmsPage?.heroImage}
        subheadline={cmsPage?.heroSubheadline}
        eyebrow="Local property management for Greater Seattle owners"
        title={cmsPage?.heroHeadline || "Property Management That Protects Your Investment and Your Peace of Mind"}
        body={cmsPage?.heroBody || "EEE helps rental property owners across King, Snohomish, and Pierce counties handle leasing, tenant communication and day-to-day property management, whether they live nearby or manage from a distance."}
        primary={cmsPage?.cta?.label && cmsPage.cta.destination ? { label: cmsPage.cta.label, href: cmsPage.cta.destination } : { label: "Get My Free Rental Estimate", href: "/rental-estimate" }}
        secondary={{ label: "Call Us Today", href: settings.phoneHref }}
      />
      <section className="bg-white px-6 py-6">
        <div className="mx-auto max-w-7xl"><StatStrip stats={stats} /></div>
      </section>
      <Section title="A Local Team You Can Talk To" tone="linen">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4 text-lg leading-8 text-brand-muted">
            <p>Clear communication matters when someone else is managing your rental. EEE's approach is designed to keep owners informed about everyday decisions.</p>
            <p>At EEE Property Management, communication is designed to be simple, responsive and transparent. We treat every property with the care and attention we would expect for our own investments.</p>
            <ButtonLink href="/contact">Talk With My Property Manager</ButtonLink>
          </div>
          <div className="rounded-md border border-brand-line bg-white p-6 shadow-card">
            <ul className="grid gap-4">
              {["Clear communication", "Consistent applicant screening", "Proactive maintenance coordination", "Transparent owner reporting", "Responsive local support"].map((item) => (
                <li key={item} className="border-l-2 border-brand-gold pl-4 font-semibold text-brand-ink">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section title="Full-Service Property Management for Busy Homeowners" tone="white">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
          <div>
            <p className="text-lg leading-8 text-brand-muted">Whether you own one rental home or multiple investment properties, EEE helps simplify the day-to-day work of property ownership while protecting the property's long-term value.</p>
            <div className="mt-6"><ButtonLink href="/property-management-services" variant="secondary">Explore Property Management Services</ButtonLink></div>
            <div className="mt-8">
              <PhotoPlaceholder
                compact
                slot="showingPhoto"
              />
            </div>
          </div>
          <ServiceBands />
        </div>
      </Section>
      <Section title="Property Management Built Around Real Owner Needs" tone="mist">
        <CardGrid items={audiences} />
        <div className="mt-8"><ButtonLink href="/switching-property-managers">See How Switching Works</ButtonLink></div>
      </Section>
      <Section title="Built Around the Owner's Perspective" tone="white">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4 leading-8 text-brand-muted">
            <p>EEE Property Management is investor-owned and operated. Our team brings 30+ years of combined relevant real estate and property experience to the work.</p>
            <p>We created EEE to provide the kind of property management experience we wanted for our own investments: clear communication, practical reporting and consistent follow-through.</p>
            <p>Our approach focuses on protecting the property, communicating clearly, addressing problems early and making ownership easier.</p>
            <PhotoPlaceholder
              compact
              slot="founderPhoto"
            />
          </div>
          <ValuesTriad />
        </div>
      </Section>
      <Section title="What Hands-On Management Looks Like" tone="linen">
        <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
          <div>
            <p className="text-lg leading-8 text-brand-muted">
              EEE's approach is designed around the places where rental ownership often becomes stressful: communication, showings, maintenance, presentation and follow-through.
            </p>
          </div>
          <HandsOnApproach />
        </div>
      </Section>
      <Section title="A Clearer Way to Manage Your Rental" tone="green">
        <ProcessTimeline steps={process} />
        <div className="mt-8"><ButtonLink href="/rental-estimate" variant="secondary">Start With My Free Rental Estimate</ButtonLink></div>
      </Section>
      <Section title="Looking for a Rental?" tone="white">
        <p className="max-w-2xl text-lg leading-8 text-brand-muted">Browse currently available rental properties managed by EEE Property Management.</p>
        <div className="mt-6">
          <ButtonLink href={settings.appfolioRentals} external analyticsEvent="available_rentals_clicked" analyticsParams={{ location: "homepage" }}>
            View Available Rentals
          </ButtonLink>
        </div>
      </Section>
      <PublishedFAQs section />
      <Section title="Property Management Should Make Ownership Easier" tone="green">
        <p className="max-w-3xl text-lg leading-8 text-white/80">Whether you're preparing to rent your property, managing an investment from a distance or considering a change from your current management company, let's talk about what you need.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/rental-estimate" variant="secondary">Get My Free Rental Estimate</ButtonLink>
          <Link href={settings.phoneHref} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/30 px-5 py-3 font-semibold text-white">
            Call {settings.phone} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Section>
      {cmsPage?.body?.length ? <Section><CmsContent value={cmsPage.body} /></Section> : null}
      <PublishedTestimonials />
    </>
  );
}
