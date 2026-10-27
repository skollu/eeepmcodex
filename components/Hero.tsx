import { ButtonLink } from "@/components/ButtonLink";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { getSiteData } from "@/lib/cms";
import { imageUrl } from "@/lib/images";
import { safeHref, type CmsImage } from "@/lib/site-types";

export async function Hero({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  image,
  subheadline,
  useGlobalPhoto = true,
  primaryFromCms = false
}: {
  eyebrow?: string;
  title: string;
  body: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  image?: CmsImage;
  subheadline?: string;
  useGlobalPhoto?: boolean;
  primaryFromCms?: boolean;
}) {
  const { settings } = await getSiteData();
  const photo = image || (useGlobalPhoto ? settings.photography?.heroPhoto : undefined);
  const hasPhoto = !!imageUrl(photo);
  if (!primaryFromCms && primary?.href === "/rental-estimate") primary = { label: settings.primaryCtaLabel === "Get Free Rental Estimate" ? primary.label : settings.primaryCtaLabel, href: settings.primaryCtaDestination };
  return (
    <section className="border-b border-brand-line bg-[linear-gradient(135deg,#fbfaf6_0%,#f7f3ea_48%,#eef3ef_100%)] px-6 py-12 md:py-16">
      <div className={`mx-auto grid max-w-7xl items-center gap-10 ${hasPhoto ? "lg:grid-cols-[1.02fr_0.98fr]" : ""}`}>
        <div>
          {eyebrow && <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">{eyebrow}</p>}
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-normal text-brand-ink md:text-6xl">{title}</h1>
          {subheadline && <p className="mt-4 text-xl font-semibold text-brand-forest">{subheadline}</p>}
          <p className="mt-5 max-w-2xl text-lg leading-8 text-brand-muted">{body}</p>
          {(primary || secondary) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primary && safeHref(primary.href) && <ButtonLink href={primary.href}>{primary.label}</ButtonLink>}
              {secondary && <ButtonLink href={secondary.href} variant="secondary">{secondary.label}</ButtonLink>}
            </div>
          )}
          <div className="mt-8 grid max-w-2xl gap-3 text-sm font-semibold text-brand-ink sm:grid-cols-3">
            <span className="rounded-md border border-brand-line bg-white/80 px-4 py-3">Direct owner communication</span>
            <span className="rounded-md border border-brand-line bg-white/80 px-4 py-3">In-person local support</span>
            <span className="rounded-md border border-brand-line bg-white/80 px-4 py-3">Transparent management</span>
          </div>
        </div>
        {hasPhoto && <PhotoPlaceholder priority image={photo} />}
      </div>
    </section>
  );
}
