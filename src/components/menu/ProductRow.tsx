import { formatPrice } from "@/lib/format";
import type { MenuProduct } from "@/services/menu";
import { DishImage } from "./DishImage";

type Props = {
  product: MenuProduct;
  soldOutLabel: string;
  recommendedLabel: string;
  children?: React.ReactNode; // contenido extra debajo de la fila (ej. tarjetas de proteínas)
};

// Fila estilo carta de restaurante: nombre ........ $precio.
// Si el producto tiene foto, muestra una miniatura a la izquierda.
// Los recomendados se resaltan con un recuadro dorado y una estrella.
export function ProductRow({ product, soldOutLabel, recommendedLabel, children }: Props) {
  const soldOut = !product.isAvailable;
  const featured = product.isFeatured;

  return (
    <li
      className={`py-2 ${featured ? "-mx-3 my-1 rounded-xl bg-gold/[0.07] px-3 ring-1 ring-gold/30" : ""}`}
    >
      <div className="flex items-center gap-3">
        {product.image && (
          <div className="relative size-14 shrink-0 overflow-hidden rounded-xl ring-1 ring-gold/30">
            <DishImage src={product.image} alt={product.name} sizes="56px" soldOut={soldOut} />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <h3
              className={`text-[0.95rem] ${
                soldOut ? "text-cream/40" : featured ? "font-semibold text-cream" : "text-cream/90"
              }`}
            >
              {product.name}
            </h3>
            <span aria-hidden="true" className="min-w-4 flex-1 border-b-2 border-dotted border-gold/25" />
            <span
              className={`shrink-0 font-semibold tabular-nums ${
                soldOut ? "text-cream/40 line-through" : "text-gold-light"
              }`}
            >
              {formatPrice(product.price)}
            </span>
          </div>
          {product.description && (
            <p className="mt-0.5 text-[0.82rem] leading-snug text-cream/60">{product.description}</p>
          )}
          {(featured || soldOut) && (
            <div className="mt-1 flex flex-wrap gap-2">
              {featured && (
                <span className="inline-flex items-center gap-1 font-heading text-[0.7rem] uppercase tracking-wider text-gold">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-3.5">
                    <path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5-4.9-4.5 6.6-.8z" />
                  </svg>
                  {recommendedLabel}
                </span>
              )}
              {soldOut && (
                <span className="inline-block rounded-full border border-gold/40 px-2 py-0.5 font-heading text-[0.7rem] uppercase tracking-wider text-gold">
                  {soldOutLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      {children}
    </li>
  );
}
