import Link from "next/link";
import InHeader from "@/components/layout/InHeader";

export const metadata = {
    title: "Privacy Policy | Hitts Homes & Properties",
    description:
        "Learn how Hitts Homes and Properties collects, uses, protects, and handles information submitted through the website.",
};

const privacySections = [
    {
        title: "Information We Collect",
        text: "Hitts Homes and Properties may collect information you provide through forms, inquiries, tour requests, property requests, rental applications, and contact submissions. This may include your name, email, phone number, property preferences, preferred tour times, employment details, rental history, household details, and application documents you choose to upload.",
    },
    {
        title: "How Information Is Used",
        text: "Submitted information is used to respond to inquiries, help with property searches, schedule tours, review rental applications, contact applicants, confirm listing details, and provide real estate-related assistance. We use the information for the purpose connected to the form or request you submitted.",
    },
    {
        title: "Rental Application Documents",
        text: "If you upload identity verification documents for a rental application, those documents are intended for authorized application review only. Sensitive documents should be reviewed only by authorized personnel and handled carefully during the application process.",
    },
    {
        title: "Email and Form Delivery",
        text: "Some forms may send your submitted details to the authorized agent or administrative email connected to Hitts Homes and Properties. Third-party service providers may be used to deliver form submissions, host the website, or support website functionality.",
    },
    {
        title: "Information Sharing",
        text: "We do not sell your personal information. Information may be shared only as needed to respond to your request, review an application, communicate with you, support real estate services, comply with applicable requirements, or use trusted service providers that help operate the website.",
    },
    {
        title: "Data Protection",
        text: "We aim to handle submitted information responsibly and limit access to authorized personnel. Users should avoid submitting sensitive information through unofficial channels. For rental applications, use only the official application form provided by Hitts Homes.",
    },
    {
        title: "Your Choices",
        text: "You may contact Hitts Homes and Properties if you have questions about information you submitted, need to correct details, or want to ask how your submission is being used in connection with your inquiry or application.",
    },
    {
        title: "Policy Updates",
        text: "This Privacy Policy may be updated as website features, forms, services, or business needs change. Updates will be reflected on this page with a revised date.",
    },
];

const dataTypes = [
    "Contact information",
    "Property preferences",
    "Tour scheduling details",
    "Rental application details",
    "Employment and income information",
    "Rental history",
    "Household details",
    "Uploaded verification documents",
];

const relatedLinks = [
    {
        title: "Terms of Use",
        text: "Review terms for using the website, listings, forms, and online services.",
        href: "/terms",
    },
    {
        title: "Avoid Scams",
        text: "Learn how to protect yourself before sending money or documents.",
        href: "/avoid-scams",
    },
    {
        title: "Accessibility",
        text: "Read about our commitment to making the site easier to use.",
        href: "/accessibility",
    },
];

export default function PrivacyPage() {
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
                        Privacy Policy
                    </p>

                    <h1 className="
                    mt-5
                    max-w-4xl
                    text-4xl
                    font-semibold
                    leading-tight
                    md:text-6xl
                    ">
                        How we handle information submitted through the site.
                    </h1>

                    <p className="
                    mt-6
                    max-w-2xl
                    text-base
                    leading-8
                    text-white/85
                    md:text-lg
                    ">
                        This page explains what information may be collected,
                        how it may be used, and how users can contact Hitts Homes
                        and Properties about their submitted details.
                    </p>

                    <div className="
                    mt-10
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                    ">
                        <Link
                            href="/terms"
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
                            View Terms
                        </Link>

                        <Link
                            href="/agent#contact-agent"
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
                            Contact Agent
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
                                    Information Types
                                </p>

                                <h2 className="
                                mt-4
                                text-2xl
                                font-semibold
                                text-[#0B1F3A]
                                ">
                                    What users may submit
                                </h2>

                                <div className="mt-5 space-y-3">
                                    {dataTypes.map((item) => (
                                        <div
                                            key={item}
                                            className="
                                            rounded-2xl
                                            border
                                            border-neutral-200
                                            bg-[#F8F7F4]
                                            p-3
                                            text-sm
                                            text-neutral-700
                                            "
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <p className="
                                mt-6
                                text-sm
                                text-neutral-500
                                ">
                                    Last updated: July 8, 2026
                                </p>
                            </div>
                        </aside>

                        <div className="space-y-5">
                            {privacySections.map((item) => (
                                <section
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
                                    <h2 className="
                                    text-xl
                                    font-semibold
                                    text-[#0B1F3A]
                                    ">
                                        {item.title}
                                    </h2>

                                    <p className="
                                    mt-3
                                    text-sm
                                    leading-7
                                    text-neutral-600
                                    ">
                                        {item.text}
                                    </p>
                                </section>
                            ))}
                        </div>
                    </div>


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
                                    Questions?
                                </p>

                                <h2 className="
                                mt-4
                                text-3xl
                                font-semibold
                                ">
                                    Contact us about submitted information.
                                </h2>

                                <p className="
                                mt-4
                                max-w-2xl
                                text-sm
                                leading-7
                                text-white/75
                                ">
                                    If you need to ask about a form submission,
                                    application, or document upload, contact the
                                    agent directly.
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