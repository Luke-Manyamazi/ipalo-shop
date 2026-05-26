import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ipalo terms of service — governing the use of our website and services.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-base font-semibold text-[#0a0a0a] mb-3 tracking-tight">{title}</h2>
      <div className="text-sm text-neutral-600 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#f8f5f0] px-4 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-4 font-medium">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#0a0a0a]">
            Terms of Service
          </h1>
          <p className="mt-4 text-neutral-400 text-sm">Last updated: May 2026</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-20">
        <p className="text-sm text-neutral-600 leading-relaxed mb-10">
          By accessing or using the ipalo website (ipalo.co.za) or placing an
          order, you agree to be bound by these Terms of Service. Please read
          them carefully before using our site.
        </p>

        <Section title="1. Use of site">
          <p>
            You may use this website for lawful purposes only. You agree not to
            use it in any way that violates applicable laws, infringes on the
            rights of others, or could damage, disable, or impair the website or
            its services. ipalo reserves the right to restrict or terminate
            access at its discretion.
          </p>
        </Section>

        <Section title="2. Products and pricing">
          <p>
            All prices displayed on ipalo.co.za are in South African Rand (ZAR)
            and are inclusive of VAT where applicable. We reserve the right to
            change prices at any time without prior notice.
          </p>
          <p>
            Product descriptions and images are provided in good faith. We do
            not warrant that descriptions are entirely accurate, complete, or
            error-free. In the event of a significant error in pricing or
            description, we reserve the right to cancel an order and issue a
            full refund.
          </p>
        </Section>

        <Section title="3. Orders and payment">
          <p>
            Placing an order constitutes an offer to purchase. An order is only
            confirmed once payment has been successfully processed and you have
            received an order confirmation email. ipalo reserves the right to
            refuse or cancel any order at its discretion.
          </p>
          <p>
            Payments must be made in full at the time of ordering. We accept
            major credit and debit cards processed through our secure payment
            provider.
          </p>
        </Section>

        <Section title="4. Delivery and risk">
          <p>
            We will make every effort to dispatch orders within the processing
            times stated on our{" "}
            <Link href="/shipping" className="text-[#c9a96e] hover:underline">
              Shipping page
            </Link>
            . Delivery timeframes are estimates and not guaranteed.
          </p>
          <p>
            Risk of loss or damage to goods passes to you upon delivery. Once
            an order has been delivered to the address provided, ipalo is no
            longer responsible for it.
          </p>
        </Section>

        <Section title="5. Returns">
          <p>
            Returns and exchanges are subject to our{" "}
            <Link href="/returns" className="text-[#c9a96e] hover:underline">
              Returns Policy
            </Link>
            , which forms part of these terms. By purchasing from ipalo, you
            agree to the conditions set out in that policy.
          </p>
        </Section>

        <Section title="6. Intellectual property">
          <p>
            All content on ipalo.co.za — including the ipalo™ name and logo,
            photography, copy, and design — is the property of ipalo and is
            protected by applicable intellectual property laws. You may not
            reproduce, distribute, or use any content without prior written
            permission.
          </p>
          <p>
            ipalo™ is a trademark. Unauthorised use of the trademark or brand
            identity is strictly prohibited.
          </p>
        </Section>

        <Section title="7. Limitation of liability">
          <p>
            To the maximum extent permitted by law, ipalo shall not be liable
            for any indirect, incidental, or consequential damages arising from
            the use of our website or products. Our total liability in any matter
            shall not exceed the value of the order in question.
          </p>
        </Section>

        <Section title="8. Governing law">
          <p>
            These terms are governed by and construed in accordance with the laws
            of the Republic of South Africa. Any disputes arising from these terms
            or your use of our website shall be subject to the jurisdiction of
            the South African courts.
          </p>
        </Section>

        <Section title="9. Changes to these terms">
          <p>
            We reserve the right to update these Terms of Service at any time.
            Changes will be posted on this page with the updated date. Continued
            use of the site after any changes constitutes acceptance of the new
            terms.
          </p>
        </Section>

        <div className="mt-10 pt-8 border-t border-neutral-100 space-y-2">
          <p className="text-xs text-neutral-400">
            These terms were last updated in May 2026 and apply to all users of
            ipalo.co.za.
          </p>
          <p className="text-xs text-neutral-400">
            Questions?{" "}
            <a href="mailto:hello@ipalo.co.za" className="text-[#c9a96e] hover:underline">
              hello@ipalo.co.za
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
