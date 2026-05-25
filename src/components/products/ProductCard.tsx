"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  variants?: {
    id: string;
    size?: string | null;
    color?: string | null;
    stock: number;
  }[];
  featured?: boolean;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  comparePrice,
  images,
  category,
  variants,
  featured,
}: ProductCardProps) {
  const { addItem } = useCartStore();

  const primaryImage = images[0] || "/placeholder-product.jpg";
  const secondaryImage = images[1] || images[0] || "/placeholder-product.jpg";
  const totalStock = variants?.reduce((sum, v) => sum + v.stock, 0) ?? 0;
  const isOnSale = comparePrice && comparePrice > price;
  const isOutOfStock = totalStock === 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    // If only one variant (or no variants), add directly
    const defaultVariant = variants?.[0];
    addItem({
      productId: id,
      variantId: defaultVariant?.id,
      name,
      slug,
      image: primaryImage,
      price,
      size: defaultVariant?.size ?? undefined,
      color: defaultVariant?.color ?? undefined,
      quantity: 1,
      stock: defaultVariant?.stock ?? 99,
    });

    toast.success(`${name} added to bag`, {
      icon: "🖤",
      style: { borderRadius: "8px", fontSize: "14px" },
    });
  };

  return (
    <div className="group relative">
      <Link href={`/product/${slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#f8f5f0] mb-3">
          {/* Primary image */}
          <Image
            src={primaryImage}
            alt={name}
            fill
            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          {/* Hover image */}
          <Image
            src={secondaryImage}
            alt={name}
            fill
            className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {featured && (
              <Badge className="shadow-sm">Featured</Badge>
            )}
            {isOnSale && (
              <Badge variant="destructive" className="shadow-sm">
                -{Math.round(((comparePrice - price) / comparePrice) * 100)}%
              </Badge>
            )}
            {isOutOfStock && (
              <Badge variant="outline" className="bg-white shadow-sm">
                Sold Out
              </Badge>
            )}
          </div>

          {/* Wishlist button */}
          <button
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
            aria-label="Add to wishlist"
            onClick={(e) => { e.preventDefault(); }}
          >
            <Heart className="h-3.5 w-3.5" />
          </button>

          {/* Quick Add */}
          {!isOutOfStock && (
            <button
              onClick={handleQuickAdd}
              className="absolute bottom-3 left-3 right-3 bg-black text-white text-xs font-medium py-2.5 rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Quick Add
            </button>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-xs text-neutral-500 mb-0.5">{category}</p>
          <h3 className="font-medium text-sm leading-snug group-hover:underline underline-offset-2 line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-semibold text-sm">{formatPrice(price)}</span>
            {isOnSale && (
              <span className="text-xs text-neutral-400 line-through">
                {formatPrice(comparePrice)}
              </span>
            )}
          </div>
          {variants && variants.length > 1 && (
            <p className="text-xs text-neutral-400 mt-0.5">
              {variants.length} options available
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
