export function cleanProperty(raw: any) {
  const toNumber = (v: any, fallback = 0) => {
    const n = Number(v)
    return Number.isFinite(n) ? n : fallback
  }

  const toNullableNumber = (v: any) => {
    const n = Number(v)
    return Number.isFinite(n) ? n : null
  }

  const listingType = Array.isArray(raw.listingType)
    ? raw.listingType.includes("rent") && raw.listingType.includes("sale")
      ? "both"
      : raw.listingType[0]
    : raw.listingType

  const price =
    listingType === "rent"
      ? raw.rentPrice
      : raw.salePrice

  return {
    ...raw,

    propertyId: String(raw.propertyId),

    // ✅ REQUIRED FIELDS (NEVER NULL for Prisma)
    price: toNumber(price, 0),
    bedrooms: toNumber(raw.bedrooms, 0),
    sqft: toNumber(raw.sqft, 0),

    // optional numeric fields
    bathrooms: toNullableNumber(raw.bathrooms),
    yearBuilt: toNullableNumber(raw.yearBuilt),

    rentPrice: toNullableNumber(raw.rentPrice),
    salePrice: toNullableNumber(raw.salePrice),

    garage: Boolean(raw.garage),
    petFriendly: raw.petFriendly ?? false,

    listingType,

    amenities: raw.amenities ?? [],
    factsFeatures: raw.factsFeatures ?? {},
    lot: raw.lot ?? {},
    construction: raw.construction ?? {},
    utilities: raw.utilities ?? {},
    financial: raw.financial ?? {},
  }
}