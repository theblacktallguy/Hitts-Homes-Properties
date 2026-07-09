"use client";

import { useSearchParamsState } from "@/hooks/useSearchParamsState";

const RENT_RANGES = [
  { label: "Under $500/mo", min: "", max: "500" },
  { label: "$500 - $1,000/mo", min: "500", max: "1000" },
  { label: "$1,000 - $2,000/mo", min: "1000", max: "2000" },
  { label: "$2,000 - $3,000/mo", min: "2000", max: "3000" },
  { label: "$3,000+/mo", min: "3000", max: "" },
];

const SALE_RANGES = [
  { label: "Under $100k", min: "", max: "100000" },
  { label: "$100k - $300k", min: "100000", max: "300000" },
  { label: "$300k - $500k", min: "300000", max: "500000" },
  { label: "$500k - $1M", min: "500000", max: "1000000" },
  { label: "$1M+", min: "1000000", max: "" },
];

export default function BudgetSidebar() {
  const { filters, updateFilters } = useSearchParamsState();

  const isRent = filters.status === "rent";
  const ranges = isRent ? RENT_RANGES : SALE_RANGES;

  const isActive = (min: string, max: string) =>
    filters.minPrice === min && filters.maxPrice === max;

  const handleSelect = (min: string, max: string) => {
    if (isActive(min, max)) {
      // clicking active range clears it
      updateFilters({ minPrice: "", maxPrice: "" });
    } else {
      updateFilters({ minPrice: min, maxPrice: max });
    }
  };

  const clearBudget = () => {
    updateFilters({ minPrice: "", maxPrice: "" });
  };

  const hasActive = filters.minPrice || filters.maxPrice;

  return (
    <aside className="hidden md:block w-64 shrink-0">
      <div className="sticky top-36 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-900">
            Search by Budget
          </h3>
          {hasActive && (
            <button
              type="button"
              onClick={clearBudget}
              className="text-xs text-gray-400 hover:text-black transition"
            >
              Clear
            </button>
          )}
        </div>

        {/* TOGGLE — rent vs sale */}
        <div className="flex rounded-full border border-gray-200 p-0.5 mb-4">
          <button
            type="button"
            onClick={() => updateFilters({ status: "rent", minPrice: "", maxPrice: "" })}
            className={`flex-1 text-xs font-semibold py-1.5 rounded-full transition ${
              isRent ? "bg-black text-white" : "text-gray-500"
            }`}
          >
            For Rent
          </button>
          <button
            type="button"
            onClick={() => updateFilters({ status: "sale", minPrice: "", maxPrice: "" })}
            className={`flex-1 text-xs font-semibold py-1.5 rounded-full transition ${
              !isRent ? "bg-black text-white" : "text-gray-500"
            }`}
          >
            For Sale
          </button>
        </div>

        {/* RANGES */}
        <div className="flex flex-col gap-2">
          {ranges.map((range) => (
            <button
              key={range.label}
              type="button"
              onClick={() => handleSelect(range.min, range.max)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition ${
                isActive(range.min, range.max)
                  ? "bg-black text-white font-semibold"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* ACTIVE BUDGET DISPLAY */}
        {hasActive && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Showing properties{" "}
              {filters.minPrice && filters.maxPrice
                ? `between $${parseInt(filters.minPrice).toLocaleString()} and $${parseInt(filters.maxPrice).toLocaleString()}`
                : filters.minPrice
                ? `above $${parseInt(filters.minPrice).toLocaleString()}`
                : `under $${parseInt(filters.maxPrice).toLocaleString()}`}
            </p>
          </div>
        )}

      </div>
    </aside>
  );
}