import type { LeadPayload } from "@/lib/forms";

type EmailResult = {
  delivered: boolean;
  provider: "resend" | "webhook" | "none";
  reason?: string;
};

function value(payload: LeadPayload, key: string) {
  return String(payload[key] || "").trim();
}

function rows(payload: LeadPayload, keys: string[]) {
  return keys
    .map((key) => {
      const entry = value(payload, key);
      if (!entry) return "";
      const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
      return `<tr><th align="left" style="padding:6px 12px 6px 0">${label}</th><td style="padding:6px 0">${entry}</td></tr>`;
    })
    .filter(Boolean)
    .join("");
}

function leadEmailHtml(source: "rental-estimate" | "contact", payload: LeadPayload) {
  const keys =
    source === "rental-estimate"
      ? ["ownerName", "email", "phone", "propertyAddress", "city", "propertyType", "bedrooms", "bathrooms", "currentPropertyStatus", "currentlyRented", "currentMonthlyRent", "managementStartTimeframe", "message"]
      : ["firstName", "lastName", "email", "phone", "propertyAddress", "city", "reason", "message"];

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#17231f">
      <h1 style="font-size:22px">New EEE ${source === "rental-estimate" ? "Rental Estimate" : "Contact"} Submission</h1>
      <table>${rows(payload, keys)}</table>
    </div>
  `;
}

async function sendResendEmail(source: "rental-estimate" | "contact", subject: string, payload: LeadPayload): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { delivered: false, provider: "none", reason: "missing RESEND_API_KEY" };

  const from = process.env.RESEND_FROM_EMAIL || "EEE Property Management <noreply@eeepm.com>";
  const to = process.env.LEAD_NOTIFICATION_EMAIL || "team@eeepm.com";
  const replyTo = value(payload, "email") || undefined;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: replyTo,
      subject,
      html: leadEmailHtml(source, payload)
    })
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return { delivered: false, provider: "resend", reason: `Resend ${response.status}: ${detail.slice(0, 180)}` };
  }

  return { delivered: true, provider: "resend" };
}

async function sendWebhookEmail(subject: string, payload: LeadPayload): Promise<EmailResult> {
  const endpoint = process.env.LEAD_WEBHOOK_URL;
  if (!endpoint) return { delivered: false, provider: "none", reason: "missing LEAD_WEBHOOK_URL" };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: process.env.LEAD_WEBHOOK_TOKEN ? `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` : ""
    },
    body: JSON.stringify({
      to: process.env.LEAD_NOTIFICATION_EMAIL || "team@eeepm.com",
      subject,
      payload
    })
  });

  if (!response.ok) return { delivered: false, provider: "webhook", reason: `Webhook ${response.status}` };
  return { delivered: true, provider: "webhook" };
}

export async function notifyTeam(source: "rental-estimate" | "contact", subject: string, payload: LeadPayload): Promise<EmailResult> {
  const resend = await sendResendEmail(source, subject, payload).catch((error) => ({
    delivered: false,
    provider: "resend" as const,
    reason: error instanceof Error ? error.message : "Unknown Resend failure"
  }));

  if (resend.delivered || resend.provider === "resend") return resend;

  const webhook = await sendWebhookEmail(subject, payload).catch((error) => ({
    delivered: false,
    provider: "webhook" as const,
    reason: error instanceof Error ? error.message : "Unknown webhook failure"
  }));

  return webhook;
}
