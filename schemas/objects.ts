import { defineArrayMember, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" }
      ],
      lists: [{ title: "Bullet", value: "bullet" }, { title: "Numbered", value: "number" }],
      marks: {
        decorators: [{ title: "Strong", value: "strong" }, { title: "Emphasis", value: "em" }],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [{ name: "href", type: "url", title: "URL" }]
          }
        ]
      }
    }),
    defineArrayMember({
      type: "image",
      fields: [
        { name: "alt", title: "Alt Text", type: "string", validation: (Rule) => Rule.required().max(160) },
        { name: "caption", title: "Caption", type: "string" }
      ],
      options: { hotspot: true }
    })
  ]
});
