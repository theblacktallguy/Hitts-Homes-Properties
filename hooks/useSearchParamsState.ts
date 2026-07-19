"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export type SearchFilters = {
  q: string;
  type: string;
  status: string;
  sortBy: string;
  minPrice: string;
  maxPrice: string;
};

export function useSearchParamsState() {
  const router = useRouter();
  const params = useSearchParams();

  const filters: SearchFilters = useMemo(() => {
    return {
      q: params.get("q") || "",
      type: params.get("type") || "all",
      status: params.get("status") || "all",
      sortBy: params.get("sortBy") || "relevance",
      minPrice: params.get("minPrice") || "",
      maxPrice: params.get("maxPrice") || "",
    };
  }, [params]);

  const updateFilters = (updates: Partial<SearchFilters>) => {
    const next = new URLSearchParams(params.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });

    const queryString = next.toString();
    const target = queryString ? `/search?${queryString}` : "/search";

    if (typeof window !== "undefined") {
      const current = `${window.location.pathname}${window.location.search}`;

      if (current === target) return;
    }

    router.push(target);
  };

  return { filters, updateFilters };
}
