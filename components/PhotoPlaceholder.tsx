import Image from "next/image";
import { imageUrl } from "@/lib/images";
import { getSiteData } from "@/lib/cms";
import type { CmsImage } from "@/lib/site-types";

// Missing photographs are omitted; shot instructions belong in the CMS, not public pages.
export async function PhotoPlaceholder({ image, slot, priority = false, compact = false }: { image?: CmsImage; slot?: string; priority?: boolean; compact?: boolean }) {
  const { settings } = await getSiteData();
  const photo = image || (slot ? settings.photography?.[slot] : undefined);
  const src = imageUrl(photo);
  if (!src) return null;
  return <figure className={`relative overflow-hidden rounded-md border border-brand-line bg-white shadow-card ${compact ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
    <Image src={src} alt={photo!.alt!} fill sizes="(min-width: 1024px) 46vw, 100vw" priority={priority} className="object-cover" />
    {photo?.caption && <figcaption className="absolute inset-x-4 bottom-4 rounded-md bg-brand-evergreen p-4 text-sm leading-6 text-white">{photo.caption}</figcaption>}
  </figure>;
}
