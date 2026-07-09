import Link from "next/link";
import {
    FaArrowRight,
    FaEnvelope,
    FaHome,
    FaPhoneAlt,
    FaRegCalendarCheck,
    FaShieldAlt,
    FaUserTie,
} from "react-icons/fa";

type Props = {
    property: any;
};

function getListingTypes(listingType: any) {
    return Array.isArray(listingType) ? listingType : [listingType].filter(Boolean);
}

function phoneHref(phone?: string | null) {
    if (!phone) return "#";
    return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export default function PropertyListedByCTA({ property }: Props) {
    const listingTypes = getListingTypes(property.listingType);
    const isRent = listingTypes.includes("rent");

    const primaryLabel = isRent
        ? property.applicationEnabled
            ? "Apply now"
            : "Request application"
        : "Request a tour";

    const title = isRent ? "Ready to rent this home?" : "Interested in this home?";

    const copy = isRent
        ? "Start your application or contact the listing agent to confirm availability, move-in details, and fees."
        : "Request a private tour or contact the listing agent for showing details, availability, and next steps.";

    const agentName = property.agentName || "Hitts Homes Agent";
    const email = property.contactEmail;
    const phone = property.contactPhone;

    const tourHref = `/request-tour?propertyId=${encodeURIComponent(
        property.propertyId || ""
    )}&title=${encodeURIComponent(
        property.title || ""
    )}&address=${encodeURIComponent(
        property.address || ""
    )}`;

    const applyHref = `/apply?propertyId=${encodeURIComponent(
        property.propertyId || ""
    )}&title=${encodeURIComponent(
        property.title || ""
    )}&address=${encodeURIComponent(
        property.address || ""
    )}`;

    const primaryHref = isRent ? applyHref : tourHref;

    const agentContactHref = "/agent#contact-agent";

    return (
        <section className="px-4 md:px-0 pb-12 py-3">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="absolute left-0 top-0 h-full w-1.5 bg-blue-600" />
                <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                    <div
                        style={{
                            backgroundColor: "#111827",
                            color: "#ffffff",
                            padding: "24px 20px",
                            position: "relative",
                        }}
                    >
                        <div className="relative">
                            <p
                                style={{
                                    color: "#bfdbfe",
                                    marginBottom: "16px",
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.18em",
                                }}
                            >
                                Listed by
                            </p>

                            <div className="flex items-start gap-4">
                                <div
                                    style={{
                                        width: "56px",
                                        height: "56px",
                                        minWidth: "56px",
                                        minHeight: "56px",
                                        borderRadius: "16px",
                                        backgroundColor: "#ffffff",
                                        color: "#111827",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 10px 18px rgba(0,0,0,0.18)",
                                    }}
                                >
                                    <FaUserTie size={22} color="#111827" />
                                </div>

                                <div>
                                    <h2 style={{ color: "#ffffff", fontSize: "20px", fontWeight: 700, lineHeight: 1.2 }}>
                                        {agentName}
                                    </h2>
                                    <p style={{ color: "#d1d5db", marginTop: "4px", fontSize: "14px" }}>
                                        Hitts Homes and Properties
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                {phone && (
                                    <a
                                        href={phoneHref(phone)}
                                        className="flex items-center gap-3 text-sm text-gray-100 transition hover:text-white"
                                    >
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                                            <FaPhoneAlt className="text-xs" />
                                        </span>
                                        {phone}
                                    </a>
                                )}

                                {email && (
                                    <a
                                        href={`mailto:${email}`}
                                        className="flex items-center gap-3 text-sm text-gray-100 transition hover:text-white"
                                    >
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                                            <FaEnvelope className="text-xs" />
                                        </span>
                                        {email}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="relative px-5 py-6 md:px-7 md:py-8">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                            Active listing
                        </div>

                        <h2 className="text-2xl font-bold text-gray-950">{title}</h2>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600">
                            {copy}
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={primaryHref}
                                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                            >
                                {primaryLabel}
                                <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href={agentContactHref}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-900 transition hover:-translate-y-0.5 hover:border-gray-400 hover:bg-gray-50"
                            >
                                Contact agent
                            </Link>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                                <FaShieldAlt className="text-blue-600" />
                                Verified listing
                            </div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                                <FaRegCalendarCheck className="text-blue-600" />
                                Fast response
                            </div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                                <FaHome className="text-blue-600" />
                                Local agent
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}