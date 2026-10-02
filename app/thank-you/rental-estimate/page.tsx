import Link from "next/link";
import { Section } from "@/components/Section";
import { settings } from "@/lib/content";

export default function RentalEstimateThanksPage() {
  return (
    <Section title="Thanks — We've Received Your Property Information">
      <p className="max-w-2xl text-lg leading-8 text-brand-muted">We've received your request and a member of EEE Property Management will review the information you've provided.</p>
      <p className="mt-5 text-lg leading-8 text-brand-muted">If you'd prefer to speak with us directly, call <Link className="font-semibold text-brand-forest underline" href={settings.phoneHref}>{settings.phone}</Link>.</p>
    </Section>
  );
}
