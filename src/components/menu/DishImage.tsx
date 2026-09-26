import Image from "next/image";

type Props = {
  src: string | null;
  alt: string;
  sizes: string;
  placeholderText?: string; // si se omite, el espacio reservado va sin texto
  soldOut?: boolean;
};

// Foto de un plato. Mientras no haya foto, muestra un espacio reservado
// cálido con una campana de servir, para que el diseño no se vea vacío.
export function DishImage({ src, alt, sizes, placeholderText, soldOut = false }: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover transition duration-500 group-hover:scale-105 ${soldOut ? "grayscale" : ""}`}
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_130%,rgba(232,163,61,0.35),transparent_65%),linear-gradient(to_bottom,#221b16,#14100d)]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-12 text-gold/70"
      >
        <path d="M4 17a8 8 0 0 1 16 0" />
        <path d="M2 17h20" />
        <path d="M12 9V7.5" />
        <path d="M10.5 7.5h3" />
        <path d="M4 20h16" />
      </svg>
      {placeholderText && (
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-cream/50">
          {placeholderText}
        </span>
      )}
    </div>
  );
}
