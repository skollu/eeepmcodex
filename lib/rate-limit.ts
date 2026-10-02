const memoryHits = new Map<string, { count: number; resetAt: number }>();

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  provider: "upstash" | "memory";
};

function memoryRateLimit(key: string, limit: number, windowSeconds: number): RateLimitResult {
  const now = Date.now();
  const current = memoryHits.get(key);
  if (!current || current.resetAt < now) {
    memoryHits.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { allowed: true, remaining: limit - 1, provider: "memory" };
  }
  current.count += 1;
  return { allowed: current.count <= limit, remaining: Math.max(0, limit - current.count), provider: "memory" };
}

async function upstashCommand(command: string[]) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify([command])
  });

  if (!response.ok) throw new Error(`Upstash rate limit command failed with ${response.status}`);
  const [result] = await response.json();
  return result?.result;
}

export async function checkRateLimit(key: string, limit = 5, windowSeconds = 60): Promise<RateLimitResult> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return memoryRateLimit(key, limit, windowSeconds);
  }

  const redisKey = `rate:${key}`;
  try {
    const count = Number(await upstashCommand(["INCR", redisKey]));
    if (count === 1) await upstashCommand(["EXPIRE", redisKey, String(windowSeconds)]);
    return { allowed: count <= limit, remaining: Math.max(0, limit - count), provider: "upstash" };
  } catch (error) {
    console.error("Durable rate limiting failed; falling back to memory limiter.", error);
    return memoryRateLimit(key, limit, windowSeconds);
  }
}
