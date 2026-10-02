import { defineField, defineType } from "sanity";

export const leadMagnet = defineType({
  name: "leadMagnet",
  title: "Lead Magnet",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", initialValue: "Rental Readiness Checklist" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required().max(160) }] }),
    defineField({ name: "downloadableFile", type: "file" }),
    defineField({ name: "cta", type: "object", fields: [{ name: "label", type: "string" }, { name: "destination", type: "string" }] }),
    defineField({ name: "formConfiguration", type: "text" }),
    defineField({ name: "active", type: "boolean", initialValue: false })
  ]
});
