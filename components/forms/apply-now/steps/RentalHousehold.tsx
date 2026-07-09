"use client";

import { ApplyNowStepProps } from "../types";

const petOptions = [
    {
        id: "yes",
        label: "Yes",
    },
    {
        id: "no",
        label: "No",
    },
] as const;

function formatMoneyInput(value: string) {
    return value.replace(/\D/g, "");
}

export default function RentalHousehold({
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
        <div className="space-y-8">


            <div>

                <p className="
                text-sm
                font-medium
                text-black
                mb-4
                ">
                    Rental History
                </p>

                <div className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
                ">

                    <div className="min-w-0">
                        <label className="text-sm text-black">
                            Current Landlord / Property Manager
                        </label>

                        <input
                            value={formData.landlordName}
                            onChange={(e) =>
                                onChange("landlordName", e.target.value)
                            }
                            placeholder="Landlord or property manager name"
                            className={inputClass}
                        />

                        {errors.landlordName && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.landlordName}
                            </p>
                        )}
                    </div>


                    <div className="min-w-0">
                        <label className="text-sm text-black">
                            Landlord Contact
                        </label>

                        <input
                            value={formData.landlordContact}
                            onChange={(e) =>
                                onChange("landlordContact", e.target.value)
                            }
                            placeholder="Phone or email"
                            className={inputClass}
                        />

                        {errors.landlordContact && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.landlordContact}
                            </p>
                        )}
                    </div>

                </div>


                <div className="
                mt-5
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
                ">

                    <div className="min-w-0">
                        <label className="text-sm text-black">
                            Current Monthly Rent
                        </label>

                        <div className="relative mt-2">

                            <span className="
                            pointer-events-none
                            absolute
                            left-5
                            top-1/2
                            -translate-y-1/2
                            text-neutral-500
                            ">
                                $
                            </span>

                            <input
                                value={formData.currentMonthlyRent}
                                onChange={(e) =>
                                    onChange(
                                        "currentMonthlyRent",
                                        formatMoneyInput(e.target.value)
                                    )
                                }
                                inputMode="numeric"
                                placeholder="Current monthly rent"
                                className="
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
                                pl-9
                                text-base
                                text-neutral-800
                                outline-none
                                transition
                                focus:border-[#C8A45D]
                                focus:ring-4
                                focus:ring-[#C8A45D]/10
                                "
                            />

                        </div>

                        {errors.currentMonthlyRent && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.currentMonthlyRent}
                            </p>
                        )}
                    </div>


                    <div className="min-w-0">
                        <label className="text-sm text-black">
                            Time at Current Address
                        </label>

                        <input
                            value={formData.timeAtCurrentAddress}
                            onChange={(e) =>
                                onChange("timeAtCurrentAddress", e.target.value)
                            }
                            placeholder="Example: 2 years"
                            className={inputClass}
                        />

                        {errors.timeAtCurrentAddress && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.timeAtCurrentAddress}
                            </p>
                        )}
                    </div>

                </div>


                <div className="mt-5 min-w-0">
                    <label className="text-sm text-black">
                        Reason for Moving
                    </label>

                    <textarea
                        value={formData.reasonForMoving}
                        onChange={(e) =>
                            onChange("reasonForMoving", e.target.value)
                        }
                        rows={4}
                        placeholder="Briefly tell us why you are moving"
                        className="
                        mt-2
                        block
                        w-full
                        min-w-0
                        max-w-full
                        resize-none
                        rounded-3xl
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
                        "
                    />

                    {errors.reasonForMoving && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.reasonForMoving}
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
                    Household Details
                </p>

                <div className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
                ">

                    <div className="min-w-0">
                        <label className="text-sm text-black">
                            Number of Occupants
                        </label>

                        <input
                            value={formData.occupants}
                            onChange={(e) =>
                                onChange(
                                    "occupants",
                                    e.target.value.replace(/\D/g, "")
                                )
                            }
                            inputMode="numeric"
                            placeholder="Example: 2"
                            className={inputClass}
                        />

                        {errors.occupants && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.occupants}
                            </p>
                        )}
                    </div>


                    <div>
                        <p className="
                        text-sm
                        text-black
                        mb-2
                        ">
                            Do you have pets?
                        </p>

                        <div className="
                        grid
                        grid-cols-2
                        gap-3
                        ">

                            {petOptions.map((item) => {
                                const selected =
                                    formData.hasPets === item.id;

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() =>
                                            onChange("hasPets", item.id)
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

                        {errors.hasPets && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.hasPets}
                            </p>
                        )}
                    </div>

                </div>


                {formData.hasPets === "yes" && (
                    <div className="mt-5 min-w-0">
                        <label className="text-sm text-black">
                            Pet Details
                        </label>

                        <textarea
                            value={formData.petDetails}
                            onChange={(e) =>
                                onChange("petDetails", e.target.value)
                            }
                            rows={4}
                            placeholder="Type, breed, size, and number of pets"
                            className="
                            mt-2
                            block
                            w-full
                            min-w-0
                            max-w-full
                            resize-none
                            rounded-3xl
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
                            "
                        />
                    </div>
                )}


                <div className="mt-5 min-w-0">
                    <label className="text-sm text-neutral-600">
                        Vehicles
                        <span className="ml-2 text-black">
                            Optional
                        </span>
                    </label>

                    <input
                        value={formData.vehicles}
                        onChange={(e) =>
                            onChange("vehicles", e.target.value)
                        }
                        placeholder="Example: 1 car, 1 SUV"
                        className={inputClass}
                    />
                </div>

            </div>


        </div>
    );
}