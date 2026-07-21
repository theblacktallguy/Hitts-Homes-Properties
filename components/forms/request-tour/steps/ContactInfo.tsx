"use client";

import { RequestTourStepProps } from "../types";
import { formatPhoneNumber } from "@/lib/formatPhoneNumber";

export default function ContactInfo({
    formData,
    errors,
    onChange,
}: RequestTourStepProps) {
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
                    value={formData.fullName}
                    onChange={(e) =>
                        onChange("fullName", e.target.value)
                    }
                    placeholder="Enter your name"
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

                {errors.fullName && (
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
                    value={formData.email}
                    onChange={(e) =>
                        onChange("email", e.target.value)
                    }
                    placeholder="you@email.com"
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

                {errors.email && (
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
                    value={formData.phone}
                    onChange={(e) =>
                        onChange("phone", formatPhoneNumber(e.target.value))
                    }
                    placeholder="(000) 000-0000"
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

                {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.phone}
                    </p>
                )}

            </div>


        </div>
    );
}
