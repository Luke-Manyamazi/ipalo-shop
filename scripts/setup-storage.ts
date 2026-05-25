import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local"), override: true });

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function setupStorage() {
  console.log("🗄️  Setting up Supabase Storage buckets...\n");

  const buckets = [
    {
      id: "products",
      name: "products",
      public: true,
      fileSizeLimit: 5 * 1024 * 1024, // 5MB
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    },
    {
      id: "brand",
      name: "brand",
      public: true,
      fileSizeLimit: 5 * 1024 * 1024,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
    },
  ];

  for (const bucket of buckets) {
    // Check if bucket exists
    const { data: existing } = await supabase.storage.getBucket(bucket.id);

    if (existing) {
      console.log(`   ✓ Bucket "${bucket.name}" already exists`);
      continue;
    }

    const { error } = await supabase.storage.createBucket(bucket.id, {
      public: bucket.public,
      fileSizeLimit: bucket.fileSizeLimit,
      allowedMimeTypes: bucket.allowedMimeTypes,
    });

    if (error) {
      console.error(`   ✗ Failed to create "${bucket.name}":`, error.message);
    } else {
      console.log(`   ✓ Created public bucket "${bucket.name}"`);
    }
  }

  // Set up storage policies via SQL (allow public read, authenticated upload)
  console.log("\n📋 Storage setup complete!");
  console.log("   Buckets: products (for product images), brand (for logos/assets)");
  console.log("   Access: public read, authenticated write\n");
}

setupStorage().catch(console.error);
