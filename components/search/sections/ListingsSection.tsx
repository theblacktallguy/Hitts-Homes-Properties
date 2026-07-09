"use client";

import { Property } from "@/lib/searchTypes";
import PropertyCard from "./PropertyCard";

type Props = {
  properties: Property[];
  loading?: boolean;
};

export default function ListingsSection({ properties, loading }: Props) {
  if (loading) {
    return (
      <div className="flex flex-col gap-3 md:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-32 md:h-28 bg-gray-200 animate-pulse rounded-xl"
          />
        ))}
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="text-center py-16 md:py-20 text-gray-500">
        No listings found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ">
      {properties.map((property) => (
        <PropertyCard
          key={property.id || `${property.title}-${Math.random()}`}
          property={property}
        />
      ))}
    </div>
  );
}