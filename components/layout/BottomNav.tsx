"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiKey, FiShoppingBag, FiUser, FiGrid } from "react-icons/fi";

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)]">
            <div className="grid grid-cols-5 text-xs">

                <Link href="/" className="flex flex-col items-center py-2">
                    <FiHome className={`text-xl ${isActive("/") ? "text-black" : "text-gray-500"}`} />
                    <span className={isActive("/") ? "text-black" : "text-gray-500"}>Home</span>
                </Link>

                <Link href="/search?status=rent" className="flex flex-col items-center py-2">
                    <FiKey className={`text-xl ${isActive("/search?status=rent") ? "text-black" : "text-gray-500"}`} />
                    <span className={isActive("/search?status=rent") ? "text-black" : "text-gray-500"}>For Rent</span>
                </Link>

                <Link href="/search?status=sale" className="flex flex-col items-center py-2">
                    <FiShoppingBag className={`text-xl ${isActive("/search?status=sale") ? "text-black" : "text-gray-500"}`} />
                    <span className={isActive("/search?status=sale") ? "text-black" : "text-gray-500"}>For Sale</span>
                </Link>

                <Link href="/agent" className="flex flex-col items-center py-2">
                    <FiUser className={`text-xl ${isActive("/agent") ? "text-black" : "text-gray-500"}`} />
                    <span className={isActive("/agent") ? "text-black" : "text-gray-500"}>Agent Hitts</span>
                </Link>

                <Link href="/menu" className="flex flex-col items-center py-2">
                    <FiGrid className={`text-xl ${isActive("/menu") ? "text-black" : "text-gray-500"}`} />
                    <span className={isActive("/menu") ? "text-black" : "text-gray-500"}>Menu</span>
                </Link>

            </div>
        </nav>
    );
}