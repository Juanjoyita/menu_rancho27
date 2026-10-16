import type { Metadata } from "next";
import { NotFoundContent } from "@/components/NotFoundContent";
import { fontVariables } from "./fonts";
import "./globals.css";

// 404 para cualquier dirección que no existe (ej. /fr o /es/xyz).
// Hace falta porque el layout raíz está dentro de [lang]: sin este archivo,
// Next.js mostraría su página 404 por defecto, en inglés y sin el diseño.
export const metadata: Metadata = {
  title: "Página no encontrada | Rancho 27",
};

export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full text-cream">
        <NotFoundContent />
      </body>
    </html>
  );
}
