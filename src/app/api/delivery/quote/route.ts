import { NextRequest, NextResponse } from "next/server";
import { getCourierQuote, getDeliveryFeeByProvince } from "@/lib/courier";

export async function POST(req: NextRequest) {
  try {
    const { toSuburb, toPostalCode, province, weight = 0.5 } = await req.json();

    // Free delivery threshold
    const FREE_DELIVERY_THRESHOLD = 800;

    // Try The Courier Guy API first, fall back to zone pricing
    const rawQuotes = await getCourierQuote({
      fromSuburb: "Sandton",       // Your dispatch suburb — update this
      fromPostalCode: "2196",      // Your dispatch postal code — update this
      toSuburb: toSuburb || "Unknown",
      toPostalCode: toPostalCode || "0000",
      weight,
    });

    const quotes = rawQuotes.map((q) => ({
      ...q,
      price: Math.round(q.price * 100) / 100,
    }));

    return NextResponse.json({ quotes });
  } catch (error) {
    console.error("Delivery quote error:", error);
    return NextResponse.json({ quotes: [], error: "Could not fetch quotes" }, { status: 500 });
  }
}
