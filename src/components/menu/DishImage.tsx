import Image, { type StaticImageData } from "next/image";

type Props = {
  src: StaticImageData; // foto importada desde src/assets (trae su borrador)
  alt: string;
  sizes: string;
  soldOut?: boolean;
  eager?: boolean; // true = descargar al abrir la página (fotos de arriba)
};

// Foto de un plato o de una sección. Llena su contenedor (que debe tener
// position: relative) y se recorta para cubrirlo sin deformarse.
// - placeholder="blur": se ve un borrador difuminado al instante, mientras llega la foto.
// - eager: las fotos de arriba se descargan al abrir la página; las demás, cuando el
//   cliente se acerca a ellas (así el menú carga rápido incluso con datos lentos).
export function DishImage({ src, alt, sizes, soldOut = false, eager = false }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      placeholder="blur"
      loading={eager ? "eager" : "lazy"}
      className={`object-cover ${soldOut ? "grayscale" : ""}`}
    />
  );
}
