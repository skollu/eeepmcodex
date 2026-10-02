import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "pageType", title: "Page Type", type: "string", options: { list: ["Home", "Service", "Landing", "Legal", "General"] } }),
    defineField({ name: "heroHeadline", type: "string", validation: (Rule) => Rule.max(90) }),
    defineField({ name: "heroSubheadline", type: "string", validation: (Rule) => Rule.max(160) }),
    defineField({ name: "heroBody", type: "text" }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required().max(160) }] }),
    defineField({ name: "body", title: "Flexible Content Sections", type: "blockContent" }),
    defineField({ name: "cta", type: "object", fields: [{ name: "label", type: "string" }, { name: "destination", type: "string" }] }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string", validation: (Rule) => Rule.max(60) }),
    defineField({ name: "metaDescription", type: "text", validation: (Rule) => Rule.max(160) }),
    defineField({ name: "canonicalUrl", type: "url" }),
    defineField({ name: "openGraphImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "noIndex", title: "Noindex", type: "boolean", initialValue: false }),
    defineField({ name: "published", type: "boolean", initialValue: false })
  ]
});
