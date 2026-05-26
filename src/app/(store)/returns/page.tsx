import type { Metadata } from "next";
import Link from "next/link";
import {
  RotateCcw,
  CheckCircle,
  XCircle,
  Mail,
  RefreshCw,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description:
    "ipalo 30-day returns policy — how to return, exchange, and get your refund.",
};

export default function ReturnsPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#f8f5f0] px-4 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-4 font-medium">
            Returns
          </p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#0a0a0a]">
            Returns & Exchanges
          </h1>
          <p className="mt-4 text-neutral-500 text-base leading-relaxed">
            We want you to love what you receive. If something&apos;s not right,
            we&apos;ll make it right.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16 sm:py-20 space-y-14">
        {/* 30-day policy highlight */}
        <div className="flex items-center gap-4 bg-[#c9a96e]/8 border border-[#c9a96e]/30 rounded-2xl px-6 py-5">
          <RotateCcw className="h-6 w-6 text-[#c9a96e] flex-shrink-0" />
          <p className="text-sm text-[#0a0a0a] font-medium">
            <span className="text-[#c9a96e]">30-day returns</span> — from the
            date your order is delivered.
          </p>
        </div>

        {/* Return conditions */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <CheckCircle className="h-5 w-5 text-[#c9a96e]" />
            <h2 className="text-xl font-semibold text-[#0a0a0a] tracking-tight">
              Return conditions
            </h2>
          </div>
          <p className="text-sm text-neutral-500 mb-5 leading-relaxed">
            To be eligible for a return, items must meet all of the following
            conditions:
          </p>
          <ul className="space-y-3">
            {[
              "Unworn and unwashed — in the same condition as when received",
              "Original tags still attached",
              "Returned in the original packaging",
              "Returned within 30 days of delivery",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-[#c9a96e] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-neutral-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* How to return */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Mail className="h-5 w-5 text-[#c9a96e]" />
            <h2 className="text-xl font-semibold text-[#0a0a0a] tracking-tight">
              How to return
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                step: "01",
                title: "Email us",
                desc: (
                  <>
                    Send an email to{" "}
                    <a
                      href="mailto:hello@ipalo.co.za"
                      className="text-[#c9a96e] hover:underline"
                    >
                      hello@ipalo.co.za
                    </a>{" "}
                    with your order number and the reason for your return.
                  </>
                ),
              },
              {
                step: "02",
                title: "Receive instructions",
                desc: "We'll reply within 1–2 business days with your return instructions and, where applicable, a return address.",
              },
              {
                step: "03",
                title: "Ship it back",
                desc: "Package your item securely and send it using a tracked courier. Return shipping costs are the responsibility of the customer unless the item is faulty.",
              },
              {
                step: "04",
                title: "We process your return",
                desc: "Once we receive and inspect the item, we'll issue your refund or exchange within 5–7 business days.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="flex gap-5 bg-[#f8f5f0] rounded-2xl p-5"
              >
                <span className="text-[#c9a96e] font-light text-lg w-8 flex-shrink-0">
                  {s.step}
                </span>
                <div>
                  <p className="font-medium text-[#0a0a0a] mb-1">{s.title}</p>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exchanges */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <RefreshCw className="h-5 w-5 text-[#c9a96e]" />
            <h2 className="text-xl font-semibold text-[#0a0a0a] tracking-tight">
              Exchanges
            </h2>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Need a different size or colour? Follow the same process as a return
            — email us with your order number and let us know what you&apos;d
            like instead. If the item is available, we&apos;ll arrange an
            exchange at no additional delivery charge on the replacement item.
          </p>
        </div>

        {/* Non-returnable */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <XCircle className="h-5 w-5 text-neutral-400" />
            <h2 className="text-xl font-semibold text-[#0a0a0a] tracking-tight">
              Non-returnable items
            </h2>
          </div>
          <div className="rounded-2xl border border-[#e5e5e5] p-6">
            <ul className="space-y-3">
              {[
                "Sale items — all sale purchases are final",
                "Gift sets — once opened, gift sets cannot be returned",
                "Items returned after 30 days",
                "Items not in original condition (worn, washed, or damaged)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <XCircle className="h-4 w-4 text-neutral-300 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-neutral-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Refund timeline */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Clock className="h-5 w-5 text-[#c9a96e]" />
            <h2 className="text-xl font-semibold text-[#0a0a0a] tracking-tight">
              Refund timeline
            </h2>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Approved refunds are processed within{" "}
            <strong className="text-[#0a0a0a]">5 – 7 business days</strong>{" "}
            after we receive and inspect your returned item. Refunds are issued
            to your original payment method. Bank processing times may add
            additional days depending on your provider.
          </p>
        </div>

        {/* Still have questions */}
        <div className="bg-[#f8f5f0] rounded-2xl p-6 text-center">
          <p className="text-sm text-neutral-600 mb-3">
            Still have questions about a return?
          </p>
          <a
            href="mailto:hello@ipalo.co.za"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#c9a96e] hover:underline"
          >
            <Mail className="h-4 w-4" />
            hello@ipalo.co.za
          </a>
        </div>
      </section>
    </div>
  );
}
