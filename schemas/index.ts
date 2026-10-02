import { blockContent } from "@/schemas/objects";
import { blogCategory } from "@/schemas/blogCategory";
import { blogPost } from "@/schemas/blogPost";
import { city } from "@/schemas/city";
import { faq } from "@/schemas/faq";
import { footerSettings } from "@/schemas/footerSettings";
import { leadMagnet } from "@/schemas/leadMagnet";
import { leadSubmission } from "@/schemas/leadSubmission";
import { navigationSettings } from "@/schemas/navigationSettings";
import { page } from "@/schemas/page";
import { seoSettings } from "@/schemas/seoSettings";
import { service } from "@/schemas/service";
import { siteSettings } from "@/schemas/siteSettings";
import { teamMember } from "@/schemas/teamMember";
import { testimonial } from "@/schemas/testimonial";

export const schemaTypes = [
  blockContent,
  siteSettings,
  navigationSettings,
  footerSettings,
  seoSettings,
  page,
  blogCategory,
  blogPost,
  testimonial,
  faq,
  teamMember,
  city,
  service,
  leadMagnet,
  leadSubmission
];
