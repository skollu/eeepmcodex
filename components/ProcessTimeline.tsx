export function ProcessTimeline({ steps }: { steps: string[] }) {
  return (
    <ol className="relative grid gap-4 lg:grid-cols-7 lg:gap-0" aria-label="EEE management process">
      <span className="absolute left-0 right-0 top-9 hidden h-px bg-white/25 lg:block" aria-hidden />
      {steps.map((step, index) => (
        <li key={step} className="relative lg:px-2">
          <div className="grid grid-cols-[3rem_1fr] gap-4 rounded-md border border-white/18 bg-white/10 p-4 shadow-card backdrop-blur lg:grid-cols-1 lg:pt-5">
            <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-brand-brass bg-brand-evergreen text-sm font-bold text-brand-brass">
              {index + 1}
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-brass">Step {index + 1}</span>
              <p className="mt-1 font-semibold leading-6 text-white">{step}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
