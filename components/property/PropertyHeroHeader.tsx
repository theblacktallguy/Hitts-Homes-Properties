"use client";

import Link from "next/link";
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
    applyHref: string;
    requestTourHref: string;
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
    applyHref,
    requestTourHref,
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

            <div className="mt-5 grid gap-6 md:grid-cols-[7fr_3fr] md:items-start">
                <div>
                    <p className="text-2xl md:text-4xl font-bold text-gray-900">
                        ${price?.toLocaleString()}
                        {isRent && (
                            <span className="ml-1 text-base font-medium text-gray-500">
                                /mo
                            </span>
                        )}
                    </p>

                    {isRent && (
                        <p className="mt-1 text-sm text-gray-500">
                            Total monthly price
                        </p>
                    )}

                    <p className="mt-3 text-sm text-gray-500">
                        {city}, {state} • {address}
                    </p>

                    <p className="mt-3 text-xs font-medium text-gray-400">
                        Property ID: <span className="text-gray-600">{propertyId}</span>
                    </p>
                </div>

                <div className="hidden md:grid gap-3">
                    <Link
                        href={applyHref}
                        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#132e52]"
                    >
                        Apply Now
                    </Link>
                    <Link
                        href={requestTourHref}
                        className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#0B1F3A] bg-white px-5 py-3 text-sm font-semibold text-[#0B1F3A] transition hover:bg-slate-50"
                    >
                        Request Tour
                    </Link>
                </div>
            </div>
        </div>
    );
}
