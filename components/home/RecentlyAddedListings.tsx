"use client";

import { useEffect, useRef, useState } from "react";
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

function RecentlyAddedCard({ property }: { property: Property }) {
  const folder = property.imageFolder || property.propertyId;
  const [imageError, setImageError] = useState(false);
  const imgSrc = imageError
    ? getLocalPropertyImageUrl(folder)
    : getPropertyImageUrl(folder);

  return (
    <Link
      href={`/property/${property.propertyId}`}
      className="group shrink-0 w-[62vw] sm:w-72 md:w-72 overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={imgSrc}
          alt={property.title}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="rounded-full bg-black px-2.5 py-1 text-xs font-semibold text-white">
            New
          </span>
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm ${
              property.status === "rent"
                ? "border-blue-200 bg-blue-50/90 text-blue-800"
                : "border-emerald-200 bg-emerald-50/90 text-emerald-800"
            }`}
          >
            {property.status === "rent" ? "For Rent" : "For Sale"}
          </span>
        </div>
      </div>

      <div className="p-3 md:p-4">
        <p className="mb-1 text-lg font-bold text-gray-900 md:text-xl">
          ${property.price.toLocaleString()}
          {property.status === "rent" && (
            <span className="text-xs font-normal text-gray-500">/mo</span>
          )}
        </p>

        <div className="mb-1.5 flex items-center gap-1">
          <p className="line-clamp-1 text-xs font-semibold text-gray-800 md:text-sm">
            {property.title}
          </p>
          <MdVerified className="shrink-0 text-sm text-blue-500" />
        </div>

        <div className="mb-3 flex items-center gap-1 text-xs text-gray-500">
          <FiMapPin className="shrink-0 text-xs" />
          <span className="line-clamp-1">
            {property.city}, {property.state}
          </span>
        </div>

        <div className="flex items-center gap-3 border-t border-gray-100 pt-2.5 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <IoBedOutline />
            {property.beds} Beds
          </span>
          <span className="flex items-center gap-1">
            <IoWaterOutline />
            {property.baths} Baths
          </span>
          <span className="flex items-center gap-1">
            <BiArea />
            {property.sqft ? property.sqft.toLocaleString() : "N/A"} sqft
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function RecentlyAddedListings({
  properties,
}: {
  properties: Property[];
}) {
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
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  if (!properties.length) return null;

  return (
    <section className="bg-gray-100 py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 md:text-4xl">
              Recently Added Properties
            </h2>
            <p className="mt-2 text-sm text-gray-500 md:text-base">
              The latest homes and rentals added to Hitts Homes
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

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {properties.map((property) => (
            <RecentlyAddedCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
