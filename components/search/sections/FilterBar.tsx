"use client";

import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { useMemo } from "react";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "For Rent", value: "rent" },
  { label: "For Sale", value: "sale" },
];

const propertyTypes = [
  { label: "All Homes", value: "all" },
  { label: "Apartment", value: "Apartment" },
  { label: "Apartment Building", value: "Apartment building" },
  { label: "Condo", value: "Condo" },
  { label: "Townhome", value: "Townhome" },
  { label: "Townhomes", value: "Townhomes" },
  { label: "Single Family", value: "Single Family Residence" },
  { label: "Manufactured", value: "Manufactured Home" },
  { label: "Land", value: "Unimproved Land" },
  { label: "Duplex", value: "Duplex" },
];

export default function FilterBar() {
  const { filters, updateFilters } = useSearchParamsState();

  // ✅ FIXED: safe comparator (no TS errors, no key mismatch issues)
  const isActive = useMemo(() => {
    return (key: keyof typeof filters, value: string) =>
      filters[key] === value;
  }, [filters]);

  const handleUpdate = (key: keyof typeof filters, value: string) => {
    if (value === "all") {
      updateFilters({ [key]: "all" });
    } else {
      updateFilters({ [key]: value });
    }
  };

  return (
    <div className="w-full bg-white border-b sticky top-[64px] z-40">
      
      {/* SCROLL ROW */}
      <div className="
        flex items-center gap-2 px-3 py-3
        overflow-x-auto no-scrollbar scroll-smooth
        whitespace-nowrap
      ">

        {/* CONTEXT LABEL */}
        <div className="px-3 text-sm text-gray-500 shrink-0">
          {filters.q ? (
            <span>
              Results for{" "}
              <span className="text-black font-medium">
                &ldquo;{filters.q}&rdquo;
              </span>
            </span>
          ) : (
            <span className="text-black font-medium">All Homes</span>
          )}
        </div>

        <div className="w-px h-5 bg-gray-200 mx-1 shrink-0" />

        {/* STATUS */}
        {statusOptions.map((item) => {
          const active = isActive("status", item.value);

          return (
            <button
              key={item.value}
              onClick={() => handleUpdate("status", item.value)}
              className={`
                px-4 py-2 rounded-full text-sm border shrink-0
                transition-all duration-200
                active:scale-95
                ${
                  active
                    ? "bg-black text-white border-black shadow-sm"
                    : "bg-white text-black border-gray-200 hover:border-gray-400"
                }
              `}
            >
              {item.label}
            </button>
          );
        })}

        <div className="w-px h-5 bg-gray-200 mx-2 shrink-0" />

        {/* TYPE */}
        {propertyTypes.map((item) => {
          const active = isActive("type", item.value);

          return (
            <button
              key={item.value}
              onClick={() => handleUpdate("type", item.value)}
              className={`
                px-4 py-2 rounded-full text-sm border shrink-0
                transition-all duration-200
                active:scale-95
                ${
                  active
                    ? "bg-black text-white border-black shadow-sm"
                    : "bg-white text-black border-gray-200 hover:border-gray-400"
                }
              `}
            >
              {item.label}
            </button>
          );
        })}

      </div>
    </div>
  );
}
