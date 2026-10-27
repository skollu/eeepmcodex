import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "biography", type: "blockContent" }),
    defineField({ name: "headshot", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required().max(160) }] }),
    defineField({ name: "displayOrder", type: "number" }),
    defineField({ name: "published", title: "Visible on Website", type: "boolean", initialValue: false, description: "Enable and Publish an approved name, role, and biography. Incomplete profiles are hidden." })
  ]
});
