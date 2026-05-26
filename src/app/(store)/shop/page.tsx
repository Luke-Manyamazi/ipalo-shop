import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { ShopSort } from "@/components/shop/ShopSort";
import { getProducts, getCategories, toProductCard } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse the full ipalo collection — clothing, accessories & gift sets. Delivered across South Africa.",
};

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    min?: string;
    max?: string;
    page?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page ?? "1");

  const [{ products: rawProducts, total }, allCategories] = await Promise.all([
    getProducts({
      categorySlug: params.category,
      sort: params.sort,
      minPrice: params.min ? parseFloat(params.min) : undefined,
      maxPrice: params.max ? parseFloat(params.max) : undefined,
      page,
      limit: 12,
    }),
    getCategories(),
  ]);

  const products = rawProducts.map(toProductCard);
  const currentCategory = allCategories.find((c) => c.slug === params.category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-light tracking-tight mb-2">
          {currentCategory ? currentCategory.name : "All Products"}
        </h1>
        <p className="text-neutral-500 text-sm">
          {total} {total === 1 ? "product" : "products"} available
        </p>
      </div>

      <div className="flex gap-8 lg:gap-12">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <Suspense>
            <ShopFilters categories={allCategories} currentCategory={params.category} />
          </Suspense>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <Suspense>
              <ShopSort currentSort={params.sort} />
            </Suspense>
          </div>

          <ShopGrid products={products} />

          {/* Pagination */}
          {total > 12 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: Math.ceil(total / 12) }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={`?${new URLSearchParams({ ...params, page: String(p) })}`}
                  className={`w-9 h-9 flex items-center justify-center rounded-md text-sm border transition-colors ${
                    String(p) === (params.page ?? "1")
                      ? "bg-black text-white border-black"
                      : "border-[#e5e5e5] hover:border-black"
                  }`}
                >
                  {p}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
