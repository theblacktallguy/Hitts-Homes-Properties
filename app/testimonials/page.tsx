import Link from "next/link";
import SearchHeader from "@/components/layout/SearchHeader";

export const metadata = {
    title: "Testimonials | Hitts Homes & Properties",
    description:
        "Read client-style testimonials and service highlights from buyers, renters, and property seekers working with Hitts Homes.",
};

const testimonials = [
    {
        name: "Rental Client",
        role: "Apartment Search",
        quote:
            "The process felt organized from the first request. I was able to explain what I needed, compare options, and get clear follow-up about the next step.",
    },
    {
        name: "First-Time Renter",
        role: "Rental Application",
        quote:
            "Having the property details connected to the application made things easier. I knew exactly which listing I was applying for and what information was needed.",
    },
    {
        name: "Buyer Client",
        role: "Home Search",
        quote:
            "The guidance helped me think beyond price. We talked through location, timing, tour options, and whether the property actually fit my plans.",
    },
    {
        name: "Relocation Client",
        role: "Moving to a New Area",
        quote:
            "I needed help narrowing down areas and understanding what to prioritize. The process gave me a better way to compare neighborhoods and properties.",
    },
    {
        name: "Tour Request Client",
        role: "Private Showing",
        quote:
            "Requesting a tour was simple. I could choose the property, pick a preferred time, and wait for confirmation instead of going back and forth.",
    },
    {
        name: "Property Request Client",
        role: "Custom Search",
        quote:
            "I did not know exactly where to start, so I submitted a property request. It helped me organize my budget, location, and property preferences.",
    },
];

const trustPoints = [
    "Responsive follow-up after inquiries",
    "Support for buyers and renters",
    "Property-specific tour and application flows",
    "Guidance for relocation and neighborhood comparison",
    "Clear forms that organize important details",
    "Local service with practical next steps",
];

export default function TestimonialsPage() {
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
                        Client Experiences
                    </p>

                    <h1 className="
                    mt-5
                    max-w-4xl
                    text-4xl
                    font-semibold
                    leading-tight
                    md:text-6xl
                    ">
                        Real estate support that feels clear and personal.
                    </h1>

                    <p className="
                    mt-6
                    max-w-2xl
                    text-base
                    leading-8
                    text-white/85
                    md:text-lg
                    ">
                        See the kinds of experiences Hitts Homes and Properties
                        aims to create for renters, buyers, tour requests, and
                        clients looking for the right property fit.
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
                            Start Your Request
                        </Link>

                        <Link
                            href="/why-choose-us"
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
                            Why Choose Us
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
                            What Clients Value
                        </p>

                        <h2 className="
                        mt-4
                        text-3xl
                        font-semibold
                        text-[#0B1F3A]
                        md:text-5xl
                        ">
                            Helpful guidance at each stage of the process.
                        </h2>

                        <p className="
                        mt-5
                        text-neutral-600
                        leading-8
                        ">
                            Whether someone is applying for a rental, requesting
                            a property, scheduling a tour, or relocating, the goal
                            is the same: make the next step easier to understand.
                        </p>
                    </div>

                    <div className="
                    mt-12
                    grid
                    gap-5
                    md:grid-cols-2
                    lg:grid-cols-3
                    ">
                        {testimonials.map((item) => (
                            <div
                                key={`${item.name}-${item.role}`}
                                className="
                                rounded-[28px]
                                border
                                border-neutral-200
                                bg-white
                                p-6
                                shadow-sm
                                "
                            >
                                <p className="
                                text-4xl
                                font-semibold
                                text-[#C8A45D]
                                ">
                                    “
                                </p>

                                <p className="
                                mt-2
                                text-sm
                                leading-7
                                text-neutral-600
                                ">
                                    {item.quote}
                                </p>

                                <div className="mt-6">
                                    <h3 className="
                                    font-semibold
                                    text-[#0B1F3A]
                                    ">
                                        {item.name}
                                    </h3>

                                    <p className="
                                    mt-1
                                    text-sm
                                    text-neutral-500
                                    ">
                                        {item.role}
                                    </p>
                                </div>
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
                                Trust Signals
                            </p>

                            <h2 className="
                            mt-4
                            text-3xl
                            font-semibold
                            text-[#0B1F3A]
                            ">
                                Built around clarity, responsiveness, and care.
                            </h2>

                            <p className="
                            mt-4
                            text-sm
                            leading-7
                            text-neutral-600
                            ">
                                A good real estate experience is not only about
                                finding a property. It is also about knowing what
                                to do next and having someone available to help
                                you move forward.
                            </p>
                        </div>

                        <div className="
                        grid
                        gap-3
                        sm:grid-cols-2
                        ">
                            {trustPoints.map((item) => (
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
                                    Your Turn
                                </p>

                                <h2 className="
                                mt-4
                                text-3xl
                                font-semibold
                                ">
                                    Start with the step that fits your situation.
                                </h2>

                                <p className="
                                mt-4
                                max-w-2xl
                                text-sm
                                leading-7
                                text-white/75
                                ">
                                    Request a property, schedule a tour, or contact
                                    the agent with questions about a listing.
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