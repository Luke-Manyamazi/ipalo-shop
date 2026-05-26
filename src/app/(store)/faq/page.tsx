"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSection {
  section: string;
  items: FaqItem[];
}

const faqData: FaqSection[] = [
  {
    section: "Orders",
    items: [
      {
        q: "How do I track my order?",
        a: "Once your order is dispatched, you'll receive an email with a tracking number from The Courier Guy. You can use this number to track your parcel at thecourierguy.co.za. You can also view your order status in your account under Order History.",
      },
      {
        q: "Can I cancel or change my order?",
        a: "We begin processing orders quickly, so cancellations or changes must be requested immediately after placing your order. Email hello@ipalo.co.za with your order number as soon as possible. We can't guarantee changes once an order has been dispatched.",
      },
    ],
  },
  {
    section: "Products",
    items: [
      {
        q: "Are your products true to size?",
        a: "Our adult pieces are cut true to size. Kids' sizes run slightly large to allow for growing room. If you're between sizes, we generally recommend sizing up. See our full Size Guide for measurements.",
      },
      {
        q: "What materials do you use?",
        a: "We prioritise quality, natural-feel fabrics that are soft, breathable, and built to last. Specific material details for each product are listed on the individual product pages.",
      },
      {
        q: "How do I care for my ipalo pieces?",
        a: "Each item comes with a care label — follow those instructions for best results. As a general rule: cold or warm machine wash, inside out, and avoid tumble drying where possible. This keeps colours vibrant and fabrics in great condition.",
      },
    ],
  },
  {
    section: "Delivery",
    items: [
      {
        q: "How long does delivery take?",
        a: "Delivery times vary by province — typically 1–3 days for Gauteng and up to 4–7 days for more remote areas. Orders are processed within 1–2 business days before dispatch. See our full Shipping page for zone-specific timelines.",
      },
      {
        q: "Do you deliver internationally?",
        a: "We currently deliver within South Africa only. International shipping is something we're working on — sign up to our newsletter to be the first to know when it becomes available.",
      },
    ],
  },
  {
    section: "Returns",
    items: [
      {
        q: "What's your returns policy?",
        a: "We offer a 30-day returns policy from the date of delivery. Items must be unworn, unwashed, with original tags attached and in original packaging. Sale items and opened gift sets are non-returnable. See our Returns page for the full process.",
      },
      {
        q: "How long do refunds take?",
        a: "Once we receive and inspect your returned item, approved refunds are processed within 5–7 business days back to your original payment method. Bank processing times may vary.",
      },
    ],
  },
  {
    section: "Payments",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards (Visa, Mastercard), as well as secure online payments via our payment gateway. All prices are in South African Rand (ZAR).",
      },
      {
        q: "Is my payment secure?",
        a: "Yes. All payments are processed through a PCI-DSS compliant payment provider. Your card details are never stored on our servers. We use industry-standard SSL encryption across the entire checkout flow.",
      },
    ],
  },
];

function FaqItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#f0f0f0] last:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-[#0a0a0a] group-hover:text-[#c9a96e] transition-colors leading-snug">
          {item.q}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180 text-[#c9a96e]" : ""
          }`}
        />
      </button>
      {open && (
        <div className="pb-5 pr-8">
          <p className="text-sm text-neutral-500 leading-relaxed">{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#f8f5f0] px-4 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-4 font-medium">
            Help
          </p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#0a0a0a]">
            Frequently asked questions
          </h1>
          <p className="mt-4 text-neutral-500 text-base leading-relaxed">
            Can&apos;t find what you&apos;re looking for?{" "}
            <a
              href="/contact"
              className="text-[#c9a96e] hover:underline"
            >
              Get in touch
            </a>{" "}
            — we&apos;re happy to help.
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-16 sm:py-20">
        <div className="space-y-10">
          {faqData.map((section) => (
            <div key={section.section}>
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] font-medium mb-4">
                {section.section}
              </h2>
              <div className="rounded-2xl border border-[#e5e5e5] px-6">
                {section.items.map((item) => (
                  <FaqItem key={item.q} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still stuck */}
        <div className="mt-14 bg-[#f8f5f0] rounded-2xl p-8 text-center">
          <h3 className="font-semibold text-[#0a0a0a] mb-2">
            Still have a question?
          </h3>
          <p className="text-sm text-neutral-500 mb-5">
            Our team is here to help. Reach out and we&apos;ll respond within 24
            hours.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-[#c9a96e] transition-colors duration-300"
          >
            Contact us
          </a>
        </div>
      </section>
    </div>
  );
}
