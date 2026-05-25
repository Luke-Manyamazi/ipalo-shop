import { Truck, ShieldCheck, RefreshCcw, Headphones } from "lucide-react";

const BADGES = [
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description: "All 9 SA provinces via The Courier Guy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "PayFast encrypted — cards, EFT & more",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns on all items",
  },
  {
    icon: Headphones,
    title: "Real Support",
    description: "Email or WhatsApp — real people, fast replies",
  },
];

export function TrustBadges() {
  return (
    <section className="bg-white border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {BADGES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col sm:flex-row items-start gap-3">
              <div className="shrink-0 p-2.5 bg-neutral-50 rounded-xl">
                <Icon className="h-4 w-4 text-neutral-800" strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-semibold text-sm text-neutral-900">{title}</p>
                <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
