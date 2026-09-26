import { CategoryIcon } from "./CategoryIcon";

type Props = {
  id: string; // id del <h2>, para aria-labelledby de la sección
  slug: string;
  title: string;
};

// Título de categoría: círculo dorado con ícono + nombre sobre una pincelada.
export function SectionHeader({ id, slug, title }: Props) {
  return (
    <div className="flex items-center">
      <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-2 border-gold bg-ink text-gold shadow-[0_0_0_4px_var(--color-ink)]">
        <CategoryIcon slug={slug} className="size-7" />
      </span>

      <div className="relative -ml-3 max-w-xs flex-1">
        {/* Pincelada dorada con bordes irregulares. */}
        <svg
          viewBox="0 0 300 56"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full text-gold"
        >
          <path
            fill="currentColor"
            d="M4 13 L42 8 L96 11 L150 6 L208 10 L262 6 L293 11 L284 20 L298 27 L285 35 L294 45 L242 49 L182 46 L122 51 L62 47 L10 50 L17 40 L2 31 L14 22 Z"
          />
          {/* Vetas más claras para que parezca pintado a mano. */}
          <path
            fill="none"
            stroke="var(--color-gold-light)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
            d="M30 17 H180 M60 38 H250 M200 24 H280"
          />
        </svg>
        <h2
          id={id}
          className="relative py-2.5 pr-8 pl-7 font-heading text-xl font-semibold uppercase tracking-wide text-ink"
        >
          {title}
        </h2>
      </div>
    </div>
  );
}
