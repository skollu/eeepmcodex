import { getSiteData } from "@/lib/cms";
import { imageUrl } from "@/lib/images";
import { Section } from "@/components/Section";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";

export async function ServicePhotography() {
  const { settings } = await getSiteData();
  const images = ["inspectionPhoto", "maintenancePhoto", "propertyPhoto"]
    .map((slot) => settings.photography?.[slot])
    .filter((photo) => !!imageUrl(photo));
  if (!images.length) return null;
  return (
    <Section title="Hands-On Property Management" tone="white">
      <div className="grid gap-6 md:grid-cols-3">
        {images.map((image, index) => (
          <PhotoPlaceholder key={index} compact image={image} />
        ))}
      </div>
    </Section>
  );
}
