"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function AdminPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main className="min-h-screen bg-brand-cream px-6 py-16 text-brand-ink">
        <div className="mx-auto max-w-3xl rounded-md border border-brand-line bg-white p-8 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">CMS setup required</p>
          <h1 className="mt-4 text-3xl font-semibold">Connect Sanity before using the admin</h1>
          <p className="mt-4 leading-7 text-brand-muted">
            The admin interface is built, but it needs a real Sanity project before EEE staff can log in and manage content.
          </p>
          <ul className="mt-6 space-y-3 leading-7 text-brand-muted">
            <li>Add <code className="rounded bg-brand-mist px-1 py-0.5">NEXT_PUBLIC_SANITY_PROJECT_ID</code>.</li>
            <li>Add <code className="rounded bg-brand-mist px-1 py-0.5">NEXT_PUBLIC_SANITY_DATASET</code>.</li>
            <li>Add the server-side Sanity write token in your deployment environment for lead retention.</li>
            <li>Configure Sanity CORS/origins for local preview and production domains.</li>
          </ul>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
