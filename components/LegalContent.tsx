import { Section } from "@/components/Section";
import { PageExtras } from "@/components/PageExtras";
import { getCmsPage } from "@/lib/pages";

export async function LegalContent({
  slug,
  title,
  children
}: {
  slug: string;
  title: string;
  children: React.ReactNode;
}) {
  const page = await getCmsPage(slug);
  return (
    <Section headingLevel={1} title={page?.heroHeadline || title}>
      <div className="max-w-3xl space-y-5 leading-8 text-brand-muted">
        {page?.heroBody && <p>{page.heroBody}</p>}
        <PageExtras page={page} />
        {!page?.body?.length && children}
      </div>
    </Section>
  );
}
