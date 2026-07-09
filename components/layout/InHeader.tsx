"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function InHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="mx-auto px-4 h-14 flex items-center justify-between">

        {/* LEFT - BACK */}
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-black font-medium hover:bg-gray-100 px-2 py-1 rounded-md"
        >
          <FiArrowLeft className="text-lg" />
          <span className="text-sm">Back</span>
        </button>

        {/* CENTER - LOGO */}
        <Link
          href="/"
          className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2"
        >
          <img
            src="/logo/logo.png"
            alt="Hitts Homes"
            className="h-6 w-6 object-contain"
          />
          <span className="font-semibold text-black text-sm md:text-base">
            Hitts Homes and Properties
          </span>
        </Link>

        {/* RIGHT - REQUEST */}
        <Link
          href="/request-property"
          className="border border-black text-black px-3 py-1.5 rounded-md text-sm hover:bg-black hover:text-white transition"
        >
          <span className="md:hidden">Request</span>
          <span className="hidden md:inline">Request Property</span>
        </Link>

      </div>
    </header>
  );
}