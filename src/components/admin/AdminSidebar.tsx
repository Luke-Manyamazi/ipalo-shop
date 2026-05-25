"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Tag,
  TrendingUp,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface AdminSidebarProps {
  user: { name?: string | null; email?: string | null; image?: string | null };
}

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="w-60 flex-shrink-0 bg-black text-white flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-full.png"
            alt="ipalo"
            width={90}
            height={32}
            className="h-7 w-auto object-contain invert"
          />
        </Link>
        <p className="text-[10px] text-white/40 tracking-widest uppercase mt-2 pl-0.5">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group",
              isActive(item.href, item.exact)
                ? "bg-white text-black font-medium"
                : "text-white/60 hover:text-white hover:bg-white/10"
            )}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            <span className="flex-1">{item.label}</span>
            {isActive(item.href, item.exact) && (
              <ChevronRight className="h-3 w-3" />
            )}
          </Link>
        ))}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold flex-shrink-0">
            {user.name?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{user.name || "Admin"}</p>
            <p className="text-[10px] text-white/40 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 px-3 py-2 mt-1 w-full text-xs text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/10"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
