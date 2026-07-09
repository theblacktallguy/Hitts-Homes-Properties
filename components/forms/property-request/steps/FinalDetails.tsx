"use client";

import { PropertyStepProps } from "../types";


export default function FinalDetails({
    formData,
    errors,
    onChange,
}: PropertyStepProps) {


    const timelines = [
        "Immediately",
        "Within 30 days",
        "1-3 Months",
        "Just Exploring",
    ];


    return (

        <div className="space-y-10">


            {/* Budget */}

            <div>

                <p className="
                text-sm
                text-black
                mb-4
                ">
                    Your Budget
                </p>


                <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-5
                text-neutral-700
                ">


                    <div>

                        <div className="relative">

                            <span className="
                            pointer-events-none
                            absolute
                            left-5
                            top-1/2
                            -translate-y-1/2
                            text-neutral-700
                            ">
                                $
                            </span>

                            <input

                                value={formData.minBudget}

                                onChange={(e) =>
                                    onChange(
                                        "minBudget",
                                        e.target.value.replace(/\D/g, "")
                                    )
                                }

                                placeholder="Minimum budget"

                                inputMode="numeric"

                                className="
                                w-full
                                rounded-2xl
                                border
                                border-neutral-200
                                bg-white
                                px-5
                                py-4
                                pl-9
                                outline-none
                                focus:border-[#C8A45D]
                                "

                            />

                        </div>

                        {errors.minBudget && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.minBudget}
                            </p>
                        )}

                    </div>



                    <div>

                        <div className="relative">

                            <span className="
                            pointer-events-none
                            absolute
                            left-5
                            top-1/2
                            -translate-y-1/2
                            text-neutral-700
                            ">
                                $
                            </span>

                            <input

                                value={formData.maxBudget}

                                onChange={(e) =>
                                    onChange(
                                        "maxBudget",
                                        e.target.value.replace(/\D/g, "")
                                    )
                                }

                                placeholder="Maximum budget"

                                inputMode="numeric"

                                className="
                                w-full
                                rounded-2xl
                                border
                                border-neutral-200
                                bg-white
                                px-5
                                py-4
                                pl-9
                                outline-none
                                focus:border-[#C8A45D]
                                "

                            />

                        </div>

                        {errors.maxBudget && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.maxBudget}
                            </p>
                        )}

                    </div>


                </div>


            </div>




            {/* Timeline */}

            <div>

                <p className="
                text-sm
                text-black
                mb-4
                ">
                    When are you looking to move?
                </p>


                <div className="
                grid
                grid-cols-2
                gap-4
                ">


                    {timelines.map((item) => {
                        const selected = formData.timeline === item;

                        return (
                            <button
                                key={item}
                                type="button"
                                onClick={() => onChange("timeline", item)}
                                className={`
                                rounded-2xl
                                border
                                p-4
                                text-sm
                                transition
                                ${selected
                                        ? "bg-[#0B1F3A] text-white border-[#C8A45D]"
                                        : "bg-white border-neutral-200 text-[#0B1F3A]"
                                    }
                                `}
                            >
                                {item}
                            </button>
                        );
                    })}


                </div>
                {errors.timeline && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.timeline}
                    </p>
                )}


            </div>





            {/* Message */}

            <div>

                <p className="
                text-sm
                text-black
                mb-3
                ">
                    Additional Details
                </p>


                <textarea

                    value={formData.message}

                    onChange={(e) =>
                        onChange(
                            "message",
                            e.target.value
                        )
                    }


                    rows={5}

                    placeholder="
                Tell us anything else about your ideal property...
                "

                    className="
                w-full
                rounded-3xl
                border
                border-neutral-200
                text-neutral-700

                bg-white
                px-5
                py-4
                resize-none
                outline-none
                focus:border-[#C8A45D]
                "

                />


            </div>


        </div>

    );

}