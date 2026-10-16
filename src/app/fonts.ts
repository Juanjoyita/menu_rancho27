import { Alfa_Slab_One, Caveat, Geist, Oswald } from "next/font/google";

// Fuentes del sitio. Se definen aquí una sola vez y las usan el layout y la página 404.

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

// Frases escritas a mano ("Tradición y sabor en su mesa.").
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

// Clases que activan las variables CSS de las fuentes (van en <html>).
export const fontVariables = [geistSans, alfaSlab, oswald, caveat].map((font) => font.variable).join(" ");
