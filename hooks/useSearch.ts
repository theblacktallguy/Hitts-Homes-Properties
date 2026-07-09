"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRouteLoading } from "@/hooks/useRouteLoading";

export function useSearch(defaultSuggestions: string[]) {
  const router = useRouter();
  const { setLoading } = useRouteLoading();

  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const activeSuggestion = defaultSuggestions[index];

  const search = (value?: string) => {
    const finalQuery = (value ?? query).trim() || activeSuggestion;
    const target = `/search?q=${encodeURIComponent(finalQuery)}`;

    if (typeof window !== "undefined") {
      const current = `${window.location.pathname}${window.location.search}`;

      if (current === target) return;
    }

    setLoading(true);
    router.push(target);
  };

  const rotate = () => {
    setIndex((prev) => (prev + 1) % defaultSuggestions.length);
  };

  return {
    query,
    setQuery,
    index,
    setIndex,
    activeSuggestion,
    search,
    rotate,
  };
}
