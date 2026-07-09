import {
    FaBath,
    FaBed,
    FaBolt,
    FaCar,
    FaDollarSign,
    FaHome,
    FaLayerGroup,
    FaMapMarkerAlt,
    FaPlug,
    FaTools,
} from "react-icons/fa";
import { MdChair, MdConstruction, MdKitchen, MdLocalLaundryService } from "react-icons/md";

type DetailRow = {
    label: string;
    value: any;
};

type DetailGroup = {
    title: string;
    icon: any;
    rows: DetailRow[];
};

type Props = {
    property: any;
};

function hasValue(value: any) {
    if (value === null || value === undefined || value === "") return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object") return Object.keys(value).length > 0;
    return true;
}

function formatValue(value: any) {
    if (!hasValue(value)) return null;

    if (Array.isArray(value)) {
        return value.filter(Boolean).join(", ");
    }

    if (typeof value === "boolean") {
        return value ? "Yes" : null;
    }

    if (typeof value === "number") {
        return value.toLocaleString();
    }

    return String(value);
}

function money(value: any) {
    if (!hasValue(value)) return null;
    return `$${Number(value).toLocaleString()}`;
}

function addRow(label: string, value: any): DetailRow | null {
    const formatted = formatValue(value);

    if (!formatted) return null;

    return {
        label,
        value: formatted,
    };
}

function addMoneyRow(label: string, value: any): DetailRow | null {
    const formatted = money(value);

    if (!formatted) return null;

    return {
        label,
        value: formatted,
    };
}

function cleanRows(rows: Array<DetailRow | null>) {
    return rows.filter(Boolean) as DetailRow[];
}

function cleanGroups(groups: DetailGroup[]) {
    return groups.filter((group) => group.rows.length > 0);
}

