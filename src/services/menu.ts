import { menu, type LocalizedText, type MenuCard as MenuCardData } from "@/data/menu";
import type { StaticImageData } from "next/image";
import type { Locale } from "@/i18n/config";

// Tarjeta con foto (proteína de un plato o foto de la sección).
export type MenuCard = {
  name: string;
  side: string | null; // ej. "Con papa frita"
  image: StaticImageData | null;
};

export type MenuProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: StaticImageData | null;
  isAvailable: boolean;
  isFeatured: boolean; // etiqueta "Recomendado"
  proteins: MenuCard[]; // proteínas a elegir (vacío si no aplica)
};

export type MenuCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image: StaticImageData | null; // foto de la sección
  gallery: MenuCard[]; // carrusel arriba de la lista (vacío si no aplica)
  products: MenuProduct[];
};

// Devuelve el texto en el idioma pedido o, si no existe, en español.
function pick(text: LocalizedText, locale: Locale) {
  return text[locale] ?? text.es;
}

function toCard(card: MenuCardData, locale: Locale): MenuCard {
  return {
    name: pick(card.name, locale),
    side: card.side ? pick(card.side, locale) : null,
    image: card.image ?? null,
  };
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
      image: section.image ?? null,
      gallery: (section.gallery ?? []).map((card) => toCard(card, locale)),
      products: section.items.map((item, index) => ({
        id: `${section.slug}-${index}`,
        name: pick(item.name, locale),
        description: item.description ? pick(item.description, locale) : null,
        price: item.price,
        image: item.image ?? null,
        isAvailable: item.available ?? true,
        isFeatured: item.featured ?? false,
        proteins: (item.proteins ?? []).map((card) => toCard(card, locale)),
      })),
    }))
    .filter((category) => category.products.length > 0);
}
