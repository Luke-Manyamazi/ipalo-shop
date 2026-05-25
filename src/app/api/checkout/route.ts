import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PAYFAST_URL, generatePayFastForm } from "@/lib/payfast";
import { generateOrderNumber } from "@/lib/utils";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const { items, address, delivery } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );
    const deliveryFee = delivery?.price || 0;
    const total = subtotal + deliveryFee;

    const orderNumber = generateOrderNumber();

    // Get or create user
    let userId = session?.user?.id;
    if (!userId) {
      // Guest checkout — create guest account
      const guestUser = await db.user.upsert({
        where: { email: address.email },
        update: {},
        create: {
          email: address.email,
          name: `${address.firstName} ${address.lastName}`,
          phone: address.phone,
        },
      });
      userId = guestUser.id;
    }

    // Create order
    const order = await db.order.create({
      data: {
        orderNumber,
        userId,
        subtotal,
        deliveryFee,
        total,
        shippingFirstName: address.firstName,
        shippingLastName: address.lastName,
        shippingPhone: address.phone,
        shippingStreet: address.street,
        shippingSuburb: address.suburb,
        shippingCity: address.city,
        shippingProvince: address.province,
        shippingPostalCode: address.postalCode,
        courierService: delivery?.service,
        items: {
          create: items.map((item: {
            productId: string;
            variantId?: string;
            name: string;
            image: string;
            price: number;
            quantity: number;
            size?: string;
            color?: string;
          }) => ({
            productId: item.productId,
            variantId: item.variantId || null,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          })),
        },
      },
    });

    // Generate PayFast form
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const formData = generatePayFastForm({
      orderId: order.id,
      orderNumber,
      amount: total,
      itemName: `ipalo Order ${orderNumber}`,
      buyerFirstName: address.firstName,
      buyerLastName: address.lastName,
      buyerEmail: address.email,
      returnUrl: `${appUrl}/checkout/success?order=${orderNumber}`,
      cancelUrl: `${appUrl}/checkout?cancelled=true`,
      notifyUrl: `${appUrl}/api/payfast/itn`,
    });

    return NextResponse.json({
      orderId: order.id,
      orderNumber,
      payfastUrl: PAYFAST_URL,
      formData,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
