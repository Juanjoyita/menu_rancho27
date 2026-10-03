import type { MenuCard } from "@/services/menu";
import { CategoryIcon } from "./CategoryIcon";
import { DishImage } from "./DishImage";

type Props = {
  slug: string; // categoría, para el ícono de las tarjetas sin foto
  cards: MenuCard[];
  label: string; // nombre de la fila para lectores de pantalla
  title?: string; // texto visible encima (ej. "Elige tu proteína")
  swipeHint: string;
  soldOut?: boolean; // el plato está agotado: fotos en gris
  soldOutLabel: string;
  className?: string;
};

// Tarjetas con foto (sin precio: la fila del plato ya lo muestra).
// Se usa debajo de un plato (sus proteínas) o arriba de una sección (galería).
// En celular es una fila deslizable; desde 640 px, una cuadrícula de 3 columnas.
// Solo CSS (scroll-snap), sin JavaScript en el navegador.
export function PhotoCarousel({
  slug,
  cards,
  label,
  title,
  swipeHint,
  soldOut = false,
  soldOutLabel,
  className = "",
}: Props) {
  if (cards.length === 0) return null;
  const canSwipe = cards.length > 1;

  return (
    <div className={className}>
      {(title || canSwipe) && (
        <div className="flex items-baseline justify-between gap-3">
          {title ? <p className="-rotate-2 font-script text-xl text-gold">{title}</p> : <span />}
          {canSwipe && (
            <p aria-hidden="true" className="font-heading text-[0.7rem] uppercase tracking-wider text-cream/50 sm:hidden">
              {swipeHint} →
            </p>
          )}
        </div>
      )}

      {/* tabIndex: permite desplazar la fila con las flechas del teclado. */}
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className="-mx-4 mt-2 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-gold sm:mx-0 sm:overflow-visible sm:px-0"
      >
        <ul className="flex snap-x snap-mandatory gap-3 sm:grid sm:grid-cols-3">
          {cards.map((card) => (
            <li
              key={card.name}
              className="w-[62%] max-w-60 shrink-0 snap-start overflow-hidden rounded-2xl bg-ink shadow-lg shadow-black/40 ring-1 ring-gold/25 sm:w-auto sm:max-w-none"
            >
              <div className="relative aspect-[4/3]">
                {card.image ? (
                  <DishImage
                    src={card.image}
                    alt={card.name}
                    sizes="(min-width: 640px) 210px, (min-width: 388px) 240px, 62vw"
                    soldOut={soldOut}
                  />
                ) : (
                  // Sin foto todavía: ícono de la categoría sobre un brillo dorado.
                  <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_50%_40%,rgba(232,163,61,0.18),transparent_70%)] text-gold/60">
                    <CategoryIcon slug={slug} className="size-12" />
                  </div>
                )}
                {/* Degradado para que el nombre se lea sobre cualquier foto. */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                <p className="absolute inset-x-3 bottom-2 font-heading text-lg uppercase leading-tight tracking-wide text-cream">
                  {card.name}
                </p>
              </div>

              {(card.side || soldOut) && (
                <div className="flex flex-wrap items-center gap-2 px-3 py-2">
                  {card.side && <p className="text-[0.78rem] text-cream/60 italic">{card.side}</p>}
                  {soldOut && (
                    <span className="rounded-full border border-gold/40 px-2 py-0.5 font-heading text-[0.7rem] uppercase tracking-wider text-gold">
                      {soldOutLabel}
                    </span>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
