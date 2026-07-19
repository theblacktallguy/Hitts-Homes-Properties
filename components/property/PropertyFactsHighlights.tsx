import {
  FaBath,
  FaBed,
  FaCar,
  FaFire,
  FaHome,
  FaInfoCircle,
  FaPaw,
  FaRulerCombined,
  FaSnowflake,
} from "react-icons/fa";
import { MdCalendarMonth, MdLocalLaundryService } from "react-icons/md";
import Link from "next/link";

type Props = {
  property: any;
  applyHref: string;
  requestTourHref: string;
};

function hasValue(value: any) {
  return value !== null && value !== undefined && value !== "" && value !== 0;
}

function formatNumber(value: number) {
  return value.toLocaleString();
}

function getListingTypes(listingType: any) {
  return Array.isArray(listingType) ? listingType : [listingType].filter(Boolean);
}

export default function PropertyFactsHighlights({
  property,
  applyHref,
  requestTourHref,
}: Props) {
  const listingTypes = getListingTypes(property.listingType);

  const factsFeatures = property.factsFeatures ?? {};
  const interior = factsFeatures.interior ?? {};
  const parking = factsFeatures.parking ?? {};
  const lot = property.lot ?? {};
  const construction = property.construction ?? {};

  const propertyType =
    property.propertyType || construction.homeType || construction.style;

  const hasLaundry =
    Array.isArray(interior.laundry) && interior.laundry.length > 0;

  const hasParking =
    property.garage ||
    parking.uncoveredSpaces ||
    hasValue(parking.totalSpaces) ||
    hasValue(parking.garageSpaces);

  const parkingLabel = property.garage
    ? "Garage parking"
    : hasValue(parking.garageSpaces) && parking.garageSpaces > 0
      ? `${parking.garageSpaces} garage spaces`
      : hasValue(parking.totalSpaces)
        ? `${parking.totalSpaces} parking spaces`
        : parking.uncoveredSpaces
          ? "Off street parking"
          : null;

  const facts = [
    hasValue(property.bedrooms) && {
      icon: FaBed,
      label: `${property.bedrooms} Beds`,
    },
    hasValue(property.bathrooms) && {
      icon: FaBath,
      label: `${property.bathrooms} Baths`,
    },
    hasValue(property.sqft) && {
      icon: FaRulerCombined,
      label: `${formatNumber(property.sqft)} sqft`,
    },
    hasValue(propertyType) && {
      icon: FaHome,
      label: propertyType,
    },
    hasValue(property.yearBuilt) && {
      icon: MdCalendarMonth,
      label: `Built ${property.yearBuilt}`,
    },
    hasValue(lot.sizeAcres) && {
      icon: FaRulerCombined,
      label: `${lot.sizeAcres} acres`,
    },
  ].filter(Boolean) as { icon: any; label: string }[];

  const highlights = [
    hasValue(propertyType) && {
      icon: FaHome,
      label: propertyType,
    },
    hasValue(property.availableDate) && {
      icon: MdCalendarMonth,
      label: `Available ${property.availableDate}`,
    },
    property.petFriendly && {
      icon: FaPaw,
      label: "Cats, dogs OK",
    },
    hasValue(interior.cooling) && {
      icon: FaSnowflake,
      label: interior.cooling,
    },
    hasLaundry && {
      icon: MdLocalLaundryService,
      label: "In unit laundry",
    },
    hasParking &&
      parkingLabel && {
        icon: FaCar,
        label: parkingLabel,
      },
    hasValue(factsFeatures.heating) && {
      icon: FaFire,
      label: factsFeatures.heating,
    },
  ].filter(Boolean) as { icon: any; label: string }[];

  return (
    <section className="px-4 md:px-0 pb-8">
      <div className="mb-6 flex gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
        <FaInfoCircle className="mt-0.5 shrink-0 text-gray-500" />
        <div>
          <p className="text-sm font-semibold text-gray-900">Fees may apply</p>
          <p className="text-sm text-gray-500">
            Additional fees, deposits, closing costs, or application charges may vary by property.
          </p>
        </div>
      </div>

      <div className="mb-7 grid grid-cols-2 gap-3 md:hidden">
        <Link
          href={applyHref}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0B1F3A] px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#132e52]"
        >
          Apply Now
        </Link>
        <Link
          href={requestTourHref}
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#0B1F3A] bg-white px-3 py-3 text-center text-sm font-semibold text-[#0B1F3A] transition hover:bg-slate-50"
        >
          Request Tour
        </Link>
      </div>

      {facts.length > 0 && (
        <div className="mb-7">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Property facts
          </h2>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {facts.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg bg-white px-4 py-4"
                >
                  <Icon className="shrink-0 text-lg text-gray-700" />
                  <span className="text-sm font-semibold text-gray-900">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {highlights.length > 0 && (
        <div className="py-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Highlights</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg bg-white px-4 py-4"
                >
                  <Icon className="shrink-0 text-lg text-blue-600" />
                  <span className="text-sm font-medium text-gray-800">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
