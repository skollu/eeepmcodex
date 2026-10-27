import { LegalContent } from "@/components/LegalContent";
import { getCmsPage, pageMetadata } from "@/lib/pages";

export async function generateMetadata() { return pageMetadata(await getCmsPage("accessibility"), { title: "Accessibility", description: "EEE Property Management's website accessibility goals and contact options for assistance.", path: "/accessibility" }); }

export default function AccessibilityPage() {
  return (
    <LegalContent slug="accessibility" title="Accessibility">
      <p className="max-w-3xl text-lg leading-8 text-brand-muted">EEE Property Management aims to provide a website experience that follows WCAG 2.2 AA practices, including keyboard navigation, visible focus states, semantic structure, form labels, and readable contrast. If you have trouble using the site, contact EEE so the team can assist.</p>
    </LegalContent>
  );
}
