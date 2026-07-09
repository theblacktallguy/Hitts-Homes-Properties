"use client";

import { MdVerified } from "react-icons/md";

type Props = {
    title: string;
    city: string;
    state: string;
    address: string;
    listingType: string[];
    rentPrice: number | null;
    salePrice: number | null;
    propertyId: string | number;
};

export default function PropertyHeroHeader({
    title,
    city,
    state,
    address,
    listingType,
    rentPrice,
    salePrice,
    propertyId,
}: Props) {
    const isRent = listingType?.includes("rent");

    const price = isRent ? rentPrice : salePrice;

    return (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-6">

            {/* TOP: VERIFIED + TITLE */}
            <div className="flex items-start gap-2">

                <h1 className="text-xl md:text-3xl font-bold text-gray-900 leading-snug">
                    {title}
                </h1>

                <MdVerified className="text-blue-500 text-xl mt-1" />
            </div>

            {/* PRICE */}
            <div className="mt-3">
                <p className="text-2xl md:text-4xl font-bold text-gray-900">
                    ${price?.toLocaleString()}
                    {isRent && (
                        <span className="text-base font-medium text-gray-500 ml-1">
                            /mo
                        </span>
                    )}
                </p>

                {isRent && (
                    <p className="text-sm text-gray-500 mt-1">
                        Total monthly price
                    </p>
                )}
            </div>

            {/* LOCATION + STATUS */}
            <div className="mt-3 flex flex-row md:flex-row md:items-center justify-between gap-20">

                <p className="text-sm text-gray-500">
                    {city}, {state} • {address}
                </p>

                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${isRent
                            ? "bg-blue-600 text-white"
                            : "bg-green-600 text-white"
                        }`}
                >
                    {isRent ? "For Rent" : "For Sale"}
                </span>
            </div>

            {/* PROPERTY ID */}
            <div className="mt-3">
                <p className="text-xs font-medium text-gray-400">
                    Property ID: <span className="text-gray-600">{propertyId}</span>
                </p>
            </div>
        </div>
    );
}