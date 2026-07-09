"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight, FiMapPin } from "react-icons/fi";
import { IoBedOutline, IoWaterOutline } from "react-icons/io5";
import { BiArea } from "react-icons/bi";
import { MdVerified } from "react-icons/md";

type Property = {
  id: string;
  propertyId: string;
  imageFolder: string;
  title: string;
  price: number;
  beds: number;
  baths: number;
  sqft?: number | null;
  type: string;
  status: string;
  city: string;
  state: string;
};

type RecommendationsSectionProps = {
  baseState?: string;
};

export default function RecommendationsSection({
  baseState = "",
}: RecommendationsSectionProps) {
  const searchParams = useSearchParams();
  const state = searchParams.get("state") || baseState;
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows);
    return () => el.removeEventListener("scroll", updateArrows);
  }, [properties]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/nearby?state=${encodeURIComponent(state)}`)
      .then((r) => r.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [state]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  const neighborStates = [...new Set(properties.map((p) => p.state))];

  if (isMobile) return null;

  return (
    <section className="hidden md:block py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* HEADER — exactly like ExploreCategories */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h3 className="text-lg md:text-2xl font-bold text-gray-900">
              Explore Nearby States
            </h3>
            {state && (
              <p className="mt-1 text-gray-500 text-xs md:text-sm">
                Based on {state}
              </p>
            )}
            {neighborStates.length > 0 && (
              <p className="mt-1 text-gray-500 text-xs md:text-sm">
                {neighborStates.slice(0, 3).join(", ")}
                {neighborStates.length > 3 ? ` +${neighborStates.length - 3} more` : ""}
              </p>
            )}
          </div>

          {/* ARROWS — desktop only */}
          <div className="hidden md:flex items-center gap-2 shrink-0 ml-4">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canLeft}
              className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="text-xl text-gray-700" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canRight}
              className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <FiChevronRight className="text-xl text-gray-700" />
            </button>
          </div>
        </div>

        {/* CARDS — exactly like ExploreCategories */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 min-h-[200px]"
        >
          {loading ? (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 w-[72vw] md:w-72 h-64 rounded-2xl bg-gray-200 animate-pulse"
                />
              ))}
            </>
          ) : (
            properties.map((p) => (
              <Link
                key={p.id}
                href={`/property/${p.propertyId}`}
                className="group shrink-0 w-[39vw] md:w-56 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative w-full h-40 bg-gray-100 overflow-hidden">
                  <img
                    src={`/property-images/${p.imageFolder}/1.webp`}
                    alt={p.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.status === "rent"
                        ? "bg-blue-600 text-white"
                        : "bg-green-600 text-white"
                      }`}>
                      {p.status === "rent" ? "For Rent" : "For Sale"}
                    </span>
                  </div>
                </div>

                <div className="p-3">
                  <p className="text-base font-bold text-gray-900 mb-1">
                    ${p.price.toLocaleString()}
                    {p.status === "rent" && (
                      <span className="text-xs font-normal text-gray-500">/mo</span>
                    )}
                  </p>
                  <div className="flex items-center gap-1 mb-1">
                    <p className="text-xs font-semibold text-gray-800 line-clamp-1">
                      {p.title}
                    </p>
                    <MdVerified className="text-blue-500 shrink-0 text-sm" />
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                    <FiMapPin className="shrink-0 text-xs" />
                    <span className="line-clamp-1">{p.city}, {p.state}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex items-center gap-3 text-gray-600 text-xs">
                    <span className="flex items-center gap-1">
                      <IoBedOutline />{p.beds} Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <IoWaterOutline />{p.baths} Baths
                    </span>
                    <span className="flex items-center gap-1">
                      <BiArea />{p.sqft ? p.sqft.toLocaleString() : "N/A"} sqft
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
