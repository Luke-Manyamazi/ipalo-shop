import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: true });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function run() {
  // Remove old admin
  await db.user.deleteMany({ where: { email: "it@torgaoptical.co.za" } });

  // Create correct admin
  const hashedPassword = await bcrypt.hash("Ipalo@Admin2024!", 12);
  const admin = await db.user.upsert({
    where: { email: "lukemanyamazi1@gmail.com" },
    update: { role: "SUPER_ADMIN", password: hashedPassword, name: "Luke Manyamazi" },
    create: {
      email: "lukemanyamazi1@gmail.com",
      name: "Luke Manyamazi",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });

  console.log(`✅ Admin updated: ${admin.email} [${admin.role}]`);
  await db.$disconnect();
}

run().catch(console.error);
