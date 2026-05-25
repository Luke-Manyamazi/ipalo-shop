import { ProductCard } from "@/components/products/ProductCard";
import { PackageSearch } from "lucide-react";
import Link from "next/link";

interface Variant {
  id: string;
  size?: string | null;
  color?: string | null;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number | { toNumber: () => number };
  comparePrice?: number | { toNumber: () => number } | null;
  images: string[];
  featured: boolean;
  category: { name: string };
  variants: Variant[];
}

interface ShopGridProps {
  products: Product[];
}

export function ShopGrid({ products }: ShopGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <PackageSearch className="h-12 w-12 text-neutral-200 mb-4" />
        <h3 className="font-medium text-lg mb-2">No products found</h3>
        <p className="text-sm text-neutral-500 mb-6">
          Try adjusting your filters or browse all products.
        </p>
        <Link href="/shop" className="text-sm font-medium border-b border-black pb-0.5">
          Clear filters
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          slug={product.slug}
          price={
            typeof product.price === "number"
              ? product.price
              : product.price.toNumber()
          }
          comparePrice={
            product.comparePrice
              ? typeof product.comparePrice === "number"
                ? product.comparePrice
                : product.comparePrice.toNumber()
              : undefined
          }
          images={product.images.length > 0 ? product.images : ["/logo-tee.png"]}
          category={product.category.name}
          featured={product.featured}
          variants={product.variants}
        />
      ))}
    </div>
  );
}
