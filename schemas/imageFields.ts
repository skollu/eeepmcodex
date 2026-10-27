import { defineField } from "sanity";

// Keep rights documentation attached to the image, not just to an external spreadsheet.
export const imageFields = () => [
  defineField({ name: "alt", title: "Alt Text", type: "string", validation: Rule => Rule.required().max(160) }),
  defineField({ name: "caption", title: "Public Caption", type: "string" }),
  defineField({ name: "sourceType", title: "Image Source", type: "string", options: { list: [{ title: "Authentic EEE photograph", value: "eee" }, { title: "Licensed stock (representative only)", value: "stock" }, { title: "Owned / commissioned graphic", value: "graphic" }] }, validation: Rule => Rule.required() }),
  defineField({ name: "sourceUrl", title: "Original Image Page URL", type: "url", validation: Rule => Rule.uri({ scheme: ["https"] }) }),
  defineField({ name: "creator", title: "Photographer / Creator", type: "string" }),
  defineField({ name: "licenseName", title: "License Name / Permission Record", type: "string" }),
  defineField({ name: "licenseUrl", title: "License Evidence URL", type: "url", validation: Rule => Rule.uri({ scheme: ["https"] }) }),
  defineField({ name: "attributionRequired", title: "Public Attribution Required", type: "boolean", initialValue: false }),
  defineField({ name: "attributionText", title: "Public Attribution Text", type: "string", description: "Use the exact credit required by the license, if any." }),
  defineField({ name: "rightsVerified", title: "Rights and Releases Reviewed", type: "boolean", initialValue: false, description: "Check copyright permission, attribution, property/person releases and endorsement restrictions. A free download alone is not clearance." }),
  defineField({ name: "approvedForWebsite", title: "EEE Approval for Website", type: "boolean", initialValue: false, description: "Stock is hidden until approval, rights review and source/license documentation are complete. Never use stock for a founder, employee, testimonial or claimed EEE-managed property." })
];
