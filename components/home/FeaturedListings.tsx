"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiMapPin } from "react-icons/fi";
import { IoBedOutline, IoWaterOutline } from "react-icons/io5";
import { BiArea } from "react-icons/bi";
import { MdVerified } from "react-icons/md";
import {
  getLocalPropertyImageUrl,
  getPropertyImageUrl,
} from "@/lib/propertyImages";

type Property = {
  id: string;
  propertyId: string;
  imageFolder: string;
  imageCount: number;
  title: string;
  price: number;
  beds: number;
  baths: number;
  sqft?: number | null;
  type: string;
  status: string;
  address: string;
  city: string;
  state: string;
};

function PropertyCard({ property }: { property: Property }) {
  const [imgIndex, setImgIndex] = useState(1);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  const folder = property.imageFolder || property.propertyId;
  const totalImages = Math.max(property.imageCount || 1, 1);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((i) => (i <= 1 ? totalImages : i - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((i) => (i >= totalImages ? 1 : i + 1));
  };

  const imgSrc = imgError[imgIndex]
    ? getLocalPropertyImageUrl(folder)
    : getPropertyImageUrl(folder, imgIndex);

  return (
    <Link
      href={`/property/${property.propertyId}`}
      className="group w-full md:flex-none md:w-72 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      {/* IMAGE */}
      <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
        <img
          src={imgSrc}
          alt={property.title}
          onError={() =>
            setImgError((prev) => ({ ...prev, [imgIndex]: true }))
          }
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* BADGE */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            property.status === "rent"
              ? "bg-blue-600 text-white"
              : "bg-green-600 text-white"
          }`}>
            {property.status === "rent" ? "For Rent" : "For Sale"}
          </span>
        </div>

        {/* IMAGE NAV */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition"
        >
          <FiChevronLeft className="text-white text-sm" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition"
        >
          <FiChevronRight className="text-white text-sm" />
        </button>

        {/* DOTS */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {[1, 2, 3, 4, 5].map((dot) => (
            <span
              key={dot}
              className={`block w-1.5 h-1.5 rounded-full transition ${
                imgIndex === dot ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
          {imgIndex > 5 && (
            <span className="block w-1.5 h-1.5 rounded-full bg-white" />
          )}
        </div>
      </div>

      {/* CARD BODY */}
      <div className="p-3 md:p-4">
        <p className="text-lg md:text-xl font-bold text-gray-900 mb-1">
          ${property.price.toLocaleString()}
          {property.status === "rent" && (
            <span className="text-xs font-normal text-gray-500">/mo</span>
          )}
        </p>

        <div className="flex items-center gap-1 mb-1.5">
          <p className="text-xs md:text-sm font-semibold text-gray-800 line-clamp-1">
            {property.title}
          </p>
          <MdVerified className="text-blue-500 shrink-0 text-sm" />
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
          <FiMapPin className="shrink-0 text-xs" />
          <span className="line-clamp-1">{property.city}, {property.state}</span>
        </div>

        <div className="border-t border-gray-100 pt-2.5 flex items-center gap-3 text-gray-600 text-xs">
          <span className="flex items-center gap-1">
            <IoBedOutline />{property.beds} Beds
          </span>
          <span className="flex items-center gap-1">
            <IoWaterOutline />{property.baths} Baths
          </span>
          <span className="flex items-center gap-1">
            <BiArea />{property.sqft ? property.sqft.toLocaleString() : "N/A"} sqft
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedListings({ properties }: { properties: Property[] }) {
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
    el.addEventListener("scroll", updateArrows, { passive: true });
    return () => el.removeEventListener("scroll", updateArrows);
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-14 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              Featured Listings
            </h2>
            <p className="mt-2 text-gray-500 text-sm md:text-base">
              Handpicked properties just for you
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canLeft}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 border border-gray-300 transition hover:bg-gray-100 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canRight}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 border border-gray-300 transition hover:bg-gray-100 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div
          ref={scrollRef}
          className="grid grid-cols-2 md:flex gap-4 md:overflow-x-auto md:scrollbar-hide md:scroll-smooth pb-4"
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-800 transition"
          >
            View All Properties
          </Link>
        </div>

      </div>
    </section>
  );
}
