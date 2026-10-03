// Menú de Rancho 27. Este archivo ES la fuente de datos del menú público.
// El orden de las categorías y de los platos aquí es el orden en el menú.
// Exportado desde Neon el 2026-10-03.

import type { StaticImageData } from "next/image";

// Fotos de los platos (carpeta src/assets/platos). Importarlas así permite que
// Next.js las optimice y genere un borrador difuminado que se ve al instante.
import almuerzoChorizo from "@/assets/platos/almuerzo-chorizo.webp";
import almuerzoCarneAlHorno from "@/assets/platos/almuerzo-carne-al-horno.webp";
import almuerzoChuleta from "@/assets/platos/almuerzo-chuleta.webp";
import almuerzoPollo from "@/assets/platos/almuerzo-pollo.webp";
import almuerzoGallina from "@/assets/platos/almuerzo-gallina.webp";
import arepaQuesoCampesino from "@/assets/platos/arepa-queso-campesino.webp";
import arepaQuesoDobleCrema from "@/assets/platos/arepa-queso-doble-crema.webp";

// Texto en español (obligatorio) e inglés (si falta, se muestra el español).
export type LocalizedText = { es: string; en?: string };

// Tarjeta con foto de un carrusel: una proteína de un plato o una foto de la sección.
// Sin "image" se muestra el ícono de la categoría hasta tener la foto.
export type MenuCard = {
  name: LocalizedText;
  side?: LocalizedText; // nota corta (ej. "Con papa frita")
  image?: StaticImageData;
};

export type MenuItem = {
  name: LocalizedText;
  description?: LocalizedText;
  price: number; // pesos colombianos (COP), sin decimales
  featured?: boolean; // true = etiqueta "Recomendado"
  available?: boolean; // false = se muestra como "Agotado"
  image?: StaticImageData; // foto del plato (miniatura en su fila)
  proteins?: MenuCard[]; // proteínas a elegir, en carrusel debajo del plato
};

export type MenuSection = {
  slug: string; // identificador único de la sección, ej. "desayunos"
  name: LocalizedText;
  description?: LocalizedText;
  image?: StaticImageData; // foto grande de la sección
  gallery?: MenuCard[]; // carrusel de fotos arriba de la lista de la sección
  items: MenuItem[];
};

