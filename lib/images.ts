import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/lib/sanity";
import type { CmsImage } from "@/lib/site-types";

export function imageUrl(image?: CmsImage, width = 1400, requireAlt = true) {
  if (!image?.asset?._ref || (requireAlt && !image.alt?.trim())) return undefined;
  try {
    return imageUrlBuilder(sanityClient).image(image).width(width).fit("max").auto("format").url();
  } catch {
    return undefined;
  }
}
