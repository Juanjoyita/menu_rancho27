// Idiomas del sitio público. El español es el idioma base: si falta una
// traducción en inglés, se muestra la versión en español.
export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
