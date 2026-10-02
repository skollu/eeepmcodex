import { defineField, defineType } from "sanity";

export const leadSubmission = defineType({
  name: "leadSubmission",
  title: "Lead Submission",
  type: "document",
  groups: [
    { name: "lead", title: "Lead Details", default: true },
    { name: "workflow", title: "Workflow" },
    { name: "property", title: "Property" },
    { name: "message", title: "Message" }
  ],
  fields: [
    defineField({ name: "submittedAt", title: "Submission Date", type: "datetime", group: "lead", readOnly: true }),
    defineField({ name: "source", title: "Lead Type", type: "string", group: "lead", readOnly: true, options: { list: [{ title: "Rental Estimate", value: "rental-estimate" }, { title: "Contact", value: "contact" }] } }),
    defineField({
      name: "status",
      type: "string",
      group: "workflow",
      options: {
        list: [
          { title: "New", value: "New" },
          { title: "Contacted", value: "Contacted" },
          { title: "Qualified", value: "Qualified" },
          { title: "Closed", value: "Closed" },
          { title: "Not Moving Forward", value: "Not Moving Forward" }
        ]
      },
      initialValue: "New"
    }),
    defineField({ name: "internalNotes", title: "Internal Notes", type: "text", group: "workflow", rows: 5 }),
    defineField({ name: "ownerName", title: "Owner Name", type: "string", group: "lead", readOnly: true }),
    defineField({ name: "email", type: "string", group: "lead", readOnly: true }),
    defineField({ name: "phone", type: "string", group: "lead", readOnly: true }),
    defineField({ name: "propertyAddress", title: "Property Address", type: "string", group: "property", readOnly: true }),
    defineField({ name: "city", type: "string", group: "property", readOnly: true }),
    defineField({ name: "propertyType", type: "string", group: "property", readOnly: true }),
    defineField({ name: "bedrooms", type: "string", group: "property", readOnly: true }),
    defineField({ name: "bathrooms", type: "string", group: "property", readOnly: true }),
    defineField({ name: "currentPropertyStatus", type: "string", group: "property", readOnly: true }),
    defineField({ name: "currentlyRented", type: "string", group: "property", readOnly: true }),
    defineField({ name: "currentMonthlyRent", type: "string", group: "property", readOnly: true }),
    defineField({ name: "managementStartTimeframe", type: "string", group: "property", readOnly: true }),
    defineField({ name: "reason", type: "string", group: "message", readOnly: true }),
    defineField({ name: "message", type: "text", group: "message", readOnly: true }),
    defineField({ name: "consent", type: "boolean", group: "message", readOnly: true })
  ],
  preview: {
    select: {
      title: "ownerName",
      subtitle: "source",
      submittedAt: "submittedAt",
      status: "status"
    },
    prepare({ title, subtitle, submittedAt, status }) {
      return {
        title: title || "Website lead",
        subtitle: `${status || "New"} - ${subtitle || "lead"}${submittedAt ? ` - ${new Date(submittedAt).toLocaleDateString()}` : ""}`
      };
    }
  }
});
