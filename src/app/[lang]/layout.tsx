import type { Metadata } from "next";
import { Alfa_Slab_One, Caveat, Geist, Oswald } from "next/font/google";
import { locales } from "@/i18n/config";
import "../globals.css";

// Texto general (listas de productos).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Logo "RANCHO 27": letra gruesa con serifas rectas.
const alfaSlab = Alfa_Slab_One({
  variable: "--font-alfa-slab",
  subsets: ["latin"],
  weight: "400",
});

// Títulos de categoría: mayúsculas altas y angostas.
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

// Frases escritas a mano ("Buenos sabores, siempre.").
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Rancho 27", template: "%s | Rancho 27" },
};

// Solo existen /es y /en; cualquier otro idioma responde 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Layout raíz del sitio público. Está dentro de [lang] para que <html lang>
// indique el idioma real de la página.
export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const fonts = [geistSans, alfaSlab, oswald, caveat].map((font) => font.variable).join(" ");

  return (
    <html lang={lang} className={`${fonts} h-full antialiased`}>
      <body className="min-h-full text-cream">{children}</body>
    </html>
  );
}
