"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCartStore();
  const total = subtotal();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e5e5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="font-semibold text-lg">Your Bag</h2>
            {items.length > 0 && (
              <span className="text-xs text-neutral-500">({items.length} items)</span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-[#f8f5f0] rounded-md transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-8 text-center">
              <ShoppingBag className="h-16 w-16 text-neutral-200 mb-4" />
              <h3 className="font-medium text-lg mb-2">Your bag is empty</h3>
              <p className="text-sm text-neutral-500 mb-6">
                Add something beautiful to get started.
              </p>
              <Button onClick={closeCart} asChild>
                <Link href="/shop">Shop Now</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-0 divide-y divide-[#f0f0f0]">
              {items.map((item) => (
                <li key={item.id} className="px-6 py-4">
                  <div className="flex gap-4">
                    {/* Image */}
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="flex-shrink-0"
                    >
                      <div className="relative h-20 w-20 bg-[#f8f5f0] rounded-md overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="font-medium text-sm line-clamp-2 hover:underline"
                      >
                        {item.name}
                      </Link>
                      {(item.size || item.color) && (
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {[item.size, item.color].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      <p className="font-semibold text-sm mt-1">
                        {formatPrice(item.price * item.quantity)}
                      </p>

                      {/* Quantity & Remove */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#e5e5e5] rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-[#f8f5f0] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="p-1.5 hover:bg-[#f8f5f0] transition-colors disabled:opacity-40"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#e5e5e5] px-6 py-5 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-xs text-neutral-500">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout" onClick={closeCart}>
                  Checkout · {formatPrice(total)}
                </Link>
              </Button>
              <Button variant="outline" className="w-full" size="lg" asChild>
                <Link href="/cart" onClick={closeCart}>
                  View Bag
                </Link>
              </Button>
            </div>

            <p className="text-center text-xs text-neutral-400">
              Free delivery on orders over R800
            </p>
          </div>
        )}
      </div>
    </>
  );
}
