import { defineField, defineType } from "sanity";

export const footerSettings = defineType({
  name: "footerSettings",
  title: "Footer Settings",
  type: "document",
  fields: [
    defineField({ name: "footerNote", title: "Footer Note", type: "text" }),
    defineField({
      name: "links",
      title: "Footer Links",
      type: "array",
      of: [{ type: "object", fields: [{ name: "group", type: "string" }, { name: "label", type: "string" }, { name: "url", type: "string" }, { name: "openInNewTab", type: "boolean", initialValue: false }] }]
    })
  ]
});
