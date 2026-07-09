"use client";

import { useState } from "react";
import Link from "next/link";
import { getLocationGroups } from "@/lib/locationData";


export default function StateExplorer() {

    const locations = getLocationGroups();

    const [openState, setOpenState] = useState<string | null>(null);



    return (
        <section className="relative bg-gray-100 z-20 px-5 py-16 md:px-10">

            <div className="mx-auto text-black max-w-7xl">


                <div className="mb-10 text-center">

                    <h2 className="text-3xl font-bold md:text-4xl">
                        Explore Homes By State
                    </h2>

                    <p className="mt-3 text-gray-600">
                        Discover available properties across
                        cities and states nationwide.
                    </p>

                </div>



                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">


                    {locations.map((location) => (

                        <div
                            key={location.state}
                            className="
                                overflow-hidden
                                rounded-2xl
                                border
                                bg-white
                                shadow-sm
                            "
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenState((current) =>
                                        current === location.state ? null : location.state
                                    )
                                }
                                className="
                                    flex
                                    w-full
                                    items-center
                                    justify-between
                                    px-5
                                    py-5
                                    text-left
                                    cursor-pointer
                                    select-none
                                    active:bg-gray-50
                                "
                            >
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        {location.state}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {location.propertyCount} properties
                                    </p>
                                </div>

                                <span className="text-xl">
                                    {openState === location.state ? "−" : "+"}
                                </span>
                            </button>


                            {
                                openState === location.state && (

                                    <div className="border-t px-5 py-5">


                                        <p className="mb-3 text-sm font-medium text-gray-700">
                                            Available Cities
                                        </p>


                                        <div className="space-y-2">

                                            {location.cities.map((city) => (

                                                <Link
                                                    key={city.city}
                                                    href={`/search?q=${encodeURIComponent(city.city)}`}
                                                    className="
                                            flex
                                            justify-between
                                            rounded-lg
                                            px-3
                                            py-2
                                            text-sm
                                            hover:bg-gray-100
                                            "
                                                >

                                                    <span>
                                                        {city.city}
                                                    </span>


                                                    <span className="text-gray-500">
                                                        {city.propertyCount}
                                                    </span>

                                                </Link>

                                            ))}

                                        </div>



                                        <Link
                                            href={`/search?q=${encodeURIComponent(location.state)}`}
                                            className="
                                        mt-5
                                        block
                                        rounded-xl
                                        bg-black
                                        py-3
                                        text-center
                                        text-sm
                                        font-medium
                                        text-white
                                        "
                                        >
                                            View all {location.state} properties
                                        </Link>


                                    </div>

                                )
                            }


                        </div>

                    ))}


                </div>


            </div>

        </section >
    );
}