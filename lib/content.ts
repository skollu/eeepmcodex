export const settings = {
  company: "EEE Property Management",
  brandMeaning: "Ethics, Efficiency, Expertise",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://eeepm.com",
  phone: "206.771.9992",
  phoneHref: "tel:+12067719992",
  email: "team@eeepm.com",
  emailHref: "mailto:team@eeepm.com",
  whatsappHref: "https://wa.me/12067719992",
  address: {
    street: "14205 SE 36th Street",
    suite: "Suite 100",
    city: "Bellevue",
    state: "WA",
    zip: "98006"
  },
  serviceArea: "King, Snohomish, and Pierce counties",
  appfolioRentals: "https://eeepm.appfolio.com/listings/listings",
  appfolioOwnerPortal: "https://eeepm.appfolio.com/oportal/users/log_in",
  appfolioTenantPortal: "https://eeepm.appfolio.com/connect/users/sign_in"
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/property-management-services" },
  {
    label: "Owners",
    href: "/rental-estimate",
    children: [
      { label: "Free Rental Estimate", href: "/rental-estimate" },
      { label: "Owner FAQ", href: "/owner-faq" },
      { label: "Switching Property Managers", href: "/switching-property-managers" },
      { label: "Owner Portal", href: settings.appfolioOwnerPortal, external: true }
    ]
  },
  {
    label: "Tenants",
    href: settings.appfolioRentals,
    children: [
      { label: "Available Rentals", href: settings.appfolioRentals, external: true },
      { label: "Tenant Portal", href: settings.appfolioTenantPortal, external: true }
    ]
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" }
];

export const stats = [
  ["30+ Years", "Combined Experience"],
  ["Investor-Owned", "& Operated"],
  ["0 Evictions", "To Date"],
  ["3 Counties", "Served"],
  ["Hands-On", "Local Management"]
] as const;

export const services = [
  "Rental Marketing",
  "Applicant Screening",
  "Leasing Support",
  "Rent Collection",
  "Maintenance Coordination",
  "Owner Reporting",
  "In-Person Showings",
  "Property Inspections",
  "Professional Photography",
  "Remote Owner Support"
];

export const serviceDetails = [
  ["Rental Pricing & Preparation", "Practical rent-positioning guidance and preparation recommendations based on the property, location, and current market conditions."],
  ["Professional Rental Marketing", "Listings are presented clearly across appropriate rental channels with owner communication throughout the process."],
  ["Professional Photography", "Quality property photography helps prospective renters understand the home and can support stronger online presentation."],
  ["In-Person Showings", "EEE emphasizes personal property showings rather than relying exclusively on unattended self-tour access."],
  ["Applicant Screening", "Applicants are reviewed through consistently applied, lawful screening procedures."],
  ["Lease Coordination", "EEE helps coordinate leasing details, documentation, and move-in steps."],
  ["Rent Collection", "Ongoing rent collection is handled through a managed process designed to keep owners informed."],
  ["Owner Reporting", "Owners receive clear reporting and communication about property activity."],
  ["Maintenance Coordination", "Maintenance is coordinated with attention to timely resolution, vendor relationships, and cost-conscious decision-making."],
  ["Property Inspections", "In-person property inspections help owners understand condition and identify issues early."],
  ["Lease Renewals", "Renewal conversations are handled with practical guidance and documentation support."],
  ["Tenant Communication", "EEE manages everyday resident communication professionally and consistently."],
  ["Home Warranty Coordination", "Where applicable, EEE can coordinate service needs with an owner's home-warranty provider."],
  ["Out-of-State Owner Support", "Remote owners receive local oversight and responsive communication from people who understand the area."]
] as const;

export const faqs = [
  ["What areas does EEE Property Management serve?", "EEE serves property owners throughout King, Snohomish, and Pierce counties, including the Greater Seattle area."],
  ["What types of properties does EEE manage?", "EEE manages single-family homes, luxury single-family homes, and small multifamily properties."],
  ["Does EEE work with out-of-state owners?", "Yes. EEE supports owners who live outside the area, including owners outside Washington and outside the United States."],
  ["How do I find out what my property could rent for?", "Start with the free rental estimate form. EEE will review your property information and contact you with practical next steps."],
  ["Can I switch property managers if I already have tenants?", "Often, yes, but the right process depends on your current agreement and property situation. EEE can discuss the general transition steps with you."],
  ["How does EEE communicate with owners?", "Owners can communicate directly with EEE by phone, email, and WhatsApp, with a focus on timely, clear updates."]
] as const;

export const blogPosts = [
  {
    title: "How Much Does Property Management Cost in Seattle?",
    slug: "how-much-does-property-management-cost-in-seattle",
    excerpt: "A practical owner-focused guide to understanding management fees, leasing costs, and questions to ask before hiring a property manager.",
    category: "Property Management",
    date: "2026-01-15"
  },
  {
    title: "How to Rent Out Your Home for the First Time",
    slug: "how-to-rent-out-your-home-for-the-first-time",
    excerpt: "The core decisions first-time landlords should understand before pricing, marketing, leasing, and managing a rental home.",
    category: "First-Time Landlords",
    date: "2026-02-15"
  },
  {
    title: "How to Switch Property Management Companies",
    slug: "how-to-switch-property-management-companies",
    excerpt: "What owners should consider when they are frustrated with their current manager and want a more responsive experience.",
    category: "Switching Property Managers",
    date: "2026-03-15"
  }
];

export const placeholders = [
  "Real EEE founder/team photography",
  "Actual managed-property photography",
  "Team names, roles, biographies, and headshots",
  "Real customer testimonials and testimonial photos",
  "Social media profile URLs",
  "Rental application and maintenance request URLs",
  "Public pricing details, if EEE chooses to publish them",
  "Email provider credentials and Sanity project credentials"
];
