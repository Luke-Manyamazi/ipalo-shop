import Link from "next/link";
import Image from "next/image";
import { Plus, Package, Pencil, ToggleLeft, ToggleRight } from "lucide-react";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

async function getProducts() {
  try {
    return await db.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        variants: true,
        _count: { select: { orderItems: true } },
      },
    });
  } catch {
    return [];
  }
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-neutral-500 mt-1">{products.length} products</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-1" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden">
        {products.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Package className="h-10 w-10 text-neutral-200 mx-auto mb-3" />
            <p className="font-medium text-sm">No products yet</p>
            <p className="text-xs text-neutral-400 mt-1 mb-4">
              Add your first product to start selling.
            </p>
            <Button asChild size="sm">
              <Link href="/admin/products/new">
                <Plus className="h-4 w-4 mr-1" />
                Add Product
              </Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#f0f0f0]">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Sold
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f8f8]">
                {products.map((product) => {
                  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
                  const isLowStock = totalStock > 0 && totalStock <= 5;
                  const isOutOfStock = totalStock === 0;

                  return (
                    <tr key={product.id} className="hover:bg-[#fafafa] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-[#f8f5f0] flex-shrink-0">
                            {product.images[0] ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Package className="h-5 w-5 text-neutral-400 absolute inset-0 m-auto" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-neutral-400">SKU: {product.sku || "—"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-neutral-600">
                        {product.category.name}
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm font-medium">
                            {formatPrice(Number(product.price))}
                          </p>
                          {product.comparePrice && (
                            <p className="text-xs text-neutral-400 line-through">
                              {formatPrice(Number(product.comparePrice))}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`text-sm font-medium ${
                            isOutOfStock
                              ? "text-red-600"
                              : isLowStock
                              ? "text-amber-600"
                              : "text-green-600"
                          }`}
                        >
                          {totalStock} units
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-neutral-600">
                        {product._count.orderItems}
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant={product.active ? "success" : "outline"}>
                          {product.active ? "Active" : "Draft"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="p-2 hover:bg-[#f8f5f0] rounded-lg transition-colors"
                            title="Edit product"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/product/${product.slug}`}
                            target="_blank"
                            className="p-2 hover:bg-[#f8f5f0] rounded-lg transition-colors text-xs text-neutral-500 hover:text-black"
                          >
                            View
                          </Link>
                        </div>
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
