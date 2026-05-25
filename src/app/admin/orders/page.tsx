import Link from "next/link";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

const STATUS_CONFIG = {
  PENDING: { label: "Pending", variant: "warning" as const },
  CONFIRMED: { label: "Confirmed", variant: "default" as const },
  PROCESSING: { label: "Processing", variant: "default" as const },
  SHIPPED: { label: "Shipped", variant: "success" as const },
  DELIVERED: { label: "Delivered", variant: "success" as const },
  CANCELLED: { label: "Cancelled", variant: "destructive" as const },
  REFUNDED: { label: "Refunded", variant: "destructive" as const },
};

async function getOrders(status?: string) {
  try {
    return await db.order.findMany({
      where: status ? { status: status as keyof typeof STATUS_CONFIG } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        items: { take: 1, include: { product: { select: { name: true } } } },
      },
    });
  } catch {
    return [];
  }
}

interface Props {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminOrdersPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const orders = await getOrders(status);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
          <p className="text-sm text-neutral-500 mt-1">{orders.length} orders</p>
        </div>

        {/* Status filter tabs */}
        <div className="flex gap-1 bg-white rounded-lg border border-[#e5e5e5] p-1">
          {[undefined, "PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"].map((s) => (
            <Link
              key={s || "all"}
              href={s ? `/admin/orders?status=${s}` : "/admin/orders"}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                status === s || (!status && !s)
                  ? "bg-black text-white"
                  : "text-neutral-500 hover:text-black"
              }`}
            >
              {s ? STATUS_CONFIG[s as keyof typeof STATUS_CONFIG]?.label : "All"}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden">
        {orders.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <ShoppingCart className="h-10 w-10 text-neutral-200 mx-auto mb-3" />
            <p className="font-medium text-sm">No orders found</p>
            <p className="text-xs text-neutral-400 mt-1">
              {status ? `No ${status.toLowerCase()} orders` : "Orders will appear here once customers start buying."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#f0f0f0]">
                  {["Order", "Customer", "Items", "Total", "Delivery", "Status", "Date", ""].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f8f8]">
                {orders.map((order) => {
                  const config = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.PENDING;
                  return (
                    <tr key={order.id} className="hover:bg-[#fafafa] transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-sm font-mono font-medium text-xs">{order.orderNumber}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium">{order.user?.name || "Guest"}</p>
                        <p className="text-xs text-neutral-400">{order.user?.email}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-neutral-600">
                        {order.items[0]?.product?.name || "—"}
                        {order.items.length > 1 && ` +${order.items.length - 1} more`}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold">
                        {formatPrice(Number(order.total))}
                      </td>
                      <td className="px-5 py-4 text-sm text-neutral-600">
                        {order.shippingCity}, {order.shippingProvince}
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant={config.variant}>{config.label}</Badge>
                      </td>
                      <td className="px-5 py-4 text-xs text-neutral-400">
                        {new Date(order.createdAt).toLocaleDateString("en-ZA")}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-xs font-medium hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
