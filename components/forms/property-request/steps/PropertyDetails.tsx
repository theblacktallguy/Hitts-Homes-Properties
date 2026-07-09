"use client";

import { motion } from "framer-motion";
import { PropertyStepProps } from "../types";






export default function PropertyDetails({
    formData,
    errors,
    onChange,
}: PropertyStepProps) {


    const propertyTypes = [
        {
            id: "apartment",
            icon: "🏢",
            label: "Apartment",
        },
        {
            id: "house",
            icon: "🏡",
            label: "Single Family Home",
        },
        {
            id: "condo",
            icon: "🏙",
            label: "Condo",
        },
        {
            id: "townhome",
            icon: "🏘",
            label: "Townhome",
        },
    ];


    const amenities = [
        "Garage",
        "Pool",
        "Pet Friendly",
        "Modern Kitchen",
        "School District",
        "Outdoor Space",
    ];



    function updateAmenity(item: string) {

        const current =
            formData.amenities || [];


        if (current.includes(item)) {

            onChange(
                "amenities",
                current.filter(
                    (x: string) => x !== item
                )
            );

        } else {

            onChange(
                "amenities",
                [
                    ...current,
                    item
                ]
            );

        }

    }



    return (

        <div className="space-y-10">


            {/* Property Type */}

            <div>

                <p className="
                text-sm
                text-black
                mb-4
                ">
                    Property Type
                </p>


                <div className="
                grid
                grid-cols-2
                gap-4
                ">


                    {
                        propertyTypes.map((item) => (


                            <motion.button

                                key={item.id}

                                type="button"

                                whileHover={{
                                    scale: 1.03
                                }}

                                whileTap={{
                                    scale: .97
                                }}

                                onClick={() =>
                                    onChange(
                                        "propertyType",
                                        item.id
                                    )
                                }


                                className={`
                                rounded-3xl
                                border
                                p-5
                                text-left
                                transition


                                    ${formData.propertyType === item.id

                                        ?

                                        "bg-[#0B1F3A] border-[#C8A45D] text-white"

                                        :

                                        "bg-white border-neutral-200 text-[#0B1F3A]"

                                    }

                                `}

                            >


                                <div className="text-3xl">
                                    {item.icon}
                                </div>


                                <p className="
                                mt-3
                                font-medium
                                ">
                                    {item.label}
                                </p>


                            </motion.button>


                        ))
                    }


                </div>
                {errors.propertyType && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.propertyType}
                    </p>
                )}


            </div>





            {/* Bedrooms */}

            <div>


                <p className="
                text-sm
                text-black
                mb-3
                ">
                    Bedrooms
                </p>


                <div className="
                flex
                items-center
                justify-between
                rounded-3xl
                border
                bg-white
                p-5
                ">


                    <button
                        type="button"
                        className="text-black"

                        onClick={() => {

                            const value =
                                Math.max(
                                    0,
                                    Number(formData.bedrooms || 0) - 1
                                )

                            onChange(
                                "bedrooms",
                                String(value)
                            )

                        }}

                    >
                        −
                    </button>


                    <span className="
                    text-xl
                    font-semibold
                    text-neutral-600
                    ">
                        {
                            formData.bedrooms || 0
                        }
                    </span>


                    <button

                        type="button"
                        className="text-black"

                        onClick={() => {

                            onChange(
                                "bedrooms",
                                String(
                                    Number(formData.bedrooms || 0) + 1
                                )
                            )

                        }}

                    >
                        +
                    </button>


                </div>
                {errors.bedrooms && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.bedrooms}
                    </p>
                )}


            </div>





            {/* Bathrooms */}

            <div>


                <p className="
                text-sm
                text-black
                mb-3
                ">
                    Bathrooms
                </p>


                <div className="
                flex
                items-center
                justify-between
                rounded-3xl
                border
                bg-white
                p-5
                ">


                    <button

                        type="button"
                        className="text-black"

                        onClick={() => {

                            const value =
                                Math.max(
                                    0,
                                    Number(formData.bathrooms || 0) - 1
                                )

                            onChange(
                                "bathrooms",
                                String(value)
                            )

                        }}

                    >
                        −
                    </button>



                    <span className="
                    text-xl
                    font-semibold
                    text-neutral-600
                    ">
                        {
                            formData.bathrooms || 0
                        }
                    </span>



                    <button

                        type="button"
                        className="text-black"

                        onClick={() => {

                            onChange(
                                "bathrooms",
                                String(
                                    Number(formData.bathrooms || 0) + 1
                                )
                            )

                        }}

                    >
                        +
                    </button>


                </div>
                {errors.bathrooms && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.bathrooms}
                    </p>
                )}


            </div>





            {/* Amenities */}

            <div>


                <p className="
                text-sm
                text-black
                mb-4
                ">
                    What matters most?
                </p>


                <div className="
                flex
                flex-wrap
                gap-3
                ">


                    {
                        amenities.map(item => (


                            <button

                                key={item}

                                type="button"

                                onClick={() =>
                                    updateAmenity(item)
                                }

                                className={`

                                rounded-full
                                border
                                px-5
                                py-2
                                text-sm
                                transition
                                text-neutral-500


                                ${formData.amenities?.includes(item)

                                        ?

                                        "bg-[#C8A45D] text-white border-[#C8A45D]"

                                        :

                                        "bg-white border-neutral-200"

                                    }

                                `}

                            >

                                {item}

                            </button>


                        ))
                    }


                </div>


            </div>


        </div>

    );

}