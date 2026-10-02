import { defineField, defineType } from "sanity";

export const navigationSettings = defineType({
  name: "navigationSettings",
  title: "Navigation Settings",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Navigation Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL", type: "string" }),
            defineField({ name: "openInNewTab", title: "Open in New Tab", type: "boolean", initialValue: false }),
            defineField({
              name: "children",
              title: "Dropdown Items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "label", title: "Label", type: "string" }),
                    defineField({ name: "url", title: "URL", type: "string" }),
                    defineField({ name: "openInNewTab", title: "Open in New Tab", type: "boolean", initialValue: false })
                  ]
                }
              ]
            })
          ]
        }
      ]
    })
  ]
});
