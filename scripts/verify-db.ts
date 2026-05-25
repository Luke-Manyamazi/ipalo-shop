import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: true });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function verify() {
  const [products, categories, zones, users, settings] = await Promise.all([
    db.product.findMany({ select: { name: true, price: true, featured: true }, orderBy: { createdAt: "asc" } }),
    db.category.count(),
    db.deliveryZone.count(),
    db.user.findMany({ select: { email: true, role: true } }),
    db.setting.count(),
  ]);

  console.log("\n✅ Live Supabase Database — ipalo shop\n");
  console.log(`   Categories:     ${categories}`);
  console.log(`   Delivery zones: ${zones}`);
  console.log(`   Settings:       ${settings}`);
  console.log(`   Users:          ${users.length}`);
  users.forEach((u) => console.log(`     → ${u.email} [${u.role}]`));
  console.log(`   Products:       ${products.length}`);
  products.forEach((p) =>
    console.log(`     → ${p.name}  R${p.price}${p.featured ? " ⭐" : ""}`)
  );
  console.log("\n🌐 View in Supabase: https://supabase.com/dashboard/project/nrngfprgbnzpimyeyguc\n");

  await db.$disconnect();
}

verify().catch(console.error);
