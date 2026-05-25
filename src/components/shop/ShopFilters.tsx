"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ShopFiltersProps {
  categories: Category[];
  currentCategory?: string;
}

const PRICE_RANGES = [
  { label: "Under R200", min: "0", max: "200" },
  { label: "R200 – R400", min: "200", max: "400" },
  { label: "R400 – R700", min: "400", max: "700" },
  { label: "Over R700", min: "700", max: "" },
];

export function ShopFilters({ categories, currentCategory }: ShopFiltersProps) {
  const searchParams = useSearchParams();
  const currentMin = searchParams.get("min");
  const currentMax = searchParams.get("max");

  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-xs font-semibold tracking-[0.15em] uppercase mb-4">Category</h3>
        <ul className="space-y-1.5">
          <li>
            <Link
              href="/shop"
              className={cn(
                "text-sm transition-colors",
                !currentCategory
                  ? "font-semibold text-black"
                  : "text-neutral-500 hover:text-black"
              )}
            >
              All Products
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={`/shop?category=${cat.slug}`}
                className={cn(
                  "text-sm transition-colors",
                  currentCategory === cat.slug
                    ? "font-semibold text-black"
                    : "text-neutral-500 hover:text-black"
                )}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-xs font-semibold tracking-[0.15em] uppercase mb-4">Price</h3>
        <ul className="space-y-1.5">
          {PRICE_RANGES.map((range) => {
            const isActive = currentMin === range.min && currentMax === range.max;
            const href = `/shop?${currentCategory ? `category=${currentCategory}&` : ""}min=${range.min}${range.max ? `&max=${range.max}` : ""}`;
            return (
              <li key={range.label}>
                <Link
                  href={isActive ? `/shop${currentCategory ? `?category=${currentCategory}` : ""}` : href}
                  className={cn(
                    "text-sm transition-colors flex items-center gap-2",
                    isActive ? "font-semibold text-black" : "text-neutral-500 hover:text-black"
                  )}
                >
                  <span
                    className={cn(
                      "w-3 h-3 rounded-full border transition-colors",
                      isActive ? "border-black bg-black" : "border-neutral-300"
                    )}
                  />
                  {range.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Clear Filters */}
      {(currentCategory || currentMin || currentMax) && (
        <Link
          href="/shop"
          className="text-xs text-neutral-400 hover:text-black underline transition-colors"
        >
          Clear all filters
        </Link>
      )}
    </div>
  );
}
