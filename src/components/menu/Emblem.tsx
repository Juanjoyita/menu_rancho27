// Emblema provisional (montañas y un rancho) hasta tener el logo oficial.
export function Emblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Montañas */}
      <path d="M6 33 L32 12 L44 21 L60 5 L80 22 L90 15 L114 33" />
      {/* Rancho: techo, paredes y puerta */}
      <path d="M42 33 L60 21 L78 33" />
      <path d="M47 33 V29 M73 33 V29 M57 33 V28 H63 V33" />
      {/* Suelo */}
      <path d="M16 36 H104" />
    </svg>
  );
}
