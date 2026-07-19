"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function useSearch(defaultSuggestions: string[]) {
  const router = useRouter();

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
