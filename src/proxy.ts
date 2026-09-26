import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

// Elige el idioma según la cabecera Accept-Language del navegador.
// Ej.: "en-US,en;q=0.9,es;q=0.8" → "en". Si no hay coincidencia → español.
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      const quality = q === undefined ? 1 : Number(q);
      return { lang: tag.toLowerCase().split("-")[0], quality: Number.isNaN(quality) ? 0 : quality };
    })
    .sort((a, b) => b.quality - a.quality);

  const match = ranked.find((entry) => isLocale(entry.lang));
  return match && isLocale(match.lang) ? match.lang : defaultLocale;
}

// La raíz "/" (a donde apunta el QR) redirige a /es o /en.
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/",
};
