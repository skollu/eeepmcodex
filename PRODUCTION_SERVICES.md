# Production Services Configuration

This project is prepared for production service configuration, but no production deployment has been performed.

## Sanity

The app uses Sanity Studio at `/admin`. When `NEXT_PUBLIC_SANITY_PROJECT_ID` is missing, `/admin` shows a setup checklist instead of a broken Studio. When valid Sanity configuration is present, `/admin` loads authenticated Sanity Studio.

Required setup:

- Create or choose the production Sanity project.
- Create the production dataset, usually `production`.
- Add authorized editor accounts for the owner/admin assistant.
- Add CORS origins in Sanity:
  - `http://localhost:3000`
  - `http://127.0.0.1:3000`
  - any active local preview port used during review
  - Vercel preview origin
  - `https://eeepm.com`
  - `https://www.eeepm.com` if used
- Use least-privilege API tokens. The write token is server-side only.

Required variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`
- `SANITY_API_WRITE_TOKEN`

## Email

Lead notification uses a server-side email abstraction. Resend is the preferred production provider. The legacy webhook remains as a fallback path.

Required variables:

- `LEAD_NOTIFICATION_EMAIL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `LEAD_WEBHOOK_URL` optional fallback
- `LEAD_WEBHOOK_TOKEN` optional fallback

Behavior:

- Rental Estimate submissions notify `team@eeepm.com` or `LEAD_NOTIFICATION_EMAIL`.
- Contact submissions notify `team@eeepm.com` or `LEAD_NOTIFICATION_EMAIL`.
- Lead storage runs before email notification.
- Email failure is logged and returned as `emailDelivered: false`; it does not delete or discard the lead.
- Email credentials are never exposed client-side.

## Lead Persistence

Lead submissions are stored in Sanity as `leadSubmission` documents when `SANITY_API_WRITE_TOKEN` is configured. If Sanity write credentials are missing, local development logs the missing configuration and still exercises the form workflow.

## Durable Rate Limiting

Public lead forms use Upstash Redis when configured, with an in-memory fallback for local development.

Required variables:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Current limits:

- Rental Estimate: 5 requests per IP per 60 seconds
- Contact: 5 requests per IP per 60 seconds

## Analytics

GA4 loads only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured.

Tracked events:

- `rental_estimate_started`
- `rental_estimate_submitted`
- `contact_form_submitted`
- `phone_clicked`
- `email_clicked`
- `whatsapp_clicked`
- `available_rentals_clicked`
- `owner_portal_clicked`
- `lead_magnet_downloaded` is reserved for future lead-magnet UI

No form contents, names, email addresses, phone numbers, property addresses, or message text are sent to analytics.

## AppFolio

The project currently uses external AppFolio links for Available Rentals, Owner Portal, and Tenant Portal. No AppFolio lead API is implemented. EEE must confirm account-specific API/webhook/prospect workflow support before AppFolio lead sync can be added.

## Security Notes

- Secrets are server-side only.
- No secret variable uses the `NEXT_PUBLIC_` prefix.
- Form APIs validate and sanitize server-side.
- Admin content mutation requires valid Sanity authentication and project authorization.
- Lead submission records contain PII and should only be visible to owner-approved Sanity users.
- Use Sanity roles/permissions to restrict lead records to appropriate authenticated CMS users.
- Do not commit `.env`, `.env.local`, API tokens, or provider secrets.

## Diagnostics

Run this locally or in a deployment shell to check whether required production service variables are present without printing secret values:

```bash
pnpm diagnostics
```

The diagnostic output reports only configured/missing status and required CORS origins.
