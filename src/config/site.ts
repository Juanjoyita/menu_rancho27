import type { LocalizedText } from "@/data/menu";
import type { Locale } from "@/i18n/config";

// Datos del restaurante que aparecen en la página de bienvenida.
// Para cambiar un enlace o el número de WhatsApp, edita solo este archivo.
export const site = {
  name: "Rancho 27",

  description: {
    es: "Comida casera colombiana: desayunos, almuerzos, arepas de choclo y carnes al horno, con el sabor de nuestra tierra.",
    en: "Colombian home cooking: breakfast, lunch, sweet corn arepas and oven-roasted meats, with the flavor of our land.",
  } satisfies LocalizedText,

  // TODO: reemplazar por los perfiles reales de Rancho 27.
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
  },

  whatsapp: {
    // TODO: número real. Formato internacional sin "+" ni espacios: 57 + celular (ej. 573001234567).
    number: "570000000000",
    message: {
      es: "¡Hola Rancho 27! Quiero hacer un pedido a domicilio.",
      en: "Hi Rancho 27! I'd like to place a delivery order.",
    } satisfies LocalizedText,
  },
};

// Enlace de WhatsApp que abre el chat con el mensaje ya escrito.
export function whatsappUrl(locale: Locale) {
  const message = site.whatsapp.message[locale] ?? site.whatsapp.message.es;
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
