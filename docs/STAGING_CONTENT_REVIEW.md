# Staging Content and Functionality Review

This implementation is local and awaiting staging review. Do not deploy to the custom domain or reopen lead forms as part of this release.

## Publishing

- Public reads use Sanity's published perspective, the non-CDN API, and no-store server requests. Draft edits do not appear publicly. Refresh the public page after publishing; existing browser tabs/layouts are not live editor previews.
- Business Information, Navigation, Footer, and Default SEO use the latest published document of each type. Keep one active settings document of each type to avoid ambiguity.
- Pages require the expected slug and Visible on Website enabled, followed by Publish. Slugs: home, property-management-services, rental-estimate, owner-faq, switching-property-managers, about, contact, blog, privacy, terms, accessibility, fair-housing.
- Page title is the internal editor/document label. Hero headline, subheadline, body, image/alt, flexible content, CTA, and page SEO are rendered. Page CTA takes precedence over the global hero CTA. Page-specific layouts retain their existing static approved sections.
- FAQs require a question, nonempty answer, visibility, and Publish. Related Page scopes an FAQ to home or owner-faq; leaving it unset shares it. Category and display order are rendered.
- Team profiles require a name, role, biography, visibility, and Publish. Incomplete profiles are hidden. Upload only approved biographies and real headshots.
- Testimonials require Owner Approved for Website, visibility, and Publish. Quote/attribution must be real and approved. Featured testimonials sort first. Missing approved testimonials hide the section.
- Articles require Editorial Approval, visibility, a completed body, and Publish. Known starter/editor instruction patterns and empty article bodies are not published by the website. Draft and historical CMS documents have not been modified or deleted.
- Rich text supports paragraphs, headings, emphasis, links, lists, and images with alt/caption. Images without alt text are hidden from visible content; social images/favicon may omit alt because they are metadata assets.

## Photography

Business Information > Website Photography supplies hero, founder, showing, inspection, maintenance, and managed-property photos. Page hero images override the global hero photo. Real photographs need meaningful alt text; captions are optional and have an opaque evergreen background.

Hero: actual EEE founders/team at a managed property. Founder: approved portrait. Showing: real in-person showing or walkthrough. Inspection/maintenance: actual permitted work activity. Property: an approved managed-home photograph. Missing assets are hidden, never replaced with invented people or property photos.

## Global Settings and Navigation

Phone, email, WhatsApp, address, company name, service area, header primary CTA, logo/favicon, social links, and default social image read from Business Information. Contact links and structured business data use these values. Page-specific copy remains controlled by its page document and existing approved content.

Navigation items and order come from Navigation Settings when configured. Owners and Tenants and their required destinations remain available. Footer links overlay the default groups, and Footer Note is editable. URLs are validated at render time; unsafe schemes are rejected.

Available Rentals, Owner Portal, and Tenant Portal retain the three owner-approved AppFolio URLs from Global Site Settings/defaults. Validation prevents accidental changes to other destinations. They open in new tabs with noopener noreferrer. Do not add application or maintenance URLs without valid owner-supplied destinations.

## SEO and Staging

SITE_INDEXING=disabled is the safe default. Vercel preview environments, Vercel-hosted aliases, and local previews receive noindex protections. Admin and thank-you pages always receive noindex. Do not enable production indexing until the owner approves launch.

NEXT_PUBLIC_SITE_URL controls canonical origin and sitemap URLs. It does not change DNS. Legal pages have individual metadata. The sitemap reads approved published blog records dynamically, omits noindex pages, and excludes thank-you/admin. Crawlers can read the thank-you noindex directive; robots.txt does not block that page before it can be read.

SANITY_API_READ_TOKEN, if required for private editorial content, is server-side only. Never put lead tokens in the public CMS client or NEXT_PUBLIC_ variables.

## Security Boundary

LEAD_SUBMISSIONS_ENABLED must remain false. Both visible forms stay paused by default and show phone/email contact. API and private-storage guards are unchanged from the emergency security commit. This release does not prove historical lead access is secured, configure private storage, or authorize reopening forms.

## Verification Commands

- node scripts/test-site-completion.cjs
- node scripts/test-lead-privacy.cjs
- pnpm build
- pnpm typecheck

Regression tests use synthetic fixtures/mocked external services. Real authenticated CMS publishing, private lead access, Resend delivery, screen-reader certification, and deployed staging behavior still require separate verification.

## Remaining Scope

City/service/resource detail routes remain reserved 404 routes. Blog related-post/service/city references are not rendered by this pass. Do not add links to those destinations until the corresponding pages are implemented and reviewed. Legal text still requires owner/legal approval, and existing experience/eviction claims require owner substantiation.

Unrelated pre-existing README changes were preserved. No commit, push, DNS update, or remote deployment was performed for this content-completion pass.
