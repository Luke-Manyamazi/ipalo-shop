import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Always use the pg Pool + PrismaPg adapter (Prisma 7 pattern).
  // If DATABASE_URL is missing we fall back to a localhost URL so the error
  // is a clear connection-refused rather than a confusing "base" host error.
  // Use || not ?? so empty string also falls back to the placeholder
  const connectionString =
    process.env.DATABASE_URL || "postgresql://localhost:5432/ipalo";

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
