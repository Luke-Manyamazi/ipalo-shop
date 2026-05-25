"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/lib/supabase";
import toast from "react-hot-toast";

interface Variant {
  size: string;
  color: string;
  stock: string;
  sku: string;
  price: string;
}

const SIZE_OPTIONS = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "One Size"];
const COLOR_OPTIONS = ["White", "Black", "Grey", "Navy", "Cream", "Natural"];

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    sku: "",
    weight: "",
    categoryId: "",
    tags: "",
    featured: false,
    active: true,
  });

  const [images, setImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<Variant[]>([
    { size: "S", color: "White", stock: "10", sku: "", price: "" },
    { size: "M", color: "White", stock: "10", sku: "", price: "" },
    { size: "L", color: "White", stock: "10", sku: "", price: "" },
  ]);

  const updateForm = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const updateVariant = (index: number, field: string, value: string) =>
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );

  const addVariant = () =>
    setVariants((prev) => [
      ...prev,
      { size: "S", color: "White", stock: "5", sku: "", price: "" },
    ]);

  const removeVariant = (index: number) =>
    setVariants((prev) => prev.filter((_, i) => i !== index));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file, "products");
      if (url) setImages((prev) => [...prev, url]);
      else toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          comparePrice: form.comparePrice ? parseFloat(form.comparePrice) : null,
          weight: form.weight ? parseFloat(form.weight) : null,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
          images,
          variants: variants.map((v) => ({
            size: v.size || null,
            color: v.color || null,
            stock: parseInt(v.stock),
            sku: v.sku || null,
            price: v.price ? parseFloat(v.price) : null,
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed to create product");
      toast.success("Product created!");
      router.push("/admin/products");
    } catch (err) {
      toast.error("Failed to create product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 hover:bg-[#e8e0d4] rounded-lg transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">New Product</h1>
        </div>
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => updateForm("active", false)}>
            Save as Draft
          </Button>
          <Button type="submit" loading={loading}>
            Publish Product
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6 space-y-4">
            <h2 className="font-semibold">Basic Information</h2>
            <Input
              label="Product Name"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              placeholder="e.g. ipalo Classic Logo Tee"
              required
            />
            <div>
              <label className="block text-sm font-medium text-black mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                rows={5}
                required
                className="w-full px-3 py-2 text-sm border border-[#e5e5e5] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-black resize-none"
                placeholder="Describe the product — materials, fit, care instructions..."
              />
            </div>
            <Input
              label="Tags (comma-separated)"
              value={form.tags}
              onChange={(e) => updateForm("tags", e.target.value)}
              placeholder="classic, tee, logo, cotton"
            />
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="font-semibold mb-4">Product Images</h2>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-[#f8f5f0]">
                  <Image src={img} alt={`Product image ${i + 1}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-lg border-2 border-dashed border-[#e5e5e5] flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors">
                {uploadingImage ? (
                  <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Upload className="h-5 w-5 text-neutral-400 mb-1" />
                    <span className="text-xs text-neutral-400">Upload</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <p className="text-xs text-neutral-400">
              First image is the cover. Recommended: 800×1000px, JPG or PNG.
            </p>
          </div>

          {/* Variants */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Variants</h2>
              <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                <Plus className="h-4 w-4 mr-1" />
                Add Variant
              </Button>
            </div>

            <div className="space-y-3">
              {variants.map((variant, i) => (
                <div key={i} className="grid grid-cols-5 gap-2 items-end">
                  <Select
                    label={i === 0 ? "Size" : ""}
                    value={variant.size}
                    onChange={(e) => updateVariant(i, "size", e.target.value)}
                    options={SIZE_OPTIONS.map((s) => ({ value: s, label: s }))}
                  />
                  <Select
                    label={i === 0 ? "Color" : ""}
                    value={variant.color}
                    onChange={(e) => updateVariant(i, "color", e.target.value)}
                    options={COLOR_OPTIONS.map((c) => ({ value: c, label: c }))}
                  />
                  <Input
                    label={i === 0 ? "Stock" : ""}
                    type="number"
                    min="0"
                    value={variant.stock}
                    onChange={(e) => updateVariant(i, "stock", e.target.value)}
                    required
                  />
                  <Input
                    label={i === 0 ? "Custom Price" : ""}
                    type="number"
                    min="0"
                    step="0.01"
                    value={variant.price}
                    onChange={(e) => updateVariant(i, "price", e.target.value)}
                    placeholder="Leave blank to use base price"
                  />
                  <button
                    type="button"
                    onClick={() => removeVariant(i)}
                    className="h-10 px-3 text-neutral-400 hover:text-red-500 transition-colors"
                    disabled={variants.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="bg-white rounded-xl p-6 space-y-4">
            <h2 className="font-semibold">Pricing</h2>
            <Input
              label="Base Price (ZAR)"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => updateForm("price", e.target.value)}
              placeholder="280.00"
              required
            />
            <Input
              label="Compare-at Price (ZAR)"
              type="number"
              min="0"
              step="0.01"
              value={form.comparePrice}
              onChange={(e) => updateForm("comparePrice", e.target.value)}
              placeholder="350.00"
              hint="Original price shown crossed out"
            />
          </div>

          {/* Organisation */}
          <div className="bg-white rounded-xl p-6 space-y-4">
            <h2 className="font-semibold">Organisation</h2>
            <Input
              label="SKU"
              value={form.sku}
              onChange={(e) => updateForm("sku", e.target.value)}
              placeholder="IPL-TEE-001"
            />
            <Input
              label="Weight (kg)"
              type="number"
              min="0"
              step="0.01"
              value={form.weight}
              onChange={(e) => updateForm("weight", e.target.value)}
              placeholder="0.30"
              hint="Used for shipping calculations"
            />
          </div>

          {/* Visibility */}
          <div className="bg-white rounded-xl p-6 space-y-3">
            <h2 className="font-semibold">Visibility</h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => updateForm("active", e.target.checked)}
                className="h-4 w-4 rounded border-[#e5e5e5] accent-black"
              />
              <span className="text-sm">Active (visible to customers)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateForm("featured", e.target.checked)}
                className="h-4 w-4 rounded border-[#e5e5e5] accent-black"
              />
              <span className="text-sm">Featured on homepage</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
