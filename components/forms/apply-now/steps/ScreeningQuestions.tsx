"use client";

import { ApplyNowStepProps } from "../types";

type YesNoField =
    | "hasEviction"
    | "hasBankruptcy"
    | "willSmoke";

const questions: {
    field: YesNoField;
    label: string;
}[] = [
    {
        field: "hasEviction",
        label: "Have you ever been evicted?",
    },
    {
        field: "hasBankruptcy",
        label: "Have you ever filed for bankruptcy?",
    },
    {
        field: "willSmoke",
        label: "Will anyone smoke inside the home?",
    },
];

const options = [
    {
        id: "yes",
        label: "Yes",
    },
    {
        id: "no",
        label: "No",
    },
] as const;

export default function ScreeningQuestions({
    formData,
    errors,
    onChange,
}: ApplyNowStepProps) {
    return (
        <div className="space-y-8">


            {questions.map((question) => (
                <div key={question.field}>

                    <p className="
                    text-sm
                    font-medium
                    text-black
                    mb-3
                    ">
                        {question.label}
                    </p>

                    <div className="
                    grid
                    grid-cols-2
                    gap-3
                    ">

                        {options.map((option) => {
                            const selected =
                                formData[question.field] === option.id;

                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() =>
                                        onChange(question.field, option.id)
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
                                    {option.label}
                                </button>
                            );
                        })}

                    </div>

                    {errors[question.field] && (
                        <p className="mt-2 text-sm text-red-600">
                            {errors[question.field]}
                        </p>
                    )}

                </div>
            ))}



            <div className="
            rounded-3xl
            border
            border-neutral-200
            bg-neutral-50
            p-5
            ">

                <label className="
                flex
                items-start
                gap-3
                text-sm
                text-neutral-700
                ">

                    <input
                        type="checkbox"
                        checked={formData.consentToScreening}
                        onChange={(e) =>
                            onChange(
                                "consentToScreening",
                                e.target.checked
                            )
                        }
                        className="
                        mt-1
                        h-4
                        w-4
                        accent-[#C8A45D]
                        "
                    />

                    <span>
                        I authorize Hitts Homes and Properties to review my application information and contact me about next steps for rental screening.
                    </span>

                </label>

                {errors.consentToScreening && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.consentToScreening}
                    </p>
                )}

            </div>


        </div>
    );
}