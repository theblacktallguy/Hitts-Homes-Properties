import Link from "next/link";
import SearchHeader from "@/components/layout/SearchHeader";

export const metadata = {
    title: "Buyer & Renter Guides | Hitts Homes & Properties",
    description:
        "Read practical guides for renters, buyers, tour planning, rental applications, and property decisions.",
};

const guides = [
    {
        title: "Before You Request a Tour",
        text: "Review the property ID, price, location, listing type, and availability. Prepare your preferred dates and decide whether an in-person or virtual tour works best.",
        steps: [
            "Save the property ID.",
            "Check the listing type and price.",
            "Choose preferred tour times.",
            "Prepare questions for the agent.",
        ],
    },
    {
        title: "Before You Apply for a Rental",
        text: "Gather your contact information, employment details, income information, rental history, household details, and identity verification documents before starting.",
        steps: [
            "Confirm the property details.",
            "Prepare income and employer information.",
            "Gather rental history details.",
            "Use the official application form.",
        ],
    },
    {
        title: "Before You Request a Property Search",
        text: "Think through your budget, location, property type, bedrooms, bathrooms, move-in timeline, and must-have features so the search can be more focused.",
        steps: [
            "Set a comfortable budget range.",
            "Choose preferred cities or areas.",
            "List must-have property features.",
            "Share your timeline clearly.",
        ],
    },
    {
        title: "Before You Buy",
        text: "Buying requires a deeper review of budget, financing, location, property condition, and long-term fit. Ask questions early and compare more than the listing price.",
        steps: [
            "Understand your financing position.",
            "Compare neighborhood fit.",
            "Schedule property tours.",
            "Ask about next steps with the agent.",
        ],
    },
];

const comparisonTips = [
    "Compare total monthly cost, not only rent or mortgage.",
    "Ask about utilities, fees, deposits, and maintenance expectations.",
    "Consider commute, parking, schools, and nearby services.",
    "Tour at different times if location or traffic matters.",
    "Confirm lease terms, availability, and application requirements.",
    "Keep notes for each property so details do not blur together.",
];

export default function GuidesPage() {
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
                        Buyer & Renter Guides
                    </p>

                    <h1 className="
                    mt-5
                    max-w-4xl
                    text-4xl
                    font-semibold
                    leading-tight
                    md:text-6xl
                    ">
                        Prepare before you tour, apply, rent, or buy.
                    </h1>

                    <p className="
                    mt-6
                    max-w-2xl
                    text-base
                    leading-8
                    text-white/85
                    md:text-lg
                    ">
                        These guides help you organize the details that matter
                        before you submit a request, schedule a showing, or move
                        forward with an application.
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
                            Request Property
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
                            All Resources
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
                            Practical Guides
                        </p>

                        <h2 className="
                        mt-4
                        text-3xl
                        font-semibold
                        text-[#0B1F3A]
                        md:text-5xl
                        ">
                            Know what to prepare before each step.
                        </h2>

                        <p className="
                        mt-5
                        text-neutral-600
                        leading-8
                        ">
                            A smoother real estate process starts with clear
                            information. These guides help you prepare before
                            you contact the agent, request a tour, or apply.
                        </p>
                    </div>

                    <div className="
                    mt-12
                    grid
                    gap-5
                    md:grid-cols-2
                    ">
                        {guides.map((guide) => (
                            <section
                                key={guide.title}
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
                                    {guide.title}
                                </h3>

                                <p className="
                                mt-3
                                text-sm
                                leading-7
                                text-neutral-600
                                ">
                                    {guide.text}
                                </p>

                                <div className="mt-6 space-y-3">
                                    {guide.steps.map((step) => (
                                        <div
                                            key={step}
                                            className="
                                            rounded-2xl
                                            border
                                            border-neutral-200
                                            bg-[#F8F7F4]
                                            p-4
                                            text-sm
                                            text-neutral-700
                                            "
                                        >
                                            {step}
                                        </div>
                                    ))}
                                </div>
                            </section>
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
                                Compare Better
                            </p>

                            <h2 className="
                            mt-4
                            text-3xl
                            font-semibold
                            text-[#0B1F3A]
                            ">
                                Look beyond the first impression.
                            </h2>

                            <p className="
                            mt-4
                            text-sm
                            leading-7
                            text-neutral-600
                            ">
                                Photos and price matter, but they are only part
                                of the decision. Use these comparison points to
                                look at the full picture.
                            </p>
                        </div>

                        <div className="
                        grid
                        gap-3
                        sm:grid-cols-2
                        ">
                            {comparisonTips.map((item) => (
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
                                    Ready?
                                </p>

                                <h2 className="
                                mt-4
                                text-3xl
                                font-semibold
                                ">
                                    Start with a property request or tour.
                                </h2>

                                <p className="
                                mt-4
                                max-w-2xl
                                text-sm
                                leading-7
                                text-white/75
                                ">
                                    When you know what you need, send the details
                                    through the right form so the agent can follow up.
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
                                    href="/request-tour"
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
                                    Request Tour
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}