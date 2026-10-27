import { CmsContent } from "@/components/CmsContent";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { ButtonLink } from "@/components/ButtonLink";
import { safeHref } from "@/lib/site-types";
import type { CmsPage } from "@/lib/pages";

export function PageExtras({ page }: { page: CmsPage | null }) {
  return (
    <>
      {page?.heroSubheadline && <p className="mb-4 text-xl text-brand-forest">{page.heroSubheadline}</p>}
      {page?.body?.length ? (
        <div className="mb-6">
          <CmsContent value={page.body} />
        </div>
      ) : null}
      {page?.heroImage && (
        <div className="mb-6 max-w-2xl">
          <PhotoPlaceholder image={page.heroImage} />
        </div>
      )}
      {page?.cta?.label && safeHref(page.cta.destination) && (
        <div className="mb-6">
          <ButtonLink href={page.cta.destination}>{page.cta.label}</ButtonLink>
        </div>
      )}
    </>
  );
}
