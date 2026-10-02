import Image from "next/image";

type PhotoPlaceholderProps = {
  label: string;
  requirement: string;
  priority?: boolean;
  compact?: boolean;
};

export function PhotoPlaceholder({ label, requirement, priority = false, compact = false }: PhotoPlaceholderProps) {
  return (
    <figure className={`relative overflow-hidden rounded-md border border-brand-line bg-white shadow-card ${compact ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
      <Image
        src="/images/eee-placeholder.svg"
        alt={requirement}
        fill
        sizes="(min-width: 1024px) 46vw, 100vw"
        priority={priority}
        className="object-cover"
      />
      <figcaption className="absolute inset-x-4 bottom-4 rounded-md border border-white/30 bg-brand-evergreen/92 p-4 text-white shadow-card backdrop-blur">
        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand-brass">{label}</span>
        <span className="mt-1 block text-sm leading-6 text-white/90">{requirement}</span>
      </figcaption>
    </figure>
  );
}
