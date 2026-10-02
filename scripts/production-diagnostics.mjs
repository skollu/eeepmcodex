const checks = [
  ["Sanity project ID", "NEXT_PUBLIC_SANITY_PROJECT_ID", false],
  ["Sanity dataset", "NEXT_PUBLIC_SANITY_DATASET", false],
  ["Sanity read token", "SANITY_API_READ_TOKEN", true],
  ["Sanity write token", "SANITY_API_WRITE_TOKEN", true],
  ["Lead notification email", "LEAD_NOTIFICATION_EMAIL", false],
  ["Resend API key", "RESEND_API_KEY", true],
  ["Resend sender", "RESEND_FROM_EMAIL", false],
  ["Upstash Redis URL", "UPSTASH_REDIS_REST_URL", true],
  ["Upstash Redis token", "UPSTASH_REDIS_REST_TOKEN", true],
  ["Site URL", "NEXT_PUBLIC_SITE_URL", false],
  ["GA4 measurement ID", "NEXT_PUBLIC_GA_MEASUREMENT_ID", false]
];

console.log("EEE Production Configuration Diagnostics");
console.log("No secret values are printed.\n");

for (const [label, key, secret] of checks) {
  const configured = Boolean(process.env[key]);
  const visibility = secret ? "server-only" : key.startsWith("NEXT_PUBLIC_") ? "public identifier" : "server";
  console.log(`${configured ? "OK" : "MISSING"} ${label} (${key}, ${visibility})`);
}

console.log("\nRequired Sanity CORS/origins:");
[
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "active local preview ports used for review",
  "Vercel preview origin",
  "https://eeepm.com",
  "https://www.eeepm.com if used"
].forEach((origin) => console.log(`- ${origin}`));
