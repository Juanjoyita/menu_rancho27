import type { Locale } from "./config";

// Textos fijos de la interfaz. Los nombres de platos y categorías
// vienen traducidos desde la base de datos, no de aquí.
const es = {
  menu: {
    title: "Menú",
    description: "Menú de Rancho 27: desayunos, almuerzos, arepas de choclo, porciones y bebidas.",
    categories: "Categorías",
    soldOut: "Agotado",
    empty: "El menú no está disponible en este momento.",
    pricesNote: "Precios en pesos colombianos (COP).",
  },
  language: {
    switchTo: "English",
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  menu: {
    title: "Menu",
    description: "Rancho 27 menu: breakfast, lunch, sweet corn arepas, sides and drinks.",
    categories: "Categories",
    soldOut: "Sold out",
    empty: "The menu is not available right now.",
    pricesNote: "Prices in Colombian pesos (COP).",
  },
  language: {
    switchTo: "Español",
  },
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
