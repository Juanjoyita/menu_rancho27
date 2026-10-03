import Image, { type StaticImageData } from "next/image";

type Props = {
  src: StaticImageData; // foto importada desde src/assets (trae su borrador)
  alt: string;
  sizes: string;
  soldOut?: boolean;
};

// Foto de un plato o de una sección. Llena su contenedor (que debe tener
// position: relative) y se recorta para cubrirlo sin deformarse.
// - placeholder="blur": se ve un borrador difuminado al instante, mientras llega la foto.
// - loading="eager": se descarga al abrir la página, sin esperar a que el cliente baje.
export function DishImage({ src, alt, sizes, soldOut = false }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      placeholder="blur"
      loading="eager"
      className={`object-cover ${soldOut ? "grayscale" : ""}`}
    />
  );
}
