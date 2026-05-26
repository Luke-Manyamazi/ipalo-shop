import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: true });

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const db = new PrismaClient({ adapter });

async function main() {
  console.log("📦 Adding new products...\n");

  // Get category IDs
  const cats = await db.category.findMany();
  const bySlug = Object.fromEntries(cats.map((c) => [c.slug, c.id]));

  const newProducts = [
    // ── KIDS & BABY ────────────────────────────────────────────────────────────
    {
      name: "ipalo Baby Sweatsuit",
      slug: "ipalo-baby-sweatsuit",
      description:
        "The softest start. Our premium baby sweatsuit in 200gsm brushed cotton fleece — cream colourway with matching socks included. Pre-washed, tagless, double-stitched seams. Designed for maximum softness and stretch. Makes the perfect baby shower gift, beautifully boxed in ipalo tissue.",
      price: 320,
      comparePrice: null,
      sku: "IPL-KDS-SWT-001",
      weight: 0.3,
      images: ["/brand/baby-sweatsuit.png"],
      tags: ["baby", "sweatsuit", "gift", "newborn", "soft"],
      featured: true,
      active: true,
      categoryId: bySlug["kids-baby"],
      variants: [
        { size: "0-3m", stock: 12 },
        { size: "3-6m", stock: 15 },
        { size: "6-12m", stock: 12 },
        { size: "12-18m", stock: 10 },
        { size: "18-24m", stock: 8 },
      ],
    },
    {
      name: "ipalo Baby Romper",
      slug: "ipalo-baby-romper",
      description:
        "The everyday essential. Our signature logo baby romper in 160gsm combed cotton — buttery soft against delicate skin. Snap-button closure at the bottom for easy changes. Tagless print, pre-washed for softness. Available in white and sage. The piece every ipalo baby wardrobe needs.",
      price: 220,
      comparePrice: null,
      sku: "IPL-KDS-ROM-001",
      weight: 0.15,
      images: ["/brand/baby-romper.png"],
      tags: ["baby", "romper", "onesie", "newborn", "gift"],
      featured: false,
      active: true,
      categoryId: bySlug["kids-baby"],
      variants: [
        { size: "0-3m", color: "White", stock: 15 },
        { size: "3-6m", color: "White", stock: 15 },
        { size: "6-12m", color: "White", stock: 12 },
        { size: "12-18m", color: "White", stock: 10 },
      ],
    },
    {
      name: "ipalo Baby Bibs Set",
      slug: "ipalo-baby-bibs-set",
      description:
        "Practical meets precious. A set of 2 signature ipalo™ logo bibs in soft 100% cotton with waterproof backing. Adjustable velcro neck strap, rounded corners, generous drool coverage. Machine washable. Gift-wrapped in ipalo tissue. A must-have for every new parent.",
      price: 150,
      comparePrice: null,
      sku: "IPL-KDS-BIB-001",
      weight: 0.1,
      images: ["/brand/baby-bibs.png"],
      tags: ["baby", "bibs", "gift", "practical", "feeding"],
      featured: false,
      active: true,
      categoryId: bySlug["kids-baby"],
      variants: [
        { size: "One Size", color: "White", stock: 30 },
      ],
    },
    {
      name: "ipalo Baby Socks 3-Pack",
      slug: "ipalo-baby-socks-3-pack",
      description:
        "Three pairs, endless style. Our signature logo baby socks in a 3-pack — grey body with navy heel and toe, striped cuff detail. 80% combed cotton for breathability. Non-slip grip sole from 6m+. Perfect as an add-on gift or stocking stuffer. Because little feet deserve ipalo too.",
      price: 120,
      comparePrice: null,
      sku: "IPL-KDS-SOK-001",
      weight: 0.08,
      images: ["/brand/baby-socks.png"],
      tags: ["baby", "socks", "gift", "accessories"],
      featured: false,
      active: true,
      categoryId: bySlug["kids-baby"],
      variants: [
        { size: "0-6m", stock: 20 },
        { size: "6-12m", stock: 20 },
        { size: "12-24m", stock: 15 },
      ],
    },
    {
      name: "ipalo Kids Crewneck",
      slug: "ipalo-kids-crewneck",
      description:
        "The mini classic. Our kids' signature crewneck sweatshirt in 280gsm cotton blend — same premium weight as the adult version, scaled for little bodies. Ribbed cuffs and hem, dropped shoulder fit for comfort and room to grow. Screen-printed ipalo™ logo. Available in white and stone.",
      price: 280,
      comparePrice: null,
      sku: "IPL-KDS-CRW-001",
      weight: 0.35,
      images: ["/brand/kids-crewneck.png"],
      tags: ["kids", "crewneck", "sweatshirt", "logo"],
      featured: true,
      active: true,
      categoryId: bySlug["kids-baby"],
      variants: [
        { size: "2-3Y", color: "White", stock: 10 },
        { size: "4-5Y", color: "White", stock: 12 },
        { size: "6-7Y", color: "White", stock: 10 },
        { size: "8-9Y", color: "White", stock: 8 },
        { size: "10-11Y", color: "White", stock: 6 },
      ],
    },
    {
      name: "ipalo Kids Tee — Blush",
      slug: "ipalo-kids-tee-blush",
      description:
        "The fresh colourway. Our kids' logo tee in a signature blush pink — 160gsm combed cotton, screen-printed ipalo™ monogram. Relaxed fit with room to grow, tagless print for sensitive skin. Pre-washed for that worn-in softness from day one. Pairs perfectly with the Kids Crewneck for a full set.",
      price: 180,
      comparePrice: null,
      sku: "IPL-KDS-TEE-PNK-001",
      weight: 0.18,
      images: ["/brand/kids-pink-tee.png"],
      tags: ["kids", "tee", "blush", "pink", "girls"],
      featured: false,
      active: true,
      categoryId: bySlug["kids-baby"],
      variants: [
        { size: "2-3Y", color: "Blush", stock: 12 },
        { size: "4-5Y", color: "Blush", stock: 12 },
        { size: "6-7Y", color: "Blush", stock: 10 },
        { size: "8-9Y", color: "Blush", stock: 8 },
      ],
    },
    {
      name: "ipalo Kids Hoodie — Maize",
      slug: "ipalo-kids-hoodie-maize",
      description:
        "Bold colour, premium feel. Our kids' signature hoodie in a vibrant maize yellow — 300gsm brushed fleece, drawstring hood, kangaroo pocket, ribbed cuffs. The standout piece in any kids' wardrobe. Screen-printed ipalo™ logo. Limited run — once it's gone, it's gone.",
      price: 320,
      comparePrice: 380,
      sku: "IPL-KDS-HOD-YLW-001",
      weight: 0.4,
      images: ["/brand/kids-yellow-hoodie.png"],
      tags: ["kids", "hoodie", "yellow", "maize", "coloured"],
      featured: true,
      active: true,
      categoryId: bySlug["kids-baby"],
      variants: [
        { size: "2-3Y", color: "Maize", stock: 8 },
        { size: "4-5Y", color: "Maize", stock: 10 },
        { size: "6-7Y", color: "Maize", stock: 8 },
        { size: "8-9Y", color: "Maize", stock: 6 },
        { size: "10-11Y", color: "Maize", stock: 4 },
      ],
    },
    // ── ACCESSORIES ─────────────────────────────────────────────────────────────
    {
      name: "ipalo Drawstring Bag",
      slug: "ipalo-drawstring-bag",
      description:
        "The go-anywhere carry. Our lightweight signature drawstring bag in 100% polyester — waterproof lining, reinforced strap eyelets, and a generous 15L capacity. Screen-printed ipalo™ logo. Perfect for gym, beach, school or travel. Folds flat when not in use. Unisex design.",
      price: 200,
      comparePrice: null,
      sku: "IPL-ACC-DRW-001",
      weight: 0.25,
      images: ["/brand/drawstring-bag.png"],
      tags: ["bag", "backpack", "drawstring", "gym", "accessories"],
      featured: false,
      active: true,
      categoryId: bySlug["accessories"],
      variants: [
        { size: "One Size", color: "White", stock: 20 },
        { size: "One Size", color: "Black", stock: 20 },
      ],
    },
    {
      name: "ipalo Bucket Hat",
      slug: "ipalo-bucket-hat",
      description:
        "Summer essential. Our signature ipalo™ logo bucket hat in 100% cotton canvas — structured brim, embroidered logo detail, adjustable inner tape. UV protective and breathable. The finishing touch to any ipalo look. Available in white, black and stone. One size fits most.",
      price: 220,
      comparePrice: null,
      sku: "IPL-ACC-HAT-001",
      weight: 0.12,
      images: ["/brand/bucket-hat.png"],
      tags: ["hat", "bucket hat", "accessories", "summer", "unisex"],
      featured: true,
      active: true,
      categoryId: bySlug["accessories"],
      variants: [
        { size: "One Size", color: "White", stock: 15 },
        { size: "One Size", color: "Black", stock: 15 },
        { size: "One Size", color: "Stone", stock: 10 },
      ],
    },
    // ── WOMEN ───────────────────────────────────────────────────────────────────
    {
      name: "ipalo Women's Logo Tank",
      slug: "ipalo-womens-logo-tank",
      description:
        "Elevated basics. Our women's signature logo tank in 180gsm Pima cotton — buttery smooth, slightly fitted, hits just below the hip. Screen-printed ipalo™ monogram. Wear it to the gym, under a blazer, or on its own. The versatile piece that works everywhere. Available in white and black.",
      price: 280,
      comparePrice: null,
      sku: "IPL-WM-TNK-001",
      weight: 0.2,
      images: ["/brand/womens-tank.png"],
      tags: ["women", "tank", "vest", "gym", "activewear"],
      featured: true,
      active: true,
      categoryId: bySlug["women"],
      variants: [
        { size: "XS", color: "White", stock: 8 },
        { size: "S", color: "White", stock: 12 },
        { size: "M", color: "White", stock: 12 },
        { size: "L", color: "White", stock: 8 },
        { size: "XL", color: "White", stock: 5 },
        { size: "XS", color: "Black", stock: 6 },
        { size: "S", color: "Black", stock: 10 },
        { size: "M", color: "Black", stock: 10 },
        { size: "L", color: "Black", stock: 6 },
        { size: "XL", color: "Black", stock: 4 },
      ],
    },
    {
      name: "ipalo Men's Classic Logo Tee",
      slug: "ipalo-mens-classic-logo-tee",
      description:
        "The men's essential. Our signature logo tee cut for men — 180gsm combed cotton, slightly wider shoulder and relaxed body. Screen-printed ipalo™ wordmark, pre-washed for that worn-in feel. The most versatile piece in your rotation. Pairs with everything from jeans to joggers.",
      price: 280,
      comparePrice: null,
      sku: "IPL-MN-TEE-001",
      weight: 0.3,
      images: ["/brand/tee-lifestyle.png", "/logo-tee.png"],
      tags: ["men", "tee", "classic", "logo", "cotton"],
      featured: true,
      active: true,
      categoryId: bySlug["men"],
      variants: [
        { size: "S", color: "White", stock: 10 },
        { size: "M", color: "White", stock: 15 },
        { size: "L", color: "White", stock: 15 },
        { size: "XL", color: "White", stock: 10 },
        { size: "XXL", color: "White", stock: 6 },
        { size: "S", color: "Black", stock: 8 },
        { size: "M", color: "Black", stock: 12 },
        { size: "L", color: "Black", stock: 12 },
        { size: "XL", color: "Black", stock: 8 },
        { size: "XXL", color: "Black", stock: 4 },
      ],
    },
    // ── GIFT SETS ───────────────────────────────────────────────────────────────
    {
      name: "ipalo Baby Welcome Gift Set",
      slug: "ipalo-baby-welcome-gift-set",
      description:
        "The ultimate baby gift. Our curated Baby Welcome Gift Set — includes a soft baby romper, a set of 2 bibs, and 3 pairs of socks, all beautifully packaged in ipalo branded tissue, a kraft gift box with ribbon, and a personal gift card. Because this baby deserves more than a gift.",
      price: 450,
      comparePrice: 490,
      sku: "IPL-GIFT-BABY-001",
      weight: 0.45,
      images: ["/brand/baby-romper.png", "/brand/baby-bibs.png", "/brand/baby-socks.png"],
      tags: ["gift", "baby", "bundle", "new baby", "baby shower"],
      featured: true,
      active: true,
      categoryId: bySlug["gift-sets"],
      variants: [
        { size: "0-3m", stock: 10 },
        { size: "3-6m", stock: 10 },
        { size: "6-12m", stock: 8 },
        { size: "12-18m", stock: 6 },
      ],
    },
  ];

  let count = 0;
  for (const productData of newProducts) {
    const { variants, ...data } = productData;
    try {
      await db.product.upsert({
        where: { slug: data.slug },
        update: {},
        create: {
          ...data,
          variants: {
            create: variants.map((v) => ({
              size: (v as { size?: string }).size ?? null,
              color: (v as { color?: string }).color ?? null,
              stock: v.stock,
            })),
          },
        },
      });
      console.log(`   ✓ ${data.name}`);
      count++;
    } catch (e) {
      console.warn(`   ⚠ Skipped (already exists): ${data.name}`);
    }
  }

  console.log(`\n✅ Added ${count} new products`);
  await db.$disconnect();
}

main().catch((e) => {
  console.error("❌ Failed:", e);
  process.exit(1);
});
