"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Search, User, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

const SHOP_CATEGORIES = [
  { href: "/shop?category=kids-baby",   label: "Kids & Baby" },
  { href: "/shop?category=women",       label: "Women" },
  { href: "/shop?category=men",         label: "Men" },
  { href: "/shop?category=accessories", label: "Accessories" },
  { href: "/shop?category=gifts",       label: "Gift Sets" },
  { href: "/shop?sort=newest",          label: "New Arrivals" },
  { href: "/shop?tag=sale",             label: "Sale" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [shopOpen, setShopOpen]     = useState(false);
  const { itemCount, openCart }     = useCartStore();
  const count = itemCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#0a0a0a] text-white text-center py-2.5 text-[11px] tracking-[0.15em] font-light">
        FREE DELIVERY ON ORDERS OVER R800&ensp;·&ensp;USE CODE{" "}
        <span className="font-semibold text-[#c9a96e]">IPALO10</span> FOR 10% OFF
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-40 bg-white transition-all duration-200",
          scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.08)]" : "",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-neutral-50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Logo — centred on mobile, left-aligned on desktop */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex-shrink-0">
              <Image
                src="/logo-ipalo-2.png"
                alt="ipalo — it's more than a gift"
                width={160}
                height={54}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {/* Shop + dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <Link
                  href="/shop"
                  className="flex items-center gap-1 text-sm font-medium tracking-wide hover:text-neutral-500 transition-colors"
                >
                  Shop <ChevronDown className="h-3.5 w-3.5 mt-px" />
                </Link>

                {shopOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-44 z-50">
                    <div className="bg-white rounded-xl shadow-xl ring-1 ring-black/5 py-1.5">
                      {SHOP_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="block px-4 py-2 text-sm hover:bg-[#f8f5f0] transition-colors"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className="text-sm font-medium tracking-wide hover:text-neutral-500 transition-colors"
              >
                Our Story
              </Link>
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-1">
              <button
                className="hidden sm:flex p-2 hover:bg-neutral-50 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </button>

              <Link
                href="/account"
                className="hidden sm:flex p-2 hover:bg-neutral-50 rounded-lg transition-colors"
                aria-label="Account"
              >
                <User className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </Link>

              <button
                onClick={openCart}
                className="relative p-2 hover:bg-neutral-50 rounded-lg transition-colors"
                aria-label={`Cart (${count} items)`}
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.75} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-[18px] w-[18px] bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-neutral-100 bg-white animate-fade-in">
            <nav className="max-w-7xl mx-auto px-4 py-2 divide-y divide-neutral-50">
              {SHOP_CATEGORIES.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center py-3.5 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="flex items-center py-3.5 text-sm font-medium"
              >
                Our Story
              </Link>
              <div className="flex gap-6 py-4">
                <Link href="/account" onClick={() => setMobileOpen(false)} className="text-sm text-neutral-500">
                  Account
                </Link>
                <Link href="/account/orders" onClick={() => setMobileOpen(false)} className="text-sm text-neutral-500">
                  Track Order
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
