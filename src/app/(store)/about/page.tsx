import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "ipalo — a Zambian name meaning 'a gift'. Learn the story behind the brand.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#f8f5f0] px-4 py-24 sm:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-6 font-medium">
            Our Story
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#0a0a0a] leading-tight">
            Born from a name,{" "}
            <span
              className="italic text-[#c9a96e]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              built on love
            </span>
          </h1>
        </div>
      </section>

      {/* Story body */}
      <section className="max-w-2xl mx-auto px-4 py-20 sm:py-24">
        <div className="space-y-8 text-[#0a0a0a]">
          <p className="text-lg sm:text-xl font-light leading-relaxed">
            The word{" "}
            <em
              className="not-italic font-medium text-[#c9a96e]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ipalo
            </em>{" "}
            comes from a Zambian dialect. It means{" "}
            <em
              className="italic"
              style={{ fontFamily: "var(--font-display)" }}
            >
              a gift
            </em>
            . Not a gift in the transactional sense — a gift that carries
            weight. One that says: I thought of you. I chose this for you.
          </p>

          <p className="text-base sm:text-lg font-light leading-relaxed text-neutral-600">
            The brand started from a simple belief: that the things we give and
            wear should mean something. Too much of what we buy is forgotten.
            Worn once, washed too many times, and quietly replaced. We wanted to
            make something different — pieces that feel considered, that hold up,
            and that people actually reach for again and again.
          </p>

          <p className="text-base sm:text-lg font-light leading-relaxed text-neutral-600">
            Every ipalo piece is designed with intention — clean lines, quality
            materials, and a quiet confidence that doesn&apos;t need to shout.
            Whether it&apos;s a gift for someone you love, or something you
            treat yourself to, it should feel worth keeping.
          </p>

          <p className="text-base sm:text-lg font-light leading-relaxed text-neutral-600">
            We&apos;re proudly South African. Designed, curated, and delivered
            across the country — from Cape Town to Limpopo. We&apos;re small
            enough to care, and committed enough to get it right.
          </p>
        </div>

        <div className="mt-12 pt-12 border-t border-neutral-100">
          <p
            className="text-2xl sm:text-3xl italic font-light text-[#0a0a0a] text-center leading-snug"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;Every piece is designed to be worn, kept, and remembered.&rdquo;
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#f8f5f0] px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-2 font-medium text-center">
            What we stand for
          </p>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-center mb-12 text-[#0a0a0a]">
            Our values
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {/* Value 1 */}
            <div className="bg-white rounded-2xl p-8 border border-[#e5e5e5]">
              <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mb-6">
                <span className="text-[#c9a96e] text-lg font-light">01</span>
              </div>
              <h3 className="font-semibold text-[#0a0a0a] mb-3 tracking-tight">
                Quality First
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                We choose premium materials and construction that hold up. Every
                piece is built to last — not just to look good on the first wear.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-2xl p-8 border border-[#e5e5e5]">
              <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mb-6">
                <span className="text-[#c9a96e] text-lg font-light">02</span>
              </div>
              <h3 className="font-semibold text-[#0a0a0a] mb-3 tracking-tight">
                More Than a Gift
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Every purchase tells a story. When you give{" "}
                <em style={{ fontFamily: "var(--font-display)" }}>ipalo</em>,
                you&apos;re giving something that was chosen, not just bought.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-2xl p-8 border border-[#e5e5e5]">
              <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mb-6">
                <span className="text-[#c9a96e] text-lg font-light">03</span>
              </div>
              <h3 className="font-semibold text-[#0a0a0a] mb-3 tracking-tight">
                South African Crafted
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Designed and delivered across SA. We&apos;re rooted here — and
                proud of it. Every order is packed with care and shipped to your
                door nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#0a0a0a] mb-4">
            Ready to find something{" "}
            <span
              className="italic text-[#c9a96e]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              worth keeping?
            </span>
          </h2>
          <p className="text-neutral-500 mb-8 text-sm leading-relaxed">
            Browse our full collection — clothing, accessories, and gifts,
            delivered across South Africa.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#c9a96e] transition-colors duration-300"
          >
            Shop the Collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
