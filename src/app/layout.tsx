import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "ipalo™ — it's more than a gift",
    template: "%s | ipalo™",
  },
  description:
    "ipalo — a Zambian name meaning 'a gift'. Premium lifestyle clothing & accessories. Shop our curated collection, delivered across South Africa.",
  keywords: ["ipalo", "clothing", "lifestyle", "South Africa", "baby", "kids", "fashion", "gift"],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "ipalo™",
    title: "ipalo™ — it's more than a gift",
    description: "Premium lifestyle clothing & accessories. Shop our curated collection.",
    images: [{ url: "/logo-full.png", width: 1200, height: 630, alt: "ipalo™" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ipalo™ — it's more than a gift",
    description: "Premium lifestyle clothing & accessories.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#fff",
              color: "#0a0a0a",
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
