// Carga inicial del menú de Rancho 27 (tomado del POS el 2026-09-26).
// Ejecutar con: npx prisma db seed
//
// Solo funciona con la base de datos vacía, para no duplicar ni pisar
// cambios hechos después desde el panel de administración.

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

type SeedProduct = {
  es: string;
  en: string;
  price: number;
  featured?: boolean;
  descEs?: string; // descripción (qué trae el plato)
  descEn?: string;
};
type SeedCategory = {
  slug: string;
  es: string;
  en: string;
  descEs?: string;
  descEn?: string;
  products: SeedProduct[];
};

const menu: SeedCategory[] = [
  {
    slug: "desayunos",
    es: "Desayunos",
    en: "Breakfast",
    descEs: "Todos incluyen una bebida pequeña a elegir: café, chocolate o agua de panela.",
    descEn: "All include a small drink of your choice: coffee, hot chocolate or aguapanela.",
    products: [
      {
        es: "Desayuno sencillo",
        en: "Simple breakfast",
        price: 8000,
        descEs: "Huevos al gusto (revueltos, pericos o fritos) con pan.",
        descEn: "Eggs your way (scrambled, pericos with tomato and onion, or fried) with bread.",
      },
      {
        es: "Desayuno ejecutivo",
        en: "Executive breakfast",
        price: 17000,
        descEs: "Huevos al gusto (revueltos, pericos o fritos) con arroz y papa.",
        descEn: "Eggs your way (scrambled, pericos with tomato and onion, or fried) with rice and potato.",
      },
      {
        es: "Desayuno Rancho 27",
        en: "Rancho 27 breakfast",
        price: 28000,
        featured: true,
        descEs: "Proteína a elegir (carne al horno, costilla ahumada, chuleta o filete de pollo) con huevos al gusto.",
        descEn: "Choice of protein (oven-roasted beef, smoked ribs, pork chop or chicken fillet) with eggs your way.",
      },
      { es: "Pan", en: "Bread", price: 1000 },
      { es: "Pan con queso", en: "Bread with cheese", price: 3500 },
    ],
  },
  {
    slug: "almuerzos",
    es: "Almuerzos",
    en: "Lunch",
    products: [
      {
        es: "Almuerzo ejecutivo",
        en: "Executive lunch",
        price: 27000,
        descEs: "Chorizo con sopa, principio, arroz, ensalada y limonada.",
        descEn: "Chorizo with soup, beans or legumes, rice, salad and lemonade.",
      },
      {
        es: "Almuerzo al horno",
        en: "Oven-baked lunch",
        price: 30000,
        descEs: "Proteína a elegir (carne al horno, chuleta, costilla ahumada, filete de pollo o gallina). Incluye sopa, principio, arroz, ensalada y limonada.",
        descEn: "Choice of protein (oven-roasted beef, pork chop, smoked ribs, chicken fillet or hen). Includes soup, beans or legumes, rice, salad and lemonade.",
      },
      {
        es: "Sopa del día",
        en: "Soup of the day",
        price: 7000,
        descEs: "Sopa casera del día.",
        descEn: "Homemade soup of the day.",
      },
    ],
  },
  {
    slug: "especialidad",
    es: "Especialidad de la casa",
    en: "House specialty",
    products: [
      { es: "Arepa de choclo sin queso", en: "Sweet corn arepa (no cheese)", price: 5000 },
      { es: "Arepa de choclo con queso campesino", en: "Sweet corn arepa with farmer's cheese", price: 6500, featured: true },
      { es: "Arepa de choclo con queso doble crema", en: "Sweet corn arepa with double-cream cheese", price: 8000 },
      { es: "Arepa de choclo con doble queso campesino", en: "Sweet corn arepa with double farmer's cheese", price: 8500 },
      {
        es: "Arepa mixta",
        en: "Mixed arepa",
        price: 8000,
        descEs: "Con queso campesino y doble crema.",
        descEn: "With farmer's cheese and double-cream cheese.",
      },
    ],
  },
  {
    slug: "carnes",
    es: "Carnes",
    en: "Meats",
    products: [
      { es: "Carne al horno", en: "Oven-roasted beef", price: 27000 },
      { es: "Chuleta", en: "Breaded pork chop", price: 27000 },
      { es: "Costilla ahumada", en: "Smoked ribs", price: 27000, featured: true },
      { es: "Filete de pollo", en: "Chicken fillet", price: 27000 },
      { es: "Gallina", en: "Hen", price: 27000 },
    ],
  },
  {
    slug: "adicionales",
    es: "Adicionales",
    en: "Sides & extras",
    products: [
      { es: "Chorizo", en: "Chorizo sausage", price: 6500 },
      { es: "Chorizo con arepa blanca", en: "Chorizo with white arepa", price: 6500 },
      { es: "Chorizo con papa al vapor", en: "Chorizo with steamed potato", price: 8000 },
      { es: "Arepa blanca", en: "White corn arepa", price: 1000 },
      { es: "Arroz", en: "Rice", price: 4000 },
      { es: "Ensalada", en: "Salad", price: 3000 },
      { es: "Papa al vapor", en: "Steamed potato", price: 3000 },
      { es: "Papa francesa", en: "French fries", price: 5000 },
      {
        es: "Porción de huevos",
        en: "Eggs (side)",
        price: 1500,
        descEs: "Al gusto: revueltos, pericos o fritos.",
        descEn: "Your way: scrambled, pericos (with tomato and onion) or fried.",
      },
      { es: "Principio", en: "Side of beans or legumes", price: 3000 },
      { es: "Queso", en: "Cheese", price: 3000 },
    ],
  },
  {
    slug: "bebidas-calientes",
    es: "Bebidas calientes",
    en: "Hot drinks",
    products: [
      { es: "Café negro", en: "Black coffee", price: 2500 },
      { es: "Café negro grande", en: "Large black coffee", price: 4000 },
      { es: "Café en leche", en: "Coffee with milk", price: 3000 },
      { es: "Café en leche grande", en: "Large coffee with milk", price: 5000 },
      { es: "Chocolate pequeño", en: "Small hot chocolate", price: 4000 },
      { es: "Chocolate grande", en: "Large hot chocolate", price: 5000 },
      { es: "Agua de panela pequeña", en: "Small aguapanela (sugarcane drink)", price: 3000 },
      { es: "Agua de panela grande", en: "Large aguapanela (sugarcane drink)", price: 4000 },
      { es: "Agua de panela pequeña en leche", en: "Small aguapanela with milk", price: 4000 },
      { es: "Agua de panela en leche", en: "Aguapanela with milk", price: 5000 },
      { es: "Aromática", en: "Herbal tea", price: 3000 },
      { es: "Agua hervida (vaso)", en: "Glass of hot water", price: 1000 },
    ],
  },
  {
    slug: "bebidas-frias",
    es: "Bebidas frías",
    en: "Cold drinks",
    products: [
      { es: "Vaso de limonada", en: "Glass of lemonade", price: 3000 },
      { es: "Jarra de limonada", en: "Pitcher of lemonade", price: 12000 },
      { es: "Agua en botella (con o sin gas)", en: "Bottled water (still or sparkling)", price: 3000 },
      { es: "H2O", en: "H2O flavored water", price: 4000 },
      { es: "Gaseosa", en: "Soft drink", price: 5000 },
      { es: "Gaseosa Cigarra", en: "Cigarra soft drink", price: 4000 },
      { es: "Cigarra Cola", en: "Cigarra Cola", price: 4000 },
      { es: "Coca-Cola o Cuatro (no retornable)", en: "Coca-Cola or Cuatro (non-returnable)", price: 6000 },
      { es: "Soda", en: "Club soda", price: 6000 },
      { es: "Té", en: "Iced tea", price: 5000 },
      { es: "Jugo Hit", en: "Hit juice", price: 5000 },
      { es: "Gatorade", en: "Gatorade", price: 5000 },
      { es: "Amper", en: "Amper energy drink", price: 5000 },
      { es: "Vive 100", en: "Vive 100 energy drink", price: 5000 },
      { es: "Vive 100 grande", en: "Large Vive 100 energy drink", price: 7000 },
      { es: "Pony Malta", en: "Pony Malta (malt drink)", price: 5000 },
      { es: "Cerveza Póker o Club", en: "Póker or Club beer", price: 5000 },
      { es: "Cerveza Corona", en: "Corona beer", price: 7000 },
    ],
  },
];

