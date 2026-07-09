"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Category = {
    label: string;
    tagline: string;
    image: string;
    icon: string;
    href: string;
};

const CATEGORIES: Category[] = [
    {
        label: "Homes for Sale",
        tagline: "Your dream home is waiting",
        image: "/categories/homes-for-sale.webp",
        icon: "🏠",
        href: "/search?type=Single+Family+Residence&status=sale",
    },
    {
        label: "Apartments",
        tagline: "Modern living, your way",
        image: "/categories/apartments.webp",
        icon: "🏢",
        href: "/search?type=Apartment%7CApartment+building&status=rent",
    },
    {
        label: "Townhomes",
        tagline: "Space, style & community",
        image: "/categories/townhouses.webp",
        icon: "🏘️",
        href: "/search?type=Townhome%7CTownhomes",
    },
    {
        label: "Condos",
        tagline: "Low maintenance, high living",
        image: "/categories/condos.webp",
        icon: "🏙️",
        href: "/search?type=Condo",
    },
    {
        label: "Manufactured Homes",
        tagline: "Affordable comfort, anywhere",
        image: "/categories/new-construction.webp",
        icon: "🏗️",
        href: "/search?type=Manufactured+Home",
    },
    {
        label: "Land & Lots",
        tagline: "Build the life you envision",
        image: "/categories/land.webp",
        icon: "🌿",
        href: "/search?type=Unimproved+Land&status=sale",
    },
    {
        label: "Duplexes",
        tagline: "Live in one, rent the other",
        image: "/categories/luxury.webp",
        icon: "🏠",
        href: "/search?type=Duplex",
    },
    {
        label: "All Rentals",
        tagline: "Find your next rental home",
        image: "/categories/pet-friendly.webp",
        icon: "🔑",
        href: "/search?status=rent",
    },
];

export default function ExploreCategories() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(true);

    const updateArrows = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanLeft(el.scrollLeft > 0);
        setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        updateArrows();
        el.addEventListener("scroll", updateArrows);
        return () => el.removeEventListener("scroll", updateArrows);
    }, []);

    const scroll = (dir: "left" | "right") => {
        scrollRef.current?.scrollBy({
            left: dir === "left" ? -340 : 340,
            behavior: "smooth",
        });
    };

    return (
        <section className="py-14 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* HEADER */}
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                            Explore homes that fit your lifestyle
                        </h2>
                        <p className="mt-2 text-gray-500 text-sm md:text-base">
                            Browse properties by category
                        </p>
                    </div>

                    {/* ARROWS — desktop only */}
                    <div className="hidden md:flex items-center gap-2 shrink-0 ml-4">
                        <button
                            type="button"
                            onClick={() => scroll("left")}
                            disabled={!canLeft}
                            className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:bg-gray-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <FiChevronLeft className="text-xl dark:text-gray-300" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scroll("right")}
                            disabled={!canRight}
                            className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:bg-gray-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <FiChevronRight className="text-xl dark:text-gray-300" />
                        </button>
                    </div>
                </div>

                {/* CARDS — horizontal scroll on all screen sizes */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                >
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.label}
                            href={cat.href}
                            className="group relative shrink-0 w-[39vw] md:w-56 h-48 md:h-64 rounded-2xl overflow-hidden shadow-md"
                        >
                            {/* PHOTO */}
                            <Image
                                src={cat.image}
                                alt={cat.label}
                                fill
                                sizes="(max-width: 768px) 50vw, 224px"
                                className="object-cover transition duration-500 group-hover:scale-105"
                            />

                            {/* OVERLAY */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 group-hover:from-black/60 transition duration-300" />

                            {/* CONTENT */}
                            <div className="absolute inset-0 flex flex-col justify-between p-4">
                                <span className="text-2xl">{cat.icon}</span>
                                <div>
                                    <p className="text-white font-bold text-base md:text-lg leading-tight">
                                        {cat.label}
                                    </p>
                                    <p className="text-white/70 text-xs mt-1">
                                        {cat.tagline}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}