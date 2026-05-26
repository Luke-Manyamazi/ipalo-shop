import Link from "next/link";
import Image from "next/image";
import { AlertCircle } from "lucide-react";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4">
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
        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-5">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-[#0a0a0a] mb-2">
            Authentication Error
          </h1>

          <p className="text-sm text-neutral-500 leading-relaxed mb-7">
            Something went wrong during sign in. This can happen if a link has
            expired or an unexpected error occurred. Please try again.
          </p>

          <Link
            href="/auth/login"
            className="block w-full bg-[#0a0a0a] text-white py-3 rounded-full text-sm font-medium hover:bg-[#c9a96e] transition-colors duration-300"
          >
            Try again
          </Link>
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
