import RequestPropertyHero from "@/components/forms/property-request/RequestPropertyHero";
import SearchHeader from "@/components/layout/SearchHeader";
import PropertyRequestForm from "@/components/forms/property-request/PropertyRequestForm";


export const metadata = {
    title: "Request A Property | Hitts Homes & Properties",
    description:
        "Tell Hitts Homes what you are looking for and let us help you find your perfect property.",
};


export default function RequestPropertyPage() {
    return (
        <main>
            <SearchHeader />

            <RequestPropertyHero />


            <section
                id="property-request-form"
                className="
                px-5
                py-20
                md:px-10
                bg-[#F8F7F4]
                "
            >

                <div className="mx-auto max-w-5xl">

                    <div className="text-center mb-12">

                        <p className="
                        text-sm
                        uppercase
                        tracking-[0.35em]
                        text-[#C8A45D]
                        font-medium
                        ">
                            Property Concierge
                        </p>


                        <h2 className="
                        mt-4
                        text-3xl
                        md:text-5xl
                        font-semibold
                        text-[#0B1F3A]
                        ">
                            Tell Us About Your Dream Property
                        </h2>


                        <p className="
                        mt-5
                        max-w-2xl
                        mx-auto
                        text-neutral-600
                        ">
                            Share your preferences with us and our team
                            will personally help you discover the right
                            property.
                        </p>

                    </div>


                    <PropertyRequestForm />
                    <section className="px-4 py-16">
                        <div className="mx-auto max-w-6xl">
                            <div className="max-w-2xl">
                                <p className="text-sm font-medium uppercase tracking-wide text-[#C8A45D]">
                                    Simple Process
                                </p>

                                <h2 className="mt-3 text-3xl font-semibold text-[#0B1F3A] md:text-4xl">
                                    Tell us what you’re looking for. We’ll help narrow the search.
                                </h2>

                                <p className="mt-4 text-neutral-600">
                                    Share your ideal location, budget, timeline, and property preferences. Our team will review your request and follow up with options that match your needs.
                                </p>
                            </div>

                            <div className="mt-10 grid gap-5 md:grid-cols-3">
                                {[
                                    {
                                        step: "01",
                                        title: "Share Your Needs",
                                        text: "Tell us where you want to live, your budget, and the kind of property you prefer.",
                                    },
                                    {
                                        step: "02",
                                        title: "We Review Matches",
                                        text: "We compare your request with available homes, rentals, and local opportunities.",
                                    },
                                    {
                                        step: "03",
                                        title: "Get Personal Guidance",
                                        text: "An agent follows up with next steps, recommendations, and answers to your questions.",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.step}
                                        className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                                    >
                                        <span className="text-sm font-semibold text-[#C8A45D]">
                                            {item.step}
                                        </span>

                                        <h3 className="mt-4 text-lg font-semibold text-[#0B1F3A]">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-neutral-600">
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="px-4 py-16">
                        <div className="mx-auto max-w-6xl">
                            <div className="max-w-2xl">
                                <p className="text-sm font-medium uppercase tracking-wide text-[#C8A45D]">
                                    Simple Process
                                </p>

                                <h2 className="mt-3 text-3xl font-semibold text-[#0B1F3A] md:text-4xl">
                                    Tell us what you’re looking for. We’ll help narrow the search.
                                </h2>

                                <p className="mt-4 text-neutral-600">
                                    Share your ideal location, budget, timeline, and property preferences. Our team will review your request and follow up with options that match your needs.
                                </p>
                            </div>

                            <div className="mt-10 grid gap-5 md:grid-cols-3">
                                {[
                                    {
                                        step: "01",
                                        title: "Share Your Needs",
                                        text: "Tell us where you want to live, your budget, and the kind of property you prefer.",
                                    },
                                    {
                                        step: "02",
                                        title: "We Review Matches",
                                        text: "We compare your request with available homes, rentals, and local opportunities.",
                                    },
                                    {
                                        step: "03",
                                        title: "Get Personal Guidance",
                                        text: "An agent follows up with next steps, recommendations, and answers to your questions.",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.step}
                                        className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                                    >
                                        <span className="text-sm font-semibold text-[#C8A45D]">
                                            {item.step}
                                        </span>

                                        <h3 className="mt-4 text-lg font-semibold text-[#0B1F3A]">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-neutral-600">
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                </div>

            </section>


        </main>
    );
}