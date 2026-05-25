"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, CheckCircle } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // TODO: connect to API
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#f8f5f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative aspect-[16/9] lg:aspect-auto lg:h-80 rounded-2xl overflow-hidden">
            <Image
              src="/logo-tote.png"
              alt="ipalo lifestyle"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <Image
                src="/logo-full.png"
                alt="ipalo"
                width={100}
                height={35}
                className="invert"
              />
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="inline-flex items-center gap-2 bg-black/5 rounded-full px-4 py-1.5 text-xs tracking-widest uppercase font-medium mb-5">
              <Mail className="h-3 w-3" />
              Stay Connected
            </div>
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-4">
              Be part of the<br />
              <span className="font-bold">ipalo family</span>
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Subscribe for exclusive access to new arrivals, limited drops,
              brand stories and special offers. No spam, ever — just the good stuff.
            </p>

            {submitted ? (
              <div className="flex items-center gap-3 bg-black text-white rounded-lg px-5 py-4">
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">You&apos;re in!</p>
                  <p className="text-white/70 text-xs mt-0.5">
                    Welcome to the ipalo family. Watch your inbox.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 h-11 px-4 text-sm border border-[#e5e5e5] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all"
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
