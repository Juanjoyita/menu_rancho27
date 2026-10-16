import Link from "next/link";

// Contenido de la página 404. No sabe el idioma de la dirección, por eso es bilingüe.
export function NotFoundContent() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Rancho 27</p>
      <h1 className="font-heading text-2xl uppercase tracking-wide">Página no encontrada</h1>
      <p className="text-cream/60">Page not found</p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-gold px-5 py-2 font-semibold text-ink hover:bg-gold-light"
      >
        Ir al inicio · Go home
      </Link>
    </main>
  );
}
