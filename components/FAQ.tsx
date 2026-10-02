export function FAQ({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <div className="divide-y divide-brand-line rounded-md border border-brand-line bg-white">
      {items.map(([question, answer]) => (
        <details key={question} className="group p-6">
          <summary className="cursor-pointer list-none font-semibold text-brand-ink group-open:text-brand-forest">
            {question}
          </summary>
          <p className="mt-4 leading-7 text-brand-muted">{answer}</p>
        </details>
      ))}
    </div>
  );
}
