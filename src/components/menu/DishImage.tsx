import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  soldOut?: boolean;
};

// Foto de un plato o de una sección. Llena su contenedor (que debe tener
// position: relative) y se recorta para cubrirlo sin deformarse.
export function DishImage({ src, alt, sizes, soldOut = false }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={`object-cover ${soldOut ? "grayscale" : ""}`}
    />
  );
}
