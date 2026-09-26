-- La foto de sección solo se muestra si existe: ya no hace falta reservar espacio.
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "showImages";

-- Etiqueta "Recomendado".
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;

-- ─── Datos ───────────────────────────────────────────────────────────────────
-- "Porciones" se divide en "Carnes" (platos fuertes) y "Adicionales".
-- Si la base de datos no tiene estos registros, estas sentencias no hacen nada.

-- 1. Porciones pasa a ser Carnes.
UPDATE "Category" SET "slug" = 'carnes' WHERE "slug" = 'porciones';
UPDATE "CategoryTranslation" AS ct
SET "name" = CASE ct."locale" WHEN 'es' THEN 'Carnes' ELSE 'Meats' END
FROM "Category" AS c
WHERE ct."categoryId" = c."id" AND c."slug" = 'carnes';

-- 2. Se hace espacio en el orden para la nueva categoría (va después de Carnes).
UPDATE "Category" SET "sortOrder" = "sortOrder" + 1
WHERE "slug" IN ('bebidas-calientes', 'bebidas-frias')
  AND EXISTS (SELECT 1 FROM "Category" WHERE "slug" = 'carnes');

-- 3. Se crea Adicionales con sus traducciones.
INSERT INTO "Category" ("id", "slug", "sortOrder", "isPublished", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, 'adicionales', c."sortOrder" + 1, true, now(), now()
FROM "Category" AS c
WHERE c."slug" = 'carnes';

INSERT INTO "CategoryTranslation" ("id", "categoryId", "locale", "name")
SELECT gen_random_uuid()::text, c."id", t."locale"::"Locale", t."name"
FROM "Category" AS c
CROSS JOIN (VALUES ('es', 'Adicionales'), ('en', 'Sides & extras')) AS t("locale", "name")
WHERE c."slug" = 'adicionales';

-- 4. Todo lo que no es plato fuerte pasa de Carnes a Adicionales.
UPDATE "Product"
SET "categoryId" = (SELECT "id" FROM "Category" WHERE "slug" = 'adicionales')
WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "slug" = 'carnes')
  AND "id" NOT IN (
    SELECT "productId" FROM "ProductTranslation"
    WHERE "locale" = 'es'
      AND "name" IN ('Carne al horno', 'Chuleta', 'Costilla ahumada', 'Filete de pollo', 'Gallina')
  );

-- 5. Recomendados iniciales (provisionales; se podrán cambiar desde el panel).
UPDATE "Product" SET "isFeatured" = true
WHERE "id" IN (
  SELECT "productId" FROM "ProductTranslation"
  WHERE "locale" = 'es'
    AND "name" IN ('Desayuno Rancho 27', 'Arepa de choclo con queso campesino', 'Costilla ahumada')
);
