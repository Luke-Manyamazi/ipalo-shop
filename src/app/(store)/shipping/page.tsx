import type { Metadata } from "next";
import { Truck, Package, Clock, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description:
    "Delivery zones, rates, and timelines for ipalo orders across South Africa.",
};

const zones = [
  { region: "Gauteng", rate: "R65", days: "1 – 3 business days" },
  { region: "Western Cape", rate: "R95", days: "2 – 4 business days" },
  { region: "KwaZulu-Natal", rate: "R85", days: "2 – 4 business days" },
  { region: "Eastern Cape", rate: "R110", days: "3 – 5 business days" },
  {
    region: "Limpopo / Mpumalanga / North West",
    rate: "R105",
    days: "3 – 6 business days",
  },
  { region: "Free State", rate: "R95", days: "2 – 5 business days" },
  { region: "Northern Cape", rate: "R130", days: "4 – 7 business days" },
];

const faqs = [
  {
    q: "Which courier do you use?",
    a: "We ship all orders via The Courier Guy — a reliable, track-and-trace service trusted across South Africa.",
  },
  {
    q: "Can I change my delivery address after placing an order?",
    a: "If your order hasn't been dispatched yet, email us at hello@ipalo.co.za immediately with your order number and the updated address. We'll do our best to update it before it ships.",
  },
  {
    q: "Do you ship internationally?",
    a: "We currently deliver within South Africa only. International shipping is on our roadmap — stay tuned.",
  },
];

export default function ShippingPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#f8f5f0] px-4 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-4 font-medium">
            Delivery
          </p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#0a0a0a]">
            Shipping & Delivery
          </h1>
          <p className="mt-4 text-neutral-500 text-base leading-relaxed">
            We deliver across South Africa. Here&apos;s everything you need to
            know about getting your order to your door.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 sm:py-20 space-y-16">
        {/* Free delivery highlight */}
        <div className="flex items-center gap-4 bg-[#c9a96e]/8 border border-[#c9a96e]/30 rounded-2xl px-6 py-5">
          <Truck className="h-6 w-6 text-[#c9a96e] flex-shrink-0" />
          <p className="text-sm text-[#0a0a0a] font-medium">
            <span className="text-[#c9a96e]">Free delivery</span> on all orders
            over{" "}
            <span className="text-[#c9a96e]">R800</span> — nationwide.
          </p>
        </div>

        {/* Delivery zones table */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Truck className="h-5 w-5 text-[#c9a96e]" />
            <h2 className="text-xl font-semibold text-[#0a0a0a] tracking-tight">
              Delivery zones & rates
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#e5e5e5]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f8f5f0] border-b border-[#e5e5e5]">
                  <th className="text-left px-6 py-4 font-medium text-neutral-600 uppercase tracking-wider text-xs">
                    Region
                  </th>
                  <th className="text-left px-6 py-4 font-medium text-neutral-600 uppercase tracking-wider text-xs">
                    Rate
                  </th>
                  <th className="text-left px-6 py-4 font-medium text-neutral-600 uppercase tracking-wider text-xs">
                    Estimated delivery
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f0]">
                {zones.map((z) => (
                  <tr
                    key={z.region}
                    className="hover:bg-[#fafafa] transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-[#0a0a0a]">
                      {z.region}
                    </td>
                    <td className="px-6 py-4 text-[#c9a96e] font-semibold">
                      {z.rate}
                    </td>
                    <td className="px-6 py-4 text-neutral-500">{z.days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-neutral-400 mt-3 px-1">
            All delivery times are estimates and may vary during peak periods or
            public holidays.
          </p>
        </div>

        {/* Processing & tracking */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-[#f8f5f0] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-5 w-5 text-[#c9a96e]" />
              <h3 className="font-semibold text-[#0a0a0a]">
                Processing time
              </h3>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Orders are processed within{" "}
              <strong className="text-[#0a0a0a]">1 – 2 business days</strong>{" "}
              of payment confirmation. You&apos;ll receive an email with your
              tracking details once your order is dispatched.
            </p>
          </div>

          <div className="bg-[#f8f5f0] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-[#c9a96e]" />
              <h3 className="font-semibold text-[#0a0a0a]">
                Track your order
              </h3>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Once dispatched, you&apos;ll receive a tracking number via email.
              You can track your parcel directly on{" "}
              <a
                href="https://www.thecourierguy.co.za/track"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c9a96e] hover:underline"
              >
                The Courier Guy website
              </a>
              . You can also visit your{" "}
              <a href="/account/orders" className="text-[#c9a96e] hover:underline">
                order history
              </a>{" "}
              for a summary.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="h-5 w-5 text-[#c9a96e]" />
            <h2 className="text-xl font-semibold text-[#0a0a0a] tracking-tight">
              Delivery FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-[#e5e5e5] p-6"
              >
                <h4 className="font-medium text-[#0a0a0a] mb-2">{faq.q}</h4>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
