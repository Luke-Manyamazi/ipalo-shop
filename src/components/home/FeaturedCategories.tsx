import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/db";

async function getCategories() {
  try {
    const cats = await db.category.findMany({
      where: { slug: { in: ["kids-baby", "women", "accessories"] } },
      include: { _count: { select: { products: { where: { active: true } } } } },
    });
    return cats;
  } catch {
    return [];
  }
}

const META: Record<string, { bg: string; image: string; desc: string }> = {
  "kids-baby":  { bg: "#f8f5f0", image: "/logo-tee.png",  desc: "Soft & safe for the littlest gifts" },
  women:        { bg: "#e8e0d4", image: "/logo-tee.png",  desc: "Style that speaks volumes" },
  accessories:  { bg: "#f0ece6", image: "/logo-tote.png", desc: "The finishing touch" },
};

const FALLBACK = [
  { id: "1", name: "Kids & Baby",  slug: "kids-baby",  _count: { products: 0 } },
  { id: "2", name: "Women",        slug: "women",       _count: { products: 0 } },
  { id: "3", name: "Accessories",  slug: "accessories", _count: { products: 0 } },
];

export async function FeaturedCategories() {
  const categories = await getCategories();
  const list = categories.length > 0 ? categories : FALLBACK;

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-neutral-400 font-medium mb-2">
              Explore
            </p>
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
              Shop by{" "}
              <span className="italic" style={{ fontFamily: "var(--font-display)" }}>
                category
              </span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-black transition-colors group"
          >
            All products
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {list.map((cat, i) => {
            const m = META[cat.slug] ?? META["kids-baby"];
            const count = "_count" in cat ? cat._count.products : 0;
            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] block"
                style={{ backgroundColor: m.bg }}
              >
                <Image
                  src={m.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(.4,0,.2,1)] group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Number watermark */}
                <span className="absolute top-4 left-5 text-white/10 text-7xl font-black leading-none select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Text */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-white/50 text-xs mb-1.5">
                    {count} product{count !== 1 ? "s" : ""}
                  </p>
                  <h3 className="text-white text-xl font-semibold leading-tight mb-1.5">{cat.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{m.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-white text-xs font-medium border-b border-white/30 group-hover:border-white pb-0.5 transition-colors">
                    Shop Now
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
