"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] bg-[#f8f5f0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[85vh] lg:min-h-[90vh] py-16 lg:py-0">

          {/* Text Content */}
          <div className="order-2 lg:order-1 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-black/5 rounded-full px-4 py-1.5 text-xs tracking-widest uppercase font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
              New Collection Available
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-none mb-6">
              it&apos;s more<br />
              <span className="font-bold">than a</span><br />
              <span className="italic font-light">gift.</span>
            </h1>

            <p className="text-neutral-600 text-lg leading-relaxed mb-8 max-w-md">
              ipalo — a Zambian name meaning{" "}
              <em className="not-italic font-medium text-black">&quot;a gift&quot;</em>. Born from love
              and designed for life. Premium clothing & lifestyle pieces for every
              beautiful moment.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-black text-white px-7 py-3.5 rounded-md text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors group"
              >
                Shop Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-black/20 text-black px-7 py-3.5 rounded-md text-sm font-medium tracking-wide hover:border-black transition-colors"
              >
                Our Story
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-black/10">
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-xs text-neutral-500 tracking-wide">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold">9</p>
                <p className="text-xs text-neutral-500 tracking-wide">SA Provinces Delivered</p>
              </div>
              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs text-neutral-500 tracking-wide">Quality Guaranteed</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#e8e0d4]">
              <Image
                src="/logo-tee.png"
                alt="ipalo tee — it's more than a gift"
                fill
                className="object-cover"
                priority
              />

              {/* Floating badge */}
              <div className="absolute top-4 right-4 bg-white rounded-xl px-4 py-3 shadow-lg">
                <p className="text-[10px] text-neutral-500 tracking-widest uppercase">New In</p>
                <p className="text-sm font-bold">Tees & Tops</p>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-white/70 text-xs tracking-widest uppercase mb-1">Signature Collection</p>
                <p className="text-white text-xl font-light">Classic Logo Tee</p>
              </div>
            </div>

            {/* Accent image */}
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-xl overflow-hidden bg-[#e8e0d4] shadow-xl hidden lg:block">
              <Image
                src="/logo-hoodie.png"
                alt="ipalo hoodie"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
