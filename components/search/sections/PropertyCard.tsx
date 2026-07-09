"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi";
import { IoBedOutline, IoWaterOutline } from "react-icons/io5";
import { BiArea } from "react-icons/bi";
import { MdVerified } from "react-icons/md";
import { Property } from "@/lib/searchTypes";

export default function PropertyCard({ property }: { property: Property }) {
    const [imgIndex, setImgIndex] = useState(1);
    const [imgError, setImgError] = useState<Record<number, boolean>>({});
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    const folder = property.imageFolder || property.propertyId;
    const totalImages = Math.max(property.imageCount || property.images?.length || 1, 1);

    const imgSrc = imgError[imgIndex]
        ? `/property-images/${folder}/1.webp`
        : `/property-images/${folder}/${imgIndex}.webp`;

    const prev = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setImgIndex((i) => Math.max(1, i - 1));
    };

    const next = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setImgIndex((i) => Math.min(totalImages, i + 1));
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 40) {
            if (diff > 0) {
                setImgIndex((i) => Math.min(totalImages, i + 1));
            } else {
                setImgIndex((i) => Math.max(1, i - 1));
            }
        }
    };

    return (
        <Link
            href={`/property/${property.propertyId}`}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden block"
        >
            {/* IMAGE */}
            <div
                className="relative w-full h-48 bg-gray-100 overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <img
                    src={imgSrc}
                    alt={property.title}
                    onError={() => setImgError((prev) => ({ ...prev, [imgIndex]: true }))}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* FOR SALE / FOR RENT BADGE */}
                <div className="absolute top-3 left-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${property.status === "rent"
                        ? "bg-blue-600 text-white"
                        : "bg-green-600 text-white"
                        }`}>
                        {property.status === "rent" ? "For Rent" : "For Sale"}
                    </span>
                </div>

                {/* IMAGE COUNTER */}
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                    {imgIndex} / {totalImages}
                </div>

                {/* ARROWS — desktop only */}
                <button
                    type="button"
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition hidden md:flex"
                >
                    <span className="text-white text-sm">‹</span>
                </button>
                <button
                    type="button"
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition hidden md:flex"
                >
                    <span className="text-white text-sm">›</span>
                </button>
            </div>

            {/* CARD BODY */}
            <div className="p-3 flex flex-col gap-2">

                {/* MAIN ROW — LEFT INFO + RIGHT PRICE */}
                <div className="flex items-start justify-between gap-2">

                    {/* LEFT — TITLE + TYPE + LOCATION */}
                    <div className="flex flex-col gap-1 flex-1 min-w-0">

                        {/* TITLE + VERIFIED */}
                        <div className="flex items-center gap-1">
                            <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight">
                                {property.title}
                            </p>
                            <MdVerified className="text-blue-500 shrink-0 text-sm" />
                        </div>

                        {/* PROPERTY TYPE */}
                        <span className="self-start text-xs font-medium text-gray-500 px-2 py-0.5 rounded-full">
                            {property.type}
                        </span>

                        {/* LOCATION */}
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <FiMapPin className="shrink-0 text-xs" />
                            <span className="line-clamp-1">{property.city}, {property.state}</span>
                        </div>

                    </div>

                    {/* RIGHT — PRICE */}
                    <div className="flex flex-col items-end shrink-0">
                        <p className="text-base font-black text-gray-900 leading-tight">
                            ${property.price.toLocaleString()}
                            {property.status === "rent" && (
                                <span className="text-xs font-normal text-gray-400">/mo</span>
                            )}
                        </p>

                    </div>

                </div>

                {/* STATS */}
                <div className="border-t border-gray-100 pt-2 flex justify-between gap-3 text-gray-500 text-xs">
                    <span className="flex items-center gap-1">
                        <IoBedOutline />
                        {property.beds} Bd
                    </span>
                    <span className="flex items-center gap-1">
                        <IoWaterOutline />
                        {property.baths} Ba
                    </span>
                    <span className="flex items-center gap-1">
                        <BiArea />
                        {property.sqft ? property.sqft.toLocaleString() : "N/A"}
                    </span>
                </div>

            </div>
        </Link>
    );
}
