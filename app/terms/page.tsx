import Link from "next/link";
import InHeader from "@/components/layout/InHeader";

export const metadata = {
    title: "Terms of Use | Hitts Homes & Properties",
    description:
        "Review the terms for using the Hitts Homes and Properties website, forms, listings, and online services.",
};

const termsSections = [
    {
        title: "Website Use",
        text: "This website is provided to help users browse property information, request assistance, schedule tours, submit applications, and contact Hitts Homes and Properties. By using the site, you agree to use it for lawful purposes and not interfere with its functionality, security, or availability.",
    },
    {
        title: "Listing Information",
        text: "Property details, pricing, availability, photos, descriptions, fees, and terms may change without notice. While we aim to provide helpful and accurate information, users should confirm all listing details directly with the agent before making decisions.",
    },
    {
        title: "Forms and Submissions",
        text: "When you submit a form, you agree that the information provided is accurate to the best of your knowledge. Submitted details may be used to respond to your request, review applications, schedule tours, or provide real estate assistance.",
    },
    {
        title: "Rental Applications",
        text: "Rental application submissions do not guarantee approval, availability, lease terms, or acceptance. Applications may be reviewed based on property requirements, applicant information, verification documents, and other applicable criteria.",
    },
    {
        title: "Identity Verification",
        text: "If identity documents are requested for application review, they should be submitted only through official Hitts Homes forms. Documents are intended for authorized review and verification related to rental application processing.",
    },
    {
        title: "No Professional Guarantee",
        text: "Information on this website is provided for general real estate service and informational purposes. It should not be treated as legal, tax, financial, or lending advice. Users should consult appropriate professionals when needed.",
    },
    {
        title: "Third-Party Services",
        text: "The site may use third-party tools for email delivery, hosting, maps, analytics, forms, or related services. Hitts Homes is not responsible for third-party websites or services linked from this site.",
    },
    {
        title: "Changes to Terms",
        text: "These terms may be updated as the website, services, forms, or business needs change. Continued use of the website after changes means you accept the updated terms.",
    },
];

const relatedLinks = [
    {
        title: "Privacy Policy",
        text: "Learn how submitted information may be collected, used, and handled.",
        href: "/privacy",
    },
    {
        title: "Avoid Scams",
        text: "Review safety tips before sending money, documents, or application details.",
        href: "/avoid-scams",
    },
    {
        title: "FAQ",
        text: "Find answers about tours, applications, property requests, and listings.",
        href: "/faq",
    },
];

export default function TermsPage() {
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
                        Terms of Use
                    </p>

                    <h1 className="
                    mt-5
                    max-w-4xl
                    text-4xl
                    font-semibold
                    leading-tight
                    md:text-6xl
                    ">
                        Terms for using Hitts Homes online services.
                    </h1>

                    <p className="
                    mt-6
                    max-w-2xl
                    text-base
                    leading-8
                    text-white/85
                    md:text-lg
                    ">
                        These terms explain how users should interact with the
                        website, property listings, forms, applications, and
                        related online features.
                    </p>

                    <div className="
                    mt-10
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                    ">
                        <Link
                            href="/privacy"
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
                            View Privacy Policy
                        </Link>

                        <Link
                            href="/avoid-scams"
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
                            Avoid Scams
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
                                    Important
                                </p>

                                <h2 className="
                                mt-4
                                text-2xl
                                font-semibold
                                text-[#0B1F3A]
                                ">
                                    Confirm property details before taking action.
                                </h2>

                                <p className="
                                mt-4
                                text-sm
                                leading-7
                                text-neutral-600
                                ">
                                    Listing details may change. Always confirm
                                    availability, pricing, fees, lease terms, and
                                    requirements with the agent before applying,
                                    touring, or making decisions.
                                </p>

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
                            {termsSections.map((item) => (
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
                </div>
            </section>
        </main>
    );
}