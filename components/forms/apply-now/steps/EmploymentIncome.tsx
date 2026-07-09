"use client";

import { ApplyNowStepProps } from "../types";

const employmentStatuses = [
    "Employed full-time",
    "Employed part-time",
    "Self-employed",
    "Student",
    "Retired",
    "Unemployed",
];

function formatMoneyInput(value: string) {
    return value.replace(/\D/g, "");
}

export default function EmploymentIncome({
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

                <label className="text-sm text-black">
                    Employment Status
                </label>

                <select
                    value={formData.employmentStatus}
                    onChange={(e) =>
                        onChange("employmentStatus", e.target.value)
                    }
                    className={inputClass}
                >
                    <option value="">
                        Select employment status
                    </option>

                    {employmentStatuses.map((item) => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>

                {errors.employmentStatus && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.employmentStatus}
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
                        Employer Name
                    </label>

                    <input
                        value={formData.employerName}
                        onChange={(e) =>
                            onChange("employerName", e.target.value)
                        }
                        placeholder="Employer or company name"
                        className={inputClass}
                    />

                    {errors.employerName && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.employerName}
                        </p>
                    )}
                </div>


                <div className="min-w-0">
                    <label className="text-sm text-black">
                        Job Title
                    </label>

                    <input
                        value={formData.jobTitle}
                        onChange={(e) =>
                            onChange("jobTitle", e.target.value)
                        }
                        placeholder="Your job title"
                        className={inputClass}
                    />

                    {errors.jobTitle && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.jobTitle}
                        </p>
                    )}
                </div>

            </div>



            <div className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
            ">

                <div className="min-w-0">
                    <label className="text-sm text-black">
                        Monthly Income
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
                            value={formData.monthlyIncome}
                            onChange={(e) =>
                                onChange(
                                    "monthlyIncome",
                                    formatMoneyInput(e.target.value)
                                )
                            }
                            inputMode="numeric"
                            placeholder="Monthly income"
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

                    {errors.monthlyIncome && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.monthlyIncome}
                        </p>
                    )}
                </div>


                <div className="min-w-0">
                    <label className="text-sm text-black">
                        Length of Employment
                    </label>

                    <input
                        value={formData.employmentLength}
                        onChange={(e) =>
                            onChange("employmentLength", e.target.value)
                        }
                        placeholder="Example: 2 years"
                        className={inputClass}
                    />

                    {errors.employmentLength && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors.employmentLength}
                        </p>
                    )}
                </div>

            </div>



            <div className="min-w-0">

                <label className="text-sm text-neutral-600">
                    Additional Income
                    <span className="ml-2 text-black">
                        Optional
                    </span>
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
                        value={formData.additionalIncome}
                        onChange={(e) =>
                            onChange(
                                "additionalIncome",
                                formatMoneyInput(e.target.value)
                            )
                        }
                        inputMode="numeric"
                        placeholder="Any additional monthly income"
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

            </div>


        </div>
    );
}