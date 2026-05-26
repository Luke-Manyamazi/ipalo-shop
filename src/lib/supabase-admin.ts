/**
 * Server-side Supabase admin client.
 * Uses the service-role key to bypass RLS and works via HTTPS from Vercel.
 * This is used for all server-side database reads/writes instead of Prisma,
 * because the Supabase direct PostgreSQL endpoint (port 5432/6543) is IPv6-only
 * and unreachable from Vercel's serverless environment.
 */
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { persistSession: false },
  }
);

// ─── TYPES ──────────────────────────────────────────────────────────────────

export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbVariant {
  id: string;
  size: string | null;
  color: string | null;
  stock: number;
  price: string | null;
}

export interface DbProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  compare_price: string | null;
  sku: string | null;
  weight: number | null;
  images: string[];
  tags: string[];
  featured: boolean;
  active: boolean;
  category_id: string;
  created_at: string;
  updated_at: string;
  category: DbCategory | null;
  variants: DbVariant[];
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/** Map a raw Supabase product row to the shape ProductCard expects */
export function toProductCard(p: DbProduct) {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: Number(p.price),
    comparePrice: p.compare_price ? Number(p.compare_price) : undefined,
    images: p.images?.length ? p.images : ["/logo-tee.png"],
    category: p.category?.name ?? "",
    featured: p.featured,
    variants: (p.variants ?? []).map((v) => ({
      id: v.id,
      size: v.size,
      color: v.color,
      stock: v.stock,
    })),
  };
}

// ─── QUERY FUNCTIONS ─────────────────────────────────────────────────────────

const PRODUCT_SELECT = `
  id, name, slug, price, compare_price, images, featured, active, category_id, created_at,
  category:categories(id, name, slug, description, image),
  variants:product_variants(id, size, color, stock, price)
` as const;

export async function getProducts(opts: {
  categorySlug?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}) {
  const { categorySlug, sort, minPrice, maxPrice, page = 1, limit = 12 } = opts;

  let query = supabase
    .from("products")
    .select(PRODUCT_SELECT, { count: "exact" })
    .eq("active", true);

  if (categorySlug) {
    // Join via category slug
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .single();
    if (cat) query = query.eq("category_id", cat.id);
    else return { products: [], total: 0 };
  }

  if (minPrice != null) query = query.gte("price", minPrice);
  if (maxPrice != null) query = query.lte("price", maxPrice);

  // Ordering
  switch (sort) {
    case "price-asc":  query = query.order("price", { ascending: true });  break;
    case "price-desc": query = query.order("price", { ascending: false }); break;
    case "newest":     query = query.order("created_at", { ascending: false }); break;
    default:           query = query.order("featured", { ascending: false }); break;
  }

  const offset = (page - 1) * limit;
  query = query.range(offset, offset + limit - 1);

  const { data, count, error } = await query;
  if (error) {
    console.error("getProducts error:", error.message);
    return { products: [], total: 0 };
  }
  return { products: (data as unknown as DbProduct[]) ?? [], total: count ?? 0 };
}

export async function getFeaturedProducts(limit = 4) {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("active", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getFeaturedProducts error:", error.message);
    return [];
  }
  return (data as unknown as DbProduct[]) ?? [];
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id, name, slug, description, price, compare_price, sku, weight, images, tags, featured, active, category_id,
      category:categories(id, name, slug),
      variants:product_variants(id, size, color, stock, price)
    `)
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (error) return null;
  return data as unknown as DbProduct & { description: string; sku: string | null; weight: number | null; tags: string[] };
}

export async function getCategories(slugs?: string[]) {
  let query = supabase
    .from("categories")
    .select("id, name, slug, description, image")
    .order("name", { ascending: true });

  if (slugs?.length) query = query.in("slug", slugs);

  const { data, error } = await query;
  if (error) {
    console.error("getCategories error:", error.message);
    return [];
  }
  return (data as DbCategory[]) ?? [];
}

export async function getCategoryProductCount(categoryId: string) {
  const { count } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("category_id", categoryId)
    .eq("active", true);
  return count ?? 0;
}
