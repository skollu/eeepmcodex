# EEE Property Management Website

Production-ready Next.js build for EEE Property Management, a residential property management company serving King, Snohomish, and Pierce counties.

## What Is Included

- Next.js App Router with TypeScript
- Tailwind design tokens for the EEE visual system
- Core routes from the build specification
- Sanity Studio at `/admin`
- Structured Sanity schemas for settings, pages, blog posts, testimonials, FAQs, team members, city pages, services, and lead magnets
- Server-side rental estimate and contact form handlers
- Sitemap, robots, metadata, security headers, and structured business data
- AppFolio external links for available rentals and owner portal
- No fabricated testimonials, people, pricing, or photography

## Local Development

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy the environment example:

   ```bash
   cp .env.example .env.local
   ```

3. Fill in Sanity and lead notification values when available.

4. Run the site:

   ```bash
   pnpm dev
   ```

5. Open `http://localhost:3000`.

## Required Environment Variables

- `NEXT_PUBLIC_SITE_URL`: canonical production URL, normally `https://eeepm.com`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Sanity dataset, normally `production`
- `SANITY_API_READ_TOKEN`: private token for future preview or server-side reads if needed
- `SANITY_API_WRITE_TOKEN`: private Sanity token used by server-side form handlers to retain lead submissions in the CMS
- `LEAD_NOTIFICATION_EMAIL`: destination for owner leads, normally `team@eeepm.com`
- `RESEND_API_KEY`: private Resend API key for production email notifications
- `RESEND_FROM_EMAIL`: verified Resend sender identity
- `LEAD_WEBHOOK_URL`: server-side endpoint for email or CRM lead notification
- `LEAD_WEBHOOK_TOKEN`: optional bearer token for the lead webhook
- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST endpoint for durable rate limiting
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST token for durable rate limiting
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: GA4 measurement ID when analytics is approved

No secrets should be committed.

## Admin Workflow

Sanity Studio is mounted at `/admin`. After configuring the Sanity project, EEE staff can update routine content through the CMS, including page copy, FAQs, testimonials, blog posts, team records, city pages, services, images, lead magnets, SEO metadata, and global settings.

Recommended launch checks:

- Change homepage headline
- Change CTA text
- Change phone number
- Upload hero image and alt text
- Add and reorder FAQ records
- Create and hide testimonial records
- Create a blog article
- Create a city page with unique local content
- Replace lead magnet file

## Deployment

Recommended production hosting is Vercel.

1. Push the repository to Git.
2. Import the project in Vercel.
3. Configure production and preview environment variables.
4. Connect `eeepm.com`.
5. Configure Sanity CORS for the production and preview URLs.
6. Configure the lead email/webhook provider.
7. Run `pnpm build` in Vercel.

## Route Inventory

- `/`
- `/property-management-services`
- `/rental-estimate`
- `/owner-faq`
- `/switching-property-managers`
- `/about`
- `/blog`
- `/blog/[slug]`
- `/contact`
- `/privacy`
- `/accessibility`
- `/fair-housing`
- `/terms`
- `/thank-you/rental-estimate`
- Future-ready: `/property-management/[city]`, `/services/[service]`, `/resources/[resource]`

## Remaining Placeholders

- Real EEE founder/team photography
- Actual managed-property photography
- Team names, roles, biographies, and headshots
- Real customer testimonials and testimonial photos
- Social media profile URLs
- Tenant portal, rental application, and maintenance request URLs
- Public pricing details, if EEE chooses to publish them
- Email provider credentials and Sanity project credentials

## Form Handling

The form endpoints validate required fields, sanitize text, apply Upstash-backed rate limiting when configured with a local fallback, store lead submissions in Sanity when `SANITY_API_WRITE_TOKEN` is configured, and send team email through Resend when configured. A generic webhook remains available as a fallback. Lead storage happens before email notification, so email delivery failure does not delete the lead.

See `PRODUCTION_SERVICES.md` for production service setup details.

## Claims And Compliance Notes

- The site says EEE has maintained an eviction rate of zero to date, without guaranteeing future eviction outcomes.
- Applicant screening language is intentionally general and lawful.
- No fabricated reviews, awards, ratings, pricing, or team biographies are visible.
- Privacy and terms pages are launch placeholders that should receive final legal review.
