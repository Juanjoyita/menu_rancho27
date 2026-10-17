import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryNav } from "@/components/menu/CategoryNav";
import { DishImage } from "@/components/menu/DishImage";
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
      {/* Encabezado: logo (incluye el nombre) y lema. */}
      <header className="relative px-4 pt-6 pb-10 text-center">
        <div className="flex justify-end">
          <Link
            href={`/${otherLang}/menu`}
            hrefLang={otherLang}
            lang={otherLang}
            className="rounded-full border border-gold/40 px-3 py-1 font-heading text-sm text-cream/80 hover:border-gold hover:text-gold"
          >
            {dict.language.switchTo}
          </Link>
        </div>

        <h1 className="relative isolate mx-auto mt-1 w-fit">
          {/* Resplandor dorado detrás del logo, como en la página de bienvenida. */}
          <span
            aria-hidden="true"
            className="absolute inset-[-10%] -z-10 rounded-full bg-[radial-gradient(circle,rgba(232,163,61,0.28),transparent_70%)]"
          />
          <Image
            src="/images/logo.webp"
            alt="Rancho 27"
            width={900}
            height={974}
            preload
            sizes="(min-width: 640px) 190px, 170px"
            className="w-[170px] sm:w-[190px]"
          />
          <span className="sr-only"> · {dict.menu.title}</span>
        </h1>
        <p className="mt-4 -rotate-3 font-script text-3xl text-gold">{dict.brand.slogan}</p>
      </header>

      {categories.length === 0 ? (
        <p className="px-4 text-center text-cream/60">{dict.menu.empty}</p>
      ) : (
        <>
          {/* Barra de categorías fija arriba; resalta la sección que se está viendo. */}
          <CategoryNav
            label={dict.menu.categories}
            categories={categories.map(({ slug, name }) => ({ slug, name }))}
          />

          {categories.map((category, categoryIndex) => {
            // Solo la primera sección (la que se ve al abrir) descarga sus fotos de inmediato.
            const eager = categoryIndex === 0;
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
                  altPrefix={category.name}
                  swipeHint={dict.menu.swipeHint}
                  soldOutLabel={dict.menu.soldOut}
                  eager={eager}
                  className="mt-5"
                />

                {category.image && (
                  <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl shadow-xl shadow-black/50 ring-1 ring-gold/20">
                    <DishImage
                      src={category.image}
                      alt={category.name}
                      sizes="(min-width: 672px) 640px, 100vw"
                      eager={eager}
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
                        cards={product.options}
                        altPrefix={product.name}
                        label={
                          product.options.length > 1
                            ? `${product.name}: ${product.choiceTitle ?? dict.menu.chooseProtein}`
                            : product.name
                        }
                        title={product.options.length > 1 ? (product.choiceTitle ?? dict.menu.chooseProtein) : undefined}
                        swipeHint={dict.menu.swipeHint}
                        soldOut={!product.isAvailable}
                        soldOutLabel={dict.menu.soldOut}
                        eager={eager}
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
            <Image
              src="/images/logo.webp"
              alt="Rancho 27"
              width={900}
              height={974}
              sizes="80px"
              className="mx-auto mt-8 w-20 opacity-90"
            />
            <p className="mt-6 text-xs text-cream/40">{dict.menu.pricesNote}</p>
          </footer>
        </>
      )}
    </main>
  );
}
