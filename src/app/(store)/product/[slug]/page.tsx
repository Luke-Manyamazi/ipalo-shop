import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { getProductBySlug } from "@/lib/supabase-admin";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  // Demo product fallback
  const DEMO: Record<string, object> = {
    "ipalo-classic-logo-tee": {
      id: "p1", name: "ipalo Classic Logo Tee", slug: "ipalo-classic-logo-tee",
      description: "The original. Our classic ipalo™ logo tee in premium 180gsm cotton. Relaxed fit, pre-washed for softness. The most wearable piece in your wardrobe — dress it up or down.",
      price: 280, comparePrice: 350, sku: "IPL-TEE-001", weight: 0.3,
      images: ["/logo-tee.png", "/logo-hoodie.png"],
      tags: ["classic", "tee", "logo"],
      featured: true, active: true,
      category: { id: "c1", name: "Women", slug: "women" },
      variants: [
        { id: "v1", size: "XS", color: "White", stock: 5, price: null },
        { id: "v2", size: "S", color: "White", stock: 10, price: null },
        { id: "v3", size: "M", color: "White", stock: 8, price: null },
        { id: "v4", size: "L", color: "White", stock: 5, price: null },
        { id: "v5", size: "XL", color: "White", stock: 3, price: null },
      ],
      reviews: [],
    },
    "ipalo-signature-hoodie": {
      id: "p2", name: "ipalo Signature Hoodie", slug: "ipalo-signature-hoodie",
      description: "The statement piece. Our heavyweight ipalo™ monogram hoodie in 350gsm French terry. Oversized fit, double-lined hood, kangaroo pocket. Built for longevity.",
      price: 650, comparePrice: null, sku: "IPL-HOD-001", weight: 0.6,
      images: ["/logo-hoodie.png", "/logo-tee.png"],
      tags: ["hoodie", "signature", "monogram"],
      featured: true, active: true,
      category: { id: "c2", name: "Women", slug: "women" },
      variants: [
        { id: "v6", size: "S", color: "White", stock: 6, price: null },
        { id: "v7", size: "M", color: "White", stock: 10, price: null },
        { id: "v8", size: "L", color: "White", stock: 4, price: null },
        { id: "v9", size: "XL", color: "White", stock: 2, price: null },
      ],
      reviews: [],
    },
    "ipalo-canvas-tote-bag": {
      id: "p3", name: "ipalo Canvas Tote Bag", slug: "ipalo-canvas-tote-bag",
      description: "The everyday carry. Our signature ipalo™ canvas tote in 12oz natural canvas. Large enough for all your essentials, strong enough to last years. Unisex design.",
      price: 180, comparePrice: null, sku: "IPL-TOT-001", weight: 0.4,
      images: ["/logo-tote.png"],
      tags: ["tote", "bag", "accessories"],
      featured: false, active: true,
      category: { id: "c3", name: "Accessories", slug: "accessories" },
      variants: [
        { id: "v10", size: null, color: "Natural", stock: 20, price: null },
      ],
      reviews: [],
    },
  };

  if (DEMO[slug]) return DEMO[slug];

  try {
    const product = await getProductBySlug(slug);
    if (!product) return null;
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: Number(product.price),
      comparePrice: product.compare_price ? Number(product.compare_price) : null,
      sku: product.sku,
      weight: product.weight,
      images: product.images ?? [],
      tags: product.tags ?? [],
      featured: product.featured,
      active: product.active,
      category: product.category ?? { id: "", name: "", slug: "" },
      variants: (product.variants ?? []).map((v) => ({
        id: v.id,
        size: v.size,
        color: v.color,
        stock: v.stock,
        price: v.price ? Number(v.price) : null,
      })),
      reviews: [],
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug) as { name?: string; description?: string; images?: string[] } | null;
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: (product.description as string)?.substring(0, 160),
    openGraph: {
      images: product.images?.slice(0, 1),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const p = product as {
    id: string; name: string; slug: string; description: string;
    price: number; comparePrice?: number | null; sku?: string | null; weight?: number | null;
    images: string[]; tags: string[]; featured: boolean; active: boolean;
    category: { id: string; name: string; slug: string };
    variants: { id: string; size?: string | null; color?: string | null; stock: number; price?: number | null }[];
    reviews: { rating: number; user?: { name?: string | null } }[];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <ProductGallery images={p.images} name={p.name} />
        <ProductInfo product={p} />
      </div>
    </div>
  );
}
