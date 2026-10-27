import Link from "next/link";
import { Section } from "@/components/Section";
import { getSiteData } from "@/lib/cms";
import { canonicalUrl } from "@/lib/indexing";

export const metadata = { title: "Rental Estimate Contact", description: "Contact EEE Property Management about your rental estimate.", alternates: { canonical: canonicalUrl("/thank-you/rental-estimate") }, robots: { index: false, follow: false } };

export default async function RentalEstimateThanksPage() {
  const { settings } = await getSiteData();
  return (
    <Section headingLevel={1} title="Contact EEE About Your Rental Estimate">
      <p className="max-w-2xl text-lg leading-8 text-brand-muted">Online submissions are temporarily paused. Please call or email EEE about your inquiry.</p>
      <p className="mt-4"><Link className="font-semibold text-brand-forest underline" href={settings.emailHref}>{settings.email}</Link></p>
      <p className="mt-5 text-lg leading-8 text-brand-muted">If you'd prefer to speak with us directly, call <Link className="font-semibold text-brand-forest underline" href={settings.phoneHref}>{settings.phone}</Link>.</p>
    </Section>
  );
}
