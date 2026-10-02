import type { StructureResolver } from "sanity/structure";

const pageItems = [
  ["Home", "home"],
  ["Services", "property-management-services"],
  ["Rental Estimate", "rental-estimate"],
  ["Owner FAQ", "owner-faq"],
  ["Switching Property Managers", "switching-property-managers"],
  ["About", "about"],
  ["Contact", "contact"]
] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("EEE Website Admin")
    .items([
      S.listItem()
        .title("Website")
        .child(
          S.list()
            .title("Website Pages")
            .items(
              pageItems.map(([title, slug]) =>
                S.listItem()
                  .title(title)
                  .child(
                    S.documentList()
                      .title(title)
                      .filter('_type == "page" && slug.current == $slug')
                      .params({ slug })
                  )
              )
            )
        ),
      S.divider(),
      S.listItem()
        .title("Content")
        .child(
          S.list()
            .title("Content")
            .items([
              S.documentTypeListItem("blogPost").title("Blog Posts"),
              S.documentTypeListItem("blogCategory").title("Blog Categories"),
              S.documentTypeListItem("testimonial").title("Testimonials"),
              S.documentTypeListItem("teamMember").title("Team Members"),
              S.documentTypeListItem("faq").title("FAQs"),
              S.documentTypeListItem("leadMagnet").title("Lead Magnets")
            ])
        ),
      S.listItem()
        .title("Lead Submissions")
        .child(
          S.list()
            .title("Lead Submissions")
            .items([
              S.listItem()
                .title("All Leads")
                .child(S.documentTypeList("leadSubmission").title("All Leads")),
              ...["New", "Contacted", "Qualified", "Closed", "Not Moving Forward"].map((status) =>
                S.listItem()
                  .title(status)
                  .child(
                    S.documentList()
                      .title(`${status} Leads`)
                      .filter('_type == "leadSubmission" && status == $status')
                      .params({ status })
                      .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
                  )
              )
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Global Settings")
        .child(
          S.list()
            .title("Global Settings")
            .items([
              S.documentTypeListItem("siteSettings").title("Business Information"),
              S.documentTypeListItem("navigationSettings").title("Navigation"),
              S.documentTypeListItem("footerSettings").title("Footer"),
              S.documentTypeListItem("seoSettings").title("Default SEO")
            ])
        )
    ]);
