import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

// Crea el cliente de Prisma conectado a Neon mediante el adaptador de `pg`.
// La app usa DATABASE_URL (con pooler); las migraciones usan la conexión directa.
function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Falta la variable de entorno DATABASE_URL");
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

// En desarrollo, Next.js recarga los módulos en cada cambio. Guardamos el
// cliente en `globalThis` para reutilizarlo y no abrir conexiones nuevas cada vez.
const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createPrismaClient>;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
