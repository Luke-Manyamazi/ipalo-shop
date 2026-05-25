"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCartStore();
  const total = subtotal();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-[2px] animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
            <span className="font-semibold text-base">Your Bag</span>
            {items.length > 0 && (
              <span className="text-xs text-neutral-400">
                ({items.length} {items.length === 1 ? "item" : "items"})
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="h-4.5 w-4.5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mb-4">
                <ShoppingBag className="h-7 w-7 text-neutral-300" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-base mb-1.5">Your bag is empty</h3>
              <p className="text-sm text-neutral-400 mb-6">
                Add something beautiful to get started.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {items.map((item) => (
                <li key={item.id} className="px-6 py-4">
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <Link href={`/product/${item.slug}`} onClick={closeCart} className="shrink-0">
                      <div className="relative h-[72px] w-[72px] bg-[#f4f1ec] rounded-lg overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="font-medium text-sm line-clamp-1 hover:underline underline-offset-2"
                      >
                        {item.name}
                      </Link>
                      {(item.size || item.color) && (
                        <p className="text-xs text-neutral-400 mt-0.5">
                          {[item.size, item.color].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      <p className="font-semibold text-sm mt-1">
                        {formatPrice(item.price * item.quantity)}
                      </p>

                      {/* Qty + Remove */}
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="w-7 h-7 flex items-center justify-center hover:bg-neutral-50 transition-colors disabled:opacity-30"
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-neutral-300 hover:text-red-400 transition-colors"
                          aria-label="Remove"
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
          <div className="border-t border-neutral-100 px-6 py-5 space-y-4 bg-white">
            {/* Totals */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Subtotal</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex items-center justify-center w-full h-12 bg-black text-white rounded-xl text-sm font-semibold hover:bg-neutral-800 transition-colors"
              >
                Checkout · {formatPrice(total)}
              </Link>
              <Link
                href="/shop"
                onClick={closeCart}
                className="flex items-center justify-center w-full h-10 border border-neutral-200 rounded-xl text-sm font-medium hover:border-black transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            <p className="text-center text-[11px] text-neutral-400">
              Free delivery on orders over R800
            </p>
          </div>
        )}
      </div>
    </>
  );
}
