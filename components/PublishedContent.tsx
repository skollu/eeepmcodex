import Image from "next/image";
import { cmsFetch } from "@/lib/cms";
import { faqs } from "@/lib/content";
import { CmsContent, type RichBlock } from "@/components/CmsContent";
import { Section } from "@/components/Section";
import { imageUrl } from "@/lib/images";
import type { CmsImage } from "@/lib/site-types";

export async function PublishedFAQs({
  page = "home",
  fallback = faqs,
  section = false
}: {
  page?: string;
  fallback?: readonly (readonly [string, string])[];
  section?: boolean;
}) {
  const items = await cmsFetch<Array<{ _id: string; question: string; category?: string; answer: RichBlock[] }>>(
    `*[_type == "faq" && published == true && defined(question) && count(answer)>0 && (!defined(relatedPage) || relatedPage->slug.current == $page)] | order(displayOrder asc, _createdAt asc){_id,question,category,answer}`,
    { page }
  );
  if (items?.length === 0) return null;
  const content = (
    <div className="divide-y divide-brand-line rounded-md border border-brand-line bg-white">
      {items
        ? items.map((item) => (
            <details key={item._id} className="group p-6">
              <summary className="cursor-pointer font-semibold text-brand-ink">{item.question}</summary>
              <div className="mt-4">
                {item.category && <p className="mb-3 text-sm font-semibold text-brand-gold">{item.category}</p>}
                <CmsContent value={item.answer} />
              </div>
            </details>
          ))
        : fallback.map(([question, answer]) => (
            <details key={question} className="p-6">
              <summary className="cursor-pointer font-semibold text-brand-ink">{question}</summary>
              <p className="mt-4 leading-7 text-brand-muted">{answer}</p>
            </details>
          ))}
    </div>
  );
  return section ? (
    <Section title="Property Management Questions" tone="mist">
      {content}
    </Section>
  ) : (
    content
  );
}

export async function PublishedTestimonials() {
  const items = await cmsFetch<
    Array<{
      _id: string;
      text: string;
      customerDisplayName: string;
      city?: string;
      propertyType?: string;
      source?: string;
      photograph?: CmsImage;
    }>
  >(
    `*[_type == "testimonial" && published == true && approvedForWebsite == true && defined(text) && defined(customerDisplayName)] | order(featured desc, displayOrder asc){_id,text,customerDisplayName,city,propertyType,source,photograph}`
  );
  if (!items?.length) return null;
  return (
    <Section title="What Owners Say" tone="white">
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <figure key={item._id} className="rounded-md border border-brand-line p-5">
            <blockquote className="leading-8 text-brand-ink">{item.text}</blockquote>
            <figcaption className="mt-4 text-sm text-brand-muted">
              {item.photograph?.sourceType !== "stock" && imageUrl(item.photograph, 120) && (
                <Image
                  src={imageUrl(item.photograph, 120)!}
                  alt={item.photograph!.alt!}
                  width={60}
                  height={60}
                  className="mb-3 rounded-md"
                />
              )}
              {item.customerDisplayName}
              {item.city && `, ${item.city}`}
              {item.propertyType && <span className="mt-1 block">{item.propertyType}</span>}
              {item.source && <cite className="mt-1 block not-italic">{item.source}</cite>}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

export async function PublishedTeam() {
  const items = await cmsFetch<
    Array<{ _id: string; name: string; role: string; biography: RichBlock[]; headshot?: CmsImage }>
  >(
    `*[_type == "teamMember" && published == true && defined(name) && defined(role) && count(biography)>0] | order(displayOrder asc){_id,name,role,biography,headshot}`
  );
  if (!items?.length) return null;
  return (
    <Section title="Our Team" tone="white">
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <article key={item._id} className="space-y-4">
            {item.headshot?.sourceType !== "stock" && imageUrl(item.headshot, 700) && (
              <Image
                src={imageUrl(item.headshot, 700)!}
                alt={item.headshot!.alt!}
                width={700}
                height={700}
                className="aspect-square h-auto w-full rounded-md object-cover"
              />
            )}
            <h3 className="text-xl font-semibold text-brand-ink">{item.name}</h3>
            <p className="font-medium text-brand-forest">{item.role}</p>
            <CmsContent value={item.biography} />
          </article>
        ))}
      </div>
    </Section>
  );
}
