import { prisma } from "@/lib/prisma";
import SearchLayout from "@/components/search/layout/SearchLayout";
import { mapProperty } from "@/lib/mappers/mapProperty";
import { normalizeStateName } from "@/lib/stateNames";

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
  const searchTerms = q
    .split(/[\s,]+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 1);

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
            AND: searchTerms.map((term) => ({
              OR: [
                { title: { contains: term, mode: "insensitive" } },
                { address: { contains: term, mode: "insensitive" } },
                { city: { contains: term, mode: "insensitive" } },
                { state: { contains: term, mode: "insensitive" } },
                { zipCode: { contains: term, mode: "insensitive" } },
              ],
            })),
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
