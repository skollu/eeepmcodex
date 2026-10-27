# Launch imagery approval and CMS handoff

Prepared 2026-10-26. No assets uploaded, CMS documents mutated, or deployment performed.

## Selection register

All candidates remain pending owner approval. A stock copyright license is not proof of all property, artwork, trademark or model releases. Preserve a dated copy of the applicable license and download receipt when the final asset is acquired.

| Candidate | Creator and original image page | License evidence | Proposed use / alt text | Decision |
| --- | --- | --- | --- | --- |
| Residential interior | Curtis Adams, https://www.pexels.com/photo/modern-living-room-interior-15824912/ | Pexels License, https://www.pexels.com/license/ | `showingPhoto`; "Living room with a gray sofa, coffee table and tall windows." | Recommended subject to owner/artwork review; representative only, location not verified as Seattle. |
| Seattle residential exterior | Zac Gudakov, https://unsplash.com/photos/white-and-brown-wooden-house-near-green-trees-under-blue-sky-during-daytime-w-W1Nznmw3w | Unsplash License, https://unsplash.com/license/ and https://unsplash.com/terms | `heroPhoto` OR `propertyPhoto`, not both; "Single-story home with wood accents and evergreen trees." | CONDITIONAL HOLD: visible house number at right; approve a crop excluding it, inspect at final resolution and review property rights first. Source labels location Seattle; not an EEE listing or portfolio property. |
| Inspection detail | RDNE Stock project, https://www.pexels.com/photo/person-in-yellow-reflective-safety-vest-holding-a-pen-and-checklist-of-house-inspection-8293680/ | Pexels License, https://www.pexels.com/license/ | Optional `inspectionPhoto`; "Hands holding a pen and inspection checklist on a clipboard." | HOLD: printed third-party checklist is readable, and vest is visually strong. Prefer existing inspection icons unless third-party document/release concerns are cleared. Never identify person as EEE staff. |

License pages checked directly and all three candidate previews inspected. Pexels permits free website/marketing use and modification, requires no attribution, and prohibits implied endorsement. Unsplash permits free commercial use without mandatory attribution, but excludes certain resale/competing-library uses. Optional credits: "Photo by Curtis Adams on Pexels", "Photo by Zac Gudakov on Unsplash", "Photo by RDNE Stock project on Pexels". None of these photographs is a founder portrait, genuine testimonial portrait or evidence of an EEE-managed property. No maintenance/management-person photo selected: retain the site's existing service icons instead of staged staff imagery.

## Slot audit

| Location | Current behavior and launch treatment |
| --- | --- |
| Home hero and other shared Hero pages | CMS page hero, otherwise global residential hero; empty/missing-alt images omitted. Approved representative residential stock may be used with disclosure. |
| Home services `showingPhoto` | Optional compact interior; candidate interior above. |
| Home founder story `founderPhoto` | Authentic only; tagged stock blocked even if approved. Leave empty without a real photograph. Existing values graphic carries story. |
| Services `inspectionPhoto`, `maintenancePhoto`, `propertyPhoto` | Optional gallery; omitted entirely if empty. Prefer property/interior photo plus existing management illustrations; no fake EEE workers. |
| About | Existing brand-story sections and approved wording retained. Global hero-photo fallback disabled; explicit page hero remains optional. Values use restrained ShieldCheck, Settings2 and KeyRound icons. No team-photo placeholder added. |
| Team and testimonial portraits | Optional authentic portraits only; tagged stock blocked. Existing biographies and publication rules unchanged. No people or credentials invented. |
| Rental Estimate sidebar | Optional page hero or global inspection photo, hidden below medium screens as before. Disabled form unchanged. |
| Contact, FAQ, Blog index, legal page extras | Optional page hero image; missing image omitted rather than replaced with instructions. |
| Blog detail and rich text | Optional featured/body images; shared approval, alt and caption logic. No generic stock featured image applied to all posts. |
| Global social images, page/social metadata | Same stock rights gate in URL helper. Source/license fields attached to relevant CMS image objects. Metadata does not display a caption: use only assets requiring no public attribution or provide a license-compliant alternative. |
| Brand logo/favicon | Existing brand assets, not stock-photo targets; unchanged. |
| `public/images/eee-placeholder.svg` | Unused legacy asset; no public component references found. Left intact rather than deleting unrelated assets. |

## CMS workflow after approval

1. Use authenticated Sanity Studio. Download the approved original from its source page, retain license evidence, remove embedded GPS/EXIF metadata, and inspect full-resolution details for numbers, people, logos and artwork. Do not hotlink stock hosts.
2. Upload to the relevant Site Settings > Website Photography slot (or a page/blog image). Enter alt text, source type `stock`, original source URL, creator, license name, license evidence URL, any required credit, and crop/hotspot.
3. Review the rights/releases and EEE approval switches. Stock URLs are suppressed until both are true and source, creator and license documentation are present. Required credits must be populated. The renderer adds a representative-stock disclosure below the photo, never on top of the subject.
4. Keep stock out of portrait fields. Leave About hero blank for a photography-free brand story. Publish only after approval; verify the published result on staging before any launch.
5. Existing images without a source classification remain compatible; this is not a retrospective rights clearance. Audit and classify any pre-existing uploads before launch. These controls are editorial safeguards, not an authorization/security boundary or a substitute for legal review.

No valid owner-authorized upload credential or asset approval was used in this pass. Live Sanity uploads/publishing remain NOT TESTED and pending. New schema fields alone do not mean an image has been stored in Sanity.

## Performance and accessibility

Keep originals around 1800-2200px on the long edge for website photography; do not upload huge camera originals unnecessarily. Existing Sanity transformations use auto format and max width; Next Image supplies responsive variants. Only hero photos receive priority loading; other images lazy-load. Figures reserve 4:3 or 16:10 space; captions flow below images in white on evergreen, so long credits cannot obscure subjects. Alt is required for content photos; decorative values icons are aria-hidden. Validate final crop at 375px, 768px and 1440px after upload. Target roughly 100-200KB for the rendered mobile hero; this is a budget, not a measured result. Final asset performance, crop and screen-reader QA remain pending approved uploads.

## Boundaries

No deployment, DNS, production environment, lead form, historical lead record or approved business-copy change. Historical public Sanity lead exposure remains an independent unresolved launch blocker; imagery work does not fix it.
