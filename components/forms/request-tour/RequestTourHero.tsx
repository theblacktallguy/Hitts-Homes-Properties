"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function RequestTourHero() {
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
                    src="/videos/request-tour-bg.mp4"
                    type="video/mp4"
                />
            </video>


            {/* Overlay */}
            <div
                className="
                absolute
                inset-0
                bg-gradient-to-r
                from-black/65
                via-black/45
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
                        Schedule a Private Tour
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
                        Choose a property, pick your preferred time,
                        and let Hitts Homes help you experience the
                        home in person or virtually.
                    </p>


                    <Link
                        href="#request-tour-form"
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
                        Request a Tour

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