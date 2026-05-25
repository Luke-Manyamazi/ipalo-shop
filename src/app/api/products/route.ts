import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "20");

    const products = await db.product.findMany({
      where: {
        active: true,
        ...(category && { category: { slug: category } }),
        ...(featured && { featured: featured === "true" }),
      },
      take: limit,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      include: {
        category: true,
        variants: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role as string)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { name, description, price, comparePrice, sku, weight, categoryId, tags, images, variants, featured, active } = data;

    if (!name || !description || !price || !categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const slug = slugify(name);

    const product = await db.product.create({
      data: {
        name,
        slug,
        description,
        price,
        comparePrice: comparePrice || null,
        sku: sku || null,
        weight: weight || null,
        categoryId,
        tags: tags || [],
        images: images || [],
        featured: featured || false,
        active: active !== undefined ? active : true,
        variants: {
          create: (variants || []).map((v: {
            size?: string;
            color?: string;
            stock?: number;
            sku?: string;
            price?: number;
          }) => ({
            size: v.size || null,
            color: v.color || null,
            stock: v.stock || 0,
            sku: v.sku || null,
            price: v.price || null,
          })),
        },
      },
      include: { category: true, variants: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
