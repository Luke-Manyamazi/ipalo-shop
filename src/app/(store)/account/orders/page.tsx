import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, ArrowLeft, ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AccountOrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?from=/account/orders");
  }

  // Orders will be fetched from DB here in a future update
  const orders: never[] = [];

  return (
    <div className="bg-white min-h-[70vh]">
      {/* Header */}
      <section className="bg-[#f8f5f0] px-4 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-[#0a0a0a] transition-colors mb-5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to account
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-[#e5e5e5] flex items-center justify-center">
              <Package className="h-4 w-4 text-[#c9a96e]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-[#0a0a0a]">
              Your Orders
            </h1>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        {orders.length === 0 ? (
          /* Empty state */
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-[#f8f5f0] flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="h-7 w-7 text-[#c9a96e]" />
            </div>
            <h2 className="text-lg font-semibold text-[#0a0a0a] mb-2">
              No orders yet
            </h2>
            <p className="text-sm text-neutral-500 mb-8 leading-relaxed max-w-xs mx-auto">
              When you place your first order, it will appear here so you can
              track it.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-[#c9a96e] transition-colors duration-300"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          /* Orders list — will be rendered once DB is connected */
          <div className="space-y-4">
            {orders.map((order: never) => (
              <div
                key={(order as { id: string }).id}
                className="border border-[#e5e5e5] rounded-2xl p-5"
              >
                {/* Order row placeholder */}
                <p className="text-sm text-neutral-500">Order details</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