export const menu: MenuSection[] = [
  {
    slug: "desayunos",
    name: { es: "Desayunos", en: "Breakfast" },
    description: { es: "Todos incluyen una bebida pequeña a elegir: café, chocolate o agua de panela.", en: "All include a small drink of your choice: coffee, hot chocolate or aguapanela." },
    items: [
      {
        name: { es: "Desayuno sencillo", en: "Simple breakfast" },
        description: { es: "Huevos al gusto (revueltos, pericos o fritos) con pan.", en: "Eggs your way (scrambled, pericos with tomato and onion, or fried) with bread." },
        price: 8000,
      },
      {
        name: { es: "Desayuno ejecutivo", en: "Executive breakfast" },
        description: { es: "Huevos al gusto (revueltos, pericos o fritos) con arroz y papa.", en: "Eggs your way (scrambled, pericos with tomato and onion, or fried) with rice and potato." },
        price: 17000,
      },
      {
        name: { es: "Desayuno Rancho 27", en: "Rancho 27 breakfast" },
        description: { es: "Proteína a elegir (carne al horno, costilla ahumada, chuleta o filete de pollo) con huevos al gusto.", en: "Choice of protein (oven-roasted beef, smoked ribs, pork chop or chicken fillet) with eggs your way." },
        price: 28000,
        featured: true,
      },
      {
        name: { es: "Pan", en: "Bread" },
        price: 1000,
      },
      {
        name: { es: "Pan con queso", en: "Bread with cheese" },
        price: 3500,
      },
    ],
  },
  {
    slug: "almuerzos",
    name: { es: "Almuerzos", en: "Lunch" },
    items: [
      {
        name: { es: "Almuerzo ejecutivo", en: "Executive lunch" },
        description: { es: "Proteína: chorizo. Incluye sopa, principio, arroz, papa al vapor, ensalada y limonada.", en: "Protein: chorizo. Includes soup, beans or legumes, rice, steamed potato, salad and lemonade." },
        price: 27000,
        proteins: [
          {
            name: { es: "Chorizo", en: "Chorizo" },
            side: { es: "Con papa al vapor", en: "With steamed potato" },
            image: almuerzoChorizo,
          },
        ],
      },
      {
        name: { es: "Almuerzo al horno", en: "Oven-baked lunch" },
        description: { es: "Proteína a elegir (carne al horno, chuleta, costilla ahumada, filete de pollo o gallina). Incluye sopa, principio, arroz, papa (al vapor o frita, según la proteína), ensalada y limonada.", en: "Choice of protein (oven-roasted beef, pork chop, smoked ribs, chicken fillet or hen). Includes soup, beans or legumes, rice, potato (steamed or fried, depending on the protein), salad and lemonade." },
        price: 30000,
        proteins: [
          {
            name: { es: "Carne al horno", en: "Oven-roasted beef" },
            side: { es: "Con papa al vapor", en: "With steamed potato" },
            image: almuerzoCarneAlHorno,
          },
          {
            name: { es: "Chuleta", en: "Breaded pork chop" },
            side: { es: "Con papa frita", en: "With French fries" },
            image: almuerzoChuleta,
          },
          {
            name: { es: "Filete de pollo", en: "Chicken fillet" },
            side: { es: "Con papa frita", en: "With French fries" },
            image: almuerzoPollo,
          },
          // TODO: foto y tipo de papa de la costilla ahumada.
          { name: { es: "Costilla ahumada", en: "Smoked ribs" } },
          {
            name: { es: "Gallina", en: "Hen" },
            side: { es: "Con papa al vapor", en: "With steamed potato" },
            image: almuerzoGallina,
          },
        ],
      },
      {
        name: { es: "Sopa del día", en: "Soup of the day" },
        description: { es: "Sopa casera del día.", en: "Homemade soup of the day." },
        price: 7000,
      },
    ],
  },
  {
    slug: "especialidad",
    name: { es: "Especialidad de la casa", en: "House specialty" },
    gallery: [
      {
        name: { es: "Arepa con queso campesino", en: "Arepa with farmer's cheese" },
        image: arepaQuesoCampesino,
      },
      {
        name: { es: "Arepa con queso doble crema", en: "Arepa with double-cream cheese" },
        image: arepaQuesoDobleCrema,
      },
      // TODO: foto de la arepa mixta.
      { name: { es: "Arepa mixta", en: "Mixed arepa" } },
    ],
    items: [
      {
        name: { es: "Arepa de choclo sin queso", en: "Sweet corn arepa (no cheese)" },
        price: 5000,
      },
      {
        name: { es: "Arepa de choclo con queso campesino", en: "Sweet corn arepa with farmer's cheese" },
        price: 6500,
        featured: true,
      },
      {
        name: { es: "Arepa de choclo con queso doble crema", en: "Sweet corn arepa with double-cream cheese" },
        price: 8000,
      },
      {
        name: { es: "Arepa de choclo con doble queso campesino", en: "Sweet corn arepa with double farmer's cheese" },
        price: 8500,
      },
      {
        name: { es: "Arepa mixta", en: "Mixed arepa" },
        description: { es: "Con queso campesino y doble crema.", en: "With farmer's cheese and double-cream cheese." },
        price: 8000,
      },
    ],
  },
  {
    slug: "porciones",
    name: { es: "Porciones", en: "Portions" },
    description: { es: "Las porciones vienen con papa al vapor o papa frita, a elegir.", en: "Portions come with steamed potato or French fries, your choice." },
    items: [
      {
        name: { es: "Carne al horno", en: "Oven-roasted beef" },
        price: 27000,
      },
      {
        name: { es: "Chuleta", en: "Breaded pork chop" },
        price: 27000,
      },
      {
        name: { es: "Costilla ahumada", en: "Smoked ribs" },
        price: 27000,
        featured: true,
      },
      {
        name: { es: "Filete de pollo", en: "Chicken fillet" },
        price: 27000,
      },
      {
        name: { es: "Gallina", en: "Hen" },
        price: 27000,
      },
      {
        name: { es: "Chorizo con arepa blanca", en: "Chorizo with white arepa" },
        price: 6500,
      },
      {
        name: { es: "Chorizo con papa al vapor", en: "Chorizo with steamed potato" },
        price: 8000,
      },
    ],
  },
  {
    slug: "adicionales",
    name: { es: "Adicionales", en: "Sides & extras" },
    items: [
      {
        name: { es: "Arepa blanca", en: "White corn arepa" },
        price: 1000,
      },
      {
        name: { es: "Arroz", en: "Rice" },
        price: 4000,
      },
      {
        name: { es: "Ensalada", en: "Salad" },
        price: 3000,
      },
      {
        name: { es: "Papa al vapor", en: "Steamed potato" },
        price: 3000,
      },
      {
        name: { es: "Papa francesa", en: "French fries" },
        price: 5000,
      },
      {
        name: { es: "Porción de huevos", en: "Eggs (side)" },
        description: { es: "Al gusto: revueltos, pericos o fritos.", en: "Your way: scrambled, pericos (with tomato and onion) or fried." },
        price: 1500,
      },
      {
        name: { es: "Principio", en: "Side of beans or legumes" },
        price: 3000,
      },
      {
        name: { es: "Queso", en: "Cheese" },
        price: 3000,
      },
    ],
  },
  {
    slug: "bebidas-calientes",
    name: { es: "Bebidas calientes", en: "Hot drinks" },
    items: [
      {
        name: { es: "Café negro", en: "Black coffee" },
        price: 2500,
      },
      {
        name: { es: "Café negro grande", en: "Large black coffee" },
        price: 4000,
      },
      {
        name: { es: "Café en leche", en: "Coffee with milk" },
        price: 3000,
      },
      {
        name: { es: "Café en leche grande", en: "Large coffee with milk" },
        price: 5000,
      },
      {
        name: { es: "Chocolate pequeño", en: "Small hot chocolate" },
        price: 4000,
      },
      {
        name: { es: "Chocolate grande", en: "Large hot chocolate" },
        price: 5000,
      },
      {
        name: { es: "Agua de panela pequeña", en: "Small aguapanela (sugarcane drink)" },
        price: 3000,
      },
      {
        name: { es: "Agua de panela grande", en: "Large aguapanela (sugarcane drink)" },
        price: 4000,
      },
      {
        name: { es: "Agua de panela pequeña en leche", en: "Small aguapanela with milk" },
        price: 4000,
      },
      {
        name: { es: "Agua de panela en leche", en: "Aguapanela with milk" },
        price: 5000,
      },
      {
        name: { es: "Aromática", en: "Herbal tea" },
        price: 3000,
      },
    ],
  },
  {
    slug: "bebidas-frias",
    name: { es: "Bebidas frías", en: "Cold drinks" },
    items: [
      {
        name: { es: "Vaso de limonada", en: "Glass of lemonade" },
        price: 3000,
      },
      {
        name: { es: "Jarra de limonada", en: "Pitcher of lemonade" },
        price: 12000,
      },
      {
        name: { es: "Agua en botella (con o sin gas)", en: "Bottled water (still or sparkling)" },
        price: 3000,
      },
      {
        name: { es: "H2O", en: "H2O flavored water" },
        price: 4000,
      },
      {
        name: { es: "Gaseosa", en: "Soft drink" },
        price: 5000,
      },
      {
        name: { es: "Gaseosa Cigarra", en: "Cigarra soft drink" },
        price: 4000,
      },
      {
        name: { es: "Cigarra Cola", en: "Cigarra Cola" },
        price: 4000,
      },
      {
        name: { es: "Coca-Cola o Cuatro (no retornable)", en: "Coca-Cola or Cuatro (non-returnable)" },
        price: 6000,
      },
      {
        name: { es: "Soda", en: "Club soda" },
        price: 6000,
      },
      {
        name: { es: "Té", en: "Iced tea" },
        price: 5000,
      },
      {
        name: { es: "Jugo Hit", en: "Hit juice" },
        price: 5000,
      },
      {
        name: { es: "Gatorade", en: "Gatorade" },
        price: 5000,
      },
      {
        name: { es: "Amper", en: "Amper energy drink" },
        price: 5000,
      },
      {
        name: { es: "Vive 100", en: "Vive 100 energy drink" },
        price: 5000,
      },
      {
        name: { es: "Vive 100 grande", en: "Large Vive 100 energy drink" },
        price: 7000,
      },
      {
        name: { es: "Pony Malta", en: "Pony Malta (malt drink)" },
        price: 5000,
      },
      {
        name: { es: "Cerveza Póker o Club", en: "Póker or Club beer" },
        price: 5000,
      },
      {
        name: { es: "Cerveza Corona", en: "Corona beer" },
        price: 7000,
      },
    ],
  },
];
