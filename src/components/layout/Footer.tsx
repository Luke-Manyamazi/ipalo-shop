import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Globe, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      {/* Newsletter Strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-light tracking-wide mb-1">
                Join the <span className="font-semibold">ipalo</span> family
              </h3>
              <p className="text-white/60 text-sm">
                Be the first to hear about new arrivals, exclusive offers & brand stories.
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="h-10 px-4 text-sm bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 w-full md:w-64 transition-colors"
              />
              <button
                type="submit"
                className="h-10 px-5 bg-white text-black text-sm font-medium rounded-md hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/logo-full.png"
              alt="ipalo"
              width={120}
              height={40}
              className="h-8 w-auto object-contain invert mb-4"
            />
            <p className="text-white/50 text-xs leading-relaxed mb-6">
              it&apos;s more than a gift. Born in Zambia, raised in love — ipalo is a lifestyle
              brand celebrating the gift of life.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/ipalo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com/ipalo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@ipalo.co.za"
                className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/shop/new", label: "New Arrivals" },
                { href: "/shop/kids", label: "Kids & Baby" },
                { href: "/shop/women", label: "Women" },
                { href: "/shop/men", label: "Men" },
                { href: "/shop/accessories", label: "Accessories" },
                { href: "/shop/gifts", label: "Gift Sets" },
                { href: "/shop/sale", label: "Sale" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-4">Help</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/shipping", label: "Shipping & Delivery" },
                { href: "/returns", label: "Returns & Exchanges" },
                { href: "/sizing", label: "Size Guide" },
                { href: "/faq", label: "FAQs" },
                { href: "/contact", label: "Contact Us" },
                { href: "/track-order", label: "Track My Order" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:hello@ipalo.co.za" className="hover:text-white transition-colors">
                  hello@ipalo.co.za
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+27 (0) 10 000 0000</span>
              </li>
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>South Africa</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {year} ipalo™. All rights reserved. A Zambian name, a global story.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-white/40 text-xs hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/40 text-xs hover:text-white/70 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
