"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function ApplyNowHero() {
    return (
        <section className="relative h-[70vh] min-h-[550px] w-full overflow-hidden">

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
                    src="/videos/apply-now-bg.mp4"
                    type="video/mp4"
                />
            </video>


            <div
                className="
                absolute
                inset-0
                bg-gradient-to-r
                from-black/70
                via-black/45
                to-black/20
                "
            />


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
                        Apply for Your Next Home
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
                        Submit your rental application securely and
                        let Hitts Homes review your details for the
                        property you are interested in.
                    </p>


                    <Link
                        href="#apply-now-form"
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
                        Start Application

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