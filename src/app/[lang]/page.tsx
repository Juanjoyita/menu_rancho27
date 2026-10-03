import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FireBackground } from "@/components/landing/FireBackground";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/landing/icons";
import { formatPhone, site, whatsappUrl } from "@/config/site";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: { absolute: site.name }, description: site.description[lang] };
}

// Página de bienvenida: a donde llega el cliente al escanear el QR.
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const socials = [
    { name: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
    { name: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
    { name: "TikTok", href: site.social.tiktok, Icon: TikTokIcon },
  ];

  return (
    <main className="relative isolate flex min-h-dvh flex-col overflow-hidden">
      <FireBackground />

      {/* Selector de idioma ES | EN */}
      <nav aria-label={dict.language.label} className="flex justify-end px-4 pt-4">
        <ul className="flex items-center rounded-full border border-gold/40 bg-ink/70 font-heading text-xs tracking-wider">
          {locales.map((locale, index) => (
            <li key={locale} className="flex items-center">
              {index > 0 && <span aria-hidden="true" className="h-3 w-px bg-gold/40" />}
              <Link
                href={`/${locale}`}
                hrefLang={locale}
                lang={locale}
                aria-current={locale === lang ? "page" : undefined}
                className={
                  locale === lang
                    ? "px-3 py-1.5 text-gold"
                    : "px-3 py-1.5 text-cream/60 transition hover:text-cream"
                }
              >
                {locale.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 pb-10 text-center motion-safe:animate-[rise_0.9s_ease-out_both]">
        {/* Logo: ya incluye el nombre, por eso es el título de la página. */}
        <h1 className="relative isolate">
          {/* Resplandor dorado detrás, como un letrero iluminado por la fogata. */}
          <span
            aria-hidden="true"
            className="absolute inset-[-12%] -z-10 rounded-full bg-[radial-gradient(circle,rgba(232,163,61,0.35),rgba(234,88,12,0.12)_45%,transparent_70%)]"
          />
          <Image
            src="/images/logo.webp"
            alt={site.name}
            width={900}
            height={974}
            preload
            sizes="(min-width: 640px) 300px, 250px"
            className="w-[250px] sm:w-[300px]"
          />
        </h1>
        <p className="mt-4 -rotate-3 font-script text-3xl text-gold">{dict.brand.slogan}</p>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/75">{site.description[lang]}</p>

        {/* Acción principal */}
        <Link
          href={`/${lang}/menu`}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-heading text-lg uppercase tracking-[0.2em] text-ink shadow-[0_0_30px_rgba(232,163,61,0.45)] transition hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
        >
          {dict.landing.seeMenu}
          <span aria-hidden="true">→</span>
        </Link>

        {/* Reserva por WhatsApp: al tocar se despliegan los números (<details>, sin JavaScript). */}
        <details className="group mt-4 w-full overflow-hidden rounded-[1.75rem] border border-[#25d366]/60 bg-ink/70 transition open:border-[#25d366]">
          <summary className="flex cursor-pointer list-none items-center justify-center gap-2 px-6 py-3 font-heading text-sm uppercase tracking-[0.15em] text-cream transition hover:bg-[#25d366]/15 [&::-webkit-details-marker]:hidden">
            <WhatsAppIcon className="size-5 text-[#25d366]" />
            {dict.landing.reserve}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-4 text-cream/70 transition-transform group-open:rotate-180"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <ul className="divide-y divide-[#25d366]/20 border-t border-[#25d366]/30">
            {site.whatsapp.numbers.map((number) => (
              <li key={number}>
                <a
                  href={whatsappUrl(number, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${dict.landing.writeTo} ${formatPhone(number)}`}
                  className="flex items-center justify-between px-6 py-3 text-cream transition hover:bg-[#25d366]/15"
                >
                  <span className="flex items-center gap-2 font-heading tracking-[0.12em]">
                    <WhatsAppIcon className="size-4 text-[#25d366]" />
                    {formatPhone(number)}
                  </span>
                  <span aria-hidden="true" className="text-[#25d366]">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </details>

        {/* Redes sociales */}
        <p className="mt-10 font-script text-xl text-cream/70">{dict.landing.followUs}</p>
        <ul className="mt-3 flex gap-4">
          {socials.map(({ name, href, Icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex size-12 items-center justify-center rounded-full border border-gold/40 bg-ink/70 text-cream/85 transition hover:border-gold hover:text-gold"
              >
                <Icon className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
