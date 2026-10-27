import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "approvedForWebsite", title: "Editorial Approval for Website", type: "boolean", initialValue: false, description: "Required alongside Published and Publish. Approve only completed articles, not starter/editor instructions." }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required().max(90) }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "excerpt", type: "text", validation: (Rule) => Rule.max(180) }),
    defineField({ name: "author", type: "reference", to: [{ type: "teamMember" }] }),
    defineField({ name: "category", type: "reference", to: [{ type: "blogCategory" }] }),
    defineField({ name: "publishDate", type: "datetime" }),
    defineField({ name: "updatedDate", type: "datetime" }),
    defineField({ name: "featuredImage", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required().max(160) }] }),
    defineField({ name: "body", type: "blockContent" }),
    defineField({ name: "relatedPosts", type: "array", of: [{ type: "reference", to: [{ type: "blogPost" }] }] }),
    defineField({ name: "relatedService", type: "reference", to: [{ type: "service" }] }),
    defineField({ name: "relatedCity", type: "reference", to: [{ type: "city" }] }),
    defineField({ name: "cta", type: "object", fields: [{ name: "label", type: "string" }, { name: "destination", type: "string" }] }),
    defineField({ name: "seoTitle", type: "string", validation: (Rule) => Rule.max(60) }),
    defineField({ name: "metaDescription", type: "text", validation: (Rule) => Rule.max(160) }),
    defineField({ name: "canonicalUrl", type: "url" }),
    defineField({ name: "socialImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "published", title: "Visible on Website", type: "boolean", initialValue: false, description: "Enable with Editorial Approval, complete the article, then Publish. Draft changes never appear publicly." })
  ]
});
