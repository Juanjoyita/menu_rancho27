import type { Metadata } from "next";
import { locales } from "@/i18n/config";
import { fontVariables } from "../fonts";
import "../globals.css";

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
  return (
    // data-scroll-behavior: Next quita el desplazamiento suave al cambiar de página
    // (ej. landing → menú) y lo mantiene al tocar una categoría dentro del menú.
    <html lang={lang} data-scroll-behavior="smooth" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full text-cream">{children}</body>
    </html>
  );
}
