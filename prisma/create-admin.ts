import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: true });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const db = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("Ipalo@Admin2024!", 12);

  const user = await db.user.upsert({
    where: { email: "lukemanyamazi1@gmail.com" },
    update: { role: "SUPER_ADMIN", password: hashedPassword },
    create: {
      email: "lukemanyamazi1@gmail.com",
      name: "Luke Manyamazi",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });

  console.log(`✓ Admin created: ${user.email} (${user.role})`);
  await db.$disconnect();
}

main().catch((e) => {
  console.error("Failed:", e);
  process.exit(1);
});
