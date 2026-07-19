import Link from "next/link";
import SearchHeader from "@/components/layout/SearchHeader";

export const metadata = {
    title: "Relocation Resources | Hitts Homes & Properties",
    description:
        "Helpful relocation guidance for clients moving to a new city, neighborhood, or property with Hitts Homes.",
};

const relocationSteps = [
    {
        title: "Define Your Priorities",
        text: "Start with the essentials: budget, commute, school preferences, space needs, lifestyle, and timeline. A clear list makes the search more focused.",
    },
    {
        title: "Compare Neighborhood Fit",
        text: "Look beyond the property itself. Consider traffic patterns, nearby services, shopping, parks, work distance, and how the area feels during different times of day.",
    },
    {
        title: "Prepare Your Documents",
        text: "If you plan to rent, gather identification, income information, rental history, and application details early so you can move quickly when the right property appears.",
    },
    {
        title: "Schedule Tours Strategically",
        text: "Tour properties in clusters when possible. If you are moving from far away, ask about virtual tour options before traveling.",
    },
];

const checklist = [
    "Set a comfortable monthly housing budget.",
    "Decide which locations are realistic for your commute.",
    "List your must-have and nice-to-have property features.",
    "Confirm pet, parking, utility, and lease requirements early.",
    "Keep property IDs for listings you want to compare.",
    "Ask about application requirements before submitting documents.",
    "Review local services, schools, and transportation access.",
    "Plan move-in timing around work, travel, and deposit deadlines.",
];

const relatedLinks = [
    {
        title: "Request a Property",
        text: "Tell us what you need and let our team help narrow the search.",
        href: "/request-property",
    },
    {
        title: "Schedule a Tour",
        text: "Request an in-person or virtual showing for a property you like.",
        href: "/request-tour",
    },
    {
        title: "Buyer & Renter Guides",
        text: "Read practical guidance before applying, touring, or buying.",
        href: "/resources/guides",
    },
];

export default function RelocationResourcesPage() {
    return (
        <main>
            <SearchHeader />

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
                        Relocation Help
                    </p>

                    <h1 className="
                    mt-5
                    max-w-4xl
                    text-4xl
                    font-semibold
                    leading-tight
                    md:text-6xl
                    ">
                        Moving to a new area should feel more organized.
                    </h1>

                    <p className="
                    mt-6
                    max-w-2xl
                    text-base
                    leading-8
                    text-white/85
                    md:text-lg
                    ">
                        Relocation brings a lot of decisions at once. Use this
                        guide to think through location, budget, tours, timing,
                        and application preparation before your move.
                    </p>

                    <div className="
                    mt-10
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
                            transition
                            hover:bg-[#d8b43c]
                            "
                        >
                            Request Relocation Help
                        </Link>

                        <Link
                            href="/resources"
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
                            View Resources
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
                            Plan With Confidence
                        </p>

                        <h2 className="
                        mt-4
                        text-3xl
                        font-semibold
                        text-[#0B1F3A]
                        md:text-5xl
                        ">
                            Focus on the property, the area, and your timeline.
                        </h2>

                        <p className="
                        mt-5
                        text-neutral-600
                        leading-8
                        ">
                            A good relocation plan compares more than bedrooms
                            and price. It also accounts for commute, lifestyle,
                            nearby services, application readiness, and how quickly
                            you need to move.
                        </p>
                    </div>

                    <div className="
                    mt-12
                    grid
                    gap-5
                    md:grid-cols-2
                    ">
                        {relocationSteps.map((item) => (
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
                                Relocation Checklist
                            </p>

                            <h2 className="
                            mt-4
                            text-3xl
                            font-semibold
                            text-[#0B1F3A]
                            ">
                                Before you choose your next place.
                            </h2>

                            <p className="
                            mt-4
                            text-sm
                            leading-7
                            text-neutral-600
                            ">
                                Use this checklist to compare listings and reduce
                                last-minute surprises before you schedule a tour
                                or submit an application.
                            </p>
                        </div>

                        <div className="
                        grid
                        gap-3
                        sm:grid-cols-2
                        ">
                            {checklist.map((item) => (
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
                    grid
                    gap-5
                    md:grid-cols-3
                    ">
                        {relatedLinks.map((item) => (
                            <div
                                key={item.title}
                                className="
                                rounded-[28px]
                                border
                                border-neutral-200
                                bg-white
                                p-6
                                shadow-sm
                                "
                            >
                                <h3 className="
                                text-lg
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
                                    "
                                >
                                    Learn More
                                </Link>
                            </div>
                        ))}
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
                                    Moving Soon?
                                </p>

                                <h2 className="
                                mt-4
                                text-3xl
                                font-semibold
                                ">
                                    Let us know what kind of location fits your move.
                                </h2>

                                <p className="
                                mt-4
                                max-w-2xl
                                text-sm
                                leading-7
                                text-white/75
                                ">
                                    Share your budget, preferred area, commute needs,
                                    and timeline so our team can help identify options.
                                </p>
                            </div>

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
                                Start a Request
                            </Link>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}