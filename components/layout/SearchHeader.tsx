"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import Image from "next/image";

export default function SearchHeader() {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleSearch = () => {
    const q = input.trim();
    if (!q) return;

    const target = `/search?q=${encodeURIComponent(q)}`;

    if (typeof window !== "undefined") {
      const current = `${window.location.pathname}${window.location.search}`;

      if (current === target) return;
    }

    router.push(target);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">

      {/* MOBILE */}
      <div className="flex md:hidden justify-between gap-3 px-4 py-3">

        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-600 bg-gray-100 transition shrink-0"
        >
          <FiArrowLeft className="text-xl text-black" />
        </button>

        {/* LOGO */}
        <Link
          href="/"
        >
          <div className="relative w-12 h-10 shrink-0">
            <Image
              src="/logo/logobg.png"
              alt="Hitts Homes"
              fill
              className="object-contain"
            />

          </div>
        </Link>

        {/* SEARCH BAR */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2" style={{ width: "40%" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search city, state"
            className="flex-1 outline-none text-sm text-black bg-transparent"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="text-gray-500 hover:text-black transition"
          >
            <FiSearch className="text-base" />
          </button>
        </div>


      </div>

      {/* DESKTOP */}
      <div className="hidden md:grid grid-cols-3 items-center px-6 py-3 gap-4">

        {/* LEFT — BACK BUTTON */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-black hover:text-black transition group"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 group-hover:bg-gray-600 bg-gray-100 transition">
              <FiArrowLeft className="text-base" />
            </span>
            Back
          </button>
        </div>

        {/* CENTER — LOGO + NAME */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2"
        >
          <div className="relative w-10 h-10">
            <Image
              src="/logo/logobg.png"
              alt="Hitts Homes"
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>

          <span className="font-semibold text-base text-black whitespace-nowrap">
            Hitts Homes & Properties
          </span>
        </Link>

        {/* RIGHT — SEARCH BAR */}
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 w-[280px] hover:border-gray-400 transition">
            <FiSearch className="text-gray-400 shrink-0 text-sm" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search city, address, ZIP..."
              className="flex-1 outline-none text-sm text-black bg-transparent"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="text-xs font-semibold text-black hover:text-gray-600 transition shrink-0"
            >
              Search
            </button>
          </div>
        </div>

      </div>

    </header>
  );
}
