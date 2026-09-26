// Ícono de cada categoría según su slug. Las categorías nuevas que no estén
// aquí usan la campana de servir.
const paths: Record<string, string[]> = {
  // Huevo frito
  desayunos: [
    "M12 3c3 0 4.5 1.8 6.3 3.1S21 9.4 21 12s-1.6 4.6-3.8 5.7S14.6 21 12 21s-4.9-1.3-6.5-3S3 14.6 3 12s1.4-4.3 3.3-5.6S9 3 12 3z",
    "M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
  ],
  // Tenedor y cuchillo
  almuerzos: ["M7 3v18", "M4.5 3v5a2.5 2.5 0 0 0 5 0V3", "M17 21V3c-2 1.5-3 4.5-3 8h3"],
  // Mazorca
  especialidad: [
    "M12 2.5c2.3 1.8 3.4 4.8 3.4 8.3S14.2 17.4 12 19c-2.2-1.6-3.4-4.7-3.4-8.2S9.7 4.3 12 2.5z",
    "M9 8.5h6 M8.7 11.5h6.6 M9 14.5h6 M12 3.5v15",
    "M12 21c-3 0-5.6-1.8-6.8-4.6 1.9-.1 3.8.6 5 1.9 M12 21c3 0 5.6-1.8 6.8-4.6-1.9-.1-3.8.6-5 1.9",
  ],
  // Presa de carne con hueso
  porciones: [
    "M14.5 3.5a6 6 0 0 1 6 6c0 3.2-2.4 5.5-5.5 5.5-1.2 0-2 .3-2.8 1.1l-3.4 3.4",
    "M14.5 3.5c-3.3 0-6 2.7-6 6 0 1.2-.3 2-1.1 2.8L4 15.7",
    "M4 15.7a1.6 1.6 0 1 0-1.3 2.6 1.6 1.6 0 1 0 2.8 1.2 1.6 1.6 0 1 0 2.6-1.3",
  ],
  // Tazón (acompañamientos)
  adicionales: ["M3 11h18a9 9 0 0 1-18 0z", "M8 20.5h8", "M9 7.5c0-1 1-1.2 1-2.2 M13.5 7.5c0-1 1-1.2 1-2.2"],
  // Taza humeante
  "bebidas-calientes": [
    "M4 10h12v4.5a5.5 5.5 0 0 1-5.5 5.5h-1A5.5 5.5 0 0 1 4 14.5z",
    "M16 11h1.5a2.5 2.5 0 0 1 0 5H16",
    "M8 3c-.8.8.8 1.7 0 2.5 M12 3c-.8.8.8 1.7 0 2.5",
  ],
  // Vaso con pitillo
  "bebidas-frias": ["M5.5 7h13l-1.6 13.1a1 1 0 0 1-1 .9H8.1a1 1 0 0 1-1-.9z", "M6 11.5h12", "M12.5 11 15 3h3"],
};

// Campana de servir (para categorías sin ícono propio).
const fallback = ["M4 17a8 8 0 0 1 16 0", "M2 17h20", "M12 9V7.5 M10.5 7.5h3", "M4 20h16"];

export function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {(paths[slug] ?? fallback).map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
