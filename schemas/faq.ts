import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (Rule) => Rule.required().max(140) }),
    defineField({ name: "answer", type: "blockContent" }),
    defineField({ name: "category", type: "string", options: { list: ["Getting Started", "Management Services", "Applicant Screening", "Maintenance", "Pricing", "Remote Ownership", "Switching Managers", "Communication", "Leasing"] } }),
    defineField({ name: "relatedPage", type: "reference", to: [{ type: "page" }] }),
    defineField({ name: "displayOrder", type: "number" }),
    defineField({ name: "published", type: "boolean", initialValue: false })
  ]
});
