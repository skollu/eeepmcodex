import Image from "next/image";
import { imageCaption, imageUrl } from "@/lib/images";
import { getSiteData } from "@/lib/cms";
import type { CmsImage } from "@/lib/site-types";

// Missing photographs are omitted; shot instructions belong in the CMS, not public pages.
export async function PhotoPlaceholder({ image, slot, priority = false, compact = false }: { image?: CmsImage; slot?: string; priority?: boolean; compact?: boolean }) {
  const { settings } = await getSiteData();
  const photo = image || (slot ? settings.photography?.[slot] : undefined);
  if (slot === "founderPhoto" && photo?.sourceType === "stock") return null;
  const src = imageUrl(photo);
  if (!src) return null;
  const caption = imageCaption(photo);
  return <figure className="overflow-hidden rounded-md border border-brand-line bg-white shadow-card">
    <div className={`relative ${compact ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
      <Image src={src} alt={photo!.alt!} fill sizes="(min-width: 1024px) 46vw, 100vw" priority={priority} className="object-cover" />
    </div>
    {caption && <figcaption className="bg-brand-evergreen p-4 text-sm leading-6 text-white">{caption}</figcaption>}
  </figure>;
}
