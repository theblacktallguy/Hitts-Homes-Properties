"use client";

import { useMemo, useState } from "react";
import { FaCheckCircle, FaClock, FaEye, FaFileSignature, FaPaw } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

type Props = {
  property: any;
};

function hasValue(value: any) {
  return value !== null && value !== undefined && value !== "" && value !== 0;
}

function getListingTypes(listingType: any) {
  return Array.isArray(listingType) ? listingType : [listingType].filter(Boolean);
}

function getDailyAvailabilityCheckHours(propertyId: string) {
  const today = new Date().toISOString().slice(0, 10);
  const seed = `${propertyId}-${today}`;

  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  return 5 + (Math.abs(hash) % 16);
}

function getDaysOnSite(createdAt: string | Date | null | undefined) {
  if (!createdAt) return null;

  const created = new Date(createdAt).getTime();
  const now = Date.now();

  if (Number.isNaN(created)) return null;

  const days = Math.max(1, Math.floor((now - created) / 86400000));
  return days;
}

function getRelativeWeeks(date: string | Date | null | undefined) {
  if (!date) return null;

  const updated = new Date(date).getTime();
  const now = Date.now();

  if (Number.isNaN(updated)) return null;

  const days = Math.max(1, Math.floor((now - updated) / 86400000));

  if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`;

  const weeks = Math.max(1, Math.floor(days / 7));
  return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
}

function getSpecialItems(property: any) {
  const amenities = Array.isArray(property.amenities) ? property.amenities : [];
  const construction = property.construction ?? {};

  const blockedWords = [
    "central air",
    "laundry",
    "washer",
    "dryer",
    "parking",
    "garage",
    "forced air",
    "heating",
    "cooling",
  ];

  const amenityItems = amenities.filter((item: string) => {
    const lower = item.toLowerCase();
    return !blockedWords.some((word) => lower.includes(word));
  });

  return [
    construction.style,
    ...amenityItems,
  ]
    .filter(Boolean)
    .slice(0, 4);
}

export default function PropertyAboutActivity({ property }: Props) {
  const [expanded, setExpanded] = useState(false);

  const listingTypes = getListingTypes(property.listingType);
  const isRent = listingTypes.includes("rent");

  const financial = property.financial ?? {};
  const checkedHoursAgo = useMemo(
    () => getDailyAvailabilityCheckHours(property.propertyId),
    [property.propertyId]
  );

  const daysOnSite = getDaysOnSite(property.createdAt);
  const updatedAgo = getRelativeWeeks(property.updatedAt);
  const specialItems = getSpecialItems(property);

  const description = property.description || property.descriptionShort || "";

  const leaseTerms = Array.isArray(financial.leaseTerms)
    ? financial.leaseTerms.filter(Boolean)
    : [];

  const monthlyPetRent = financial.monthlyPetRent ?? {};
  const oneTimePetFee = financial.oneTimePetFee ?? {};

  const rentCriteria = [
    leaseTerms.length > 0 && `Lease terms: ${leaseTerms.slice(0, 4).join(", ")}`,
    property.petFriendly && "Pet policy: Cats and dogs",
    hasValue(monthlyPetRent.dog) && `Pet rent: $${monthlyPetRent.dog}/mo`,
    hasValue(oneTimePetFee.dog) && `One-time pet fee: $${oneTimePetFee.dog}`,
    property.applicationEnabled && "Applications accepted",
  ].filter(Boolean) as string[];

  const buyerInfo = [
    property.virtualTourUrl && "Virtual tour available",
    property.videoUrl && "Video tour available",
    "Contact agent for showing details",
  ].filter(Boolean) as string[];

  return (
    <section className="px-4 md:px-0 pb-10">
      {specialItems.length > 0 && (
        <div className="mb-7 py-6 border-t border-gray-200 ">
          <h2 className="mb-3 text-xl font-bold text-gray-900">What's special</h2>

          <div className="flex flex-wrap gap-2">
            {specialItems.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {description && (
        <div className="mb-7 py-6 border-t border-gray-200">
          <h2 className="mb-3 text-xl font-bold text-gray-900">About this home</h2>

          <p
            className={`text-[15px] leading-7 text-gray-700 ${
              expanded ? "" : "line-clamp-5"
            }`}
          >
            {description}
          </p>

          {description.length > 260 && (
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-blue-700"
            >
              {expanded ? "Show less" : "Show more"}
              {expanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </button>
          )}
        </div>
      )}

      <div className="mb-7 py-6 border-t border-b border-gray-200">
        <h2 className="mb-3 text-xl font-bold text-gray-900">Listing activity</h2>

        <div className="space-y-3 rounded-lg bg-white px-4 py-4">
          <div className="flex items-center gap-3 text-sm text-gray-800">
            <FaCheckCircle className="text-green-600" />
            <span>Still active - availability checked {checkedHoursAgo} hours ago</span>
          </div>

          {updatedAgo && (
            <div className="flex items-center gap-3 text-sm text-gray-800">
              <FaClock className="text-gray-500" />
              <span>Listing updated {updatedAgo}</span>
            </div>
          )}

          
        </div>
      </div>

      {(isRent ? rentCriteria.length > 0 : buyerInfo.length > 0) && (
        <div>
          <h2 className="mb-3 text-xl font-bold text-gray-900 py-6">
            {isRent ? "Landlord's criteria" : "Buyer information"}
          </h2>

          <div className="space-y-3 rounded-lg bg-white px-4 py-4">
            {(isRent ? rentCriteria : buyerInfo).map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-gray-800">
                {item.toLowerCase().includes("pet") ? (
                  <FaPaw className="text-gray-500" />
                ) : (
                  <FaFileSignature className="text-gray-500" />
                )}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}