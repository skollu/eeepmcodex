import { CheckCircle2 } from "lucide-react";

export function CardGrid({ items }: { items: Array<[string, string] | string> }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const title = Array.isArray(item) ? item[0] : item;
        const body = Array.isArray(item) ? item[1] : "";
        return (
          <article key={title} className="rounded-md border border-brand-line bg-white p-5 shadow-card">
            <CheckCircle2 className="mb-3 h-6 w-6 text-brand-forest" aria-hidden />
            <h3 className="text-lg font-semibold text-brand-ink">{title}</h3>
            {body && <p className="mt-2 leading-7 text-brand-muted">{body}</p>}
          </article>
        );
      })}
    </div>
  );
}

export function StatStrip({ stats }: { stats: readonly (readonly [string, string])[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map(([value, label]) => (
        <div key={value} className="rounded-md border border-brand-line bg-brand-linen p-5 text-center shadow-card">
          <div className="text-2xl font-semibold text-brand-forest">{value}</div>
          <div className="mt-1 text-sm font-medium text-brand-muted">{label}</div>
        </div>
      ))}
    </div>
  );
}
