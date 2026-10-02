"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { settings } from "@/lib/content";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-brand-line bg-white p-3 shadow-soft md:hidden">
      <Link href={settings.phoneHref} onClick={() => trackEvent("phone_clicked", { location: "sticky_mobile_bar" })} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-ink font-semibold text-white">
        <Phone className="h-4 w-4" aria-hidden />
        Call
      </Link>
      <Link href="/rental-estimate" className="ml-3 inline-flex min-h-11 items-center justify-center rounded-md bg-brand-gold font-semibold text-brand-ink">
        Free Estimate
      </Link>
    </div>
  );
}
