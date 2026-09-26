import { defaultLocale, type Locale } from "@/i18n/config";
import { prisma } from "@/lib/prisma";

export type MenuProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
};

export type MenuCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  products: MenuProduct[];
};

// Devuelve la traducción del idioma pedido o, si no existe, la del idioma base.
function pickTranslation<T extends { locale: string }>(translations: T[], locale: Locale) {
  return (
    translations.find((t) => t.locale === locale) ??
    translations.find((t) => t.locale === defaultLocale)
  );
}

// Menú público: solo categorías y productos publicados, en orden.
// Las categorías sin productos visibles no se muestran.
export async function getPublicMenu(locale: Locale): Promise<MenuCategory[]> {
  const wanted = [...new Set([locale, defaultLocale])];

  const categories = await prisma.category.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: {
      translations: { where: { locale: { in: wanted } } },
      products: {
        where: { isPublished: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        include: { translations: { where: { locale: { in: wanted } } } },
      },
    },
  });

  return categories
    .map((category) => {
      const translation = pickTranslation(category.translations, locale);
      const products = category.products.flatMap((product): MenuProduct[] => {
        const t = pickTranslation(product.translations, locale);
        if (!t) return []; // sin nombre en ningún idioma: no se puede mostrar
        return [
          {
            id: product.id,
            name: t.name,
            description: t.description,
            price: product.price,
            imageUrl: product.imageUrl,
            isAvailable: product.isAvailable,
          },
        ];
      });

      return {
        id: category.id,
        slug: category.slug,
        name: translation?.name ?? category.slug,
        description: translation?.description ?? null,
        products,
      };
    })
    .filter((category) => category.products.length > 0);
}
