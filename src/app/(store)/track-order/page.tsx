"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Package, Mail } from "lucide-react";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "not-found">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate lookup — connect to API later
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("not-found");
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#f8f5f0] px-4 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-4 font-medium">
            Tracking
          </p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#0a0a0a]">
            Track your order
          </h1>
          <p className="mt-4 text-neutral-500 text-base leading-relaxed">
            Enter your order number and email address to track your delivery.
          </p>
        </div>
      </section>

      <section className="max-w-xl mx-auto px-4 py-16 sm:py-20">
        <div className="bg-white rounded-2xl border border-[#e5e5e5] shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-[#c9a96e]/10 flex items-center justify-center">
              <Package className="h-4 w-4 text-[#c9a96e]" />
            </div>
            <h2 className="font-semibold text-[#0a0a0a] tracking-tight">
              Order lookup
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-2 uppercase tracking-wider">
                Order number
              </label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                required
                placeholder="IPL-XXXXXXXX"
                className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-white text-sm text-[#0a0a0a] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/30 focus:border-[#c9a96e] transition-colors font-mono"
              />
              <p className="text-xs text-neutral-400 mt-2">
                Order numbers start with{" "}
                <span className="font-mono font-medium text-neutral-600">
                  IPL-
                </span>{" "}
                and can be found in your confirmation email.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-2 uppercase tracking-wider">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-white text-sm text-[#0a0a0a] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/30 focus:border-[#c9a96e] transition-colors"
              />
            </div>

            {status === "not-found" && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                We couldn&apos;t find an order matching those details. Please
                check your order number and email and try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 bg-[#0a0a0a] text-white py-3.5 rounded-full text-sm font-medium hover:bg-[#c9a96e] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <span className="w-3.5 h-3.5 border border-white border-t-transparent rounded-full animate-spin" />
                  Looking up order…
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Track order
                </>
              )}
            </button>
          </form>
        </div>

        {/* Signed-in shortcut */}
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-500">
            Have an account?{" "}
            <Link
              href="/account/orders"
              className="text-[#c9a96e] hover:underline font-medium"
            >
              View your order history
            </Link>
          </p>
        </div>

        {/* Trouble */}
        <div className="mt-10 bg-[#f8f5f0] rounded-2xl p-6 text-center">
          <div className="w-9 h-9 rounded-full bg-white border border-[#e5e5e5] flex items-center justify-center mx-auto mb-3">
            <Mail className="h-4 w-4 text-[#c9a96e]" />
          </div>
          <h3 className="font-semibold text-[#0a0a0a] text-sm mb-1">
            Having trouble?
          </h3>
          <p className="text-xs text-neutral-500 mb-3 leading-relaxed">
            If you can&apos;t locate your order or tracking is not updating,
            reach out and we&apos;ll look into it for you.
          </p>
          <a
            href="mailto:hello@ipalo.co.za"
            className="text-sm text-[#c9a96e] hover:underline font-medium"
          >
            hello@ipalo.co.za
          </a>
        </div>
      </section>
    </div>
  );
}
