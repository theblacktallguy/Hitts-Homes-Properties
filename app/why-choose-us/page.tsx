import Link from "next/link";
import SearchHeader from "@/components/layout/SearchHeader";

export const metadata = {
    title: "Why Choose Us | Hitts Homes & Properties",
    description:
        "Learn why buyers, renters, and property seekers choose Hitts Homes and Properties for local real estate guidance.",
};

const reasons = [
    {
        title: "Personal Guidance",
        text: "Every client has a different timeline, budget, and reason for moving. Hitts Homes gives you direction based on your actual needs, not a one-size-fits-all search.",
    },
    {
        title: "Local Market Awareness",
        text: "We help you understand availability, pricing, neighborhoods, rental expectations, and buying opportunities so you can make a more confident decision.",
    },
    {
        title: "Support for Buyers and Renters",
        text: "Whether you are applying for a rental, scheduling a tour, or searching for a home to purchase, our team helps you take the next step clearly.",
    },
    {
        title: "Simple Online Requests",
        text: "Request a property, schedule a tour, or submit a rental application online with organized forms that send your details directly for review.",
    },
    {
        title: "Clear Communication",
        text: "We focus on practical follow-up, useful answers, and next steps that help reduce confusion during the property search process.",
    },
    {
        title: "Property-Focused Service",
        text: "If you already have a listing in mind, property details can be included when you request a tour or apply, making the process faster and more accurate.",
    },
];

const serviceHighlights = [
    "Rental property applications",
    "Private and virtual tour requests",
    "Property search assistance",
    "Buyer and renter guidance",
    "Listing-specific inquiries",
    "Local agent follow-up",
];

export default function WhyChooseUsPage() {
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
                        Why Hitts Homes
                    </p>

                    <h1 className="
                    mt-5
                    max-w-4xl
                    text-4xl
                    font-semibold
                    leading-tight
                    md:text-6xl
                    ">
                        Real estate guidance built around your next move.
                    </h1>

                    <p className="
                    mt-6
                    max-w-2xl
                    text-base
                    leading-8
                    text-white/85
                    md:text-lg
                    ">
                        Hitts Homes and Properties helps clients move from
                        searching to touring, applying, buying, or renting with
                        a more personal and organized experience.
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
                            Request a Property
                        </Link>

                        <Link
                            href="/our-process"
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
                            View Our Process
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
                            What Makes Us Different
                        </p>

                        <h2 className="
                        mt-4
                        text-3xl
                        font-semibold
                        text-[#0B1F3A]
                        md:text-5xl
                        ">
                            A clearer way to search, tour, and apply.
                        </h2>

                        <p className="
                        mt-5
                        text-neutral-600
                        leading-8
                        ">
                            Real estate decisions can feel overwhelming when details
                            are scattered. Our goal is to make each step easier to
                            understand, whether you are comparing homes, requesting
                            a showing, or submitting an application.
                        </p>
                    </div>

                    <div className="
                    mt-12
                    grid
                    gap-5
                    md:grid-cols-2
                    lg:grid-cols-3
                    ">
                        {reasons.map((item) => (
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
                                Services
                            </p>

                            <h2 className="
                            mt-4
                            text-3xl
                            font-semibold
                            text-[#0B1F3A]
                            ">
                                Help for where you are in the process.
                            </h2>

                            <p className="
                            mt-4
                            text-sm
                            leading-7
                            text-neutral-600
                            ">
                                You may be ready to tour today, still exploring
                                neighborhoods, or preparing to apply. Hitts Homes
                                gives you useful pathways based on your situation.
                            </p>
                        </div>

                        <div className="
                        grid
                        gap-3
                        sm:grid-cols-2
                        ">
                            {serviceHighlights.map((item) => (
                                <div
                                    key={item}
                                    className="
                                    rounded-2xl
                                    border
                                    border-neutral-200
                                    bg-[#F8F7F4]
                                    p-4
                                    text-sm
                                    font-medium
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
                                    Start Here
                                </p>

                                <h2 className="
                                mt-4
                                text-3xl
                                font-semibold
                                ">
                                    Tell us what kind of property you need.
                                </h2>

                                <p className="
                                mt-4
                                max-w-2xl
                                text-sm
                                leading-7
                                text-white/75
                                ">
                                    If you are not sure where to begin, submit a
                                    property request and our team can review your
                                    preferences before following up.
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
                                    Request a Property
                                </Link>

                                <Link
                                    href="/faq"
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
                                    Read FAQs
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}