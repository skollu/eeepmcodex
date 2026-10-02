import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "Company Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "favicon", title: "Favicon", type: "image" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "email" }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string" }),
    defineField({ name: "streetAddress", title: "Street Address", type: "string" }),
    defineField({ name: "suite", title: "Suite", type: "string" }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "state", title: "State", type: "string" }),
    defineField({ name: "zip", title: "ZIP", type: "string" }),
    defineField({ name: "serviceAreaDescription", title: "Service Area Description", type: "text" }),
    defineField({ name: "primaryCtaLabel", title: "Primary CTA Label", type: "string" }),
    defineField({ name: "primaryCtaDestination", title: "Primary CTA Destination", type: "string" }),
    defineField({ name: "socialLinks", title: "Social Links", type: "array", of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "url", type: "url" }] }] }),
    defineField({ name: "appfolioRentalUrl", title: "AppFolio Rental URL", type: "url" }),
    defineField({ name: "appfolioOwnerPortalUrl", title: "AppFolio Owner Portal URL", type: "url" }),
    defineField({ name: "appfolioTenantPortalUrl", title: "AppFolio Tenant Portal URL", type: "url" }),
    defineField({ name: "defaultSeoImage", title: "Default SEO Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "photography",
      title: "Website Photography",
      type: "object",
      fields: [
        { name: "heroPhoto", title: "Hero Founder/Team Photo", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string" }] },
        { name: "founderPhoto", title: "Founder/Team Portrait", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string" }] },
        { name: "showingPhoto", title: "In-Person Showing Photo", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string" }] },
        { name: "inspectionPhoto", title: "Property Inspection Photo", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string" }] },
        { name: "maintenancePhoto", title: "Maintenance/Vendor Coordination Photo", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string" }] },
        { name: "propertyPhoto", title: "Managed Property Photo", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string" }] }
      ]
    })
  ]
});
