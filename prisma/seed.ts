import { config } from "dotenv";
import { resolve } from "path";
// Load both env files (local takes precedence)
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
  console.log("🌱 Seeding ipalo database...\n");

  // ─── CATEGORIES ────────────────────────────────────────────────────────────
  console.log("📂 Creating categories...");

  const categories = await Promise.all([
    db.category.upsert({
      where: { slug: "kids-baby" },
      update: {},
      create: {
        name: "Kids & Baby",
        slug: "kids-baby",
        description: "Soft, safe and stylish pieces for the littlest gifts in your life.",
        image: "/logo-tee.png",
      },
    }),
    db.category.upsert({
      where: { slug: "women" },
      update: {},
      create: {
        name: "Women",
        slug: "women",
        description: "Premium lifestyle pieces designed for her.",
        image: "/logo-tee.png",
      },
    }),
    db.category.upsert({
      where: { slug: "men" },
      update: {},
      create: {
        name: "Men",
        slug: "men",
        description: "Clean, minimal and built to last.",
        image: "/logo-hoodie.png",
      },
    }),
    db.category.upsert({
      where: { slug: "accessories" },
      update: {},
      create: {
        name: "Accessories",
        slug: "accessories",
        description: "The finishing touch to every outfit.",
        image: "/logo-tote.png",
      },
    }),
    db.category.upsert({
      where: { slug: "gift-sets" },
      update: {},
      create: {
        name: "Gift Sets",
        slug: "gift-sets",
        description: "Curated collections — because it's more than a gift.",
        image: "/logo-tote.png",
      },
    }),
    db.category.upsert({
      where: { slug: "new-arrivals" },
      update: {},
      create: {
        name: "New Arrivals",
        slug: "new-arrivals",
        description: "Fresh drops from the ipalo collection.",
        image: "/logo-hoodie.png",
      },
    }),
  ]);

  console.log(`   ✓ ${categories.length} categories created`);

  const [kidsCategory, womenCategory, menCategory, accessoriesCategory] = categories;

  // ─── DELIVERY ZONES ────────────────────────────────────────────────────────
  console.log("🚚 Creating delivery zones...");

  const zones = await Promise.all([
    db.deliveryZone.upsert({
      where: { id: "zone-gauteng" },
      update: {},
      create: {
        id: "zone-gauteng",
        name: "Gauteng Metro",
        provinces: ["Gauteng"],
        basePrice: 65,
        pricePerKg: 10,
        minDays: 1,
        maxDays: 3,
      },
    }),
    db.deliveryZone.upsert({
      where: { id: "zone-western-cape" },
      update: {},
      create: {
        id: "zone-western-cape",
        name: "Western Cape",
        provinces: ["Western Cape"],
        basePrice: 95,
        pricePerKg: 12,
        minDays: 2,
        maxDays: 4,
      },
    }),
    db.deliveryZone.upsert({
      where: { id: "zone-kwazulu-natal" },
      update: {},
      create: {
        id: "zone-kwazulu-natal",
        name: "KwaZulu-Natal",
        provinces: ["KwaZulu-Natal"],
        basePrice: 85,
        pricePerKg: 12,
        minDays: 2,
        maxDays: 4,
      },
    }),
    db.deliveryZone.upsert({
      where: { id: "zone-eastern-cape" },
      update: {},
      create: {
        id: "zone-eastern-cape",
        name: "Eastern Cape",
        provinces: ["Eastern Cape"],
        basePrice: 110,
        pricePerKg: 15,
        minDays: 3,
        maxDays: 5,
      },
    }),
    db.deliveryZone.upsert({
      where: { id: "zone-limpopo-mp-nw" },
      update: {},
      create: {
        id: "zone-limpopo-mp-nw",
        name: "Limpopo / Mpumalanga / North West",
        provinces: ["Limpopo", "Mpumalanga", "North West"],
        basePrice: 105,
        pricePerKg: 15,
        minDays: 3,
        maxDays: 6,
      },
    }),
    db.deliveryZone.upsert({
      where: { id: "zone-free-state" },
      update: {},
      create: {
        id: "zone-free-state",
        name: "Free State",
        provinces: ["Free State"],
        basePrice: 95,
        pricePerKg: 12,
        minDays: 2,
        maxDays: 5,
      },
    }),
    db.deliveryZone.upsert({
      where: { id: "zone-northern-cape" },
      update: {},
      create: {
        id: "zone-northern-cape",
        name: "Northern Cape",
        provinces: ["Northern Cape"],
        basePrice: 130,
        pricePerKg: 18,
        minDays: 4,
        maxDays: 7,
      },
    }),
  ]);

  console.log(`   ✓ ${zones.length} delivery zones created`);

  // ─── ADMIN USER ────────────────────────────────────────────────────────────
  console.log("👤 Creating admin user...");

  const hashedPassword = await bcrypt.hash("Ipalo@Admin2024!", 12);

  const admin = await db.user.upsert({
    where: { email: "it@torgaoptical.co.za" },
    update: { role: "SUPER_ADMIN" },
    create: {
      email: "it@torgaoptical.co.za",
      name: "Ipalo Admin",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });

  console.log(`   ✓ Admin: ${admin.email} (role: ${admin.role})`);

  // ─── PRODUCTS ──────────────────────────────────────────────────────────────
  console.log("📦 Creating products...");

  const products = [
    {
      name: "ipalo Classic Logo Tee",
      slug: "ipalo-classic-logo-tee",
      description:
        "The original. Our classic ipalo™ wordmark tee in premium 180gsm combed cotton. Pre-washed for softness, relaxed unisex fit. The most wearable piece in your wardrobe — dress it up or down. Screen-printed logo that won't crack or fade.",
      price: 280,
      comparePrice: 350,
      sku: "IPL-TEE-WM-001",
      weight: 0.3,
      images: ["/logo-tee.png"],
      tags: ["tee", "classic", "logo", "cotton", "unisex"],
      featured: true,
      active: true,
      categoryId: womenCategory.id,
      variants: [
        { size: "XS", color: "White", stock: 8 },
        { size: "S", color: "White", stock: 15 },
        { size: "M", color: "White", stock: 20 },
        { size: "L", color: "White", stock: 15 },
        { size: "XL", color: "White", stock: 10 },
        { size: "XXL", color: "White", stock: 5 },
        { size: "XS", color: "Black", stock: 6 },
        { size: "S", color: "Black", stock: 12 },
        { size: "M", color: "Black", stock: 18 },
        { size: "L", color: "Black", stock: 12 },
        { size: "XL", color: "Black", stock: 8 },
      ],
    },
    {
      name: "ipalo Signature Hoodie",
      slug: "ipalo-signature-hoodie",
      description:
        "The statement piece. Our heavyweight ipalo™ monogram hoodie in 350gsm French terry cotton. Oversized fit, double-lined hood, ribbed cuffs and hem, kangaroo pocket. Built for longevity — not fast fashion. Garment washed for a lived-in feel from day one.",
      price: 650,
      comparePrice: null,
      sku: "IPL-HOD-MN-001",
      weight: 0.65,
      images: ["/logo-hoodie.png"],
      tags: ["hoodie", "signature", "monogram", "french-terry", "heavyweight"],
      featured: true,
      active: true,
      categoryId: menCategory.id,
      variants: [
        { size: "S", color: "White", stock: 8 },
        { size: "M", color: "White", stock: 15 },
        { size: "L", color: "White", stock: 12 },
        { size: "XL", color: "White", stock: 8 },
        { size: "XXL", color: "White", stock: 4 },
      ],
    },
    {
      name: "ipalo Canvas Tote Bag",
      slug: "ipalo-canvas-tote-bag",
      description:
        "The everyday carry. Our signature ipalo™ monogram canvas tote in 12oz natural canvas. Reinforced stitching, long handles for shoulder carry, interior zip pocket. Large enough for groceries, gym kit or a laptop. Screen-printed logo. Unisex design built to go everywhere.",
      price: 180,
      comparePrice: null,
      sku: "IPL-ACC-TOT-001",
      weight: 0.4,
      images: ["/logo-tote.png"],
      tags: ["tote", "bag", "canvas", "accessories", "unisex"],
      featured: true,
      active: true,
      categoryId: accessoriesCategory.id,
      variants: [
        { size: "One Size", color: "Natural", stock: 30 },
        { size: "One Size", color: "Black", stock: 15 },
      ],
    },
    {
      name: "ipalo Kids Logo Tee",
      slug: "ipalo-kids-logo-tee",
      description:
        "Start them young. The miniature version of our signature logo tee in 160gsm soft combed cotton. Made specifically for little ones — double-stitched seams, tagless print, pre-washed for extra softness. Perfect as a gift for the little ipalo in your life.",
      price: 180,
      comparePrice: null,
      sku: "IPL-TEE-KDS-001",
      weight: 0.2,
      images: ["/logo-tee.png"],
      tags: ["kids", "baby", "tee", "logo", "gift"],
      featured: false,
      active: true,
      categoryId: kidsCategory.id,
      variants: [
        { size: "2-3Y", color: "White", stock: 12 },
        { size: "4-5Y", color: "White", stock: 15 },
        { size: "6-7Y", color: "White", stock: 10 },
        { size: "8-9Y", color: "White", stock: 8 },
        { size: "2-3Y", color: "Black", stock: 8 },
        { size: "4-5Y", color: "Black", stock: 10 },
        { size: "6-7Y", color: "Black", stock: 8 },
      ],
    },
    {
      name: "ipalo Women's Cropped Hoodie",
      slug: "ipalo-womens-cropped-hoodie",
      description:
        "Effortless and feminine. Our women's cropped version of the signature hoodie in 300gsm brushed cotton fleece. Fitted silhouette, cropped hem sits at the hip, soft inside brushing. Wear with high-waisted jeans or matching joggers for the full set.",
      price: 580,
      comparePrice: 650,
      sku: "IPL-HOD-WM-001",
      weight: 0.5,
      images: ["/logo-hoodie.png", "/logo-tee.png"],
      tags: ["hoodie", "cropped", "women", "fleece"],
      featured: true,
      active: true,
      categoryId: womenCategory.id,
      variants: [
        { size: "XS", color: "White", stock: 6 },
        { size: "S", color: "White", stock: 10 },
        { size: "M", color: "White", stock: 12 },
        { size: "L", color: "White", stock: 8 },
        { size: "XL", color: "White", stock: 4 },
      ],
    },
    {
      name: "ipalo Gift Set — Tee & Tote",
      slug: "ipalo-gift-set-tee-tote",
      description:
        "The perfect gift, wrapped in meaning. Our curated Tee & Tote gift set — a classic logo tee paired with a signature canvas tote, beautifully packaged in ipalo branded tissue and box. Choose the tee size at checkout. Because it's more than a gift.",
      price: 420,
      comparePrice: 460,
      sku: "IPL-GIFT-001",
      weight: 0.7,
      images: ["/logo-tote.png", "/logo-tee.png"],
      tags: ["gift", "set", "bundle", "tee", "tote"],
      featured: true,
      active: true,
      categoryId: categories[4].id, // gift-sets
      variants: [
        { size: "S", color: "White", stock: 10 },
        { size: "M", color: "White", stock: 15 },
        { size: "L", color: "White", stock: 10 },
        { size: "XL", color: "White", stock: 6 },
      ],
    },
  ];

  let productCount = 0;
  for (const productData of products) {
    const { variants, ...data } = productData;
    await db.product.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        ...data,
        comparePrice: data.comparePrice ?? null,
        variants: {
          create: variants.map((v) => ({
            size: v.size,
            color: v.color,
            stock: v.stock,
          })),
        },
      },
    });
    productCount++;
    console.log(`   ✓ ${data.name}`);
  }

  // ─── STORE SETTINGS ────────────────────────────────────────────────────────
  console.log("⚙️  Creating store settings...");

  const settings = [
    { key: "store_name", value: "ipalo" },
    { key: "store_tagline", value: "it's more than a gift" },
    { key: "store_email", value: "hello@ipalo.co.za" },
    { key: "store_phone", value: "+27 10 000 0000" },
    { key: "store_address", value: "South Africa" },
    { key: "free_delivery_threshold", value: "800" },
    { key: "dispatch_suburb", value: "Sandton" },
    { key: "dispatch_postal_code", value: "2196" },
    { key: "dispatch_province", value: "Gauteng" },
    { key: "currency", value: "ZAR" },
    { key: "currency_symbol", value: "R" },
  ];

  for (const setting of settings) {
    await db.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log(`   ✓ ${settings.length} settings saved`);

  // ─── DONE ──────────────────────────────────────────────────────────────────
  console.log("\n✅ Seed complete!");
  console.log("─────────────────────────────────────────");
  console.log(`   Categories:     ${categories.length}`);
  console.log(`   Delivery zones: ${zones.length}`);
  console.log(`   Products:       ${productCount}`);
  console.log(`   Admin user:     ${admin.email}`);
  console.log(`   Admin password: Ipalo@Admin2024!`);
  console.log("─────────────────────────────────────────");
  console.log("\n🔐 IMPORTANT: Change your admin password after first login!\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
