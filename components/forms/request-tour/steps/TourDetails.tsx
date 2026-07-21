"use client";

import { RequestTourStepProps } from "../types";

const tourTypes = [
    {
        id: "in-person",
        title: "In-Person Tour",
        description: "Walk through the property with an agent.",
    },
    {
        id: "virtual",
        title: "Virtual Tour",
        description: "Tour the property remotely by video call.",
    },
] as const;

const financingOptions = [
    "Pre-approved",
    "Need financing help",
    "Cash buyer",
    "Not sure yet",
];

const timeOptions = [
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
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

export default function TourDetails({
    formData,
    errors,
    onChange,
}: RequestTourStepProps) {
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
                    Property Details
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
                    Tour Type
                </p>

                <div className="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-2
                ">

                    {tourTypes.map((item) => {
                        const selected =
                            formData.tourType === item.id;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() =>
                                    onChange("tourType", item.id)
                                }
                                className={`
                                rounded-3xl
                                border
                                p-5
                                text-left
                                transition
                                ${selected
                                        ? "border-[#C8A45D] bg-[#0B1F3A] text-white"
                                        : "border-neutral-200 bg-white text-[#0B1F3A]"
                                    }
                                `}
                            >
                                <h3 className="font-semibold">
                                    {item.title}
                                </h3>

                                <p className={`
                                mt-2
                                text-sm
                                ${selected ? "text-white/80" : "text-neutral-500"}
                                `}>
                                    {item.description}
                                </p>
                            </button>
                        );
                    })}

                </div>

                {errors.tourType && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.tourType}
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
                    Preferred Schedule
                </p>

                <div className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
                ">

                    <div className="min-w-0">
                        <label className="text-sm text-black">
                            Preferred Date
                        </label>

                        <input
                            type="text"
                            inputMode="numeric"
                            value={formData.preferredDate}
                            onChange={(e) =>
                                onChange(
                                    "preferredDate",
                                    formatDateInput(e.target.value)
                                )
                            }
                            placeholder="MM/DD/YYYY"
                            className={`${inputClass} md:hidden`}
                        />

                        <input
                            type="date"
                            value={formData.preferredDate}
                            onChange={(e) =>
                                onChange("preferredDate", e.target.value)
                            }
                            className={`${inputClass} hidden md:block`}
                        />

                        {errors.preferredDate && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.preferredDate}
                            </p>
                        )}
                    </div>


                    <div className="min-w-0">
                        <label className="text-sm text-black">
                            Preferred Time
                        </label>

                        <select
                            value={formData.preferredTime}
                            onChange={(e) =>
                                onChange("preferredTime", e.target.value)
                            }
                            className={inputClass}
                        >
                            <option value="">Select a time</option>
                            {timeOptions.map((time) => <option key={time} value={time}>{time}</option>)}
                        </select>

                        {errors.preferredTime && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.preferredTime}
                            </p>
                        )}
                    </div>


                    <div className="min-w-0">
                        <label className="text-sm text-neutral-600">
                            Alternate Date
                            <span className="ml-2 text-black">
                                Optional
                            </span>
                        </label>

                        <input
                            type="text"
                            inputMode="numeric"
                            value={formData.alternateDate}
                            onChange={(e) =>
                                onChange(
                                    "alternateDate",
                                    formatDateInput(e.target.value)
                                )
                            }
                            placeholder="MM/DD/YYYY"
                            className={`${inputClass} md:hidden`}
                        />

                        <input
                            type="date"
                            value={formData.alternateDate}
                            onChange={(e) =>
                                onChange("alternateDate", e.target.value)
                            }
                            className={`${inputClass} hidden md:block`}
                        />
                    </div>


                    <div className="min-w-0">
                        <label className="text-sm text-neutral-600">
                            Alternate Time
                            <span className="ml-2 text-black">
                                Optional
                            </span>
                        </label>

                        <select
                            value={formData.alternateTime}
                            onChange={(e) =>
                                onChange("alternateTime", e.target.value)
                            }
                            className={inputClass}
                        >
                            <option value="">Select a time</option>
                            {timeOptions.map((time) => <option key={time} value={time}>{time}</option>)}
                        </select>
                    </div>

                </div>

            </div>



            <div className="min-w-0">

                <label className="
                text-sm
                text-neutral-600
                ">
                    Financing Status
                    <span className="ml-2 text-black">
                        Optional
                    </span>
                </label>

                <select
                    value={formData.financingStatus}
                    onChange={(e) =>
                        onChange("financingStatus", e.target.value)
                    }
                    className={inputClass}
                >
                    <option value="">
                        Select an option
                    </option>

                    {financingOptions.map((item) => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>

            </div>



            <div className="min-w-0">

                <label className="
                text-sm
                text-neutral-600
                ">
                    Message
                    <span className="ml-2 text-black">
                        Optional
                    </span>
                </label>

                <textarea
                    value={formData.message}
                    onChange={(e) =>
                        onChange("message", e.target.value)
                    }
                    rows={5}
                    placeholder="Anything else we should know before the tour?"
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


        </div>
    );
}
