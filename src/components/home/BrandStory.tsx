import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export function BrandStory() {
  return (
    <section className="py-20 lg:py-28 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image collage */}
          <div className="relative">
            <div className="aspect-square max-w-lg mx-auto lg:mx-0">
              <div className="grid grid-cols-2 gap-3 h-full">
                <div className="relative rounded-xl overflow-hidden col-span-2 row-span-1 h-64">
                  <Image
                    src="/logo-tote.png"
                    alt="ipalo tote bag"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-xl overflow-hidden h-48">
                  <Image
                    src="/logo-hoodie.png"
                    alt="ipalo hoodie"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-xl overflow-hidden h-48 bg-[#1a1a1a] flex items-center justify-center">
                  <div className="text-center px-4">
                    <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Zambian</p>
                    <p className="text-4xl font-bold mb-2">ipalo</p>
                    <p className="text-white/60 text-xs italic">&quot;a gift&quot;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-4 w-4 text-white/60" />
              <p className="text-xs tracking-[0.2em] uppercase text-white/60">Our Story</p>
            </div>

            <h2 className="text-4xl lg:text-5xl font-light leading-tight mb-6">
              A name that means<br />
              <span className="font-bold italic">everything.</span>
            </h2>

            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                Ipalo is a Zambian name that carries the most beautiful meaning —
                <strong className="text-white"> &quot;a gift&quot;</strong>. It&apos;s the name we gave our
                daughter, now 4 years old, and the name that inspired this brand.
              </p>
              <p>
                What started as a desire to create branded baby clothing for her grew
                into something bigger — a lifestyle brand that celebrates every precious
                moment and every beautiful person in your life.
              </p>
              <p>
                Because some things are <em className="text-white">more than just things</em>.
                They&apos;re memories. They&apos;re love. They&apos;re gifts.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
              <div>
                <p className="text-2xl font-bold mb-1">2024</p>
                <p className="text-xs text-white/50">Founded with love</p>
              </div>
              <div>
                <p className="text-2xl font-bold mb-1">SA</p>
                <p className="text-xs text-white/50">Proudly local brand</p>
              </div>
              <div>
                <p className="text-2xl font-bold mb-1">∞</p>
                <p className="text-xs text-white/50">Gifts that last</p>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 text-white border-b border-white/30 hover:border-white pb-0.5 text-sm font-medium transition-colors group"
            >
              Read the full story
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
