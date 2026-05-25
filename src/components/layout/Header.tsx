"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Search, User, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/shop", label: "Shop", hasDropdown: true },
  { href: "/shop/clothing", label: "Clothing" },
  { href: "/shop/accessories", label: "Accessories" },
  { href: "/shop/gifts", label: "Gift Sets" },
  { href: "/about", label: "Our Story" },
];

const CATEGORIES = [
  { href: "/shop/kids", label: "Kids & Baby" },
  { href: "/shop/women", label: "Women" },
  { href: "/shop/men", label: "Men" },
  { href: "/shop/accessories", label: "Accessories" },
  { href: "/shop/gifts", label: "Gift Sets" },
  { href: "/shop/new", label: "New Arrivals" },
  { href: "/shop/sale", label: "Sale" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const { itemCount, openCart } = useCartStore();
  const count = itemCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-2 text-xs tracking-widest font-light">
        FREE DELIVERY ON ORDERS OVER R800 · USE CODE{" "}
        <span className="font-semibold">IPALO10</span> FOR 10% OFF YOUR FIRST ORDER
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 bg-white transition-shadow duration-300",
          scrolled ? "shadow-sm" : ""
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo-full.png"
                alt="ipalo — it's more than a gift"
                width={140}
                height={50}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <div
                className="relative"
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
              >
                <Link
                  href="/shop"
                  className="flex items-center gap-1 text-sm font-medium tracking-wide hover:text-neutral-600 transition-colors"
                >
                  Shop <ChevronDown className="h-3.5 w-3.5" />
                </Link>

                {/* Dropdown */}
                {shopDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-48">
                    <div className="bg-white border border-[#e5e5e5] rounded-lg shadow-lg py-2">
                      {CATEGORIES.map((cat) => (
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

              {NAV_LINKS.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium tracking-wide hover:text-neutral-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                className="hidden sm:flex p-2 hover:bg-[#f8f5f0] rounded-md transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                href="/account"
                className="hidden sm:flex p-2 hover:bg-[#f8f5f0] rounded-md transition-colors"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>

              <button
                onClick={openCart}
                className="relative p-2 hover:bg-[#f8f5f0] rounded-md transition-colors"
                aria-label={`Shopping bag (${count} items)`}
              >
                <ShoppingBag className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#e5e5e5] bg-white animate-fade-in">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {CATEGORIES.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-sm font-medium border-b border-[#f0f0f0] last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm font-medium"
              >
                Our Story
              </Link>
              <div className="pt-2 flex gap-4">
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-neutral-600"
                >
                  Account
                </Link>
                <Link
                  href="/account/orders"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-neutral-600"
                >
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
