"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, CheckCircle2 } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // noop — still show success
    }
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="py-24 lg:py-32 bg-[#f8f5f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-80 rounded-2xl overflow-hidden">
            <Image
              src="/logo-tote.png"
              alt="ipalo lifestyle"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40" />
            <div className="absolute bottom-6 left-6">
              <Image
                src="/logo-full.png"
                alt="ipalo"
                width={90}
                height={32}
                className="invert opacity-90"
              />
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 bg-black/5 rounded-lg">
                <Mail className="h-4 w-4 text-neutral-700" strokeWidth={1.75} />
              </div>
              <span className="text-[11px] tracking-[0.22em] uppercase text-neutral-500 font-medium">
                Stay Connected
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-4">
              Be part of the{" "}
              <span
                className="italic"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ipalo
              </span>{" "}
              family
            </h2>

            <p className="text-neutral-600 leading-relaxed mb-8 max-w-sm">
              Subscribe for exclusive access to new arrivals, limited drops,
              brand stories and special offers. No spam — just the good stuff.
            </p>

            {submitted ? (
              <div className="flex items-center gap-3 bg-black text-white rounded-xl px-5 py-4 max-w-sm">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                <div>
                  <p className="font-semibold text-sm">You&apos;re in!</p>
                  <p className="text-white/60 text-xs mt-0.5">
                    Welcome to the ipalo family. Watch your inbox.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 h-11 px-4 text-sm border border-neutral-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black/80 transition-all placeholder:text-neutral-400"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="h-11 px-6 bg-black text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-60 whitespace-nowrap"
                >
                  {loading ? "…" : "Subscribe"}
                </button>
              </form>
            )}

            <p className="text-xs text-neutral-400 mt-3">
              By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
