import { menu, type LocalizedText } from "@/data/menu";
import type { Locale } from "@/i18n/config";

export type MenuProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
  isFeatured: boolean; // etiqueta "Recomendado"
};

export type MenuCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  imageUrl: string | null; // foto de la sección
  products: MenuProduct[];
};

// Devuelve el texto en el idioma pedido o, si no existe, en español.
function pick(text: LocalizedText, locale: Locale) {
  return text[locale] ?? text.es;
}

// Menú público leído de src/data/menu.ts, en el mismo orden del archivo.
// Las categorías sin productos no se muestran.
export async function getPublicMenu(locale: Locale): Promise<MenuCategory[]> {
  return menu
    .map((section) => ({
      id: section.slug,
      slug: section.slug,
      name: pick(section.name, locale),
      description: section.description ? pick(section.description, locale) : null,
      imageUrl: section.image ?? null,
      products: section.items.map((item, index) => ({
        id: `${section.slug}-${index}`,
        name: pick(item.name, locale),
        description: item.description ? pick(item.description, locale) : null,
        price: item.price,
        imageUrl: item.image ?? null,
        isAvailable: item.available ?? true,
        isFeatured: item.featured ?? false,
      })),
    }))
    .filter((category) => category.products.length > 0);
}
