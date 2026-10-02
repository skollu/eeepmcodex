# Launch Readiness Report

## Passed Tests

- Production build completes.
- TypeScript check completes.
- Public routes smoke-tested locally: `/`, `/admin`, `/rental-estimate`, `/contact`, `/sitemap.xml`, `/robots.txt`.
- Rental Estimate API accepts valid local test submission.
- Honeypot spam field blocks bot-like submissions.
- Duplicate prevention blocks repeated lead submissions.
- Static browser bundle scan found no server-only secret variable names.
- GA4 events are limited to event names and non-PII context such as location.

## Tests Pending Real Credentials

- Rental Estimate submission with Sanity lead persistence.
- Contact submission with Sanity lead persistence.
- Resend email delivery to `team@eeepm.com`.
- Duplicate prevention with production runtime behavior.
- Upstash durable rate limiting.
- Authenticated Sanity Studio login.
- Page editing and publishing.
- Blog article creation and publishing.
- Testimonial creation and publishing.
- Image replacement and alt text editing.
- SEO metadata editing.

## Remaining Launch Blockers

- Production Sanity project and dataset must be configured.
- Sanity editor users and roles must be created.
- Sanity CORS/origins must be configured.
- Resend sender/domain must be verified.
- Upstash Redis credentials must be configured.
- GA4 measurement ID must be approved and configured.
- Production deployment target and domain must be configured.

## Required Owner Actions

- Provide or approve Sanity project setup.
- Invite owner/admin assistant users to Sanity.
- Approve which users can view lead submissions.
- Provide Resend account/domain sender details.
- Provide Upstash account or approve alternate durable rate-limit storage.
- Approve GA4/Search Console setup.
- Supply final team and property photography.
- Supply real testimonials or approve hiding testimonial sections until available.

## Legal / Professional Review

- Privacy Policy.
- Terms / Website Terms.
- Accessibility Statement.
- Fair Housing Statement.
- Form consent language.
- Data retention and lead handling policy.

## Missing Photography / Testimonials

- Hero founder/team photo at a managed property.
- Founder/team portrait.
- In-person showing photo.
- Property inspection photo.
- Maintenance/vendor coordination photo.
- Managed-property exterior/interior.
- Real owner testimonials and optional customer photos.

## Security Findings

- No `.env`, `.env.local`, or `.env.production` files should be committed.
- Server-only secrets do not use the `NEXT_PUBLIC_` prefix.
- Form APIs validate and sanitize server-side.
- Lead records are stored server-side only when Sanity write credentials are configured.
- Lead PII is not sent to GA4.
- Lead PII is not logged in public client code.
- Lead submission visibility must be controlled with Sanity project roles; use least privilege.

## Known Technical Debt

- Local duplicate protection is process-memory based. Durable rate limiting uses Upstash when configured, but duplicate suppression may need durable storage if duplicate prevention must span serverless instances.
- The Studio schema can guide users, but final access control depends on Sanity project roles and permissions.
