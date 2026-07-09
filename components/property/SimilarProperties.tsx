import Link from "next/link";
import { FaBath, FaBed, FaRulerCombined } from "react-icons/fa";
import { MdVerified } from "react-icons/md";


type SimilarProperty = {
    propertyId: string;
    title: string;
    city: string;
    state: string;
    price: number;
    bedrooms: number;
    bathrooms: number | null;
    sqft: number;
    imageFolder: string;
    listingType: string;
};

type Props = {
    properties: SimilarProperty[];
};

function formatPrice(price: number, listingType: string) {
    const value = `$${price.toLocaleString()}`;

    return listingType === "rent" ? `${value}/mo` : value;
}

export default function SimilarProperties({ properties }: Props) {
    if (!properties.length) return null;

    return (
        <section className="px-4 md:px-0 pb-16">
            <div className="mb-5 flex items-end justify-center gap-4">
                <div>
                    <p className="text-sm font-semibold uppercase text-center tracking-wide text-blue-600">
                        Keep exploring
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-gray-950">
                        Similar properties
                    </h2>
                </div>

            </div>

            <div
                className="-mx-4 flex overflow-x-auto px-4 pb-3 md:mx-0 md:px-0 py-6"
                style={{
                    gap: "16px",
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                }}
            >
                {properties.map((property) => {
                    const isRent = property.listingType === "rent";

                    return (
                        <Link
                            key={property.propertyId}
                            href={`/property/${property.propertyId}`}
                            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                            style={{
                                flex: "0 0 auto",
                                width: "min(82vw, 360px)",
                                minWidth: "260px",
                                maxWidth: "360px",
                                scrollSnapAlign: "start",
                            }}
                        >
                            <div className="relative h-48 overflow-hidden bg-gray-200">
                                <img
                                    src={`/property-images/${property.imageFolder}/1.webp`}
                                    alt={property.title}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />

                                <span
                                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white ${isRent ? "bg-blue-600" : "bg-green-600"
                                        }`}
                                >
                                    {isRent ? "For Rent" : "For Sale"}
                                </span>
                            </div>

                            <div className="p-4">
                                <p className="text-xl font-black text-gray-950">
                                    {formatPrice(property.price, property.listingType)}
                                </p>

                                <div className="flex items-center gap-1">
                                                            <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight">
                                                                {property.title}
                                                            </p>
                                                            <MdVerified className="text-blue-500 shrink-0 text-sm" />
                                                        </div>

                                <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                                    {property.city}, {property.state}
                                </p>

                                <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-gray-600">
                                    <span className="flex items-center gap-1.5">
                                        <FaBed className="text-gray-400" />
                                        {property.bedrooms} bd
                                    </span>

                                    {property.bathrooms !== null && (
                                        <span className="flex items-center gap-1.5">
                                            <FaBath className="text-gray-400" />
                                            {property.bathrooms} ba
                                        </span>
                                    )}

                                    <span className="flex items-center gap-1.5">
                                        <FaRulerCombined className="text-gray-400" />
                                        {property.sqft.toLocaleString()} sqft
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}