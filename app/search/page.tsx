import { prisma } from "@/lib/prisma";
import SearchLayout from "@/components/search/layout/SearchLayout";
import { mapProperty } from "@/lib/mappers/mapProperty";
import { normalizeStateName } from "@/lib/stateNames";

import {
  getCache,
  setCache,
  createCacheKey,
} from "@/lib/searchCache";

function parseLocationQuery(query: string) {
  const normalized = query.trim().replace(/\s+/g, " ");

  const [city, state, ...rest] = normalized.includes(",")
    ? normalized
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)
    : [
      normalized.replace(/\s+[A-Z]{2}$/i, "").trim(),
      normalized.match(/\s+([A-Z]{2})$/i)?.[1] || "",
    ];

  if (!city || !state || rest.length > 0) {
    return null;
  }

  return {
    city,
    state: normalizeStateName(state),
  };
}

export default async function SearchPage(
  props: {
    searchParams: Promise<Record<string, string | undefined>>;
  }
) {
  const searchParams = await props.searchParams;

  const q = searchParams.q || "";
  const status = searchParams.status || "all";
  const type = searchParams.type || "all";
  const state = searchParams.state ? normalizeStateName(searchParams.state) : "all";
  const petFriendly = searchParams.petFriendly === "true";
  const minPrice = searchParams.minPrice ? parseInt(searchParams.minPrice) : null;
  const maxPrice = searchParams.maxPrice ? parseInt(searchParams.maxPrice) : null;
  const locationQuery = q ? parseLocationQuery(q) : null;

  // 🧠 CREATE CACHE KEY
  const cacheKey = createCacheKey({
    q,
    status,
    type,
  });

  // ⚡ CHECK CACHE FIRST
  /*const cached = getCache(cacheKey);
  if (cached) {
      return <SearchLayout properties={cached as any} />;
  }*/

  // 🗄️ DATABASE QUERY
  const raw = await prisma.property.findMany({
    where: {
      AND: [
        status !== "all" ? { listingType: status } : {},
        type !== "all"
          ? {
            propertyType: {
              in: type.split("|").map((t) => decodeURIComponent(t.trim())),
            },
          }
          : {},
        petFriendly ? { petFriendly: true } : {},
        state !== "all" ? { state: { equals: state, mode: "insensitive" } } : {},
        minPrice ? { price: { gte: minPrice } } : {},
        maxPrice ? { price: { lte: maxPrice } } : {},
        locationQuery
          ? {
            AND: [
              { city: { contains: locationQuery.city, mode: "insensitive" } },
              { state: { equals: locationQuery.state, mode: "insensitive" } },
            ],
          }
          : q
          ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { city: { contains: q, mode: "insensitive" } },
              { state: { contains: q, mode: "insensitive" } },
              { address: { contains: q, mode: "insensitive" } },
            ],
          }
          : {},
      ],
    },
    orderBy: [
      { createdAt: "desc" },
      { updatedAt: "desc" },
    ],
  });

  const sorted = raw.map(mapProperty);

  // 💾 STORE IN CACHE
  // STORE IN CACHE
  //setCache(cacheKey, sorted);

  const nearbyBaseState =
    state !== "all"
      ? state
      : sorted.find((property) => property.state)?.state || "";

  return <SearchLayout properties={sorted} nearbyBaseState={nearbyBaseState} />;
}
