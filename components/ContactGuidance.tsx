import { getSiteData } from "@/lib/cms";

export async function ContactGuidance({ intro = "Online estimate and contact forms are temporarily paused." }: { intro?: string }) {
  const { settings } = await getSiteData();
  return <p className="mt-5 max-w-3xl text-sm leading-7 text-brand-muted">
    {intro} Call <a className="font-semibold text-brand-forest underline" href={settings.phoneHref}>{settings.phone}</a> or email <a className="font-semibold text-brand-forest underline" href={settings.emailHref}>{settings.email}</a> to discuss your property and next steps.
  </p>;
}
