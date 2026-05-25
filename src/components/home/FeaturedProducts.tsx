import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { db } from "@/lib/db";

async function getFeaturedProducts() {
  try {
    const products = await db.product.findMany({
      where: { active: true, featured: true },
      take: 4,
      orderBy: { createdAt: "desc" },
      include: { category: true, variants: true },
    });
    return products;
  } catch {
    return [];
  }
}

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-2">
              Curated picks
            </p>
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight">
              Featured products
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium hover:gap-3 transition-all"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12 text-neutral-400">
            <p>Products coming soon…</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                price={Number(product.price)}
                comparePrice={product.comparePrice ? Number(product.comparePrice) : undefined}
                images={product.images.length > 0 ? product.images : ["/logo-tee.png"]}
                category={product.category.name}
                featured={product.featured}
                variants={product.variants.map((v) => ({
                  id: v.id,
                  size: v.size,
                  color: v.color,
                  stock: v.stock,
                }))}
              />
            ))}
          </div>
        )}

        {/* Mobile view all */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium border-b border-black pb-0.5"
          >
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
