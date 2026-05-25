"use client";

import { useState } from "react";
import { ShoppingBag, Heart, Share2, Star, Truck, Shield, RefreshCcw } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Variant {
  id: string;
  size?: string | null;
  color?: string | null;
  stock: number;
  price?: number | null;
}

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    comparePrice?: number | null;
    sku?: string | null;
    weight?: number | null;
    images: string[];
    tags: string[];
    featured: boolean;
    category: { name: string; slug: string };
    variants: Variant[];
    reviews: { rating: number }[];
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const price = selectedVariant?.price
    ? Number(selectedVariant.price)
    : Number(product.price);
  const isOnSale = product.comparePrice && Number(product.comparePrice) > price;
  const stock = selectedVariant?.stock ?? 0;
  const isOutOfStock = stock === 0;

  // Get unique sizes and colors
  const sizes = [...new Set(product.variants.map((v) => v.size).filter(Boolean))];
  const colors = [...new Set(product.variants.map((v) => v.color).filter(Boolean))];

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
      : null;

  const handleAddToCart = () => {
    if (!selectedVariant || isOutOfStock) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0] || "/logo-tee.png",
      price,
      size: selectedVariant.size ?? undefined,
      color: selectedVariant.color ?? undefined,
      quantity,
      stock,
    });
    toast.success(`${product.name} added to bag 🖤`);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-neutral-500 space-x-2">
        <span>Home</span>
        <span>/</span>
        <span>{product.category.name}</span>
        <span>/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      {/* Title */}
      <div>
        {product.featured && (
          <Badge className="mb-2">Featured</Badge>
        )}
        <h1 className="text-2xl lg:text-3xl font-light tracking-tight mb-2">
          {product.name}
        </h1>

        {/* Rating */}
        {avgRating && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-3.5 w-3.5",
                    star <= Math.round(avgRating)
                      ? "fill-black text-black"
                      : "text-neutral-300"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-neutral-500">
              ({product.reviews.length} reviews)
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-semibold">{formatPrice(price)}</span>
          {isOnSale && (
            <>
              <span className="text-lg text-neutral-400 line-through">
                {formatPrice(Number(product.comparePrice))}
              </span>
              <Badge variant="destructive">
                -{Math.round(((Number(product.comparePrice) - price) / Number(product.comparePrice)) * 100)}% OFF
              </Badge>
            </>
          )}
        </div>
      </div>

      {/* Variants */}
      {sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">
              Size:{" "}
              <span className="font-normal text-neutral-600">
                {selectedVariant?.size}
              </span>
            </p>
            <button className="text-xs text-neutral-500 underline hover:text-black">
              Size Guide
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => {
              const variant = product.variants.find(
                (v) =>
                  v.size === size &&
                  (!selectedVariant?.color || v.color === selectedVariant.color)
              );
              const outOfStock = !variant || variant.stock === 0;
              const isSelected = selectedVariant?.size === size;

              return (
                <button
                  key={size}
                  onClick={() => variant && setSelectedVariant(variant)}
                  disabled={outOfStock}
                  className={cn(
                    "h-9 min-w-[36px] px-3 text-sm rounded-md border transition-all",
                    isSelected
                      ? "border-black bg-black text-white"
                      : "border-[#e5e5e5] hover:border-black",
                    outOfStock && "opacity-40 cursor-not-allowed line-through"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color */}
      {colors.length > 1 && (
        <div>
          <p className="text-sm font-medium mb-2">
            Color:{" "}
            <span className="font-normal text-neutral-600">{selectedVariant?.color}</span>
          </p>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => {
              const variant = product.variants.find((v) => v.color === color);
              const isSelected = selectedVariant?.color === color;
              return (
                <button
                  key={color}
                  onClick={() => variant && setSelectedVariant(variant)}
                  className={cn(
                    "h-9 px-4 text-sm rounded-md border transition-all",
                    isSelected
                      ? "border-black bg-black text-white"
                      : "border-[#e5e5e5] hover:border-black"
                  )}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Stock indicator */}
      {!isOutOfStock && stock <= 5 && (
        <p className="text-xs text-amber-600 font-medium">
          ⚡ Only {stock} left in stock
        </p>
      )}

      {/* Quantity + Add to Cart */}
      <div className="flex gap-3">
        {/* Quantity */}
        <div className="flex items-center border border-[#e5e5e5] rounded-md">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 hover:bg-[#f8f5f0] transition-colors text-lg"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
            disabled={quantity >= stock}
            className="px-3 py-2 hover:bg-[#f8f5f0] transition-colors text-lg disabled:opacity-40"
          >
            +
          </button>
        </div>

        <Button
          size="lg"
          className="flex-1"
          onClick={handleAddToCart}
          disabled={isOutOfStock || !selectedVariant}
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          {isOutOfStock ? "Out of Stock" : "Add to Bag"}
        </Button>

        <button
          className="p-3 border border-[#e5e5e5] rounded-md hover:border-black hover:bg-[#f8f5f0] transition-all"
          aria-label="Save to wishlist"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* Description */}
      <div className="pt-4 border-t border-[#e5e5e5]">
        <h3 className="text-sm font-semibold mb-2">About this piece</h3>
        <p className="text-sm text-neutral-600 leading-relaxed">{product.description}</p>
        {product.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-3">
            {product.tags.map((tag) => (
              <span key={tag} className="text-xs text-neutral-400 bg-[#f8f5f0] px-2 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
        {product.sku && (
          <p className="text-xs text-neutral-400 mt-2">SKU: {product.sku}</p>
        )}
      </div>

      {/* Delivery & Returns */}
      <div className="space-y-3 pt-4 border-t border-[#e5e5e5]">
        <div className="flex items-start gap-3 text-sm">
          <Truck className="h-4 w-4 mt-0.5 flex-shrink-0 text-neutral-500" />
          <div>
            <p className="font-medium">Delivery across South Africa</p>
            <p className="text-neutral-500 text-xs mt-0.5">
              3–7 business days via The Courier Guy. Free on orders over R800.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <RefreshCcw className="h-4 w-4 mt-0.5 flex-shrink-0 text-neutral-500" />
          <div>
            <p className="font-medium">30-day returns</p>
            <p className="text-neutral-500 text-xs mt-0.5">
              Unused items in original packaging. Contact us to initiate a return.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <Shield className="h-4 w-4 mt-0.5 flex-shrink-0 text-neutral-500" />
          <div>
            <p className="font-medium">Secure checkout</p>
            <p className="text-neutral-500 text-xs mt-0.5">
              PayFast encrypted payment. Cards, EFT, SnapScan, Zapper.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
