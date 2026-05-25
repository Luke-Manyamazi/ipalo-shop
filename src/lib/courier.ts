// The Courier Guy API integration
// Docs: https://developer.thecourierguy.co.za

const API_KEY = process.env.COURIER_GUY_API_KEY;
const API_URL = process.env.COURIER_GUY_API_URL || "https://api.thecourierguy.co.za/api";

export interface QuoteRequest {
  fromSuburb: string;
  fromPostalCode: string;
  toSuburb: string;
  toPostalCode: string;
  weight: number; // kg
  parcels?: number;
}

export interface CourierQuote {
  service: string;
  serviceCode: string;
  price: number;
  estimatedDays: number;
  description: string;
}

// Fallback zone-based pricing when API is unavailable
const ZONE_PRICING: Record<string, number> = {
  Gauteng: 65,
  "Western Cape": 95,
  "KwaZulu-Natal": 85,
  "Eastern Cape": 110,
  Limpopo: 105,
  Mpumalanga: 95,
  "North West": 95,
  "Free State": 95,
  "Northern Cape": 130,
};

export async function getCourierQuote(request: QuoteRequest): Promise<CourierQuote[]> {
  if (!API_KEY) {
    // Return zone-based fallback quotes
    return getFallbackQuotes(request);
  }

  try {
    const response = await fetch(`${API_URL}/getQuote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        from_suburb: request.fromSuburb,
        from_postal_code: request.fromPostalCode,
        to_suburb: request.toSuburb,
        to_postal_code: request.toPostalCode,
        weight: request.weight,
        parcels: request.parcels || 1,
      }),
    });

    if (!response.ok) throw new Error("Courier API error");

    const data = await response.json();

    return data.map((quote: Record<string, unknown>) => ({
      service: quote.service_name as string,
      serviceCode: quote.service_code as string,
      price: parseFloat(quote.total_incl as string),
      estimatedDays: parseInt(quote.transit_days as string),
      description: quote.description as string,
    }));
  } catch (error) {
    console.error("Courier Guy API error:", error);
    return getFallbackQuotes(request);
  }
}

function getFallbackQuotes(request: QuoteRequest): CourierQuote[] {
  // Use flat-rate zone pricing as fallback
  const basePrice = 75; // default
  const extraPerKg = 10;
  const weightSurcharge = Math.max(0, request.weight - 1) * extraPerKg;

  return [
    {
      service: "Standard Delivery",
      serviceCode: "STANDARD",
      price: basePrice + weightSurcharge,
      estimatedDays: 5,
      description: "Standard door-to-door delivery (3-7 business days)",
    },
    {
      service: "Express Delivery",
      serviceCode: "EXPRESS",
      price: (basePrice + weightSurcharge) * 1.6,
      estimatedDays: 2,
      description: "Express door-to-door delivery (1-3 business days)",
    },
  ];
}

export function getDeliveryFeeByProvince(province: string, weightKg: number = 0.5): number {
  const base = ZONE_PRICING[province] ?? 95;
  const extra = Math.max(0, weightKg - 1) * 15;
  return base + extra;
}
