import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPayFastITN } from "@/lib/payfast";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const params = new URLSearchParams(body);
    const pfData = Object.fromEntries(params.entries());

    // Build param string for verification (excluding signature)
    const pfParamString = Array.from(params.entries())
      .filter(([key]) => key !== "signature")
      .map(([key, val]) => `${key}=${encodeURIComponent(val.trim())}`)
      .join("&");

    // Verify the ITN signature
    const isValid = verifyPayFastITN(pfData, pfParamString);
    if (!isValid) {
      console.error("PayFast ITN signature invalid");
      return new NextResponse("Invalid signature", { status: 400 });
    }

    const orderId = pfData["m_payment_id"];
    const paymentStatus = pfData["payment_status"];
    const pfPaymentId = pfData["pf_payment_id"];
    const amount = parseFloat(pfData["amount_gross"]);

    if (!orderId) {
      return new NextResponse("Missing order ID", { status: 400 });
    }

    if (paymentStatus === "COMPLETE") {
      await db.order.update({
        where: { id: orderId },
        data: {
          status: "CONFIRMED",
          paymentStatus: "PAID",
          paymentRef: pfPaymentId,
          payment: {
            upsert: {
              create: {
                provider: "payfast",
                amount,
                currency: "ZAR",
                status: "PAID",
                pfPaymentId,
                raw: pfData as object,
              },
              update: {
                status: "PAID",
                pfPaymentId,
                raw: pfData as object,
              },
            },
          },
        },
      });

      // TODO: Send confirmation email
      // TODO: Reduce stock
    } else if (paymentStatus === "FAILED" || paymentStatus === "CANCELLED") {
      await db.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: "FAILED",
        },
      });
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("PayFast ITN error:", error);
    return new NextResponse("Error", { status: 500 });
  }
}
