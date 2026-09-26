import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { locales } from "@/i18n/config";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
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

  return (
    <html lang={lang} className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-stone-950 text-stone-100">{children}</body>
    </html>
  );
}
