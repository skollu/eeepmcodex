"use client";

import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { navItems, settings } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const [open, setOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [mobileMenus, setMobileMenus] = useState<Record<string, boolean>>({});

  function trackNavClick(label: string, location: "header" | "mobile_nav") {
    if (label === "Available Rentals") trackEvent("available_rentals_clicked", { location });
    if (label === "Owner Portal") trackEvent("owner_portal_clicked", { location });
    if (label === "Tenant Portal") trackEvent("tenant_portal_clicked", { location });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-brand-line bg-brand-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="EEE Property Management home">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-brand-forest text-lg font-bold text-white">EEE</span>
          <span className="leading-tight">
            <span className="block font-semibold text-brand-ink">EEE Property</span>
            <span className="block text-sm text-brand-muted">Ethics. Efficiency. Expertise.</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) =>
            item.children ? (
              <div
                className="group relative"
                key={item.label}
                onMouseEnter={() => setDesktopMenu(item.label)}
                onMouseLeave={() => setDesktopMenu((current) => (current === item.label ? null : current))}
                onBlur={(event) => {
                  const nextTarget = event.relatedTarget;
                  if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
                    setDesktopMenu((current) => (current === item.label ? null : current));
                  }
                }}
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md py-3 text-sm font-semibold text-brand-ink outline-none hover:text-brand-forest focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
                  aria-expanded={desktopMenu === item.label}
                  aria-haspopup="menu"
                  aria-controls={`${item.label.toLowerCase()}-nav-menu`}
                  onFocus={() => setDesktopMenu(item.label)}
                  onClick={() => setDesktopMenu((current) => (current === item.label ? null : item.label))}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") setDesktopMenu(null);
                  }}
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </button>
                <div
                  id={`${item.label.toLowerCase()}-nav-menu`}
                  role="menu"
                  className={`absolute right-0 top-10 w-72 rounded-md border border-brand-line bg-white p-2 shadow-soft transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 ${
                    desktopMenu === item.label ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      target={child.external ? "_blank" : undefined}
                      rel={child.external ? "noopener noreferrer" : undefined}
                      role="menuitem"
                      className="block rounded px-3 py-2 text-sm font-medium text-brand-ink outline-none hover:bg-brand-mist focus-visible:bg-brand-mist focus-visible:ring-2 focus-visible:ring-brand-gold"
                      onClick={() => {
                        trackNavClick(child.label, "header");
                        setDesktopMenu(null);
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                target={"external" in item && item.external ? "_blank" : undefined}
                rel={"external" in item && item.external ? "noopener noreferrer" : undefined}
                className="rounded-md text-sm font-semibold text-brand-ink outline-none hover:text-brand-forest focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
                onClick={() => {
                  trackNavClick(item.label, "header");
                }}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={settings.phoneHref}
            onClick={() => trackEvent("phone_clicked", { location: "header" })}
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-brand-line bg-white px-4 text-sm font-semibold text-brand-forest"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Call Us
          </Link>
          <ButtonLink href="/rental-estimate">Get Free Rental Estimate</ButtonLink>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-brand-line bg-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Open navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-brand-line bg-white px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="grid gap-2">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="rounded-md border border-brand-line">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left font-semibold text-brand-ink outline-none hover:bg-brand-mist focus-visible:ring-2 focus-visible:ring-brand-gold"
                    aria-expanded={mobileMenus[item.label] || false}
                    aria-controls={`${item.label.toLowerCase()}-mobile-nav-menu`}
                    onClick={() => setMobileMenus((current) => ({ ...current, [item.label]: !current[item.label] }))}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition ${mobileMenus[item.label] ? "rotate-180" : ""}`} aria-hidden />
                  </button>
                  {mobileMenus[item.label] && (
                    <div id={`${item.label.toLowerCase()}-mobile-nav-menu`} className="grid gap-1 border-t border-brand-line p-2">
                      {item.children.map((child) => (
                        <Link
                          key={`${item.label}-${child.label}-${child.href}`}
                          href={child.href}
                          target={child.external ? "_blank" : undefined}
                          rel={child.external ? "noopener noreferrer" : undefined}
                          className="rounded-md px-3 py-3 font-semibold text-brand-ink outline-none hover:bg-brand-mist focus-visible:ring-2 focus-visible:ring-brand-gold"
                          onClick={() => {
                            trackNavClick(child.label, "mobile_nav");
                            setOpen(false);
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  target={"external" in item && item.external ? "_blank" : undefined}
                  rel={"external" in item && item.external ? "noopener noreferrer" : undefined}
                  className="rounded-md px-3 py-3 font-semibold text-brand-ink outline-none hover:bg-brand-mist focus-visible:ring-2 focus-visible:ring-brand-gold"
                  onClick={() => {
                    trackNavClick(item.label, "mobile_nav");
                    setOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <Link href={settings.phoneHref} onClick={() => trackEvent("phone_clicked", { location: "mobile_nav" })} className="rounded-md bg-brand-ink px-4 py-3 text-center font-semibold text-white">CALL</Link>
              <Link href="/rental-estimate" className="rounded-md bg-brand-gold px-4 py-3 text-center font-semibold text-brand-ink">RENTAL ESTIMATE</Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
