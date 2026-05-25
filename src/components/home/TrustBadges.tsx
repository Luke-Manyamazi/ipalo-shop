import { Truck, ShieldCheck, RefreshCcw, Headphones } from "lucide-react";

const BADGES = [
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description: "We deliver to all 9 SA provinces via The Courier Guy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "PayFast encrypted payments — cards, EFT & more",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns on all items",
  },
  {
    icon: Headphones,
    title: "Real Support",
    description: "Talk to a real person via email or WhatsApp",
  },
];

export function TrustBadges() {
  return (
    <section className="border-y border-[#e5e5e5] bg-[#f8f5f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {BADGES.map((badge) => (
            <div key={badge.title} className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 bg-black/5 rounded-lg mt-0.5">
                <badge.icon className="h-4 w-4 text-black" />
              </div>
              <div>
                <p className="font-semibold text-sm">{badge.title}</p>
                <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
