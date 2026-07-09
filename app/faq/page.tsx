import Link from "next/link";
import InHeader from "@/components/layout/InHeader";

export const metadata = {
    title: "FAQ | Hitts Homes & Properties",
    description:
        "Find answers to common questions about buying, renting, tours, applications, property requests, and working with Hitts Homes.",
};

const faqGroups = [
    {
        title: "Getting Started",
        questions: [
            {
                question: "What does Hitts Homes and Properties help with?",
                answer:
                    "Hitts Homes helps clients search for rental homes, homes for sale, property tours, rental applications, and personalized property requests based on budget, location, timeline, and lifestyle needs.",
            },
            {
                question: "Can I request help finding a property?",
                answer:
                    "Yes. If you do not already have a specific property in mind, you can submit a property request and tell us what you are looking for. Our team will review your preferences and follow up with suitable options.",
            },
            {
                question: "Do I need to know the exact property before contacting you?",
                answer:
                    "No. You can contact us with general questions, request a property search, or schedule a tour for a specific listing if you already found one you like.",
            },
        ],
    },
    {
        title: "Tours & Showings",
        questions: [
            {
                question: "How do I request a property tour?",
                answer:
                    "You can request a tour directly from a listing page or from the request tour page. If you start from a listing, the property details may be filled in automatically.",
            },
            {
                question: "Can I request a virtual tour?",
                answer:
                    "Yes. The tour request form lets you choose between an in-person tour and a virtual tour, depending on your schedule and the property availability.",
            },
            {
                question: "How soon will someone confirm my tour?",
                answer:
                    "After you submit a request, an agent will review the property details and preferred schedule, then contact you to confirm availability and next steps.",
            },
        ],
    },
    {
        title: "Rental Applications",
        questions: [
            {
                question: "What information is needed to apply for a rental?",
                answer:
                    "The rental application asks for applicant details, property information, employment and income details, rental history, household information, screening questions, and identity verification documents.",
            },
            {
                question: "Why do I need to upload identity documents?",
                answer:
                    "Identity documents help the authorized agent verify the applicant during the rental review process. Uploaded documents should only be used for application review and handled by authorized personnel.",
            },
            {
                question: "Can I apply for a property from the listing page?",
                answer:
                    "Yes. If a rental listing has an Apply Now button, it can take you to the application page with the property details already included.",
            },
        ],
    },
    {
        title: "Buying & Renting",
        questions: [
            {
                question: "Can Hitts Homes help me buy a home?",
                answer:
                    "Yes. If you are looking to buy, you can request a property, schedule tours, and speak with an agent about availability, location, pricing, and next steps.",
            },
            {
                question: "Can Hitts Homes help me rent a home?",
                answer:
                    "Yes. Rental clients can browse available listings, request tours, contact the listing agent, and submit applications for properties they are interested in.",
            },
            {
                question: "Are listing prices and availability always current?",
                answer:
                    "Listings are updated as information becomes available, but pricing, availability, and terms can change. Always confirm details with the agent before making a decision.",
            },
        ],
    },
];

export default function FAQPage() {
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
                        Help Center
                    </p>

                    <h1 className="
                    mt-5
                    max-w-4xl
                    text-4xl
                    font-semibold
                    leading-tight
                    md:text-6xl
                    ">
                        Frequently Asked Questions
                    </h1>

                    <p className="
                    mt-6
                    max-w-2xl
                    text-base
                    leading-8
                    text-white/85
                    md:text-lg
                    ">
                        Get clear answers about requesting properties, scheduling tours,
                        applying for rentals, and working with Hitts Homes and Properties.
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
                            href="/request-tour"
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
                            Schedule a Tour
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
                    <div className="
                    grid
                    gap-8
                    lg:grid-cols-[0.75fr_1.25fr]
                    ">
                        <aside>
                            <div className="
                            sticky
                            top-24
                            rounded-[28px]
                            border
                            border-neutral-200
                            bg-white
                            p-6
                            shadow-sm
                            ">
                                <p className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-[0.25em]
                                text-[#C8A45D]
                                ">
                                    Quick Note
                                </p>

                                <h2 className="
                                mt-4
                                text-2xl
                                font-semibold
                                text-[#0B1F3A]
                                ">
                                    Still need help?
                                </h2>

                                <p className="
                                mt-4
                                text-sm
                                leading-7
                                text-neutral-600
                                ">
                                    If your question is about a specific listing, include the
                                    property ID when you contact the agent. This helps us respond
                                    faster with accurate details.
                                </p>

                                <Link
                                    href="/agent#contact-agent"
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
                                    Contact Agent
                                </Link>
                            </div>
                        </aside>

                        <div className="space-y-8">
                            {faqGroups.map((group) => (
                                <section
                                    key={group.title}
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
                                    <h2 className="
                                    text-2xl
                                    font-semibold
                                    text-[#0B1F3A]
                                    ">
                                        {group.title}
                                    </h2>

                                    <div className="mt-6 divide-y divide-neutral-200">
                                        {group.questions.map((item) => (
                                            <div
                                                key={item.question}
                                                className="py-5"
                                            >
                                                <h3 className="
                                                text-base
                                                font-semibold
                                                text-neutral-950
                                                ">
                                                    {item.question}
                                                </h3>

                                                <p className="
                                                mt-3
                                                text-sm
                                                leading-7
                                                text-neutral-600
                                                ">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>


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
                                    Next Step
                                </p>

                                <h2 className="
                                mt-4
                                text-3xl
                                font-semibold
                                ">
                                    Ready to move forward?
                                </h2>

                                <p className="
                                mt-4
                                max-w-2xl
                                text-sm
                                leading-7
                                text-white/75
                                ">
                                    Tell us what you need, whether you are searching, touring,
                                    applying, or simply comparing your options.
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
                                    Request Help
                                </Link>

                                <Link
                                    href="/our-process"
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
                                    See Our Process
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}