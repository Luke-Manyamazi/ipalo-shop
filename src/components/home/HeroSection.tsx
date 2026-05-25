"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-[#f8f5f0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-center min-h-[88vh] py-20 lg:py-16">

          {/* ── Text content ──────────────────────────────────── */}
          <div className="order-2 lg:order-1 animate-fade-up">

            {/* Label */}
            <div className="flex items-center gap-3 mb-10">
              <span className="h-px w-10 bg-black/25" />
              <span className="text-[11px] tracking-[0.22em] uppercase text-neutral-500 font-medium">
                New Collection · 2024/25
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-light tracking-tight leading-[1.02] mb-8">
              <span className="block text-[clamp(2.6rem,6.5vw,5rem)]">it&apos;s more</span>
              <span className="block text-[clamp(2.6rem,6.5vw,5rem)]">than a</span>
              <span
                className="block italic text-[clamp(3rem,7.5vw,6rem)] text-[#0a0a0a]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                gift.
              </span>
            </h1>

            {/* Body */}
            <p className="text-neutral-600 text-base lg:text-[1.0625rem] leading-[1.75] mb-10 max-w-[380px]">
              ipalo — a Zambian name meaning{" "}
              <span className="font-semibold text-black">&quot;a gift&quot;</span>. Born from love,
              designed for life. Premium clothing &amp; lifestyle pieces for every beautiful moment.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-14">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2.5 bg-black text-white px-7 py-3.5 rounded-lg text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors group"
              >
                Shop Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-7 py-3.5 rounded-lg text-sm font-medium tracking-wide border border-black/20 hover:border-black transition-colors"
              >
                Our Story
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 sm:gap-12 pt-8 border-t border-black/10">
              {[
                { n: "500+",  label: "Happy customers" },
                { n: "9",     label: "SA provinces" },
                { n: "100%",  label: "Quality guaranteed" },
              ].map(({ n, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold leading-none mb-1">{n}</p>
                  <p className="text-[11px] text-neutral-500 tracking-wide uppercase">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Product image ──────────────────────────────────── */}
          <div className="order-1 lg:order-2 relative">

            {/* Main card */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#e8e0d4]">
              <Image
                src="/logo-tee.png"
                alt="ipalo Signature Tee"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 80vw, 480px"
              />

              {/* Chip — top right */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md">
                <p className="text-[10px] text-neutral-500 tracking-widest uppercase mb-0.5">New In</p>
                <p className="text-sm font-semibold">Tees &amp; Tops</p>
              </div>

              {/* Bottom gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-6 pb-6 pt-14">
                <p className="text-white/65 text-[10px] tracking-widest uppercase mb-1">
                  Signature Collection
                </p>
                <p className="text-white text-lg font-light">Classic Logo Tee</p>
              </div>
            </div>

            {/* Accent card — bottom left */}
            <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-xl overflow-hidden bg-[#e8e0d4] shadow-xl hidden lg:block ring-4 ring-[#f8f5f0]">
              <Image
                src="/logo-hoodie.png"
                alt="ipalo Hoodie"
                fill
                className="object-cover"
                sizes="144px"
              />
            </div>

            {/* Brand pill — top right of section */}
            <div className="absolute -top-4 -right-4 hidden lg:flex items-center gap-1.5 bg-black text-white text-[10px] tracking-[0.18em] uppercase font-medium px-4 py-2 rounded-full shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
              ipalo™
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
