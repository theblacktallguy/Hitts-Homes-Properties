"use client";

import { useSearchParamsState } from "@/hooks/useSearchParamsState";

type Props = {
  total: number;
};

export default function ResultsContextHeader({ total }: Props) {
  const { filters } = useSearchParamsState();

  const buildTitle = () => {
    const typeLabel =
      filters.type === "all"
        ? "Homes"
        : filters.type === "apartment"
        ? "Apartments"
        : filters.type === "condo"
        ? "Condos"
        : filters.type === "townhome"
        ? "Townhomes"
        : filters.type === "single_family"
        ? "Homes"
        : filters.type === "duplex"
        ? "Duplexes"
        : "Properties";

    const statusLabel =
      filters.status === "sale"
        ? "for sale"
        : filters.status === "rent"
        ? "for rent"
        : "for rent or sale";

    const location = filters.q?.trim();

    if (location) {
      return (
        <>
          {typeLabel} {statusLabel} in{" "}
          <span className="font-semibold text-black">
            "{location}"
          </span>
        </>
      );
    }

    return `${typeLabel} ${statusLabel}`;
  };

  const buildFiltersSummary = () => {
    const parts: string[] = [];

    if (filters.status && filters.status !== "all") {
      parts.push(filters.status === "rent" ? "For Rent" : "For Sale");
    }

    if (filters.type && filters.type !== "all") {
      parts.push(filters.type.replace("_", " "));
    }

    if (filters.sortBy && filters.sortBy !== "relevance") {
      parts.push(
        filters.sortBy === "price_asc"
          ? "Price low → high"
          : filters.sortBy === "price_desc"
          ? "Price high → low"
          : filters.sortBy
      );
    }

    return parts.join(" • ");
  };

  return (
    <div className="px-4 py-4 space-y-1 border-b bg-white">

      {/* TITLE */}
      <h1 className="text-lg font-semibold text-black">
        {buildTitle()}
      </h1>

      {/* COUNT */}
      <p className="text-sm text-gray-600">
        {total.toLocaleString()} results
      </p>

      {/* FILTER SUMMARY */}
      {buildFiltersSummary() && (
        <p className="text-xs text-gray-500">
          {buildFiltersSummary()}
        </p>
      )}

    </div>
  );
}