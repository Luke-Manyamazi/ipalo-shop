import crypto from "crypto";

const PAYFAST_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID!;
const PAYFAST_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY!;
const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE;
const IS_SANDBOX = process.env.NEXT_PUBLIC_PAYFAST_SANDBOX === "true";

export const PAYFAST_URL = IS_SANDBOX
  ? "https://sandbox.payfast.co.za/eng/process"
  : "https://www.payfast.co.za/eng/process";

export interface PayFastPaymentData {
  orderId: string;
  orderNumber: string;
  amount: number;
  itemName: string;
  buyerFirstName: string;
  buyerLastName: string;
  buyerEmail: string;
  returnUrl: string;
  cancelUrl: string;
  notifyUrl: string;
}

export function generatePayFastForm(data: PayFastPaymentData): Record<string, string> {
  const pfData: Record<string, string> = {
    merchant_id: PAYFAST_MERCHANT_ID,
    merchant_key: PAYFAST_MERCHANT_KEY,
    return_url: data.returnUrl,
    cancel_url: data.cancelUrl,
    notify_url: data.notifyUrl,
    name_first: data.buyerFirstName,
    name_last: data.buyerLastName,
    email_address: data.buyerEmail,
    m_payment_id: data.orderId,
    amount: data.amount.toFixed(2),
    item_name: data.itemName,
    custom_str1: data.orderNumber,
  };

  if (PAYFAST_PASSPHRASE) {
    const paramString = Object.entries(pfData)
      .map(([key, val]) => `${key}=${encodeURIComponent(val.trim())}`)
      .join("&");
    pfData.signature = crypto
      .createHash("md5")
      .update(`${paramString}&passphrase=${encodeURIComponent(PAYFAST_PASSPHRASE.trim())}`)
      .digest("hex");
  } else {
    const paramString = Object.entries(pfData)
      .map(([key, val]) => `${key}=${encodeURIComponent(val.trim())}`)
      .join("&");
    pfData.signature = crypto.createHash("md5").update(paramString).digest("hex");
  }

  return pfData;
}

export function verifyPayFastITN(
  pfData: Record<string, string>,
  pfParamString: string
): boolean {
  // Verify signature
  let pfParamStringForHash = pfParamString;
  if (PAYFAST_PASSPHRASE) {
    pfParamStringForHash += `&passphrase=${encodeURIComponent(PAYFAST_PASSPHRASE.trim())}`;
  }

  const signature = crypto
    .createHash("md5")
    .update(pfParamStringForHash)
    .digest("hex");

  return pfData["signature"] === signature;
}
