import { Camera, ClipboardCheck, Handshake, Home, MessageCircle, Wrench } from "lucide-react";

const values = [
  {
    title: "Ethics",
    body: "Do the right thing, communicate honestly and treat owners, residents and partners with respect."
  },
  {
    title: "Efficiency",
    body: "Respond quickly, solve problems practically and avoid unnecessary cost or complexity."
  },
  {
    title: "Expertise",
    body: "Apply real ownership and management experience to everyday decisions."
  }
];

const approachPairs = [
  ["Slow or inconsistent communication", "Direct, responsive communication", MessageCircle],
  ["Impersonal management", "Local, hands-on management", Handshake],
  ["Unattended self-tour reliance", "In-person showings", Home],
  ["Unclear maintenance handling", "Proactive, cost-conscious coordination", Wrench],
  ["Generic property presentation", "Professional photography", Camera]
] as const;

const serviceGroups = [
  {
    heading: "Lease-Up Support",
    items: ["Rental marketing", "Professional photography", "In-person showings", "Applicant screening", "Lease coordination"]
  },
  {
    heading: "Ongoing Management",
    items: ["Rent collection", "Owner reporting", "Tenant communication", "Lease renewals", "Remote owner support"]
  },
  {
    heading: "Property Care",
    items: ["Maintenance coordination", "Property inspections", "Vendor coordination", "Home warranty coordination", "Cost-conscious follow-through"]
  }
];

export function ValuesTriad() {
  return (
    <div className="grid overflow-hidden rounded-md border border-brand-line bg-brand-evergreen text-white shadow-card lg:grid-cols-3">
      {values.map((value, index) => (
        <article key={value.title} className="border-b border-white/15 p-6 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-brass">EEE 0{index + 1}</span>
          <h3 className="mt-4 text-3xl font-semibold">{value.title}</h3>
          <p className="mt-4 leading-7 text-white/82">{value.body}</p>
        </article>
      ))}
    </div>
  );
}

export function HandsOnApproach() {
  return (
    <div className="overflow-hidden rounded-md border border-brand-line bg-white shadow-card">
      {approachPairs.map(([frustration, approach, Icon]) => (
        <div key={frustration} className="grid gap-4 border-b border-brand-line p-5 last:border-b-0 md:grid-cols-[1fr_auto_1.1fr] md:items-center">
          <p className="font-semibold text-brand-muted">{frustration}</p>
          <span className="hidden h-px w-12 bg-brand-gold md:block" aria-hidden />
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-mist text-brand-forest">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <p className="font-semibold leading-7 text-brand-ink">{approach}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ServiceBands() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {serviceGroups.map((group) => (
        <article key={group.heading} className="rounded-md border border-brand-line bg-white p-6 shadow-card">
          <ClipboardCheck className="mb-4 h-6 w-6 text-brand-forest" aria-hidden />
          <h3 className="text-xl font-semibold text-brand-ink">{group.heading}</h3>
          <ul className="mt-5 space-y-3">
            {group.items.map((item) => (
              <li key={item} className="border-l-2 border-brand-gold pl-3 text-sm font-semibold leading-6 text-brand-muted">
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
