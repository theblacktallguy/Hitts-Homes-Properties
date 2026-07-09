import Link from "next/link";
import InHeader from "@/components/layout/InHeader";

export const metadata = {
    title: "Resources | Hitts Homes & Properties",
    description:
        "Explore real estate resources for renters, buyers, relocation planning, property tours, applications, and safe decision-making.",
};

const resourceCards = [
    {
        title: "Buyer & Renter Guides",
        text: "Understand what to prepare before touring, applying, renting, or buying so you can move forward with fewer surprises.",
        href: "/resources/guides",
        label: "Read Guides",
    },
    {
        title: "Relocation Support",
        text: "Moving to a new city or neighborhood can feel heavy. Review practical relocation steps before choosing your next home.",
        href: "/resources/relocation",
        label: "Relocation Help",
    },
    {
        title: "Avoid Rental Scams",
        text: "Learn warning signs, safe application habits, and how to protect yourself before sending money or documents.",
        href: "/avoid-scams",
        label: "Stay Protected",
    },
    {
        title: "Affordability Tools",
        text: "Think through rent, income, monthly expenses, and comfortable housing costs before you commit.",
        href: "/tools/affordability",
        label: "Check Affordability",
    },
];

const quickTips = [
    "Confirm property details before applying or sending documents.",
    "Keep your property ID handy when contacting the agent.",
    "Tour the property or request a virtual showing when possible.",
    "Prepare income and rental history details before applying.",
    "Ask about fees, deposits, utilities, and lease terms early.",
    "Use official Hitts Homes forms when submitting requests.",
];

export default function ResourcesPage() {
    return (
        <main>
            <InHeader />

            <section className="
            relative
            overflow-hidden
            bg-gradient-to-br
            from-[#07182F]
            via-[#0B1F3A]
            to-[#C8A45D]
            px-5
            py-24
            text-white
            md:px-10
            md:py-32
            ">
                <div className="mx-auto max-w-6xl">
                    <p className="
                    text-sm
                    font-medium
                    uppercase
                    tracking-[0.35em]
                    text-[#F3D27A]
                    ">
                        Resource Center
                    </p>

                    <h1 className="
                    mt-5
                    max-w-4xl
                    text-4xl
                    font-semibold
                    leading-tight
                    md:text-6xl
                    ">
                        Helpful real estate resources before your next move.
                    </h1>

                    <p className="
                    mt-6
                    max-w-2xl
                    text-base
                    leading-8
                    text-white/85
                    md:text-lg
                    ">
                        Explore practical information for requesting properties,
                        scheduling tours, applying for rentals, relocating, and
                        making safer real estate decisions.
                    </p>

                    <div className="
                    mt-10
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                    ">
                        <Link
                            href="/resources/guides"
                            className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#C8A45D]
                            px-6
                            py-3
                            text-sm
                            font-semibold
                            text-[#0B1F3A]
                            transition
                            hover:bg-[#d8b43c]
                            "
                        >
                            View Guides
                        </Link>

                        <Link
                            href="/faq"
                            className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-white/30
                            bg-white/10
                            px-6
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-white/20
                            "
                        >
                            Read FAQs
                        </Link>
                    </div>
                </div>
            </section>


            <section className="
            bg-[#F8F7F4]
            px-5
            py-20
            md:px-10
            ">
                <div className="mx-auto max-w-6xl">
                    <div className="max-w-3xl">
                        <p className="
                        text-sm
                        font-medium
                        uppercase
                        tracking-[0.3em]
                        text-[#C8A45D]
                        ">
                            Explore Topics
                        </p>

                        <h2 className="
                        mt-4
                        text-3xl
                        font-semibold
                        text-[#0B1F3A]
                        md:text-5xl
                        ">
                            Information for renters, buyers, and relocating clients.
                        </h2>

                        <p className="
                        mt-5
                        text-neutral-600
                        leading-8
                        ">
                            These resources are designed to help you prepare before
                            you take action, whether you are browsing listings,
                            requesting a tour, applying for a rental, or comparing
                            neighborhoods.
                        </p>
                    </div>

                    <div className="
                    mt-12
                    grid
                    gap-5
                    md:grid-cols-2
                    ">
                        {resourceCards.map((item) => (
                            <div
                                key={item.title}
                                className="
                                rounded-[28px]
                                border
                                border-neutral-200
                                bg-white
                                p-6
                                shadow-sm
                                md:p-8
                                "
                            >
                                <h3 className="
                                text-xl
                                font-semibold
                                text-[#0B1F3A]
                                ">
                                    {item.title}
                                </h3>

                                <p className="
                                mt-3
                                text-sm
                                leading-7
                                text-neutral-600
                                ">
                                    {item.text}
                                </p>

                                <Link
                                    href={item.href}
                                    className="
                                    mt-6
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-[#0B1F3A]
                                    px-5
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition
                                    hover:shadow-lg
                                    "
                                >
                                    {item.label}
                                </Link>
                            </div>
                        ))}
                    </div>


                    <section className="
                    mt-16
                    grid
                    gap-8
                    rounded-[32px]
                    bg-white
                    p-8
                    shadow-sm
                    md:grid-cols-[0.9fr_1.1fr]
                    md:p-12
                    ">
                        <div>
                            <p className="
                            text-sm
                            font-medium
                            uppercase
                            tracking-[0.3em]
                            text-[#C8A45D]
                            ">
                                Quick Tips
                            </p>

                            <h2 className="
                            mt-4
                            text-3xl
                            font-semibold
                            text-[#0B1F3A]
                            ">
                                Small steps that make the process smoother.
                            </h2>

                            <p className="
                            mt-4
                            text-sm
                            leading-7
                            text-neutral-600
                            ">
                                A little preparation can help you avoid delays,
                                missed details, and unnecessary stress when you
                                are ready to tour, apply, or make a decision.
                            </p>
                        </div>

                        <div className="
                        grid
                        gap-3
                        sm:grid-cols-2
                        ">
                            {quickTips.map((item) => (
                                <div
                                    key={item}
                                    className="
                                    rounded-2xl
                                    border
                                    border-neutral-200
                                    bg-[#F8F7F4]
                                    p-4
                                    text-sm
                                    leading-6
                                    text-neutral-700
                                    "
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </section>


                    <section className="
                    mt-16
                    rounded-[32px]
                    bg-[#0B1F3A]
                    p-8
                    text-white
                    md:p-12
                    ">
                        <div className="
                        grid
                        gap-8
                        md:grid-cols-[1fr_auto]
                        md:items-center
                        ">
                            <div>
                                <p className="
                                text-sm
                                font-medium
                                uppercase
                                tracking-[0.3em]
                                text-[#C8A45D]
                                ">
                                    Need Direct Help?
                                </p>

                                <h2 className="
                                mt-4
                                text-3xl
                                font-semibold
                                ">
                                    Share what you are looking for.
                                </h2>

                                <p className="
                                mt-4
                                max-w-2xl
                                text-sm
                                leading-7
                                text-white/75
                                ">
                                    If you are unsure where to begin, send a property
                                    request and let our team review your needs.
                                </p>
                            </div>

                            <div className="
                            flex
                            flex-col
                            gap-3
                            sm:flex-row
                            ">
                                <Link
                                    href="/request-property"
                                    className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-[#C8A45D]
                                    px-6
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-[#0B1F3A]
                                    "
                                >
                                    Request Property
                                </Link>

                                <Link
                                    href="/agent#contact-agent"
                                    className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-white/20
                                    px-6
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    "
                                >
                                    Contact Agent
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}