"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { formatPrice, SA_PROVINCES } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Shield, Truck, ChevronRight } from "lucide-react";

interface DeliveryQuote {
  service: string;
  serviceCode: string;
  price: number;
  estimatedDays: number;
  description: string;
}

export default function CheckoutPage() {
  const { items, subtotal } = useCartStore();
  const total = subtotal();

  const [step, setStep] = useState<"address" | "delivery" | "payment">("address");
  const [loading, setLoading] = useState(false);
  const [deliveryQuotes, setDeliveryQuotes] = useState<DeliveryQuote[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryQuote | null>(null);
  const [fetchingQuotes, setFetchingQuotes] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    suburb: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const updateForm = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleGetQuotes = async () => {
    setFetchingQuotes(true);
    try {
      const res = await fetch("/api/delivery/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toSuburb: form.suburb,
          toPostalCode: form.postalCode,
          province: form.province,
          weight: items.reduce((sum) => sum + 0.5, 0),
        }),
      });
      const data = await res.json();
      setDeliveryQuotes(data.quotes || []);
      if (data.quotes?.length > 0) {
        setSelectedDelivery(data.quotes[0]);
        setStep("delivery");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingQuotes(false);
    }
  };

  const handleCheckout = async () => {
    if (!selectedDelivery) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          address: form,
          delivery: selectedDelivery,
        }),
      });
      const data = await res.json();
      if (data.payfastUrl && data.formData) {
        // Submit PayFast form
        const form_el = document.createElement("form");
        form_el.method = "POST";
        form_el.action = data.payfastUrl;
        Object.entries(data.formData as Record<string, string>).forEach(([key, val]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = val;
          form_el.appendChild(input);
        });
        document.body.appendChild(form_el);
        form_el.submit();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const orderTotal = total + (selectedDelivery?.price || 0);

  const provinceOptions = SA_PROVINCES.map((p) => ({ value: p, label: p }));

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Image src="/logo-full.png" alt="ipalo" width={100} height={35} className="h-8 w-auto object-contain" />
          <div className="h-6 w-px bg-[#e5e5e5]" />
          <h1 className="text-lg font-light tracking-wide">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Left - Form */}
          <div className="space-y-6">
            {/* Step 1: Address */}
            <div className="bg-white rounded-2xl p-6 lg:p-8">
              <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">1</span>
                Delivery Address
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={form.firstName}
                  onChange={(e) => updateForm("firstName", e.target.value)}
                  required
                />
                <Input
                  label="Last Name"
                  value={form.lastName}
                  onChange={(e) => updateForm("lastName", e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  required
                  className="sm:col-span-2"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                  placeholder="+27 82 000 0000"
                  required
                  className="sm:col-span-2"
                />
                <Input
                  label="Street Address"
                  value={form.street}
                  onChange={(e) => updateForm("street", e.target.value)}
                  placeholder="123 Main Street"
                  required
                  className="sm:col-span-2"
                />
                <Input
                  label="Suburb"
                  value={form.suburb}
                  onChange={(e) => updateForm("suburb", e.target.value)}
                  required
                />
                <Input
                  label="City"
                  value={form.city}
                  onChange={(e) => updateForm("city", e.target.value)}
                  required
                />
                <Select
                  label="Province"
                  value={form.province}
                  onChange={(e) => updateForm("province", e.target.value)}
                  options={provinceOptions}
                  placeholder="Select province..."
                  required
                />
                <Input
                  label="Postal Code"
                  value={form.postalCode}
                  onChange={(e) => updateForm("postalCode", e.target.value)}
                  placeholder="0000"
                  required
                />
              </div>

              <Button
                className="mt-6 w-full sm:w-auto"
                size="lg"
                onClick={handleGetQuotes}
                loading={fetchingQuotes}
                disabled={!form.firstName || !form.lastName || !form.email || !form.province || !form.suburb || !form.postalCode}
              >
                Get Delivery Quotes
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Step 2: Delivery */}
            {step !== "address" && deliveryQuotes.length > 0 && (
              <div className="bg-white rounded-2xl p-6 lg:p-8">
                <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">2</span>
                  Choose Delivery
                </h2>

                <div className="space-y-3">
                  {deliveryQuotes.map((quote) => (
                    <button
                      key={quote.serviceCode}
                      onClick={() => { setSelectedDelivery(quote); setStep("payment"); }}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        selectedDelivery?.serviceCode === quote.serviceCode
                          ? "border-black bg-black/5"
                          : "border-[#e5e5e5] hover:border-black/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{quote.service}</p>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            {quote.estimatedDays} business days · {quote.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {quote.price === 0 ? "FREE" : formatPrice(quote.price)}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedDelivery && (
                  <Button
                    className="mt-6 w-full sm:w-auto"
                    size="lg"
                    onClick={() => setStep("payment")}
                  >
                    Continue to Payment
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}

            {/* Step 3: Payment */}
            {step === "payment" && selectedDelivery && (
              <div className="bg-white rounded-2xl p-6 lg:p-8">
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">3</span>
                  Payment
                </h2>

                <div className="border border-[#e5e5e5] rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Secure Payment via PayFast</p>
                      <p className="text-xs text-neutral-500">
                        Cards, EFT, SnapScan, Zapper, Mobicred — all encrypted & safe.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#f0f0f0] flex items-center gap-2">
                    <span className="text-xs text-neutral-500">Accepted:</span>
                    <span className="text-xs bg-[#f8f5f0] px-2 py-0.5 rounded">Visa</span>
                    <span className="text-xs bg-[#f8f5f0] px-2 py-0.5 rounded">Mastercard</span>
                    <span className="text-xs bg-[#f8f5f0] px-2 py-0.5 rounded">EFT</span>
                    <span className="text-xs bg-[#f8f5f0] px-2 py-0.5 rounded">SnapScan</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleCheckout}
                  loading={loading}
                >
                  Pay {formatPrice(orderTotal)} securely
                </Button>

                <p className="text-xs text-neutral-400 text-center mt-3">
                  You&apos;ll be redirected to PayFast to complete your payment.
                </p>
              </div>
            )}
          </div>

          {/* Right - Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl p-6">
              <h2 className="font-semibold mb-5">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-[#f8f5f0] flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      {(item.size || item.color) && (
                        <p className="text-xs text-neutral-400">
                          {[item.size, item.color].filter(Boolean).join(" / ")}
                        </p>
                      )}
                    </div>
                    <p className="text-sm font-medium flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#e5e5e5] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Delivery</span>
                  <span>
                    {selectedDelivery
                      ? selectedDelivery.price === 0
                        ? "FREE"
                        : formatPrice(selectedDelivery.price)
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t border-[#e5e5e5] mt-2">
                  <span>Total (incl. VAT)</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
              </div>

              {/* Free delivery progress */}
              {total < 800 && (
                <div className="mt-4 p-3 bg-[#f8f5f0] rounded-lg">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Truck className="h-3.5 w-3.5" />
                    <p className="text-xs">
                      Add {formatPrice(800 - total)} more for free delivery
                    </p>
                  </div>
                  <div className="h-1.5 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-black rounded-full transition-all"
                      style={{ width: `${Math.min((total / 800) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
