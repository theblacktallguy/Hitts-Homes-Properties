"use client";

import { ApplyNowStepProps } from "../types";

const contactMethods = [
    {
        id: "phone",
        label: "Phone",
    },
    {
        id: "email",
        label: "Email",
    },
    {
        id: "text",
        label: "Text",
    },
] as const;

function formatDateInput(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 8);

    if (digits.length <= 2) {
        return digits;
    }

    if (digits.length <= 4) {
        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export default function ApplicantInfo({
    formData,
    errors,
    onChange,
}: ApplyNowStepProps) {
    const inputClass = `
        mt-2
        block
        w-full
        min-w-0
        max-w-full
        rounded-2xl
        border
        border-neutral-200
        bg-white
        px-5
        py-4
        text-base
        text-neutral-800
        outline-none
        transition
        focus:border-[#C8A45D]
        focus:ring-4
        focus:ring-[#C8A45D]/10
    `;

    return (
        <div className="space-y-6">


            <div className="min-w-0">
                <label className="text-sm text-black">
                    Full Name
                </label>

                <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                        onChange("fullName", e.target.value)
                    }
                    placeholder="Enter your full name"
                    className={inputClass}
                />

                {errors.fullName && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.fullName}
                    </p>
                )}
            </div>



            <div className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
            ">

                <div className="min-w-0">
                    <label className="text-sm text-black">
                        Email Address
                    </label>

                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            onChange("email", e.target.value)
                        }
                        placeholder="you@email.com"
                        className={inputClass}
                    />

                    {errors.email && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}
                </div>


                <div className="min-w-0">
                    <label className="text-sm text-black">
                        Phone Number
                    </label>

                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                            onChange("phone", e.target.value)
                        }
                        placeholder="Your phone number"
                        className={inputClass}
                    />

                    {errors.phone && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.phone}
                        </p>
                    )}
                </div>

            </div>



            <div className="min-w-0">
                <label className="text-sm text-black">
                    Date of Birth
                </label>

                <input
                    type="text"
                    inputMode="numeric"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                        onChange(
                            "dateOfBirth",
                            formatDateInput(e.target.value)
                        )
                    }
                    placeholder="MM/DD/YYYY"
                    className={`${inputClass} md:hidden`}
                />

                <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                        onChange("dateOfBirth", e.target.value)
                    }
                    className={`${inputClass} hidden md:block`}
                />

                {errors.dateOfBirth && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.dateOfBirth}
                    </p>
                )}
            </div>



            <div className="min-w-0">
                <label className="text-sm text-black">
                    Current Address
                </label>

                <input
                    type="text"
                    value={formData.currentAddress}
                    onChange={(e) =>
                        onChange("currentAddress", e.target.value)
                    }
                    placeholder="Your current address"
                    className={inputClass}
                />

                {errors.currentAddress && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.currentAddress}
                    </p>
                )}
            </div>



            <div>

                <p className="
                text-sm
                font-medium
                text-black
                mb-4
                ">
                    Preferred Contact Method
                </p>

                <div className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-3
                ">

                    {contactMethods.map((item) => {
                        const selected =
                            formData.preferredContactMethod === item.id;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() =>
                                    onChange(
                                        "preferredContactMethod",
                                        item.id
                                    )
                                }
                                className={`
                                rounded-2xl
                                border
                                p-4
                                text-sm
                                font-medium
                                transition
                                ${selected
                                        ? "border-[#C8A45D] bg-[#0B1F3A] text-white"
                                        : "border-neutral-200 bg-white text-[#0B1F3A]"
                                    }
                                `}
                            >
                                {item.label}
                            </button>
                        );
                    })}

                </div>

                {errors.preferredContactMethod && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.preferredContactMethod}
                    </p>
                )}

            </div>


        </div>
    );
}