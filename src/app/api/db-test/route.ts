import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cats = await db.category.findMany({ take: 1 });
    const prods = await db.product.count();
    return NextResponse.json({ ok: true, categories: cats.length, products: prods });
  } catch (e: unknown) {
    const err = e as Error & { code?: string; meta?: unknown; clientVersion?: string };
    return NextResponse.json({
      ok: false,
      name: err.name,
      message: err.message?.substring(0, 500),
      code: err.code,
      meta: err.meta,
      clientVersion: err.clientVersion,
    });
  }
}
