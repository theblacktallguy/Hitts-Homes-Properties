import { Suspense } from "react";

import SearchHeader from "@/components/layout/SearchHeader";
import RequestTourHero from "@/components/forms/request-tour/RequestTourHero";
import RequestTourForm from "@/components/forms/request-tour/RequestTourForm";


export const metadata = {
    title: "Request A Tour | Hitts Homes & Properties",
    description:
        "Schedule an in-person or virtual property tour with Hitts Homes.",
};


export default function RequestTourPage() {
    return (
        <main>
            <SearchHeader />

            <RequestTourHero />


            <section
                id="request-tour-form"
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
                            Private Showing
                        </p>


                        <h2 className="
                        mt-4
                        text-3xl
                        md:text-5xl
                        font-semibold
                        text-[#0B1F3A]
                        ">
                            Schedule Your Property Tour
                        </h2>


                        <p className="
                        mt-5
                        max-w-2xl
                        mx-auto
                        text-neutral-600
                        ">
                            Choose your preferred tour time and tell us
                            which property you would like to see. Our team
                            will confirm the details with you.
                        </p>

                    </div>


                    <Suspense fallback={null}>
                        <RequestTourForm />
                    </Suspense>


                    <section className="px-4 py-16">
                        <div className="mx-auto max-w-6xl">
                            <div className="max-w-2xl">
                                <p className="text-sm font-medium uppercase tracking-wide text-[#C8A45D]">
                                    Tour Options
                                </p>

                                <h2 className="mt-3 text-3xl font-semibold text-[#0B1F3A] md:text-4xl">
                                    See the property in the way that works best for you.
                                </h2>

                                <p className="mt-4 text-neutral-600">
                                    Whether you want to walk through in person or view the home virtually, we make the process simple and personal.
                                </p>
                            </div>

                            <div className="mt-10 grid gap-5 md:grid-cols-3">
                                {[
                                    {
                                        step: "01",
                                        title: "Choose a Property",
                                        text: "Start from a listing page or enter the property details manually.",
                                    },
                                    {
                                        step: "02",
                                        title: "Pick Your Time",
                                        text: "Select your preferred date and time, plus an alternate option if needed.",
                                    },
                                    {
                                        step: "03",
                                        title: "Get Confirmation",
                                        text: "An agent will follow up to confirm availability and next steps.",
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
                        <div className="mx-auto grid max-w-6xl gap-10 rounded-[32px] bg-[#0B1F3A] p-8 text-white md:grid-cols-[1fr_1.2fr] md:p-12">

                            <div>
                                <p className="text-sm font-medium uppercase tracking-wide text-[#C8A45D]">
                                    Why Tour With Us
                                </p>

                                <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                                    Get a closer look before making your next move.
                                </h2>

                                <p className="mt-4 text-white/75">
                                    We help you understand the home, the neighborhood, and the next steps before you commit.
                                </p>
                            </div>


                            <div className="grid gap-5 sm:grid-cols-2">
                                {[
                                    "In-person and virtual tour options",
                                    "Direct follow-up from an agent",
                                    "Helpful local property insight",
                                    "Clear guidance after the showing",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="rounded-2xl border border-white/10 bg-white/10 p-5"
                                    >
                                        <p className="text-sm leading-6 text-white/85">
                                            {item}
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