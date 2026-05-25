# ipalo™ — it's more than a gift

> *ipalo* — a Zambian name meaning *"a gift"*

Premium lifestyle clothing & accessories for the whole family. Shop our curated collection, delivered across South Africa.

## 🛍️ Features

- **Product Catalogue** — Browse by category with size/color variant selection
- **Shopping Cart** — Persistent cart with Zustand (survives page refresh)
- **PayFast Payments** — South Africa's leading payment gateway (sandbox + production)
- **Live Delivery Quotes** — The Courier Guy integration with province-based fallback pricing
- **Admin Panel** — Manage products, stock, pricing, and orders
- **Email Notifications** — Order confirmation via Resend
- **Newsletter** — Subscriber management
- **SEO Optimised** — Open Graph, metadata, sitemap-ready

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 |
| Database | Supabase PostgreSQL |
| ORM | Prisma 7 with `@prisma/adapter-pg` |
| Auth | NextAuth.js v5 (JWT + Google OAuth) |
| State | Zustand (cart) |
| Payments | PayFast |
| Shipping | The Courier Guy |
| Images | Supabase Storage |
| Hosting | Vercel (cpt1 region) |

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone https://github.com/Luke-Manyamazi/ipalo-shop.git
cd ipalo-shop
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required variables:
```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
PAYFAST_MERCHANT_ID=
PAYFAST_MERCHANT_KEY=
```

### 3. Database setup

```bash
# Run migrations
npm run db:migrate

# Seed with sample data
npm run db:seed
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the store is live.

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (store)/        # Public store pages (Header + Footer)
│   ├── admin/          # Admin panel (protected)
│   ├── auth/           # Login / register pages
│   └── api/            # API routes (checkout, payments, delivery)
├── components/
│   ├── home/           # Hero, FeaturedProducts, BrandStory, etc.
│   ├── layout/         # Header, Footer
│   ├── cart/           # CartDrawer
│   └── products/       # ProductCard, ProductInfo
├── lib/
│   ├── db.ts           # Prisma client (Pg adapter)
│   ├── payfast.ts      # PayFast form generation & ITN verification
│   └── courier.ts      # Courier Guy API + fallback pricing
└── store/
    └── cart.ts         # Zustand cart store
```

## 🔐 Admin Access

Default admin account (change after first login):
- Email: `lukemanyamazi1@gmail.com`
- Role: `SUPER_ADMIN`

## 📦 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio |

## 🌍 Deployment

Deployed on **Vercel** in the Cape Town region (`cpt1`).

Live site: [https://ipalo-shop.vercel.app](https://ipalo-shop.vercel.app)

---

Built with ❤️ for Ipalo
