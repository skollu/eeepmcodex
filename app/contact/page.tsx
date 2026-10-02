import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForms";
import { Section } from "@/components/Section";
import { TrackedLink } from "@/components/TrackedLink";
import { settings } from "@/lib/content";
import { getCmsPage, pageMetadata } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("contact");
  return pageMetadata(page, {
    title: "Contact",
    description: "Talk with EEE Property Management about rental estimates, property management, switching managers, or owner questions."
  });
}

export default async function ContactPage() {
  const cmsPage = await getCmsPage("contact");

  return (
    <Section title={cmsPage?.heroHeadline || "Talk With a Local Property Manager"}>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-lg leading-8 text-brand-muted">Whether you're renting your first property, managing investments remotely or considering a change from your current property-management company, EEE is here to help.</p>
          <div className="mt-8 grid gap-4">
            <ContactCard title="Call" href={settings.phoneHref} label={settings.phone} />
            <ContactCard title="Email" href={settings.emailHref} label={settings.email} />
            <ContactCard title="WhatsApp" href={settings.whatsappHref} label={settings.phone} external />
            <div className="rounded-md border border-brand-line bg-white p-5">
              <h2 className="font-semibold text-brand-ink">Visit / Business Address</h2>
              <p className="mt-2 leading-7 text-brand-muted">EEE Property Management<br />{settings.address.street}<br />{settings.address.suite}<br />{settings.address.city}, {settings.address.state} {settings.address.zip}</p>
            </div>
          </div>
        </div>
        <LeadForm kind="contact" />
      </div>
    </Section>
  );
}

function ContactCard({ title, href, label, external }: { title: string; href: string; label: string; external?: boolean }) {
  const eventName = title === "Call" ? "phone_clicked" : title === "Email" ? "email_clicked" : title === "WhatsApp" ? "whatsapp_clicked" : undefined;

  return (
    <div className="rounded-md border border-brand-line bg-white p-5">
      <h2 className="font-semibold text-brand-ink">{title}</h2>
      <TrackedLink href={href} external={external} eventName={eventName} eventParams={{ location: "contact_page" }} className="mt-2 inline-block text-brand-forest underline">
        {label}
      </TrackedLink>
    </div>
  );
}
