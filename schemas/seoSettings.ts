import { defineField, defineType } from "sanity";

export const seoSettings = defineType({
  name: "seoSettings",
  title: "Default SEO",
  type: "document",
  fields: [
    defineField({ name: "defaultTitle", type: "string", validation: (Rule) => Rule.max(60) }),
    defineField({ name: "defaultMetaDescription", type: "text", validation: (Rule) => Rule.max(160) }),
    defineField({ name: "defaultSocialImage", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.max(160) }] })
  ]
});
