import { LegalContent } from "@/components/LegalContent";
import { getCmsPage, pageMetadata } from "@/lib/pages";

export async function generateMetadata() { return pageMetadata(await getCmsPage("privacy"), { title: "Privacy Policy", description: "How EEE Property Management uses information provided through this website.", path: "/privacy" }); }

export default function PrivacyPage() {
  return (
    <LegalContent slug="privacy" title="Privacy Policy">
      <div className="max-w-3xl space-y-5 leading-8 text-brand-muted">
        <p>EEE Property Management collects information submitted through forms to respond to rental estimate and property management inquiries.</p>
        <p>Website infrastructure, analytics, email, CMS, and hosting providers may process information as needed to operate the site.</p>
        <p>Do not submit sensitive personal information through general website forms.</p>
      </div>
    </LegalContent>
  );
}
