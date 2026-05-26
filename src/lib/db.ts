import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Always use the PrismaPg adapter (Prisma 7 driver-adapter pattern).
  // Pass config DIRECTLY to PrismaPg (not a Pool instance) to avoid the
  // Next.js module-bundling instanceof mismatch where our Pool from "pg"
  // is not recognised as the adapter's Pool, causing silent connection failures.
  const connectionString =
    process.env.DATABASE_URL || "postgresql://localhost:5432/ipalo";

  const adapter = new PrismaPg({
    connectionString,
    // Limit to 1 connection per serverless function instance (Fluid Compute).
    max: 1,
    // Supabase requires SSL; disable strict cert validation for Vercel→Supabase.
    ssl: connectionString.includes("supabase.co")
      ? { rejectUnauthorized: false }
      : undefined,
  });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
