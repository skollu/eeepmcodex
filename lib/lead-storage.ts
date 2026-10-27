import "server-only";

export function leadSubmissionsEnabled() {
  return process.env.LEAD_SUBMISSIONS_ENABLED === "true";
}

function privateLeadConfig() {
  const projectId = process.env.SANITY_LEADS_PROJECT_ID;
  const dataset = process.env.SANITY_LEADS_DATASET;
  const token = process.env.SANITY_LEADS_WRITE_TOKEN;
  if (!projectId || !/^[a-z0-9]+$/.test(projectId) || !dataset || !/^[a-z0-9_-]+$/.test(dataset) || !token) {
    throw new Error("Private lead storage is not configured");
  }
  if (projectId === process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && dataset === (process.env.NEXT_PUBLIC_SANITY_DATASET || "production")) {
    throw new Error("Lead storage must be separate from public content");
  }
  return { projectId, dataset, token };
}

export async function writePrivateLead(document: Record<string, unknown>) {
  if (!leadSubmissionsEnabled()) throw new Error("Lead submissions are paused");
  const { projectId, dataset, token } = privateLeadConfig();
  const base = `https://${projectId}.api.sanity.io/v2025-01-01`;
  const authorization = { authorization: `Bearer ${token}` };
  // Verify the destination on every write; a name alone does not guarantee privacy.
  const metadata = await fetch(`${base}/datasets`, { headers: authorization, cache: "no-store" });
  if (!metadata.ok) throw new Error("Cannot verify lead dataset privacy");
  const datasets: Array<{ name: string; aclMode: string }> = await metadata.json();
  if (!datasets.some((entry) => entry.name === dataset && entry.aclMode === "private")) {
    throw new Error("Lead dataset is not private");
  }
  const probe = await fetch(`${base}/data/query/${dataset}?query=${encodeURIComponent('count(*[_type == "leadSubmission"])')}`, { cache: "no-store" });
  if (probe.status !== 401 && probe.status !== 403) throw new Error("Anonymous lead access was not denied");
  const response = await fetch(`${base}/data/mutate/${dataset}?returnIds=true&visibility=sync`, {
    method: "POST",
    headers: { ...authorization, "content-type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ mutations: [{ create: document }] })
  });
  if (!response.ok) throw new Error("Private lead storage failed");
  const result = await response.json();
  if (!result.transactionId || !result.results?.[0]?.id) throw new Error("Private lead storage was not acknowledged");
  return { stored: true as const };
}