async function main() {
  const connectionString = process.env.DATABASE_URL_UNPOOLED;
  if (!connectionString) throw new Error("Falta DATABASE_URL_UNPOOLED en .env");
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

  try {
    if ((await prisma.category.count()) > 0) {
      console.log("La base de datos ya tiene categorías; no se cargó nada.");
      return;
    }

    // Todo en una transacción: o se carga el menú completo o nada.
    // Se crea primero la categoría y luego cada producto por separado:
    // anidar categoría → productos → traducciones en un solo create falla
    // en Prisma 7.10 con una violación de clave foránea.
    await prisma.$transaction(
      async (tx) => {
        for (const [catIndex, cat] of menu.entries()) {
          const category = await tx.category.create({
            data: {
              slug: cat.slug,
              sortOrder: catIndex,
              translations: {
                create: [
                  { locale: "es", name: cat.es, description: cat.descEs },
                  { locale: "en", name: cat.en, description: cat.descEn },
                ],
              },
            },
          });

          for (const [prodIndex, p] of cat.products.entries()) {
            await tx.product.create({
              data: {
                categoryId: category.id,
                price: p.price,
                isFeatured: p.featured ?? false,
                sortOrder: prodIndex,
                translations: {
                  create: [
                    { locale: "es", name: p.es, description: p.descEs },
                    { locale: "en", name: p.en, description: p.descEn },
                  ],
                },
              },
            });
          }
        }
      },
      // Son ~65 inserciones contra un servidor remoto; el límite por defecto (5 s) es corto.
      { timeout: 60_000 },
    );

    const total = menu.reduce((sum, cat) => sum + cat.products.length, 0);
    console.log(`Menú cargado: ${menu.length} categorías y ${total} productos.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
