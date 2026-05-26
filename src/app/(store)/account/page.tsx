import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Package,
  User,
  MapPin,
  ChevronRight,
  LogOut,
} from "lucide-react";

export const dynamic = "force-dynamic";

const navItems = [
  {
    href: "/account/orders",
    icon: Package,
    label: "Order history",
    description: "View and track your past orders",
  },
  {
    href: "/account/profile",
    icon: User,
    label: "Profile",
    description: "Update your name, email, and password",
  },
  {
    href: "/account/addresses",
    icon: MapPin,
    label: "Addresses",
    description: "Manage your saved delivery addresses",
  },
];

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?from=/account");
  }

  const { name, email } = session.user;
  const firstName = name?.split(" ")[0] ?? "there";

  return (
    <div className="bg-white min-h-[70vh]">
      {/* Header */}
      <section className="bg-[#f8f5f0] px-4 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c9a96e] mb-2 font-medium">
            My account
          </p>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-[#0a0a0a]">
            Hello, {firstName}
          </h1>
          <p className="text-neutral-500 text-sm mt-2">{email}</p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        {/* Nav links */}
        <div className="space-y-3 mb-10">
          {navItems.map(({ href, icon: Icon, label, description }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-4 bg-white border border-[#e5e5e5] rounded-2xl px-5 py-4 hover:border-[#c9a96e] hover:bg-[#fefdf9] transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#f8f5f0] flex items-center justify-center flex-shrink-0 group-hover:bg-[#c9a96e]/10 transition-colors">
                <Icon className="h-4 w-4 text-[#c9a96e]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#0a0a0a] text-sm">{label}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-neutral-300 group-hover:text-[#c9a96e] transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>

        {/* Sign out */}
        <div className="pt-6 border-t border-neutral-100">
          <a
            href="/api/auth/signout"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-[#0a0a0a] transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </a>
        </div>
      </section>
    </div>
  );
}
