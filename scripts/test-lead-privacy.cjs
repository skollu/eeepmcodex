const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const originalFetch = global.fetch;
const originalEnv = { ...process.env };
let cache;
let notifications;
function load(relative) {
  if (cache[relative]) return cache[relative].exports;
  const mod = { exports: {} };
  cache[relative] = mod;
  const js = ts.transpileModule(fs.readFileSync(path.join(root, relative), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  }).outputText;
  new Function('require', 'module', 'exports', js)((name) => {
    if (name === 'server-only') return {};
    if (name === 'next/server') return { NextResponse: { json: (body, init) => new Response(JSON.stringify(body), init) } };
    if (name === '@/lib/email') return { notifyTeam: async () => { notifications++; return { delivered: false, provider: 'resend' }; } };
    if (name === '@/lib/rate-limit') return { checkRateLimit: async () => ({ allowed: true }) };
    if (name.startsWith('@/')) return load(name.slice(2) + '.ts');
    return require(name);
  }, mod, mod.exports);
  return mod.exports;
}
function reset() {
  cache = {};
  notifications = 0;
  for (const key of ['LEAD_SUBMISSIONS_ENABLED', 'SANITY_LEADS_PROJECT_ID', 'SANITY_LEADS_DATASET', 'SANITY_LEADS_WRITE_TOKEN']) delete process.env[key];
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'publicproject';
  process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';
  global.fetch = async () => { throw new Error('Unexpected network call'); };
}
function configured() {
  process.env.LEAD_SUBMISSIONS_ENABLED = 'true';
  process.env.SANITY_LEADS_PROJECT_ID = 'privateproject';
  process.env.SANITY_LEADS_DATASET = 'leads';
  process.env.SANITY_LEADS_WRITE_TOKEN = 'synthetic-test-token';
}
function responses(items) {
  let index = 0;
  global.fetch = async () => {
    const item = items[index++];
    assert.ok(item, 'unexpected extra request');
    return new Response(JSON.stringify(item.body ?? {}), { status: item.status ?? 200 });
  };
}
async function main() {
  reset();
  await assert.rejects(() => load('lib/lead-storage.ts').writePrivateLead({}), /paused/);
  for (const kind of ['contact', 'rental-estimate']) {
    const result = await load(`app/api/${kind}/route.ts`).POST({ formData() { throw new Error('Must not read form'); } });
    assert.equal(result.status, 503);
    assert.equal(notifications, 0);
  }
  reset(); configured();
  process.env.SANITY_LEADS_PROJECT_ID = 'publicproject';
  process.env.SANITY_LEADS_DATASET = 'production';
  await assert.rejects(() => load('lib/lead-storage.ts').writePrivateLead({}), /separate/);
  reset(); configured();
  responses([{ body: [{ name: 'leads', aclMode: 'public' }] }]);
  await assert.rejects(() => load('lib/lead-storage.ts').writePrivateLead({}), /not private/);
  reset(); configured();
  responses([{ body: [{ name: 'leads', aclMode: 'private' }] }, { status: 200 }]);
  await assert.rejects(() => load('lib/lead-storage.ts').writePrivateLead({}), /Anonymous/);
  reset(); configured();
  responses([{ body: [{ name: 'leads', aclMode: 'private' }] }, { status: 403 }, { status: 503 }]);
  await assert.rejects(() => load('lib/lead-storage.ts').writePrivateLead({}), /storage failed/);
  reset(); configured();
  responses([{ body: [{ name: 'leads', aclMode: 'private' }] }, { status: 403 }, { body: {} }]);
  await assert.rejects(() => load('lib/lead-storage.ts').writePrivateLead({}), /not acknowledged/);
  for (const kind of ['contact', 'rental-estimate']) {
    for (const succeeds of [false, true]) {
      reset(); configured();
      responses([{ body: [{ name: 'leads', aclMode: 'private' }] }, { status: 403 }, succeeds ? { body: { transactionId: 'test', results: [{ id: 'test' }] } } : { status: 503 }]);
      const body = new FormData();
      const fields = { firstName: 'QA', lastName: 'TEST', ownerName: 'QA TEST', email: 'qa@example.com', phone: '202-555-0147', message: 'QA TEST ONLY', propertyAddress: 'QA TEST ONLY', propertyType: 'Other', currentPropertyStatus: 'Vacant', managementStartTimeframe: 'Just researching', consent: 'on' };
      Object.entries(fields).forEach(([key, value]) => body.set(key, value));
      const response = await load(`app/api/${kind}/route.ts`).POST(new Request('https://example.com', { method: 'POST', body }));
      const json = await response.json();
      assert.equal(response.status, succeeds ? 200 : 503);
      assert.equal(notifications, succeeds ? 1 : 0);
      if (succeeds) { assert.equal(json.stored, true); assert.equal(json.emailDelivered, false); }
      else assert.notEqual(json.ok, true);
    }
  }
  console.log('PASS: paused APIs do not read payloads; shared/public/anonymous-readable destinations rejected; missing acknowledgement and failed writes rejected; no success or email on storage failure; email failure preserves acknowledged storage for both endpoints. All services mocked.');
}
main().finally(() => { global.fetch = originalFetch; process.env = originalEnv; }).catch(() => { console.error('FAIL: lead privacy regression test'); process.exitCode = 1; });
