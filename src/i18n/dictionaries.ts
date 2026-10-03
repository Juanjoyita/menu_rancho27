import type { Locale } from "./config";

// Textos fijos de la interfaz. Los nombres de platos y categorías
// están en src/data/menu.ts y los datos del negocio en src/config/site.ts.
const es = {
  brand: {
    subtitle: "Comida casera colombiana",
    slogan: "Buenos sabores, siempre.",
    closing: "Gracias por preferirnos",
    footerSlogan: "El mejor sabor de nuestra tierra",
  },
  menu: {
    title: "Menú",
    description: "Menú de Rancho 27: desayunos, almuerzos, arepas de choclo, carnes y bebidas.",
    categories: "Categorías",
    soldOut: "Agotado",
    chooseProtein: "Elige tu proteína",
    swipeHint: "Desliza",
    recommended: "Recomendado",
    empty: "El menú no está disponible en este momento.",
    pricesNote: "Precios en pesos colombianos (COP).",
  },
  landing: {
    seeMenu: "Ver menú",
    reserve: "Reserva ya",
    followUs: "Síguenos",
  },
  language: {
    switchTo: "English",
    label: "Idioma",
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  brand: {
    subtitle: "Colombian home cooking",
    slogan: "Good flavors, always.",
    closing: "Thank you for choosing us",
    footerSlogan: "The best flavors of our land",
  },
  menu: {
    title: "Menu",
    description: "Rancho 27 menu: breakfast, lunch, sweet corn arepas, meats and drinks.",
    categories: "Categories",
    soldOut: "Sold out",
    chooseProtein: "Choose your protein",
    swipeHint: "Swipe",
    recommended: "Recommended",
    empty: "The menu is not available right now.",
    pricesNote: "Prices in Colombian pesos (COP).",
  },
  landing: {
    seeMenu: "See menu",
    reserve: "Book now",
    followUs: "Follow us",
  },
  language: {
    switchTo: "Español",
    label: "Language",
  },
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
