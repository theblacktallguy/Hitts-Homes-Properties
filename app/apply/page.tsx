import { Suspense } from "react";

import SearchHeader from "@/components/layout/SearchHeader";
import ApplyNowHero from "@/components/forms/apply-now/ApplyNowHero";
import ApplyNowForm from "@/components/forms/apply-now/ApplyNowForm";


export const metadata = {
    title: "Apply Now | Hitts Homes & Properties",
    description:
        "Submit your rental application for a Hitts Homes property.",
};


export default function ApplyNowPage() {
    return (
        <main>
            <SearchHeader />

            <ApplyNowHero />


            <section
                id="apply-now-form"
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
                            Rental Application
                        </p>


                        <h2 className="
                        mt-4
                        text-3xl
                        md:text-5xl
                        font-semibold
                        text-[#0B1F3A]
                        ">
                            Apply for a Hitts Homes Property
                        </h2>


                        <p className="
                        mt-5
                        max-w-2xl
                        mx-auto
                        text-neutral-600
                        ">
                            Complete your application details and upload
                            the required verification documents. Our team
                            will review your submission and contact you
                            with next steps.
                        </p>

                    </div>


                    <Suspense fallback={null}>
                        <ApplyNowForm />
                    </Suspense>


                    <section className="px-4 py-16">
                        <div className="mx-auto max-w-6xl">
                            <div className="max-w-2xl">
                                <p className="text-sm font-medium uppercase tracking-wide text-[#C8A45D]">
                                    Application Process
                                </p>

                                <h2 className="mt-3 text-3xl font-semibold text-[#0B1F3A] md:text-4xl">
                                    A clear path from application to next steps.
                                </h2>

                                <p className="mt-4 text-neutral-600">
                                    Share your rental history, employment details, and verification documents so our team can review your application efficiently.
                                </p>
                            </div>

                            <div className="mt-10 grid gap-5 md:grid-cols-3">
                                {[
                                    {
                                        step: "01",
                                        title: "Complete Details",
                                        text: "Tell us about yourself, the rental property, your employment, and household details.",
                                    },
                                    {
                                        step: "02",
                                        title: "Upload Verification",
                                        text: "Provide the required identity documents for application review.",
                                    },
                                    {
                                        step: "03",
                                        title: "Get Follow-Up",
                                        text: "An agent reviews your application and contacts you about next steps.",
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
                                    Secure Review
                                </p>

                                <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                                    Your application is sent directly for authorized review.
                                </h2>

                                <p className="mt-4 text-white/75">
                                    Hitts Homes uses your submitted information only to review your rental application and follow up with you.
                                </p>
                            </div>


                            <div className="grid gap-5 sm:grid-cols-2">
                                {[
                                    "Identity documents included for review",
                                    "Application details sent to the agent",
                                    "Clear next steps after submission",
                                    "Documents reviewed by authorized personnel",
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