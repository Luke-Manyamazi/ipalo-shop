import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

async function getStats() {
  try {
    const [orders, products, customers, revenue] = await Promise.all([
      db.order.count(),
      db.product.count({ where: { active: true } }),
      db.user.count({ where: { role: "CUSTOMER" } }),
      db.order.aggregate({
        where: { paymentStatus: "PAID" },
        _sum: { total: true },
      }),
    ]);

    const recentOrders = await db.order.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        items: { take: 1 },
      },
    });

    return {
      orders,
      products,
      customers,
      revenue: revenue._sum.total ? Number(revenue._sum.total) : 0,
      recentOrders,
    };
  } catch {
    return {
      orders: 0,
      products: 0,
      customers: 0,
      revenue: 0,
      recentOrders: [],
    };
  }
}

const ORDER_STATUS_CONFIG = {
  PENDING: { label: "Pending", variant: "warning" as const, icon: Clock },
  CONFIRMED: { label: "Confirmed", variant: "default" as const, icon: CheckCircle },
  PROCESSING: { label: "Processing", variant: "default" as const, icon: Package },
  SHIPPED: { label: "Shipped", variant: "success" as const, icon: Truck },
  DELIVERED: { label: "Delivered", variant: "success" as const, icon: CheckCircle },
  CANCELLED: { label: "Cancelled", variant: "destructive" as const, icon: Clock },
  REFUNDED: { label: "Refunded", variant: "destructive" as const, icon: Clock },
};

export default async function AdminDashboard() {
  const { orders, products, customers, revenue, recentOrders } = await getStats();

  const STATS = [
    {
      label: "Total Revenue",
      value: formatPrice(revenue),
      icon: TrendingUp,
      href: "/admin/orders",
      change: "+12% this month",
      positive: true,
    },
    {
      label: "Total Orders",
      value: orders.toLocaleString(),
      icon: ShoppingCart,
      href: "/admin/orders",
      change: "+8 today",
      positive: true,
    },
    {
      label: "Active Products",
      value: products.toLocaleString(),
      icon: Package,
      href: "/admin/products",
      change: "Manage inventory",
      positive: true,
    },
    {
      label: "Customers",
      value: customers.toLocaleString(),
      icon: Users,
      href: "/admin/customers",
      change: "+5 this week",
      positive: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Welcome back. Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-5 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-neutral-500 font-medium">{stat.label}</p>
              <div className="p-1.5 bg-[#f8f5f0] rounded-lg group-hover:bg-black group-hover:text-white transition-colors">
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
            <p className={`text-xs mt-1 ${stat.positive ? "text-green-600" : "text-red-600"}`}>
              {stat.change}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f0]">
          <h2 className="font-semibold">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-sm text-neutral-500 hover:text-black transition-colors"
          >
            View all
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="px-6 py-12 text-center text-neutral-400 text-sm">
            No orders yet. Share your store to start selling!
          </div>
        ) : (
          <div className="divide-y divide-[#f0f0f0]">
            {recentOrders.map((order) => {
              const config =
                ORDER_STATUS_CONFIG[order.status as keyof typeof ORDER_STATUS_CONFIG] ||
                ORDER_STATUS_CONFIG.PENDING;
              return (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-[#fafafa] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{order.orderNumber}</p>
                    <p className="text-xs text-neutral-500 mt-0.5 truncate">
                      {order.user?.name || order.user?.email}
                    </p>
                  </div>
                  <Badge variant={config.variant}>{config.label}</Badge>
                  <p className="text-sm font-semibold">{formatPrice(Number(order.total))}</p>
                  <p className="text-xs text-neutral-400 hidden sm:block">
                    {new Date(order.createdAt).toLocaleDateString("en-ZA")}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/admin/products/new"
          className="bg-black text-white rounded-xl p-5 hover:bg-neutral-800 transition-colors group"
        >
          <Package className="h-5 w-5 mb-3 group-hover:scale-110 transition-transform" />
          <p className="font-semibold text-sm">Add New Product</p>
          <p className="text-white/60 text-xs mt-1">List a new item for sale</p>
        </Link>
        <Link
          href="/admin/orders?status=PENDING"
          className="bg-white rounded-xl p-5 hover:shadow-md transition-shadow border border-[#e5e5e5]"
        >
          <ShoppingCart className="h-5 w-5 mb-3" />
          <p className="font-semibold text-sm">Pending Orders</p>
          <p className="text-neutral-500 text-xs mt-1">Review & process orders</p>
        </Link>
        <Link
          href="/admin/settings"
          className="bg-white rounded-xl p-5 hover:shadow-md transition-shadow border border-[#e5e5e5]"
        >
          <TrendingUp className="h-5 w-5 mb-3" />
          <p className="font-semibold text-sm">Store Settings</p>
          <p className="text-neutral-500 text-xs mt-1">Delivery, pricing & more</p>
        </Link>
      </div>
    </div>
  );
}
