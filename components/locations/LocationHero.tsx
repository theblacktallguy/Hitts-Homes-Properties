"use client";

import Image from "next/image";
import SearchBar from "@/components/home/SearchBar";

const popularLocations = [
    "Texas",
    "Florida",
    "California",
    "Arizona",
    "Georgia",
];

export default function LocationHero() {
    return (
        <section className="relative h-auto min-h-[600px] py-20 md:h-[75vh] md:min-h-[550px] md:py-0 w-full overflow-hidden">
            {/* Background */}
            <Image
                src="/heros-bg/location-hero-bg.jpg"
                alt="Explore locations across the United States"
                fill
                priority
                className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Content */}
            <div className="relative z-10 flex min-h-full items-center justify-center px-5 py-10">
                <div className="w-full max-w-4xl text-center text-white">

                    <h1 className="text-3xl font-bold leading-tight md:text-6xl">
                        Explore Locations
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-sm md:text-xl text-white/90">
                        Find homes, apartments, and properties across cities and states
                        nationwide with Hitts Homes & Properties.
                    </p>


                    {/* Search */}
                    <div className="mx-auto mt-6 w-full max-w-3xl md:mt-8">
                        <SearchBar />
                    </div>


                    {/* Popular searches */}
                    <div className="mt-8">

                        <p className="mb-4 text-sm font-medium text-white">
                            Popular Searches
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">
                            {popularLocations.map((location) => (
                                <button
                                    key={location}
                                    className="
                                    rounded-full
                                    border
                                    border-white/30
                                    bg-white/10
                                    px-3
                                    py-1.5
                                    text-xs
                                    md:px-5
                                    md:py-2
                                    md:text-sm
                                    backdrop-blur-md
                                    transition
                                    hover:bg-white/20
                                    "
                                >
                                    {location}
                                </button>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}