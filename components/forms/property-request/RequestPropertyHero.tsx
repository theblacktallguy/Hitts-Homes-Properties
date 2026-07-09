"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function RequestPropertyHero() {
    return (
        <section className="relative h-[70vh] min-h-[550px] w-full overflow-hidden">

            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                "
            >
                <source
                    src="/videos/request-property-bg.mp4"
                    type="video/mp4"
                />
            </video>


            {/* Overlay */}
            <div
                className="
                absolute
                inset-0
                bg-gradient-to-r
                from-black/60
                via-black/40
                to-black/20
                "
            />


            {/* Content */}
            <div
                className="
                relative
                z-10
                flex
                h-full
                items-center
                px-5
                md:px-10
                "
            >

                <div
                    className="
                    max-w-3xl
                    text-white
                    "
                >

                    <h1
                        className="
                        text-4xl
                        font-bold
                        leading-tight
                        md:text-6xl
                        "
                    >
                        Find Your Perfect Property
                    </h1>


                    <p
                        className="
                        mt-5
                        max-w-xl
                        text-base
                        leading-7
                        text-white/90
                        md:text-xl
                        "
                    >
                        Tell us what you are looking for and let
                        Hitts Homes help you find a property that
                        fits your needs.
                    </p>


                    <Link
                        href="#property-request-form"
                        className="
                        group
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
                        Start Your Request

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