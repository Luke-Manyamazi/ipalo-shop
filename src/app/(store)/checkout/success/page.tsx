"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo-full.png"
            alt="ipalo"
            width={120}
            height={42}
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-semibold mb-3">Order Confirmed!</h1>
        <p className="text-neutral-600 leading-relaxed mb-2">
          Thank you for your order. We&apos;ve received your payment and your items are
          being prepared for dispatch.
        </p>
        {orderNumber && (
          <p className="text-sm text-neutral-500 mb-6">
            Order reference:{" "}
            <span className="font-mono font-semibold text-black">{orderNumber}</span>
          </p>
        )}

        {/* What happens next */}
        <div className="bg-white rounded-2xl p-6 text-left mb-6 space-y-4">
          <h2 className="font-semibold text-sm">What happens next?</h2>
          {[
            {
              icon: "📧",
              title: "Confirmation email",
              description: "You'll receive an order confirmation with your receipt.",
            },
            {
              icon: "📦",
              title: "Order processing",
              description: "We'll prepare and pack your order within 1-2 business days.",
            },
            {
              icon: "🚚",
              title: "Courier pickup",
              description: "The Courier Guy will collect and deliver to your door.",
            },
          ].map((step) => (
            <div key={step.title} className="flex items-start gap-3">
              <span className="text-xl">{step.icon}</span>
              <div>
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs text-neutral-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="space-y-3">
          <Button className="w-full" size="lg" asChild>
            <Link href="/shop">
              Continue Shopping <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/account/orders">Track My Order</Link>
          </Button>
        </div>

        <p className="text-xs text-neutral-400 mt-6">
          Questions? Email us at{" "}
          <a href="mailto:hello@ipalo.co.za" className="underline hover:text-black">
            hello@ipalo.co.za
          </a>
        </p>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
