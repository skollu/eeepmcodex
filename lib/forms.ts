import { notifyTeam } from "@/lib/email";
import { hasSanityWriteConfig, sanityWriteClient } from "@/lib/sanity";

const duplicateSubmissions = new Map<string, number>();

export type LeadPayload = Record<string, string | boolean>;

export function sanitize(value: FormDataEntryValue | null) {
  return String(value || "").replace(/[<>]/g, "").trim().slice(0, 2000);
}

export function requireFields(payload: Record<string, unknown>, fields: string[]) {
  return fields.filter((field) => typeof payload[field] !== "string" || !payload[field]);
}

export function isDuplicateSubmission(key: string) {
  const now = Date.now();
  const previous = duplicateSubmissions.get(key);
  duplicateSubmissions.set(key, now);
  return Boolean(previous && now - previous < 10 * 60_000);
}

export function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const notifyLead = notifyTeam;

export async function storeLead(source: "rental-estimate" | "contact", payload: LeadPayload) {
  if (!hasSanityWriteConfig) {
    console.info("Lead not stored because Sanity write credentials are not configured.", source);
    return { stored: false, reason: "missing SANITY_API_WRITE_TOKEN" };
  }

  const document = {
    _type: "leadSubmission",
    source,
    submittedAt: new Date().toISOString(),
    status: "New",
    internalNotes: "",
    ownerName: String(payload.ownerName || [payload.firstName, payload.lastName].filter(Boolean).join(" ")).trim(),
    email: String(payload.email || ""),
    phone: String(payload.phone || ""),
    propertyAddress: String(payload.propertyAddress || ""),
    city: String(payload.city || ""),
    propertyType: String(payload.propertyType || ""),
    bedrooms: String(payload.bedrooms || ""),
    bathrooms: String(payload.bathrooms || ""),
    currentPropertyStatus: String(payload.currentPropertyStatus || ""),
    currentlyRented: String(payload.currentlyRented || ""),
    currentMonthlyRent: String(payload.currentMonthlyRent || ""),
    managementStartTimeframe: String(payload.managementStartTimeframe || ""),
    reason: String(payload.reason || ""),
    message: String(payload.message || ""),
    consent: Boolean(payload.consent)
  };

  await sanityWriteClient.create(document);
  return { stored: true };
}
