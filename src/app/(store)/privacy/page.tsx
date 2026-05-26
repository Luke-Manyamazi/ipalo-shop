import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ipalo privacy policy — how we collect, use, and protect your data.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-base font-semibold text-[#0a0a0a] mb-3 tracking-tight">{title}</h2>
      <div className="text-sm text-neutral-600 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#f8f5f0] px-4 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-4 font-medium">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[#0a0a0a]">
            Privacy Policy
          </h1>
          <p className="mt-4 text-neutral-400 text-sm">Last updated: May 2026</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-20">
        <p className="text-sm text-neutral-600 leading-relaxed mb-10">
          At ipalo, we respect your privacy and are committed to protecting your
          personal information. This policy explains what data we collect, how
          we use it, and your rights as a user of our website and services.
        </p>

        <Section title="1. Information we collect">
          <p>
            We may collect the following types of personal information when you
            interact with ipalo:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong className="text-[#0a0a0a]">Account data</strong> — your
              name, email address, and password when you register an account.
            </li>
            <li>
              <strong className="text-[#0a0a0a]">Order data</strong> — billing
              address, delivery address, and purchase history when you place an
              order.
            </li>
            <li>
              <strong className="text-[#0a0a0a]">Browsing data</strong> — pages
              visited, time spent, and device information collected automatically
              via cookies and analytics tools.
            </li>
          </ul>
        </Section>

        <Section title="2. How we use your information">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>To process and fulfil your orders, including sending confirmation and tracking emails.</li>
            <li>To manage your account and provide customer support.</li>
            <li>To improve our website, products, and user experience.</li>
            <li>
              To send marketing communications — only with your explicit consent.
              You can unsubscribe at any time via the link in any email.
            </li>
            <li>To comply with legal obligations where required.</li>
          </ul>
        </Section>

        <Section title="3. Data sharing">
          <p>
            We do not sell, rent, or trade your personal information to third
            parties for marketing purposes. We only share data where necessary:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong className="text-[#0a0a0a]">Courier partners</strong> —
              your name and delivery address are shared with our courier (The
              Courier Guy) solely to fulfil your delivery.
            </li>
            <li>
              <strong className="text-[#0a0a0a]">Payment processors</strong> —
              payment details are handled directly by our PCI-compliant payment
              provider. We do not store card numbers.
            </li>
            <li>
              <strong className="text-[#0a0a0a]">Legal requirements</strong> —
              we may disclose information if required to do so by law or in
              response to valid legal requests.
            </li>
          </ul>
        </Section>

        <Section title="4. Cookies">
          <p>
            Our website uses cookies to improve your experience. These include
            essential cookies (required for the site to function), analytics
            cookies (to understand how visitors use our site), and, with your
            consent, marketing cookies.
          </p>
          <p>
            You can control cookie preferences in your browser settings. Note
            that disabling certain cookies may affect site functionality.
          </p>
        </Section>

        <Section title="5. Your rights">
          <p>
            You have the following rights regarding your personal data, in
            accordance with POPIA (Protection of Personal Information Act) and
            applicable South African law:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong className="text-[#0a0a0a]">Access</strong> — request a
              copy of the personal data we hold about you.
            </li>
            <li>
              <strong className="text-[#0a0a0a]">Correction</strong> — request
              that we correct inaccurate or incomplete data.
            </li>
            <li>
              <strong className="text-[#0a0a0a]">Deletion</strong> — request
              that we delete your personal data, subject to legal retention
              requirements.
            </li>
            <li>
              <strong className="text-[#0a0a0a]">Opt-out</strong> — unsubscribe
              from marketing communications at any time.
            </li>
          </ul>
          <p>
            To exercise any of these rights, email us at{" "}
            <a href="mailto:hello@ipalo.co.za" className="text-[#c9a96e] hover:underline">
              hello@ipalo.co.za
            </a>
            .
          </p>
        </Section>

        <Section title="6. Contact">
          <p>
            If you have any questions or concerns about this policy or how we
            handle your data, please contact us at{" "}
            <a href="mailto:hello@ipalo.co.za" className="text-[#c9a96e] hover:underline">
              hello@ipalo.co.za
            </a>
            .
          </p>
        </Section>

        <div className="mt-10 pt-8 border-t border-neutral-100">
          <p className="text-xs text-neutral-400">
            This policy was last updated in May 2026 and applies to all users of
            ipalo.co.za.
          </p>
        </div>
      </div>
    </div>
  );
}
