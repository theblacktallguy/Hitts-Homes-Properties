import Link from "next/link";
import SearchHeader from "@/components/layout/SearchHeader";

export const metadata = {
    title: "Avoid Scams | Hitts Homes & Properties",
    description:
        "Learn how to protect yourself from rental and real estate scams before sending money, documents, or application information.",
};

const warningSigns = [
    {
        title: "Pressure to Pay Immediately",
        text: "Be cautious if someone rushes you to send a deposit, application fee, or holding fee before you have confirmed the property and the person you are dealing with.",
    },
    {
        title: "Requests Outside Official Channels",
        text: "Avoid sending sensitive documents, payment, or personal information through unofficial links, personal messages, or unknown third-party accounts.",
    },
    {
        title: "Price Seems Too Good",
        text: "A property listed far below similar homes may be a warning sign. Compare pricing and confirm details before taking action.",
    },
    {
        title: "No Tour or Verification Option",
        text: "Be careful if the person refuses to schedule a tour, provide basic property details, or connect you with an authorized representative.",
    },
    {
        title: "Different Names or Details",
        text: "Watch for mismatched agent names, property addresses, emails, phone numbers, or payment instructions that do not align with the official listing.",
    },
    {
        title: "Requests for Sensitive Data Too Early",
        text: "Do not send identity documents or personal information unless you are using an official application process and understand why the information is needed.",
    },
];

const safeSteps = [
    "Use official Hitts Homes pages and forms.",
    "Confirm the property ID before applying or touring.",
    "Ask questions before sending money or documents.",
    "Verify the agent or contact method if anything feels unusual.",
    "Avoid wire transfers or payment instructions from unknown sources.",
    "Do not share documents through random text links or unverified emails.",
    "Keep copies of conversations and receipts.",
    "Report suspicious requests to the agent before proceeding.",
];

const officialActions = [
    {
        title: "Request a Property",
        text: "Use the property request form if you need help finding a suitable property.",
        href: "/request-property",
    },
    {
        title: "Request a Tour",
        text: "Use the tour request page to schedule an in-person or virtual showing.",
        href: "/request-tour",
    },
    {
        title: "Contact Agent",
        text: "Ask the agent directly if a listing, payment request, or application link seems suspicious.",
        href: "/agent#contact-agent",
    },
];

export default function AvoidScamsPage() {
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
                        Safety Guide
                    </p>

                    <h1 className="
                    mt-5
                    max-w-4xl
                    text-4xl
                    font-semibold
                    leading-tight
                    md:text-6xl
                    ">
                        Protect yourself from rental and real estate scams.
                    </h1>

                    <p className="
                    mt-6
                    max-w-2xl
                    text-base
                    leading-8
                    text-white/85
                    md:text-lg
                    ">
                        Before sending money, documents, or application details,
                        make sure you are using official channels and dealing with
                        an authorized representative.
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
                            Verify With Agent
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
                            Read FAQs
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
                            Warning Signs
                        </p>

                        <h2 className="
                        mt-4
                        text-3xl
                        font-semibold
                        text-[#0B1F3A]
                        md:text-5xl
                        ">
                            Slow down if something feels rushed, unclear, or unofficial.
                        </h2>

                        <p className="
                        mt-5
                        text-neutral-600
                        leading-8
                        ">
                            Scams often rely on urgency, confusion, and pressure.
                            Take time to verify the property, the person contacting
                            you, and the instructions you receive.
                        </p>
                    </div>

                    <div className="
                    mt-12
                    grid
                    gap-5
                    md:grid-cols-2
                    lg:grid-cols-3
                    ">
                        {warningSigns.map((item) => (
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
                                Safer Steps
                            </p>

                            <h2 className="
                            mt-4
                            text-3xl
                            font-semibold
                            text-[#0B1F3A]
                            ">
                                What to do before you apply or pay.
                            </h2>

                            <p className="
                            mt-4
                            text-sm
                            leading-7
                            text-neutral-600
                            ">
                                Use this checklist before sending application details,
                                identity documents, deposits, or rental payments.
                            </p>
                        </div>

                        <div className="
                        grid
                        gap-3
                        sm:grid-cols-2
                        ">
                            {safeSteps.map((item) => (
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
                    grid
                    gap-5
                    md:grid-cols-3
                    ">
                        {officialActions.map((item) => (
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
                                    Go
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
                                    Unsure?
                                </p>

                                <h2 className="
                                mt-4
                                text-3xl
                                font-semibold
                                ">
                                    Verify before you send anything sensitive.
                                </h2>

                                <p className="
                                mt-4
                                max-w-2xl
                                text-sm
                                leading-7
                                text-white/75
                                ">
                                    If a payment request, document request, or listing
                                    detail feels suspicious, contact the agent first.
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