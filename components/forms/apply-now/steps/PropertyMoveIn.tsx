"use client";

import { ApplyNowStepProps } from "../types";

const leaseTerms = [
    "3 months",
    "6 months",
    "12 months",
    "18 months",
    "24 months",
    "Not sure yet",
];

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

export default function PropertyMoveIn({
    formData,
    errors,
    onChange,
}: ApplyNowStepProps) {
    const hasSelectedProperty =
        formData.source === "property-page";

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
        <div className="space-y-8">


            <div>

                <p className="
                text-sm
                font-medium
                text-black
                mb-4
                ">
                    Property Applying For
                </p>


                {hasSelectedProperty && (
                    <div className="
                    mb-5
                    rounded-3xl
                    border
                    border-neutral-200
                    bg-neutral-50
                    p-5
                    ">

                        <p className="
                        text-xs
                        font-semibold
                        uppercase
                        text-[#C8A45D]
                        ">
                            Selected Property
                        </p>

                        <p className="
                        mt-2
                        font-semibold
                        text-[#0B1F3A]
                        ">
                            {formData.propertyTitle}
                        </p>

                        <p className="
                        mt-1
                        text-sm
                        text-neutral-600
                        ">
                            Property ID: {formData.propertyId}
                        </p>

                        <p className="
                        mt-1
                        text-sm
                        text-neutral-600
                        ">
                            {formData.propertyAddress}
                        </p>

                    </div>
                )}


                <div className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
                ">

                    <div className="min-w-0">
                        <label className="text-sm text-black">
                            Property ID
                        </label>

                        <input
                            value={formData.propertyId}
                            onChange={(e) =>
                                onChange("propertyId", e.target.value)
                            }
                            placeholder="Example: AL624"
                            className={inputClass}
                        />

                        {errors.propertyId && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.propertyId}
                            </p>
                        )}
                    </div>


                    <div className="min-w-0">
                        <label className="text-sm text-black">
                            Property Name
                        </label>

                        <input
                            value={formData.propertyTitle}
                            onChange={(e) =>
                                onChange("propertyTitle", e.target.value)
                            }
                            placeholder="Property name or title"
                            className={inputClass}
                        />

                        {errors.propertyTitle && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.propertyTitle}
                            </p>
                        )}
                    </div>

                </div>


                <div className="mt-5 min-w-0">

                    <label className="text-sm text-black">
                        Property Address
                    </label>

                    <input
                        value={formData.propertyAddress}
                        onChange={(e) =>
                            onChange("propertyAddress", e.target.value)
                        }
                        placeholder="Property address"
                        className={inputClass}
                    />

                    {errors.propertyAddress && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.propertyAddress}
                        </p>
                    )}

                </div>

            </div>



            <div>

                <p className="
                text-sm
                font-medium
                text-black
                mb-4
                ">
                    Move-In Details
                </p>

                <div className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
                ">

                    <div className="min-w-0">
                        <label className="text-sm text-black">
                            Desired Move-In Date
                        </label>

                        <input
                            type="text"
                            inputMode="numeric"
                            value={formData.desiredMoveInDate}
                            onChange={(e) =>
                                onChange(
                                    "desiredMoveInDate",
                                    formatDateInput(e.target.value)
                                )
                            }
                            placeholder="MM/DD/YYYY"
                            className={`${inputClass} md:hidden`}
                        />

                        <input
                            type="date"
                            value={formData.desiredMoveInDate}
                            onChange={(e) =>
                                onChange("desiredMoveInDate", e.target.value)
                            }
                            className={`${inputClass} hidden md:block`}
                        />

                        {errors.desiredMoveInDate && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.desiredMoveInDate}
                            </p>
                        )}
                    </div>


                    <div className="min-w-0">
                        <label className="text-sm text-black">
                            Lease Term
                        </label>

                        <select
                            value={formData.leaseTerm}
                            onChange={(e) =>
                                onChange("leaseTerm", e.target.value)
                            }
                            className={inputClass}
                        >
                            <option value="">
                                Select lease term
                            </option>

                            {leaseTerms.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>

                        {errors.leaseTerm && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.leaseTerm}
                            </p>
                        )}
                    </div>

                </div>

            </div>


        </div>
    );
}