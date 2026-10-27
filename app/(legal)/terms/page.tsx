import { LegalContent } from "@/components/LegalContent";
import { getCmsPage, pageMetadata } from "@/lib/pages";

export async function generateMetadata() { return pageMetadata(await getCmsPage("terms"), { title: "Terms of Use", description: "Terms governing use of the EEE Property Management website and its external links.", path: "/terms" }); }

export default function TermsPage() {
  return (
    <LegalContent slug="terms" title="Terms of Use">
      <div className="max-w-3xl space-y-5 leading-8 text-brand-muted">
        <p>This website provides general information about EEE Property Management services. It does not provide legal, financial, or investment advice.</p>
        <p>External links, including AppFolio destinations, open outside this website and are governed by their own terms and privacy practices.</p>
      </div>
    </LegalContent>
  );
}
