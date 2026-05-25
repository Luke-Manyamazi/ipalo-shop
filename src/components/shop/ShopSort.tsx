"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface ShopSortProps {
  currentSort?: string;
}

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function ShopSort({ currentSort = "featured" }: ShopSortProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-neutral-500">Sort by:</span>
      <select
        value={currentSort}
        onChange={(e) => handleSort(e.target.value)}
        className="text-sm border border-[#e5e5e5] rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-black"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
