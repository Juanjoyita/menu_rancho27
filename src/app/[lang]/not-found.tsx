import Link from "next/link";

// Página 404 del sitio público. No recibe el idioma, por eso es bilingüe.
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">Rancho 27</p>
      <h1 className="text-2xl font-bold">Página no encontrada</h1>
      <p className="text-stone-400">Page not found</p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-orange-500 px-5 py-2 font-semibold text-stone-950 hover:bg-orange-400"
      >
        Ver menú · See menu
      </Link>
    </main>
  );
}
