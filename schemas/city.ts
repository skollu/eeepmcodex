import { defineField, defineType } from "sanity";

export const city = defineType({
  name: "city",
  title: "Service Area / City",
  type: "document",
  fields: [
    defineField({ name: "city", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "county", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "city" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "introductoryCopy", type: "text" }),
    defineField({ name: "localPropertyManagementContent", type: "blockContent", description: "Add differentiated local content before publishing. Avoid thin duplicate city pages." }),
    defineField({ name: "services", type: "array", of: [{ type: "reference", to: [{ type: "service" }] }] }),
    defineField({ name: "faqs", type: "array", of: [{ type: "reference", to: [{ type: "faq" }] }] }),
    defineField({ name: "featuredTestimonial", type: "reference", to: [{ type: "testimonial" }] }),
    defineField({ name: "localImage", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required().max(160) }] }),
    defineField({ name: "seoTitle", type: "string", validation: (Rule) => Rule.max(60) }),
    defineField({ name: "metaDescription", type: "text", validation: (Rule) => Rule.max(160) }),
    defineField({ name: "published", type: "boolean", initialValue: false })
  ]
});
