"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { settings } from "@/lib/content";

const columns = [
  {
    title: "Owners",
    links: [
      ["Rental Estimate", "/rental-estimate"],
      ["Owner FAQ", "/owner-faq"],
      ["Switching Property Managers", "/switching-property-managers"],
      ["Owner Portal", settings.appfolioOwnerPortal, "_blank"]
    ]
  },
  {
    title: "Tenants",
    links: [
      ["Available Rentals", settings.appfolioRentals, "_blank"],
      ["Tenant Portal", settings.appfolioTenantPortal, "_blank"]
    ]
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Blog", "/blog"],
      ["Contact", "/contact"],
      ["Privacy", "/privacy"],
      ["Accessibility", "/accessibility"],
      ["Fair Housing", "/fair-housing"],
      ["Terms", "/terms"]
    ]
  }
];

export function Footer() {
  return (
    <footer className="border-t border-brand-line bg-brand-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-md bg-brand-gold font-bold text-brand-ink">EEE</div>
          <h2 className="text-xl font-semibold">{settings.company}</h2>
          <address className="mt-4 not-italic leading-7 text-white/75">
            {settings.address.street}<br />
            {settings.address.suite}<br />
            {settings.address.city}, {settings.address.state} {settings.address.zip}
          </address>
          <p className="mt-4 leading-7">
            <Link href={settings.phoneHref} onClick={() => trackEvent("phone_clicked", { location: "footer" })} className="text-white underline">{settings.phone}</Link><br />
            <Link href={settings.emailHref} onClick={() => trackEvent("email_clicked", { location: "footer" })} className="text-white underline">{settings.email}</Link>
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-brand-gold">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map(([label, href, target]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      target={target}
                      rel={target ? "noopener noreferrer" : undefined}
                      className="text-sm text-white/75 hover:text-white"
                      onClick={() => {
                        if (label === "Available Rentals") trackEvent("available_rentals_clicked", { location: "footer" });
                        if (label === "Owner Portal") trackEvent("owner_portal_clicked", { location: "footer" });
                        if (label === "Tenant Portal") trackEvent("tenant_portal_clicked", { location: "footer" });
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-sm text-white/60">
        © {new Date().getFullYear()} EEE Property Management. Information on this site is general and not legal advice.
      </div>
    </footer>
  );
}
