import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function LocationCTA() {
    return (
        <section className="px-5 py-16 bg-gray-100 md:px-10">

            <div
                className="
                relative
                mx-auto
                max-w-7xl
                overflow-hidden
                rounded-3xl
                bg-[#0B1F3A]
                px-6
                py-14
                text-center
                text-white
                md:px-12
                "
            >

                {/* Gold Accent */}
                <div
                    className="
                    absolute
                    left-1/2
                    top-0
                    h-1
                    w-32
                    -translate-x-1/2
                    bg-[#C9A227]
                    "
                />


                <div className="relative z-10">

                    <h2
                        className="
                        text-3xl
                        font-bold
                        leading-tight
                        md:text-4xl
                        "
                    >
                        Need Help Finding The Right Home?
                    </h2>


                    <p
                        className="
                        mx-auto
                        mt-5
                        max-w-2xl
                        text-sm
                        leading-6
                        text-white/80
                        md:text-lg
                        "
                    >
                        Tell us what you are looking for and let
                        Hitts Homes help you find a property that
                        fits your needs.
                    </p>



                    <Link
                        href="/request-property"
                        className="
                        group
                        mx-auto
                        mt-8
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-[#C9A227]
                        px-6
                        py-3
                        font-semibold
                        text-[#0B1F3A]
                        transition
                        hover:bg-[#d8b43c]
                        "
                    >
                        Request A Property

                        <FiArrowRight
                            className="
                            transition-transform
                            group-hover:translate-x-1
                            "
                        />

                    </Link>


                </div>

            </div>

        </section>
    );
}