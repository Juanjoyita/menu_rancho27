import Image from "next/image";
import Link from "next/link";

// Contenido de la página 404. No sabe el idioma de la dirección, por eso es bilingüe.
export function NotFoundContent() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <Image src="/images/logo.webp" alt="Rancho 27" width={900} height={974} sizes="120px" className="w-[120px]" />
      <h1 className="mt-2 font-heading text-3xl">Página no encontrada</h1>
      <p lang="en" className="-mt-2 text-cream/60">
        Page not found
      </p>
      <Link
        href="/"
        className="mt-2 flex flex-col rounded-2xl bg-gold px-6 py-2 font-heading text-lg leading-tight text-ink hover:bg-gold-light"
      >
        Ir al inicio
        <span lang="en" className="text-sm opacity-70">
          Go home
        </span>
      </Link>
    </main>
  );
}
