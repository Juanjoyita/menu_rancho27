import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DishImage } from "@/components/menu/DishImage";
import { Emblem } from "@/components/menu/Emblem";
import { ProductRow } from "@/components/menu/ProductRow";
import { PhotoCarousel } from "@/components/menu/PhotoCarousel";
import { SectionHeader } from "@/components/menu/SectionHeader";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPublicMenu } from "@/services/menu";

export async function generateMetadata({ params }: PageProps<"/[lang]/menu">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.menu.title, description: dict.menu.description };
}

export default async function MenuPage({ params }: PageProps<"/[lang]/menu">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const categories = await getPublicMenu(lang);
  const otherLang: Locale = lang === "es" ? "en" : "es";

  return (
    <main className="mx-auto max-w-2xl overflow-x-clip pb-16">
      {/* Encabezado: emblema, nombre del restaurante y lema. */}
      <header className="relative px-4 pt-6 pb-10 text-center">
        <div className="flex justify-end">
          <Link
            href={`/${otherLang}/menu`}
            hrefLang={otherLang}
            lang={otherLang}
            className="rounded-full border border-gold/40 px-3 py-1 font-heading text-xs uppercase tracking-wider text-cream/80 hover:border-gold hover:text-gold"
          >
            {dict.language.switchTo}
          </Link>
        </div>

        <Emblem className="mx-auto mt-2 w-32 text-cream" />
        <h1 className="mt-2 font-logo text-5xl leading-none text-cream drop-shadow-[0_2px_12px_rgba(232,163,61,0.25)]">
          RANCHO 27
          <span className="sr-only"> · {dict.menu.title}</span>
        </h1>
        <p className="mt-3 flex items-center justify-center gap-3 font-heading text-xs uppercase tracking-[0.3em] text-cream/80">
          <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
          {dict.brand.subtitle}
          <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
        </p>
        <p className="mt-6 -rotate-3 font-script text-3xl text-gold">{dict.brand.slogan}</p>
      </header>

      {categories.length === 0 ? (
        <p className="px-4 text-center text-cream/60">{dict.menu.empty}</p>
      ) : (
        <>
          {/* Barra de categorías: queda fija arriba al hacer scroll.
              Fondo opaco sin desenfoque (backdrop-blur hacía lento el scroll en celulares). */}
          <nav
            aria-label={dict.menu.categories}
            className="sticky top-0 z-20 border-y border-gold/20 bg-ink"
          >
            <ul className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none]">
              {categories.map((category) => (
                <li key={category.id} className="shrink-0">
                  <a
                    href={`#${category.slug}`}
                    className="block rounded-full border border-gold/40 px-4 py-1.5 font-heading text-xs uppercase tracking-wider text-cream/90 transition hover:bg-gold hover:text-ink"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {categories.map((category) => {
            const titleId = `${category.slug}-title`;

            return (
              <section
                key={category.id}
                id={category.slug}
                aria-labelledby={titleId}
                className="scroll-mt-20 px-4 pt-12"
              >
                <SectionHeader id={titleId} slug={category.slug} title={category.name} />

                {/* Nota que aplica a toda la categoría (ej. "Todos incluyen bebida…"). */}
                {category.description && (
                  <p className="mt-4 border-l-2 border-gold/60 pl-3 text-sm text-cream/75 italic">
                    {category.description}
                  </p>
                )}

                {/* Galería de fotos de la sección (ej. las arepas). */}
                <PhotoCarousel
                  slug={category.slug}
                  cards={category.gallery}
                  label={category.name}
                  swipeHint={dict.menu.swipeHint}
                  soldOutLabel={dict.menu.soldOut}
                  className="mt-5"
                />

                {category.image && (
                  <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl shadow-xl shadow-black/50 ring-1 ring-gold/20">
                    <DishImage
                      src={category.image}
                      alt={category.name}
                      sizes="(min-width: 672px) 640px, 100vw"
                    />
                    {/* Viñeta para integrar la foto con el fondo oscuro. */}
                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]" />
                  </div>
                )}

                <ul className="mt-4">
                  {category.products.map((product) => (
                    <ProductRow
                      key={product.id}
                      product={product}
                      soldOutLabel={dict.menu.soldOut}
                      recommendedLabel={dict.menu.recommended}
                    >
                      {/* Fotos de las proteínas, justo debajo de su plato. */}
                      <PhotoCarousel
                        slug={category.slug}
                        cards={product.proteins}
                        label={product.proteins.length > 1 ? `${product.name}: ${dict.menu.chooseProtein}` : product.name}
                        title={product.proteins.length > 1 ? dict.menu.chooseProtein : undefined}
                        swipeHint={dict.menu.swipeHint}
                        soldOut={!product.isAvailable}
                        soldOutLabel={dict.menu.soldOut}
                        className="mt-3 mb-2"
                      />
                    </ProductRow>
                  ))}
                </ul>
              </section>
            );
          })}

          {/* Cierre, como el pie de la carta impresa. */}
          <footer className="mt-16 px-4 text-center">
            <div
              aria-hidden="true"
              className="mx-auto h-px max-w-xs bg-gradient-to-r from-transparent via-gold/60 to-transparent"
            />
            <p className="mt-8 -rotate-3 font-script text-3xl text-gold">
              {dict.brand.closing} <span aria-hidden="true">♥</span>
            </p>
            <p className="mt-3 font-script text-xl text-cream/70">{dict.brand.footerSlogan}</p>
            <Emblem className="mx-auto mt-8 w-16 text-gold/70" />
            <p className="mt-1 font-heading text-sm uppercase tracking-[0.3em] text-cream/70">
              Rancho 27
            </p>
            <p className="mt-6 text-xs text-cream/40">{dict.menu.pricesNote}</p>
          </footer>
        </>
      )}
    </main>
  );
}
