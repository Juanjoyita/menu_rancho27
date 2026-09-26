import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatPrice } from "@/lib/format";
import { getPublicMenu } from "@/services/menu";

// La página se genera de antemano y se regenera con los datos de la base de
// datos como máximo cada 5 minutos (ISR).
export const revalidate = 300;

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
    <main className="mx-auto max-w-2xl pb-16">
      <header className="flex items-start justify-between gap-4 px-4 pt-8 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
            Rancho 27
          </p>
          <h1 className="mt-1 text-3xl font-bold">{dict.menu.title}</h1>
        </div>
        <Link
          href={`/${otherLang}/menu`}
          hrefLang={otherLang}
          lang={otherLang}
          className="rounded-full border border-stone-700 px-3 py-1.5 text-sm text-stone-300 hover:border-orange-400 hover:text-orange-300"
        >
          {dict.language.switchTo}
        </Link>
      </header>

      {categories.length === 0 ? (
        <p className="px-4 text-stone-400">{dict.menu.empty}</p>
      ) : (
        <>
          {/* Barra de categorías: queda fija arriba al hacer scroll. */}
          <nav
            aria-label={dict.menu.categories}
            className="sticky top-0 z-10 border-y border-stone-800 bg-stone-950/95 backdrop-blur"
          >
            <ul className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none]">
              {categories.map((category) => (
                <li key={category.id} className="shrink-0">
                  <a
                    href={`#${category.slug}`}
                    className="block rounded-full bg-stone-800 px-3 py-1.5 text-sm text-stone-200 hover:bg-orange-500 hover:text-stone-950"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {categories.map((category) => (
            <section
              key={category.id}
              id={category.slug}
              aria-labelledby={`${category.slug}-title`}
              className="scroll-mt-16 px-4 pt-8"
            >
              <h2 id={`${category.slug}-title`} className="text-xl font-bold text-orange-400">
                {category.name}
              </h2>
              {category.description && (
                <p className="mt-1 text-sm text-stone-400">{category.description}</p>
              )}

              <ul className="mt-3 divide-y divide-stone-800">
                {category.products.map((product) => (
                  <li key={product.id} className="flex items-start justify-between gap-4 py-3">
                    <div className={product.isAvailable ? undefined : "opacity-50"}>
                      <h3 className="font-medium">{product.name}</h3>
                      {product.description && (
                        <p className="mt-0.5 text-sm text-stone-400">{product.description}</p>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <p
                        className={`font-semibold tabular-nums ${
                          product.isAvailable ? "text-stone-100" : "text-stone-500 line-through"
                        }`}
                      >
                        {formatPrice(product.price)}
                      </p>
                      {!product.isAvailable && (
                        <p className="mt-1 rounded bg-stone-800 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-orange-300">
                          {dict.menu.soldOut}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <p className="mt-10 px-4 text-center text-xs text-stone-500">{dict.menu.pricesNote}</p>
        </>
      )}
    </main>
  );
}