export default function PropertyFactsFeatures({ property }: Props) {
    const factsFeatures = property.factsFeatures ?? {};
    const interior = factsFeatures.interior ?? {};
    const basement = factsFeatures.basement ?? {};
    const parking = factsFeatures.parking ?? {};
    const lot = property.lot ?? {};
    const construction = property.construction ?? {};
    const materials = construction.materials ?? {};
    const utilities = property.utilities ?? {};
    const financial = property.financial ?? {};
    const monthlyPetRent = financial.monthlyPetRent ?? {};
    const oneTimePetFee = financial.oneTimePetFee ?? {};

    const groups = cleanGroups([
        {
            title: "Interior",
            icon: MdChair,
            rows: cleanRows([
                addRow("Bedrooms", interior.bedrooms ?? property.bedrooms),
                addRow("Bathrooms", interior.bathrooms ?? property.bathrooms),
                addRow("Full bathrooms", interior.fullBathrooms),
                addRow("Flooring", interior.flooring),
                addRow("Kitchen features", interior.kitchen),
                addRow("Cooling", interior.cooling),
                addRow("Heating", factsFeatures.heating),
                addRow("Ceiling fans", interior.ceilingFans),
                addRow("Smart home", interior.smartHome),
                addRow("Walk-in closets", interior.walkInClosets),
                addRow("Interior area", property.sqft ? `${property.sqft.toLocaleString()} sqft` : null),
            ]),
        },
        {
            title: "Appliances & Laundry",
            icon: MdLocalLaundryService,
            rows: cleanRows([
                addRow("Appliances included", factsFeatures.appliances),
                addRow("Laundry", interior.laundry),
            ]),
        },
        {
            title: "Property",
            icon: FaHome,
            rows: cleanRows([
                addRow("Property type", property.propertyType),
                addRow("Lot size", lot.sizeAcres ? `${lot.sizeAcres} acres` : null),
                addRow("Lot dimensions", lot.dimensions),
                addRow("Lot features", lot.features),
                addRow("Amenities", property.amenities),
            ]),
        },
        {
            title: "Parking & Levels",
            icon: FaCar,
            rows: cleanRows([
                addRow("Total parking spaces", parking.totalSpaces),
                addRow("Garage spaces", parking.garageSpaces),
                addRow("Garage", property.garage),
                addRow("Uncovered parking", parking.uncoveredSpaces),
                addRow("Levels", factsFeatures.levels),
                addRow("Stories", factsFeatures.stories),
            ]),
        },
        {
            title: "Basement",
            icon: FaLayerGroup,
            rows: cleanRows([
                addRow("Finished basement", basement.finished),
                addRow("Basement type", basement.type),
                addRow("Basement area", basement.areaSqft ? `${basement.areaSqft.toLocaleString()} sqft` : null),
            ]),
        },
        {
            title: "Construction",
            icon: MdConstruction,
            rows: cleanRows([
                addRow("Home type", construction.homeType),
                addRow("Style", construction.style),
                addRow("Year built", property.yearBuilt),
                addRow("Siding", materials.siding),
                addRow("Foundation", materials.foundation),
                addRow("Roof", materials.roof),
            ]),
        },
        {
            title: "Utilities",
            icon: FaPlug,
            rows: cleanRows([
                addRow("Internet", utilities.internet),
                addRow("Electric", utilities.electric),
                addRow("Gas", utilities.gas),
                addRow("Water", utilities.water),
                addRow("Sewer", utilities.sewer),
            ]),
        },
        {
            title: "Financial & Listing",
            icon: FaDollarSign,
            rows: cleanRows([
                addRow("Lease terms", financial.leaseTerms),
                addMoneyRow("Monthly dog rent", monthlyPetRent.dog),
                addMoneyRow("Monthly cat rent", monthlyPetRent.cat),
                addMoneyRow("One-time dog fee", oneTimePetFee.dog),
                addMoneyRow("One-time cat fee", oneTimePetFee.cat),
                addRow("Applications enabled", property.applicationEnabled),
                addRow("Virtual tour", property.virtualTourUrl),
                addRow("Video tour", property.videoUrl),
            ]),
        },
        {
            title: "Location",
            icon: FaMapMarkerAlt,
            rows: cleanRows([
                addRow("Region", property.city),
                addRow("State", property.state),
                addRow("ZIP code", property.zipCode),
            ]),
        },
    ]);

    if (groups.length === 0) return null;

    return (
        <section className="px-4 md:px-0 pb-12">
            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                    Complete details
                </p>
                <h2 className="mt-1 text-2xl font-bold text-gray-950">
                    Facts & features
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                    A full breakdown of the interior, property details, utilities, construction,
                    and listing information available for this home.
                </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                {groups.map((group) => {
                    const Icon = group.icon;

                    return (
                        <section
                            key={group.title}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                        >
                            <div
                                style={{
                                    backgroundColor: "#111827",
                                    color: "#ffffff",
                                    minHeight: "64px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "16px",
                                    borderBottom: "1px solid #e5e7eb",
                                }}
                            >
                                <span
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        minWidth: "40px",
                                        borderRadius: "10px",
                                        backgroundColor: "rgba(255,255,255,0.14)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#ffffff",
                                    }}
                                >
                                    <Icon size={20} color="#ffffff" />
                                </span>

                                <h3
                                    style={{
                                        color: "#ffffff",
                                        fontSize: "16px",
                                        fontWeight: 700,
                                        lineHeight: 1.2,
                                        margin: 0,
                                        display: "block",
                                    }}
                                >
                                    {group.title}
                                </h3>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {group.rows.map((row) => (
                                    <div
                                        key={`${group.title}-${row.label}`}
                                        className="grid grid-cols-[minmax(120px,0.85fr)_1.15fr] gap-4 px-5 py-4"
                                    >
                                        <dt className="text-sm font-medium text-gray-500">
                                            {row.label}
                                        </dt>
                                        <dd className="text-right text-sm font-semibold leading-6 text-gray-900">
                                            {row.value}
                                        </dd>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </section>
    );
}