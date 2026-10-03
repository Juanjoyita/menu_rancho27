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

  social: {
    facebook: "https://www.facebook.com/rancho.veintisiete",
    instagram: "https://www.instagram.com/rancho_veintisiete/",
    tiktok: "https://www.tiktok.com/@rancho.veintisiet", // así, sin la "e" final (verificado)
  },

  whatsapp: {
    // Números para reservas. Formato internacional sin "+" ni espacios: 57 + celular.
    numbers: ["573225935689", "573234830770"],
    message: {
      es: "¡Hola Rancho 27! Quiero hacer una reserva.",
      en: "Hi Rancho 27! I'd like to make a reservation.",
    } satisfies LocalizedText,
  },
};

// Enlace de WhatsApp que abre el chat con ese número y el mensaje ya escrito.
export function whatsappUrl(number: string, locale: Locale) {
  const message = site.whatsapp.message[locale] ?? site.whatsapp.message.es;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// Número para mostrar: "573225935689" → "322 593 5689".
export function formatPhone(number: string) {
  const local = number.replace(/^57/, "");
  return `${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
}
