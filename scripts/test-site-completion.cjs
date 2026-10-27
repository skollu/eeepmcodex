const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const ts = require("typescript");
const groq = require("node:module").createRequire(require.resolve("sanity/package.json"))("groq-js");
const root = path.resolve(__dirname, "..");
let cache = {};
let response = null;
let calls = [];
let data;
let states = [];
let directForm = false;
const oldFetch = global.fetch;
const oldFormData = global.FormData;
const oldIndexing = process.env.SITE_INDEXING;
const oldVercel = process.env.VERCEL_ENV;

function load(relative) {
  if (cache[relative]) return cache[relative].exports;
  const module = { exports: {} };
  cache[relative] = module;
  const js = ts.transpileModule(fs.readFileSync(path.join(root, relative), "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true
    }
  }).outputText;
  new Function("require", "module", "exports", js)(
    (name) => {
      if (name === "server-only") return {};
      if (name === "react")
        return {
          ...React,
          cache: (fn) => fn,
          ...(directForm ? { useState: (initial) => [initial, (value) => states.push(value)] } : {})
        };
      if (name === "next/image")
        return { __esModule: true, default: (props) => React.createElement("img", { src: props.src, alt: props.alt }) };
      if (name === "next/link") return { __esModule: true, default: (props) => React.createElement("a", props) };
      if (name === "@/lib/sanity")
        return {
          hasSanityConfig: true,
          sanityClient: {
            config: () => ({ projectId: "testproject", dataset: "production" }),
            withConfig: (config) => ({
              fetch: async (query, params, options) => {
                assert.equal(config.perspective, "published");
                assert.equal(config.useCdn, false);
                assert.equal(options.cache, "no-store");
                assert.ok(!query.includes("leadSubmission"));
                groq.parse(query);
                calls.push(query);
                return structuredClone(typeof response === "function" ? await response(query, params) : response);
              }
            })
          }
        };
      if (name === "@/components/SiteSettingsProvider") return { useSiteData: () => data };
      if (name.startsWith("@/")) {
        const base = name.slice(2);
        return load(fs.existsSync(path.join(root, base + ".ts")) ? base + ".ts" : base + ".tsx");
      }
      return require(name);
    },
    module,
    module.exports
  );
  return module.exports;
}

