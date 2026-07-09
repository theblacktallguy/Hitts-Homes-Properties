"use client";

import { PropertyStepProps } from "../types";


export default function LocationPreference({
    formData,
    errors,
    onChange,
}: PropertyStepProps) {


    return (

        <div className="space-y-6">


            {/* State */}

            <div>

                <label className="
                text-sm
                text-black
                ">
                    Preferred State
                </label>


                <input

                    value={formData.state}

                    onChange={(e) =>
                        onChange(
                            "state",
                            e.target.value
                        )
                    }

                    placeholder="Example: Texas"

                    className="
                    mt-2
                    w-full
                    rounded-2xl
                    border
                    border-neutral-200
                    bg-white
                    px-5
                    py-4
                    text-neutral-800
                    outline-none
                    transition
                    focus:border-[#C8A45D]
                    focus:ring-4
                    focus:ring-[#C8A45D]/10
                    "

                />

                {errors.state && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.state}
                    </p>
                )}

            </div>



            {/* City */}

            <div>

                <label className="
                text-sm
                text-black
                ">
                    Preferred City
                </label>


                <input

                    value={formData.city}

                    onChange={(e) =>
                        onChange(
                            "city",
                            e.target.value
                        )
                    }


                    placeholder="Example: Dallas"

                    className="
                    mt-2
                    w-full
                    rounded-2xl
                    border
                    border-neutral-200
                    bg-white
                    px-5
                    py-4
                    text-neutral-800
                    outline-none
                    transition
                    focus:border-[#C8A45D]
                    focus:ring-4
                    focus:ring-[#C8A45D]/10
                    "

                />

                {errors.city && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.city}
                    </p>
                )}

            </div>




            {/* Neighborhood */}

            <div>

                <label className="
                text-sm
                text-neutral-600
                ">
                    Neighborhood / Area
                    <span className="
                    ml-2
                    text-black
                    ">
                        Optional
                    </span>

                </label>


                <input

                    value={formData.neighborhood}

                    onChange={(e) =>
                        onChange(
                            "neighborhood",
                            e.target.value
                        )
                    }


                    placeholder="Downtown, suburbs, near schools..."

                    className="
                    mt-2
                    w-full
                    rounded-2xl
                    border
                    border-neutral-200
                    bg-white
                    px-5
                    py-4
                    text-neutral-800
                    outline-none
                    transition
                    focus:border-[#C8A45D]
                    focus:ring-4
                    focus:ring-[#C8A45D]/10
                    "

                />

            </div>



            {/* Suggestions toggle */}

            <button

                type="button"

                onClick={() =>
                    onChange(
                        "openToSuggestions",
                        !formData.openToSuggestions
                    )
                }


                className="
                flex
                items-center
                gap-3
                text-sm
                text-neutral-700
                "

            >

                <span

                    className={`
                h-5
                w-5
                rounded-md
                border
                flex
                items-center
                justify-center

                ${formData.openToSuggestions
                            ?
                            "bg-[#C8A45D] border-[#C8A45D]"
                            :
                            "border-neutral-300"
                        }

                `}
                >

                    {
                        formData.openToSuggestions &&
                        "✓"
                    }

                </span>


                I'm open to property recommendations


            </button>


        </div>

    );
}