"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { primaryLinks, menuGroups } from "@/constants/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

        {/* ================= MOBILE (hidden on md+) ================= */}
        <div className="flex md:hidden items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/logo.png"
              alt="Hitts Homes"
              width={54}
              height={44}
              className="object-contain"
            />
            <span className="font-semibold text-s text-black whitespace-nowrap">
              Hitts Homes & Properties
            </span>
          </Link>

          <Link
            href="/request-property"
            className="rounded-full bg-black text-white px-3 py-2 text-xs font-semibold"
          >
            Request
          </Link>
        </div>

        {/* ================= DESKTOP (hidden on mobile) ================= */}
        <div className="hidden md:grid grid-cols-[48px_1fr_auto_auto] lg:grid-cols-[auto_1fr_auto_auto] items-center gap-2 h-16 px-6">
          
          {/* Menu button */}
          <button
            type="button"
            onClick={openMenu}
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-100 transition"
            aria-label="Open menu"
          >
            <FiMenu className="text-2xl text-black pointer-events-none" />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="justify-self-center lg:justify-self-start flex items-center gap-2"
          >
            <Image
              src="/logo/logo.png"
              alt="Hitts Homes"
              width={54}
              height={44}
              className="object-contain"
            />
            <span className="font-semibold text-lg text-black whitespace-nowrap">
              Hitts Homes & Properties
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
            {primaryLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-black">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/request-property"
            className="justify-self-end inline-flex items-center justify-center rounded-full bg-black text-white px-5 py-2 text-sm font-semibold hover:bg-gray-800 transition"
          >
            Request Property
          </Link>
        </div>

      </header>

      {/* ================= MENU OVERLAY ================= */}
      {open && (
        <div className="fixed inset-0 z-[999]">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={closeMenu}
            aria-label="Close menu"
          />

          <aside className="relative h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
            <div className="h-16 px-4 flex items-center justify-between border-b">
              <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
                <Image src="/logo/logoh.png" alt="Hitts Homes" width={32} height={32} />
                <span className="font-semibold text-lg text-black">Hitts Homes</span>
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
                aria-label="Close menu"
              >
                <FiX className="text-2xl text-black" />
              </button>
            </div>

            <div className="p-5 space-y-7">
              {menuGroups.map((group) => (
                <section key={group.title}>
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                    {group.title}
                  </h2>
                  <div className="grid gap-1">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className="py-2 text-base text-gray-800 hover:text-black"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}