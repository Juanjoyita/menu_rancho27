"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  label: string; // "Categorías", para lectores de pantalla
  categories: { slug: string; name: string }[];
};

// Barra de categorías fija arriba. Resalta la sección que se está viendo y la
// desliza a la vista dentro de la barra. Sin JavaScript, los enlaces funcionan igual.
export function CategoryNav({ label, categories }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Sección activa: la última cuyo inicio ya pasó por debajo de la barra.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const navBottom = (navRef.current?.getBoundingClientRect().bottom ?? 0) + 24;
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: string | null = null;
      for (const { slug } of categories) {
        const section = document.getElementById(slug);
        if (section && section.getBoundingClientRect().top <= navBottom) current = slug;
      }
      // Al final de la página, la última sección (puede ser corta y no llegar arriba).
      if (atEnd && categories.length > 0) current = categories[categories.length - 1].slug;
      setActive(current);
    };

    // Como máximo un cálculo por fotograma, para no frenar el scroll.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [categories]);

  // Desliza la barra para que la categoría activa quede a la vista.
  useEffect(() => {
    const list = listRef.current;
    const link = active ? list?.querySelector<HTMLElement>(`[data-slug="${active}"]`) : null;
    if (!list || !link) return;
    const left = link.offsetLeft - list.offsetLeft;
    const outOfView = left < list.scrollLeft + 16 || left + link.offsetWidth > list.scrollLeft + list.clientWidth - 16;
    if (outOfView) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      list.scrollTo({ left: Math.max(0, left - 16), behavior: reduceMotion ? "auto" : "smooth" });
    }
  }, [active]);

  return (
    <nav ref={navRef} aria-label={label} className="sticky top-0 z-20 border-y border-gold/20 bg-ink">
      {/* Fondo opaco sin desenfoque (backdrop-blur hacía lento el scroll en celulares). */}
      <ul ref={listRef} className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none]">
        {categories.map(({ slug, name }) => {
          const isActive = slug === active;
          return (
            <li key={slug} className="shrink-0">
              <a
                href={`#${slug}`}
                data-slug={slug}
                aria-current={isActive ? "location" : undefined}
                className={`block rounded-full border px-4 py-1.5 font-heading text-sm tracking-wide transition-colors ${
                  isActive
                    ? "border-gold bg-gold text-ink"
                    : "border-gold/40 text-cream/90 hover:bg-gold hover:text-ink"
                }`}
              >
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
