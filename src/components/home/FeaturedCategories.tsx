import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/db";

async function getCategories() {
  try {
    const cats = await db.category.findMany({
      where: {
        slug: { in: ["kids-baby", "women", "accessories"] },
      },
      include: {
        _count: { select: { products: { where: { active: true } } } },
      },
    });
    return cats;
  } catch {
    return [];
  }
}

const BG_MAP: Record<string, string> = {
  "kids-baby": "#f8f5f0",
  women: "#e8e0d4",
  accessories: "#f0ece6",
};

const IMAGE_MAP: Record<string, string> = {
  "kids-baby": "/logo-tee.png",
  women: "/logo-tee.png",
  accessories: "/logo-tote.png",
};

const DESC_MAP: Record<string, string> = {
  "kids-baby": "Soft & safe for the littlest gifts",
  women: "Style that speaks volumes",
  accessories: "The finishing touch",
};

export async function FeaturedCategories() {
  const categories = await getCategories();

  // Fallback if DB empty
  const displayCats =
    categories.length > 0
      ? categories
      : [
          { id: "1", name: "Kids & Baby", slug: "kids-baby", _count: { products: 0 } },
          { id: "2", name: "Women", slug: "women", _count: { products: 0 } },
          { id: "3", name: "Accessories", slug: "accessories", _count: { products: 0 } },
        ];

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-2">Explore</p>
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
              Shop by category
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium hover:gap-3 transition-all"
          >
            All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {displayCats.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5]"
              style={{ backgroundColor: BG_MAP[cat.slug] ?? "#f8f5f0" }}
            >
              <Image
                src={IMAGE_MAP[cat.slug] ?? "/logo-tee.png"}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/70 text-xs mb-1">
                  {("_count" in cat) ? cat._count.products : 0} products
                </p>
                <h3 className="text-white text-xl font-semibold mb-1">{cat.name}</h3>
                <p className="text-white/70 text-sm mb-3">
                  {DESC_MAP[cat.slug] ?? "Explore the collection"}
                </p>
                <span className="inline-flex items-center gap-1.5 text-white text-xs font-medium border-b border-white/40 group-hover:border-white transition-colors pb-0.5">
                  Shop Now <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>

              {/* Number accent */}
              <div className="absolute top-4 left-4 text-white/20 text-6xl font-bold leading-none select-none">
                {String(i + 1).padStart(2, "0")}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
