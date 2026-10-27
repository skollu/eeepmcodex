"use client";

import { createContext, useContext } from "react";
import type { SiteData } from "@/lib/site-types";

const Context = createContext<SiteData | null>(null);
export function SiteSettingsProvider({ value, children }: { value: SiteData; children: React.ReactNode }) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useSiteData() {
  const data = useContext(Context);
  if (!data) throw new Error("Site settings provider required");
  return data;
}
