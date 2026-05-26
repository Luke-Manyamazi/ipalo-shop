"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, UserPlus, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice] = useState(
    "Registration is currently by invitation only. Contact hello@ipalo.co.za to request access."
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // /api/auth/register does not exist yet — do nothing.
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    // The notice is always shown; no further action.
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image
              src="/logo-full.png"
              alt="ipalo"
              width={140}
              height={50}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-8">
          <div className="mb-6">
            <h1 className="text-xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Join ipalo to track orders and more.
            </p>
          </div>

          {/* Invitation-only notice */}
          <div className="mb-5 flex items-start gap-3 px-4 py-3.5 bg-[#c9a96e]/8 border border-[#c9a96e]/30 rounded-xl">
            <Mail className="h-4 w-4 text-[#c9a96e] mt-0.5 flex-shrink-0" />
            <p className="text-xs text-[#0a0a0a] leading-relaxed">
              {notice.split("hello@ipalo.co.za")[0]}
              <a
                href="mailto:hello@ipalo.co.za"
                className="text-[#c9a96e] hover:underline font-medium"
              >
                hello@ipalo.co.za
              </a>
              {notice.split("hello@ipalo.co.za")[1]}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 opacity-60 pointer-events-none select-none" aria-hidden="true">
            <Input
              label="Full name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              autoComplete="name"
              tabIndex={-1}
            />

            <Input
              label="Email address"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              tabIndex={-1}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="new-password"
                tabIndex={-1}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-neutral-400 hover:text-black transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirm password"
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="new-password"
                tabIndex={-1}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-[34px] text-neutral-400 hover:text-black transition-colors"
                tabIndex={-1}
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={loading}
              tabIndex={-1}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create account
            </Button>
          </form>

          <div className="mt-5 pt-5 border-t border-[#f0f0f0] text-center">
            <p className="text-sm text-neutral-500">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-black hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-6">
          <Link href="/" className="hover:text-black transition-colors">
            ← Back to store
          </Link>
        </p>
      </div>
    </div>
  );
}
