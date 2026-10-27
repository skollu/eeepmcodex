import { LegalContent } from "@/components/LegalContent";
import { getCmsPage, pageMetadata } from "@/lib/pages";

export async function generateMetadata() { return pageMetadata(await getCmsPage("fair-housing"), { title: "Fair Housing", description: "EEE Property Management's commitment to fair housing and consistently applied rental procedures.", path: "/fair-housing" }); }

export default function FairHousingPage() {
  return (
    <LegalContent slug="fair-housing" title="Fair Housing">
      <p className="max-w-3xl text-lg leading-8 text-brand-muted">EEE Property Management supports fair housing and uses consistently applied, lawful procedures in rental housing operations. Website content should not express preferences or limitations based on protected characteristics.</p>
    </LegalContent>
  );
}
