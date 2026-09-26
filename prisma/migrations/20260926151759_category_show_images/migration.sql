-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "showImages" BOOLEAN NOT NULL DEFAULT false;

-- Categorías que se muestran como tarjetas con foto.
UPDATE "Category" SET "showImages" = true WHERE "slug" IN ('desayunos', 'almuerzos', 'especialidad');
