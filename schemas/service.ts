import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "summary", type: "text", validation: (Rule) => Rule.max(220) }),
    defineField({ name: "body", type: "blockContent" }),
    defineField({ name: "seoTitle", type: "string", validation: (Rule) => Rule.max(60) }),
    defineField({ name: "metaDescription", type: "text", validation: (Rule) => Rule.max(160) }),
    defineField({ name: "published", type: "boolean", initialValue: false })
  ]
});
