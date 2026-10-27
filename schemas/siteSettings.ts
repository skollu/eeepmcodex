import { defineField, defineType } from "sanity";
import { settings } from "@/lib/content";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "Company Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string", validation: Rule => Rule.required().max(160) })] }),
    defineField({ name: "favicon", title: "Favicon", type: "image", fields: [defineField({ name: "alt", title: "Description", type: "string" })] }),
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
    defineField({ name: "appfolioRentalUrl", title: "AppFolio Rental URL", type: "url", initialValue: settings.appfolioRentals, validation: Rule => Rule.custom(value => !value || value === settings.appfolioRentals || "Use the approved EEE AppFolio rental destination.") }),
    defineField({ name: "appfolioOwnerPortalUrl", title: "AppFolio Owner Portal URL", type: "url", initialValue: settings.appfolioOwnerPortal, validation: Rule => Rule.custom(value => !value || value === settings.appfolioOwnerPortal || "Use the approved EEE AppFolio owner destination.") }),
    defineField({ name: "appfolioTenantPortalUrl", title: "AppFolio Tenant Portal URL", type: "url", initialValue: settings.appfolioTenantPortal, validation: Rule => Rule.custom(value => !value || value === settings.appfolioTenantPortal || "Use the approved EEE AppFolio tenant destination.") }),
    defineField({ name: "defaultSeoImage", title: "Default SEO Image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
    defineField({
      name: "photography",
      title: "Website Photography",
      type: "object",
      fields: [["heroPhoto", "Hero Founder/Team Photo"], ["founderPhoto", "Founder/Team Portrait"], ["showingPhoto", "In-Person Showing Photo"], ["inspectionPhoto", "Property Inspection Photo"], ["maintenancePhoto", "Maintenance/Vendor Coordination Photo"], ["propertyPhoto", "Managed Property Photo"]].map(([name, title]) => defineField({ name, title, type: "image", options: { hotspot: true }, description: "Use only an approved, real EEE photograph. Missing images or alt text are hidden on the website.", fields: [defineField({ name: "alt", title: "Alt Text", type: "string", validation: Rule => Rule.required().max(160) }), defineField({ name: "caption", title: "Public Caption (Optional)", type: "string" })] }))
    })
  ]
});
