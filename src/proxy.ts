import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

// Elige el idioma según la cabecera Accept-Language del navegador.
// Ej.: "en-US,en;q=0.9,es;q=0.8" → "en". Si no hay coincidencia → español.
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";

  const ranked = header
    .split(",")
    .map((part) => {
      // Acepta espacios alrededor de ";" y "=": "en; q=0.9" o "en;q=0.9".
      const [tag, ...params] = part.split(";").map((piece) => piece.trim());
      const q = params.find((param) => param.startsWith("q="))?.slice(2).trim();
      const quality = q === undefined ? 1 : Number(q);
      return { lang: tag.toLowerCase().split("-")[0], quality: Number.isNaN(quality) ? 0 : quality };
    })
    .filter((entry) => entry.quality > 0) // q=0 significa "no quiero este idioma"
    .sort((a, b) => b.quality - a.quality);

  const match = ranked.find((entry) => isLocale(entry.lang));
  return match && isLocale(match.lang) ? match.lang : defaultLocale;
}

// La raíz "/" (a donde apunta el QR) redirige a /es o /en.
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}`;
  const response = NextResponse.redirect(url);
  // La respuesta depende del idioma del navegador: ningún caché debe guardarla
  // para servírsela a otros visitantes.
  response.headers.set("Vary", "Accept-Language");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: "/",
};
