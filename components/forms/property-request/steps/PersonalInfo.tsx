"use client";

import { PropertyStepProps } from "../types";
import { formatPhoneNumber } from "@/lib/formatPhoneNumber";

export default function PersonalInfo({
    formData,
    errors,
    onChange,
}: PropertyStepProps) {


    return (

        <div className="
        space-y-6
        ">


            <div>

                <label className="
                text-sm
                text-black
                ">
                    Full Name
                </label>


                <input

                    type="text"

                    placeholder="Enter your name"

                    value={formData.fullName}

                    onChange={(e) =>
                        onChange("fullName", e.target.value)
                    }

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

                {errors?.fullName && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.fullName}
                    </p>
                )}

            </div>



            <div>

                <label className="
                text-sm
                text-black
                ">
                    Email Address
                </label>


                <input

                    type="email"

                    placeholder="you@email.com"

                    value={formData.email}

                    onChange={(e) =>
                        onChange("email", e.target.value)
                    }

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

                {errors?.email && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.email}
                    </p>
                )}

            </div>




            <div>

                <label className="
                text-sm
                text-black
                ">
                    Phone Number
                </label>


                <input

                    type="tel"

                    inputMode="numeric"

                    maxLength={14}

                    placeholder="(000) 000-0000"

                    value={formData.phone}

                    onChange={(e) =>
                        onChange("phone", formatPhoneNumber(e.target.value))
                    }

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

                {errors?.phone && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.phone}
                    </p>
                )}

            </div>


        </div>

    );
}
