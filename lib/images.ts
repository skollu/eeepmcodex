import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/lib/sanity";
import type { CmsImage } from "@/lib/site-types";

export function imageUrl(image?: CmsImage, width = 1400, requireAlt = true) {
  if (!image?.asset?._ref || (requireAlt && !image.alt?.trim())) return undefined;
  if (image.sourceType === "stock" && !stockImageApproved(image)) return undefined;
  try {
    return imageUrlBuilder(sanityClient).image(image).width(width).fit("max").auto("format").url();
  } catch {
    return undefined;
  }
}

export function stockImageApproved(image: CmsImage) {
  const https = (value?: string) => { try { return new URL(value || "").protocol === "https:"; } catch { return false; } };
  return image.approvedForWebsite === true && image.rightsVerified === true &&
    https(image.sourceUrl) && https(image.licenseUrl) && !!image.creator?.trim() &&
    !!image.licenseName?.trim() && (!image.attributionRequired || !!image.attributionText?.trim());
}

export function imageCaption(image?: CmsImage) {
  if (!image) return undefined;
  return [image.caption, image.sourceType === "stock" ? "Representative stock photography; not an EEE-managed property or EEE staff." : undefined, image.attributionText].filter(Boolean).join(" ") || undefined;
}
