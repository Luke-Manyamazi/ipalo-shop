import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandStory() {
  return (
    <section className="py-24 lg:py-32 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image collage */}
          <div className="relative max-w-lg mx-auto lg:mx-0 w-full">
            <div className="grid grid-cols-2 gap-3">
              {/* Wide top image */}
              <div className="col-span-2 relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#1c1c1c]">
                <Image
                  src="/logo-tote.png"
                  alt="ipalo tote bag"
                  fill
                  className="object-cover opacity-90"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Left bottom */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#1c1c1c]">
                <Image
                  src="/logo-hoodie.png"
                  alt="ipalo hoodie"
                  fill
                  className="object-cover opacity-90"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              {/* Right bottom — brand word card */}
              <div className="relative aspect-square rounded-2xl bg-[#1a1a1a] border border-white/5 flex flex-col items-center justify-center gap-2 px-4">
                <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase">Zambian</p>
                <p
                  className="text-5xl text-white/90 leading-none italic"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  ipalo
                </p>
                <p className="text-white/40 text-xs italic">&quot;a gift&quot;</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-white/40 font-medium mb-6">
              Our Story
            </p>

            <h2
              className="text-4xl lg:text-5xl font-light leading-[1.1] mb-8 text-white"
            >
              A name that means{" "}
              <span
                className="italic"
                style={{ fontFamily: "var(--font-display)" }}
              >
                everything.
              </span>
            </h2>

            <div className="space-y-5 text-white/65 leading-relaxed text-[0.9375rem]">
              <p>
                Ipalo is a Zambian name that carries the most beautiful meaning —{" "}
                <span className="text-white font-medium">&quot;a gift&quot;</span>. It&apos;s the name we
                gave our daughter, now 4 years old, and the name that inspired this brand.
              </p>
              <p>
                What started as a desire to create branded baby clothing for her grew into something
                bigger — a lifestyle brand that celebrates every precious moment and every beautiful
                person in your life.
              </p>
              <p>
                Because some things are{" "}
                <em className="text-white not-italic font-medium">more than just things</em>.
                They&apos;re memories. They&apos;re love. They&apos;re gifts.
              </p>
            </div>

            {/* Mini stats */}
            <div className="mt-10 pt-10 border-t border-white/10 grid grid-cols-3 gap-6">
              {[
                { stat: "2024", sub: "Founded with love" },
                { stat: "SA",   sub: "Proudly local brand" },
                { stat: "∞",    sub: "Gifts that last" },
              ].map(({ stat, sub }) => (
                <div key={stat}>
                  <p className="text-2xl font-bold mb-1">{stat}</p>
                  <p className="text-[11px] text-white/40 uppercase tracking-wide">{sub}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-10 text-white/80 hover:text-white text-sm font-medium border-b border-white/25 hover:border-white pb-0.5 transition-colors group"
            >
              Read the full story
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