async function main() {
  response = {
    site: { phone: "202.555.0147", email: "qa@example.com", primaryCtaLabel: "QA Estimate" },
    navigation: {
      items: [
        { label: "Home", url: "/" },
        { label: "Owners", children: [{ label: "Free Rental Estimate" }] },
        { label: "Tenants", children: [] }
      ]
    },
    footer: { footerNote: "QA footer", links: [{ group: "Company", label: "QA link", url: "/contact" }] },
    seo: { defaultTitle: "QA SEO" }
  };
  const cms = load("lib/cms.ts");
  data = await cms.getSiteData();
  assert.equal(data.settings.phoneHref, "tel:+12025550147");
  assert.equal(data.settings.emailHref, "mailto:qa@example.com");
  assert.equal(data.footer.note, "QA footer");
  assert.equal(data.seo.defaultTitle, "QA SEO");
  assert.equal(data.navigation.find((i) => i.label === "Owners").children.length, 4);
  assert.equal(data.navigation.find((i) => i.label === "Tenants").children.length, 2);
  assert.equal(
    data.navigation.find((i) => i.label === "Tenants").children[1].href,
    "https://eeepm.appfolio.com/connect/users/sign_in"
  );
  assert.equal(data.navigation.find((i) => i.label === "Tenants").children[1].external, true);
  response.site.phone = "202.555.0199";
  assert.equal((await cms.getSiteData()).settings.phoneHref, "tel:+12025550199");
  const { safeHref } = load("lib/site-types.ts");
  for (const unsafe of ["javascript:alert(1)", "//example.com", "/\\example.com", "data:text/html,hello"])
    assert.equal(safeHref(unsafe), undefined);
  response = [];
  const published = load("components/PublishedContent.tsx");
  assert.equal(await published.PublishedTestimonials(), null);
  assert.equal(await published.PublishedTeam(), null);
  assert.equal(await published.PublishedFAQs({}), null);
  assert.ok(calls.some((query) => query.includes("approvedForWebsite == true")));
  response = [
    {
      _id: "qa",
      question: "QA question",
      answer: [
        {
          _type: "block",
          _key: "b",
          style: "normal",
          children: [{ _type: "span", _key: "s", text: "QA answer", marks: [] }],
          markDefs: []
        }
      ]
    }
  ];
  assert.match(renderToStaticMarkup(await published.PublishedFAQs({})), /QA answer/);
  const rich = load("components/CmsContent.tsx");
  const html = renderToStaticMarkup(
    React.createElement(rich.CmsContent, {
      value: [
        {
          _type: "block",
          _key: "b",
          style: "normal",
          listItem: "bullet",
          level: 1,
          children: [{ _type: "span", _key: "s", text: "QA linked text", marks: ["strong", "l"] }],
          markDefs: [{ _type: "link", _key: "l", href: "https://example.com" }]
        }
      ]
    })
  );
  assert.match(html, /<ul/);
  assert.match(html, /<strong/);
  assert.match(html, /noopener noreferrer/);
  const blog = load("lib/blog.tsx");
  assert.equal(blog.articleReady({ body: [] }), false);
  assert.equal(blog.articleReady({ body: [{ text: "This starter article is intentionally concise" }] }), false);
  assert.equal(blog.articleReady({ body: [{ text: "Completed owner-approved article" }] }), true);
  response = [];
  await blog.getBlogPosts();
  const blogQuery = calls.find((query) => query.includes('_type == "blogPost"'));
  const approved = {
    _id: "qa",
    _type: "blogPost",
    title: "QA article",
    slug: { current: "qa-article" },
    published: true,
    approvedForWebsite: true,
    body: [{ _type: "block", children: [{ text: "Complete approved article" }] }]
  };
  const selected = await (
    await groq.evaluate(groq.parse(blogQuery), {
      dataset: [
        approved,
        { ...approved, _id: "unapproved", approvedForWebsite: false },
        { ...approved, _id: "unpublished", published: false }
      ]
    })
  ).get();
  assert.equal(selected.length, 1);
  assert.equal(selected[0].slug, "qa-article");
  response = {
    site: null,
    seo: { defaultTitle: "QA default title", defaultMetaDescription: "QA default description" },
    navigation: null,
    footer: null
  };
  const pages = load("lib/pages.ts");
  const metadata = await pages.pageMetadata(null, { title: "Fallback", description: "Fallback", path: "/" });
  assert.equal(metadata.title.absolute, "QA default title");
  assert.equal(metadata.description, "QA default description");
  const invalidCanonical = await pages.pageMetadata(
    { canonicalUrl: "mailto:qa@example.com" },
    { title: "Contact", description: "Contact", path: "/contact" }
  );
  assert.equal(invalidCanonical.alternates.canonical, "https://eeepm.com/contact");
  response = (query, params) =>
    query.includes('_type == "blogPost"')
      ? [{ ...selected[0], body: approved.body }]
      : query.includes('_type == "page"')
        ? { noIndex: params.slug === "about" }
        : { site: null, navigation: null, footer: null, seo: null };
  const sitemap = await load("app/sitemap.ts").default();
  assert.ok(sitemap.some((entry) => entry.url.endsWith("/blog/qa-article")));
  assert.ok(!sitemap.some((entry) => entry.url.includes("/thank-you/") || entry.url.endsWith("/about")));
  process.env.SITE_INDEXING = "disabled";
  assert.equal(load("lib/indexing.ts").stagingNoIndex(), true);
  process.env.SITE_INDEXING = "enabled";
  process.env.VERCEL_ENV = "preview";
  assert.equal(load("lib/indexing.ts").stagingNoIndex(), true);
  process.env.VERCEL_ENV = "production";
  assert.equal(load("lib/indexing.ts").stagingNoIndex(), false);

  directForm = true;
  cache = {};
  const { LeadForm } = load("components/LeadForms.tsx");
  global.FormData = class {};
  for (const outcome of ["network", "unpersisted", "malformed", "stored"]) {
    states = [];
    let resets = 0;
    global.fetch = async () => {
      if (outcome === "network") throw new Error("synthetic offline");
      return {
        ok: true,
        json: async () => (outcome === "malformed" ? null : { ok: true, stored: outcome === "stored" })
      };
    };
    const form = LeadForm({ kind: "contact", enabled: true });
    assert.equal(form.type, "form");
    const honeypot = form.props.children[0];
    assert.equal(honeypot.props.hidden, true);
    assert.equal(honeypot.props["aria-hidden"], "true");
    await form.props.onSubmit({
      preventDefault() {},
      currentTarget: {
        reset() {
          resets++;
        }
      }
    });
    assert.equal(states.includes("success"), outcome === "stored");
    assert.equal(states.includes("error"), outcome !== "stored");
    assert.equal(resets, outcome === "stored" ? 1 : 0);
  }
  assert.notEqual(LeadForm({ kind: "contact" }).type, "form");
  const { stockImageApproved, imageCaption, imageUrl } = load("lib/images.ts");
  const stock = { sourceType: "stock", asset: { _ref: "image-abc-1600x1000-jpg" }, alt: "Residential interior", approvedForWebsite: true, rightsVerified: true, sourceUrl: "https://example.com/photo", licenseUrl: "https://example.com/license", creator: "Photographer", licenseName: "Commercial license" };
  assert.ok(stockImageApproved(stock));
  assert.ok(imageUrl(stock));
  for (const key of ["approvedForWebsite", "rightsVerified", "sourceUrl", "licenseUrl", "creator", "licenseName"]) {
    assert.equal(imageUrl({ ...stock, [key]: undefined }), undefined, key);
  }
  assert.equal(imageUrl({ ...stock, attributionRequired: true }), undefined);
  assert.equal(imageUrl({ ...stock, sourceUrl: "javascript:alert(1)" }), undefined);
  assert.match(imageCaption(stock), /Representative stock photography/);
  const { PhotoPlaceholder } = load("components/PhotoPlaceholder.tsx");
  response = null;
  assert.equal(await PhotoPlaceholder({ image: stock, slot: "founderPhoto" }), null);
  const stockHtml = renderToStaticMarkup(await PhotoPlaceholder({ image: stock }));
  assert.match(stockHtml, /figcaption/);
  assert.ok(!stockHtml.includes("absolute inset-x"));
  console.log(
    "PASS: CMS settings and refresh boundaries; preserved owner/tenant links; rich-text lists/marks/links; empty optional sections; approval/publication queries; unsafe URL rejection; indexing policy; form network recovery, durable-success guard, hidden honeypot, and paused default. External services mocked; no live publishing."
  );
}
main()
  .catch((error) => {
    console.error(error.stack);
    process.exitCode = 1;
  })
  .finally(() => {
    global.fetch = oldFetch;
    global.FormData = oldFormData;
    if (oldIndexing === undefined) delete process.env.SITE_INDEXING;
    else process.env.SITE_INDEXING = oldIndexing;
    if (oldVercel === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = oldVercel;
  });
