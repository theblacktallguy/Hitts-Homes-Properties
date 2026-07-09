const DEFAULT_AGENT_NAME = "Agent David Hitt";
const DEFAULT_CONTACT_PHONE = "(248) 636-0376";
const DEFAULT_CONTACT_EMAIL = "agentdavidhitt@gmail.com";

function toNumber(value: unknown, fallback = 0) {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : fallback;
}

function toNullableNumber(value: unknown) {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : null;
}

function normalizeListingType(value: unknown) {
  const firstValue = Array.isArray(value) ? value[0] : value;
  const listingType = String(firstValue || "").toLowerCase();

  if (listingType !== "rent" && listingType !== "sale") {
    throw new Error("listingType must be rent or sale");
  }

  return listingType;
}

function requiredString(value: unknown, field: string) {
  const stringValue = String(value || "").trim();

  if (!stringValue) {
    throw new Error(`${field} is required`);
  }

  return stringValue;
}

export function normalizePropertyJson(raw: any) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error("Paste one valid property JSON object");
  }

  const propertyId = requiredString(raw.propertyId, "propertyId").toUpperCase();
  const listingType = normalizeListingType(raw.listingType);
  const rentPrice = toNullableNumber(raw.rentPrice);
  const salePrice = toNullableNumber(raw.salePrice);
  const price = listingType === "rent" ? rentPrice : salePrice;

  if (!price || price <= 0) {
    throw new Error(
      listingType === "rent"
        ? "rentPrice must be greater than 0"
        : "salePrice must be greater than 0"
    );
  }

  return {
    propertyId,
    status: String(raw.status || "active").toLowerCase(),
    listingType,
    title: requiredString(raw.title, "title"),
    state: requiredString(raw.state, "state"),
    city: requiredString(raw.city, "city"),
    address: requiredString(raw.address, "address"),
    zipCode: raw.zipCode ? String(raw.zipCode).trim() : null,
    price: Math.round(price),
    bedrooms: Math.round(toNumber(raw.bedrooms, 0)),
    bathrooms: toNullableNumber(raw.bathrooms),
    sqft: Math.round(toNumber(raw.sqft, 0)),
    propertyType: requiredString(raw.propertyType, "propertyType"),
    imageFolder: String(raw.imageFolder || propertyId).trim() || propertyId,
    descriptionShort: requiredString(raw.descriptionShort, "descriptionShort"),
    amenities: Array.isArray(raw.amenities) ? raw.amenities : [],
    factsFeatures: raw.factsFeatures && typeof raw.factsFeatures === "object" ? raw.factsFeatures : {},
    lot: raw.lot && typeof raw.lot === "object" ? raw.lot : {},
    construction: raw.construction && typeof raw.construction === "object" ? raw.construction : {},
    utilities: raw.utilities && typeof raw.utilities === "object" ? raw.utilities : {},
    financial: raw.financial && typeof raw.financial === "object" ? raw.financial : {},
    virtualTourUrl: raw.virtualTourUrl ? String(raw.virtualTourUrl).trim() : null,
    videoUrl: raw.videoUrl ? String(raw.videoUrl).trim() : null,
    applicationEnabled: raw.applicationEnabled ?? true,
    petFriendly: raw.petFriendly ?? false,
    agentName: raw.agentName ? String(raw.agentName).trim() : DEFAULT_AGENT_NAME,
    contactPhone: raw.contactPhone ? String(raw.contactPhone).trim() : DEFAULT_CONTACT_PHONE,
    contactEmail: raw.contactEmail ? String(raw.contactEmail).trim() : DEFAULT_CONTACT_EMAIL,
  };
}
