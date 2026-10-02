import { NextResponse } from "next/server";
import { isDuplicateSubmission, notifyLead, requireFields, sanitize, storeLead, validEmail } from "@/lib/forms";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  const rateLimit = await checkRateLimit(`contact:${ip}`, 5, 60);
  if (!rateLimit.allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const formData = await request.formData();
  if (sanitize(formData.get("company"))) return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  const payload = {
    firstName: sanitize(formData.get("firstName")),
    lastName: sanitize(formData.get("lastName")),
    email: sanitize(formData.get("email")),
    phone: sanitize(formData.get("phone")),
    propertyAddress: sanitize(formData.get("propertyAddress")),
    city: sanitize(formData.get("city")),
    reason: sanitize(formData.get("reason")),
    message: sanitize(formData.get("message")),
    consent: formData.get("consent") === "on"
  };
  const missing = requireFields(payload, ["firstName", "lastName", "email", "phone", "message"]);
  if (missing.length || !payload.consent) return NextResponse.json({ error: "Missing required fields", missing }, { status: 400 });
  if (!validEmail(payload.email)) return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  const duplicateKey = `contact:${payload.email}:${payload.message.slice(0, 80)}`;
  if (isDuplicateSubmission(duplicateKey)) return NextResponse.json({ error: "This message was already received recently." }, { status: 409 });

  const stored = await storeLead("contact", payload);
  const email = await notifyLead("contact", "EEE contact form inquiry", payload);
  if (!email.delivered) console.error("Lead email notification failed after storage.", email);

  return NextResponse.json({ ok: true, stored: stored.stored, emailDelivered: email.delivered });
}
