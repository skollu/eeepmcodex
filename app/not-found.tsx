import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { settings } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">404</p>
      <h1 className="text-4xl font-semibold text-brand-ink md:text-5xl">We Couldn't Find That Page</h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-brand-muted">
        The page may have moved, but we're still here to help.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/property-management-services" variant="secondary">Property Management Services</ButtonLink>
        <ButtonLink href="/rental-estimate" variant="secondary">Free Rental Estimate</ButtonLink>
        <Link className="rounded-md border border-brand-line px-5 py-3 font-semibold text-brand-forest" href={settings.appfolioRentals} target="_blank" rel="noopener noreferrer">
          Available Rentals
        </Link>
      </div>
    </section>
  );
}
