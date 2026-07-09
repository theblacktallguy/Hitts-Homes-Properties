import Link from "next/link";
import InHeader from "@/components/layout/InHeader";

export const metadata = {
    title: "Accessibility | Hitts Homes & Properties",
    description:
        "Learn about Hitts Homes and Properties' commitment to providing an accessible website experience.",
};

const commitments = [
    {
        title: "Readable Content",
        text: "We aim to present information with clear headings, readable text, sufficient spacing, and layouts that work across mobile and desktop screens.",
    },
    {
        title: "Keyboard-Friendly Navigation",
        text: "Interactive links, buttons, and forms should be usable with standard keyboard navigation where possible.",
    },
    {
        title: "Helpful Form Labels",
        text: "Forms are designed with visible labels and validation messages to help users understand what information is needed.",
    },
    {
        title: "Responsive Pages",
        text: "Pages are built to adapt to different screen sizes so users can browse listings, request tours, and submit forms from different devices.",
    },
];

const tips = [
    "Use browser zoom if text appears too small.",
    "Use built-in screen reader tools when needed.",
    "Use keyboard tab navigation to move through links and fields.",
    "Contact us if a page, form, or listing is difficult to use.",
    "Include the page URL and a short description of the issue when reporting an accessibility concern.",
    "If a form is difficult to complete online, ask the agent for assistance.",
];

export default function AccessibilityPage() {
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
                        Accessibility
                    </p>

                    <h1 className="
                    mt-5
                    max-w-4xl
                    text-4xl
                    font-semibold
                    leading-tight
                    md:text-6xl
                    ">
                        Making property information easier to access.
                    </h1>

                    <p className="
                    mt-6
                    max-w-2xl
                    text-base
                    leading-8
                    text-white/85
                    md:text-lg
                    ">
                        Hitts Homes and Properties wants users to browse listings,
                        submit requests, contact the agent, and access information
                        with as little friction as possible.
                    </p>

                    <div className="
                    mt-10
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                    ">
                        <Link
                            href="/agent#contact-agent"
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
                            Report an Issue
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
                            Visit FAQ
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
                            Our Commitment
                        </p>

                        <h2 className="
                        mt-4
                        text-3xl
                        font-semibold
                        text-[#0B1F3A]
                        md:text-5xl
                        ">
                            A website experience that supports more users.
                        </h2>

                        <p className="
                        mt-5
                        text-neutral-600
                        leading-8
                        ">
                            Accessibility is an ongoing effort. We continue to
                            improve page structure, mobile usability, form clarity,
                            and navigation so users can more easily find property
                            information and contact our team.
                        </p>
                    </div>

                    <div className="
                    mt-12
                    grid
                    gap-5
                    md:grid-cols-2
                    ">
                        {commitments.map((item) => (
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
                                Helpful Tips
                            </p>

                            <h2 className="
                            mt-4
                            text-3xl
                            font-semibold
                            text-[#0B1F3A]
                            ">
                                If something is hard to use, let us know.
                            </h2>

                            <p className="
                            mt-4
                            text-sm
                            leading-7
                            text-neutral-600
                            ">
                                If you experience difficulty accessing a page,
                                form, button, listing, or document, contact the
                                agent so we can review the issue and help you
                                complete your request.
                            </p>
                        </div>

                        <div className="
                        grid
                        gap-3
                        sm:grid-cols-2
                        ">
                            {tips.map((item) => (
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
                                    Need Assistance?
                                </p>

                                <h2 className="
                                mt-4
                                text-3xl
                                font-semibold
                                ">
                                    Contact us if you need help using the site.
                                </h2>

                                <p className="
                                mt-4
                                max-w-2xl
                                text-sm
                                leading-7
                                text-white/75
                                ">
                                    If you cannot access a form or property detail,
                                    we can help you connect with the right next step.
                                </p>
                            </div>

                            <Link
                                href="/agent#contact-agent"
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
                                Contact Agent
                            </Link>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}