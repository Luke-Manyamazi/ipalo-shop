"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
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

  const primaryImage   = images[0] || "/logo-tee.png";
  const secondaryImage = images[1] || images[0] || "/logo-tee.png";
  const totalStock     = variants?.reduce((sum, v) => sum + v.stock, 0) ?? 0;
  const isOnSale       = comparePrice && comparePrice > price;
  const isOutOfStock   = totalStock === 0;
  const discount       = isOnSale
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    const v = variants?.[0];
    addItem({
      productId: id,
      variantId:  v?.id,
      name,
      slug,
      image: primaryImage,
      price,
      size:  v?.size  ?? undefined,
      color: v?.color ?? undefined,
      quantity: 1,
      stock: v?.stock ?? 99,
    });

    toast.success(`${name} added to bag`, {
      icon: "🖤",
      style: { borderRadius: "8px", fontSize: "14px" },
    });
  };

  return (
    <div className="group relative">
      <Link href={`/product/${slug}`} className="block">

        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#f4f1ec] mb-3.5">

          {/* Primary → Secondary image crossfade on hover */}
          <Image
            src={primaryImage}
            alt={name}
            fill
            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <Image
            src={secondaryImage}
            alt={name}
            fill
            className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {isOnSale && (
              <span className="bg-black text-white text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded">
                -{discount}%
              </span>
            )}
            {featured && !isOnSale && (
              <span className="bg-[#c9a96e] text-white text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded">
                Featured
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-white/90 text-neutral-600 text-[10px] font-medium px-2 py-0.5 rounded border border-neutral-200">
                Sold Out
              </span>
            )}
          </div>

          {/* Wishlist — revealed on hover */}
          <button
            onClick={(e) => { e.preventDefault(); }}
            aria-label="Add to wishlist"
            className="absolute top-2.5 right-2.5 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 active:scale-95 transition-transform"
          >
            <Heart className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>

          {/* Quick add — slides up on hover */}
          {!isOutOfStock && (
            <button
              onClick={handleQuickAdd}
              className="absolute inset-x-3 bottom-3 bg-black/90 text-white text-xs font-medium py-2.5 rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-1.5 backdrop-blur-sm"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Quick Add
            </button>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-[11px] text-neutral-400 tracking-wide uppercase mb-0.5">{category}</p>
          <h3 className="font-medium text-sm leading-snug group-hover:underline underline-offset-2 decoration-neutral-300 line-clamp-2">
            {name}
          </h3>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="font-semibold text-sm">{formatPrice(price)}</span>
            {isOnSale && (
              <span className="text-xs text-neutral-400 line-through">{formatPrice(comparePrice!)}</span>
            )}
          </div>
          {variants && variants.length > 1 && (
            <p className="text-[11px] text-neutral-400 mt-1">
              {variants.length} variants
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
