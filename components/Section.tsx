export function Section({
  eyebrow,
  title,
  children,
  tone = "light"
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  tone?: "light" | "white" | "green" | "mist" | "linen";
}) {
  const tones = {
    light: "border-t border-brand-line bg-brand-cream",
    white: "border-t border-brand-line bg-white",
    mist: "border-t border-brand-line bg-brand-mist",
    linen: "border-t border-brand-line bg-brand-linen",
    green: "bg-brand-evergreen text-white"
  };
  return (
    <section className={`${tones[tone]} px-6 py-12 md:py-16`}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title) && (
          <div className="mb-8 max-w-3xl">
            {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">{eyebrow}</p>}
            {title && <h2 className={`text-3xl font-semibold leading-tight tracking-normal md:text-4xl ${tone === "green" ? "text-white" : "text-brand-ink"}`}>{title}</h2>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
