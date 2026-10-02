import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "text", title: "Quote", type: "text", description: "Use only real customer-provided testimonials. Do not invent quotes.", validation: (Rule) => Rule.required() }),
    defineField({ name: "customerDisplayName", type: "string" }),
    defineField({ name: "city", title: "City / Location", type: "string" }),
    defineField({ name: "propertyType", title: "Property Type", type: "string" }),
    defineField({ name: "photograph", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.max(160) }] }),
    defineField({ name: "source", type: "string" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "displayOrder", type: "number" }),
    defineField({ name: "published", type: "boolean", initialValue: false })
  ]
});
