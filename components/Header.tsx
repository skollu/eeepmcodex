"use client";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { trackEvent } from "@/lib/analytics";
import { imageUrl } from "@/lib/images";
import { useSiteData } from "@/components/SiteSettingsProvider";
import type { NavItem } from "@/lib/site-types";

export function Header() {
  const { settings, navigation } = useSiteData();
  const [open, setOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [mobileMenus, setMobileMenus] = useState<Record<string, boolean>>({});
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
    setDesktopMenu(null);
    setMobileMenus({});
  }, [pathname]);
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) {
        setDesktopMenu(null);
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  function navLink(item: NavItem, location: string) {
    return (
      <Link
        key={item.label}
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        className="block rounded-md px-3 py-3 text-sm font-semibold text-brand-ink hover:bg-brand-mist focus-visible:bg-brand-mist"
        onClick={() => {
          const event =
            item.label === "Owner Portal"
              ? "owner_portal_clicked"
              : item.label === "Tenant Portal"
                ? "tenant_portal_clicked"
                : item.label === "Available Rentals"
                  ? "available_rentals_clicked"
                  : undefined;
          if (event) trackEvent(event, { location });
          setOpen(false);
          setDesktopMenu(null);
        }}
      >
        {item.label}
      </Link>
    );
  }
  const logo = imageUrl(settings.logo, 160);
  return (
    <header
      ref={header}
      className="sticky top-0 z-40 flex max-h-[calc(100dvh-5rem)] flex-col border-b border-brand-line bg-brand-cream/95 backdrop-blur xl:max-h-none"
    >
      <div className="mx-auto flex w-full max-w-7xl shrink-0 items-center justify-between gap-3 px-5 py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={`${settings.company} home`}>
          {logo ? (
            <Image
              src={logo}
              alt={settings.logo?.alt || settings.company}
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
          ) : (
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-brand-forest text-lg font-bold text-white">
              EEE
            </span>
          )}
          <span className="min-w-0 leading-tight">
            <span className="block font-semibold text-brand-ink">
              {settings.company === "EEE Property Management" ? "EEE Property" : settings.company}
            </span>
            <span className="block text-sm text-brand-muted">Ethics. Efficiency. Expertise.</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
          {navigation.map((item) =>
            item.children?.length ? (
              <div
                key={item.label}
                className="relative"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null))
                    setDesktopMenu((current) => (current === item.label ? null : current));
                }}
                onKeyDown={(event) => {
                  const button = event.currentTarget.querySelector("button")!;
                  const links = [...event.currentTarget.querySelectorAll<HTMLAnchorElement>("a")];
                  const index = links.indexOf(document.activeElement as HTMLAnchorElement);
                  if (event.key === "Escape") {
                    event.preventDefault();
                    setDesktopMenu(null);
                    button.focus();
                  }
                  if (["ArrowDown", "ArrowUp"].includes(event.key)) {
                    event.preventDefault();
                    setDesktopMenu(item.label);
                    const next =
                      event.key === "ArrowDown"
                        ? (index + 1) % links.length
                        : index < 0
                          ? links.length - 1
                          : (index - 1 + links.length) % links.length;
                    requestAnimationFrame(() => links[next]?.focus());
                  }
                }}
              >
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center gap-1 rounded-md px-3 py-3 text-sm font-semibold text-brand-ink hover:text-brand-forest"
                  aria-expanded={desktopMenu === item.label}
                  aria-controls={`${item.label.toLowerCase().replace(/[^a-z0-9_-]/g, "-")}-nav-menu`}
                  onClick={() => setDesktopMenu((current) => (current === item.label ? null : item.label))}
                >
                  {item.label}
                  <ChevronDown className={`h-4 w-4 ${desktopMenu === item.label ? "rotate-180" : ""}`} aria-hidden />
                </button>
                <div
                  id={`${item.label.toLowerCase().replace(/[^a-z0-9_-]/g, "-")}-nav-menu`}
                  hidden={desktopMenu !== item.label}
                  className="absolute right-0 top-full w-72 rounded-md border border-brand-line bg-white p-2 shadow-soft"
                >
                  {item.children.map((child) => navLink(child, "header"))}
                </div>
              </div>
            ) : (
              navLink(item, "header")
            )
          )}
        </nav>
        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <Link
            href={settings.phoneHref}
            onClick={() => trackEvent("phone_clicked", { location: "header" })}
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-brand-line bg-white px-4 text-sm font-semibold text-brand-forest"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Call Us
          </Link>
          <ButtonLink href={settings.primaryCtaDestination}>{settings.primaryCtaLabel}</ButtonLink>
        </div>
        <button
          ref={toggle}
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-brand-line bg-white xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        hidden={!open}
        className="min-h-0 overflow-y-auto overscroll-contain border-t border-brand-line bg-white px-5 py-4 xl:hidden"
        aria-label="Mobile navigation"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
            toggle.current?.focus();
          }
        }}
      >
        <div className="grid gap-2">
          {navigation.map((item) =>
            item.children?.length ? (
              <div key={item.label} className="rounded-md border border-brand-line">
                <button
                  type="button"
                  className="flex min-h-12 w-full items-center justify-between rounded-md px-3 py-3 text-left font-semibold text-brand-ink hover:bg-brand-mist"
                  aria-expanded={!!mobileMenus[item.label]}
                  aria-controls={`${item.label.toLowerCase().replace(/[^a-z0-9_-]/g, "-")}-mobile-nav-menu`}
                  onClick={() => setMobileMenus((current) => ({ ...current, [item.label]: !current[item.label] }))}
                >
                  {item.label}
                  <ChevronDown className={`h-4 w-4 ${mobileMenus[item.label] ? "rotate-180" : ""}`} aria-hidden />
                </button>
                <div
                  id={`${item.label.toLowerCase().replace(/[^a-z0-9_-]/g, "-")}-mobile-nav-menu`}
                  hidden={!mobileMenus[item.label]}
                  className="border-t border-brand-line p-2"
                >
                  {item.children.map((child) => navLink(child, "mobile_nav"))}
                </div>
              </div>
            ) : (
              navLink(item, "mobile_nav")
            )
          )}
          <div className="grid gap-3 pt-3 sm:grid-cols-2">
            <Link
              href={settings.phoneHref}
              onClick={() => trackEvent("phone_clicked", { location: "mobile_nav" })}
              className="rounded-md border border-brand-line px-4 py-3 text-center font-semibold text-brand-forest"
            >
              Call Us
            </Link>
            <ButtonLink href={settings.primaryCtaDestination}>{settings.primaryCtaLabel}</ButtonLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
