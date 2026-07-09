import Link from "next/link";
import InHeader from "@/components/layout/InHeader";

export const metadata = {
    title: "Our Process | Hitts Homes & Properties",
    description:
        "Learn how Hitts Homes and Properties helps clients request properties, schedule tours, apply for rentals, and move forward with confidence.",
};

const processSteps = [
    {
        step: "01",
        title: "Tell Us What You Need",
        text: "Start with a property request, tour request, application, or direct contact. The more clearly you share your goals, budget, timeline, and preferred location, the easier it is to guide you.",
    },
    {
        step: "02",
        title: "We Review the Details",
        text: "Our team reviews your submission, property interest, timeline, and any listing-specific information so we can understand what kind of follow-up is needed.",
    },
    {
        step: "03",
        title: "You Get Clear Follow-Up",
        text: "An agent follows up about availability, tours, application next steps, questions, or property options that may fit your request.",
    },
    {
        step: "04",
        title: "Compare Your Options",
        text: "We help you think through price, location, property features, lease terms, timing, and next steps so you can make a more informed decision.",
    },
    {
        step: "05",
        title: "Move Forward With Confidence",
        text: "Once you are ready, we help you proceed with touring, applying, asking questions, or continuing the search until the right fit is clearer.",
    },
];

const pathways = [
    {
        title: "Request a Property",
        text: "Best if you know what you want but have not found the right listing yet.",
        href: "/request-property",
    },
    {
        title: "Request a Tour",
        text: "Best if you found a listing and want to see it in person or virtually.",
        href: "/request-tour",
    },
    {
        title: "Apply Now",
        text: "Best if you are ready to submit a rental application for a specific property.",
        href: "/apply",
    },
];

export default function OurProcessPage() {
    return (
        <main>
            <InHeader />

            <section className="
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
                    <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#F3D27A]">
                        Our Process
                    </p>

                    <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
                        A simpler path from interest to next steps.
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
                        Whether you are browsing, touring, applying, buying, or
                        relocating, our process is designed to keep the next step
                        clear and practical.
                    </p>
                </div>
            </section>


            <section className="bg-[#F8F7F4] px-5 py-20 md:px-10">
                <div className="mx-auto max-w-6xl">
                    <div className="max-w-3xl">
                        <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#C8A45D]">
                            Step by Step
                        </p>

                        <h2 className="mt-4 text-3xl font-semibold text-[#0B1F3A] md:text-5xl">
                            How we help you move forward.
                        </h2>

                        <p className="mt-5 leading-8 text-neutral-600">
                            Real estate decisions are easier when the process is
                            organized. Here is how Hitts Homes helps turn interest
                            into action.
                        </p>
                    </div>

                    <div className="mt-12 space-y-5">
                        {processSteps.map((item) => (
                            <div
                                key={item.step}
                                className="grid gap-5 rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm md:grid-cols-[120px_1fr] md:p-8"
                            >
                                <div className="text-3xl font-semibold text-[#C8A45D]">
                                    {item.step}
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#0B1F3A]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-neutral-600">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>


                    <section className="mt-16 grid gap-5 md:grid-cols-3">
                        {pathways.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm"
                            >
                                <h3 className="text-lg font-semibold text-[#0B1F3A]">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-neutral-600">
                                    {item.text}
                                </p>

                                <Link
                                    href={item.href}
                                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white"
                                >
                                    Start Here
                                </Link>
                            </div>
                        ))}
                    </section>


                    <section className="mt-16 rounded-[32px] bg-[#0B1F3A] p-8 text-white md:p-12">
                        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
                            <div>
                                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#C8A45D]">
                                    Still Unsure?
                                </p>

                                <h2 className="mt-4 text-3xl font-semibold">
                                    Ask a question before you take the next step.
                                </h2>

                                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
                                    If you are unsure whether to request, tour, or
                                    apply, contact the agent and include any property
                                    ID you are asking about.
                                </p>
                            </div>

                            <Link
                                href="/agent#contact-agent"
                                className="inline-flex items-center justify-center rounded-xl bg-[#C8A45D] px-6 py-3 text-sm font-semibold text-[#0B1F3A]"
                            >
                                Contact Agent
                            </Link>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}