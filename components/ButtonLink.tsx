"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
  analyticsEvent?: string;
  analyticsParams?: Record<string, string | number | boolean>;
};

export function ButtonLink({ href, children, variant = "primary", external, className = "", analyticsEvent, analyticsParams }: Props) {
  const base = "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5";
  const styles = {
    primary: "bg-brand-forest text-white shadow-card hover:bg-brand-ink",
    secondary: "border border-brand-forest bg-white text-brand-forest hover:bg-brand-mist",
    ghost: "text-brand-forest underline hover:text-brand-ink"
  };
  return (
    <Link
      href={href}
      className={`${base} ${styles[variant]} ${className}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() => analyticsEvent && trackEvent(analyticsEvent, analyticsParams)}
    >
      {children}
    </Link>
  );
}
