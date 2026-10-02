"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type Props = {
  href: string;
  children: React.ReactNode;
  eventName?: string;
  eventParams?: Record<string, string | number | boolean>;
  className?: string;
  external?: boolean;
};

export function TrackedLink({ href, children, eventName, eventParams, className, external }: Props) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
      onClick={() => eventName && trackEvent(eventName, eventParams)}
    >
      {children}
    </Link>
  );
}
