"use client";

import { ApplyNowStepProps } from "../types";
import { ApplyNowData } from "../formTypes";

type FileField =
    | "idFront"
    | "idBack"
    | "ssnFront";

const uploadFields: {
    field: FileField;
    title: string;
    description: string;
}[] = [
    {
        field: "idFront",
        title: "Government ID Front",
        description: "Upload the front side of your government-issued ID.",
    },
    {
        field: "idBack",
        title: "Government ID Back",
        description: "Upload the back side of your government-issued ID.",
    },
    {
        field: "ssnFront",
        title: "SSN Card Front",
        description: "Upload the front side of your Social Security card.",
    },
];

export default function IdentityVerification({
    formData,
    errors,
    onChange,
}: ApplyNowStepProps) {
    function handleFileChange(
        field: keyof ApplyNowData,
        file: File | undefined
    ) {
        onChange(field, file || null);
    }

    return (
        <div className="space-y-8">


            <div className="
            rounded-3xl
            border
            border-[#C8A45D]/30
            bg-[#C8A45D]/10
            p-5
            ">

                <h3 className="
                text-base
                font-semibold
                text-[#0B1F3A]
                ">
                    Identity Verification
                </h3>

                <p className="
                mt-2
                text-sm
                leading-6
                text-neutral-700
                ">
                    These documents are used only to review and verify your rental application. Please upload clear images or PDF files.
                </p>

                <p className="
                mt-2
                text-xs
                text-neutral-500
                ">
                    Accepted files: JPG, PNG, WEBP, or PDF. Maximum size: 5MB per file.
                </p>

            </div>



            <div className="
            grid
            grid-cols-1
            gap-5
            ">

                {uploadFields.map((item) => {
                    const file =
                        formData[item.field];

                    return (
                        <div
                            key={item.field}
                            className="
                            rounded-3xl
                            border
                            border-neutral-200
                            bg-white
                            p-5
                            "
                        >

                            <div className="
                            flex
                            flex-col
                            gap-4
                            md:flex-row
                            md:items-center
                            md:justify-between
                            ">

                                <div>
                                    <h4 className="
                                    font-semibold
                                    text-[#0B1F3A]
                                    ">
                                        {item.title}
                                    </h4>

                                    <p className="
                                    mt-1
                                    text-sm
                                    text-neutral-600
                                    ">
                                        {item.description}
                                    </p>

                                    {file && (
                                        <p className="
                                        mt-2
                                        text-xs
                                        font-medium
                                        text-neutral-500
                                        ">
                                            Selected: {file.name}
                                        </p>
                                    )}
                                </div>


                                <label className="
                                inline-flex
                                cursor-pointer
                                items-center
                                justify-center
                                rounded-full
                                bg-[#0B1F3A]
                                px-5
                                py-3
                                text-sm
                                font-medium
                                text-white
                                transition
                                hover:scale-105
                                hover:shadow-lg
                                ">

                                    Upload File

                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
                                        onChange={(e) =>
                                            handleFileChange(
                                                item.field,
                                                e.target.files?.[0]
                                            )
                                        }
                                        className="hidden"
                                    />

                                </label>

                            </div>

                            {errors[item.field] && (
                                <p className="mt-3 text-sm text-red-600">
                                    {errors[item.field]}
                                </p>
                            )}

                        </div>
                    );
                })}

            </div>



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
                        checked={formData.verificationConsent}
                        onChange={(e) =>
                            onChange(
                                "verificationConsent",
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
                        I confirm that the information provided is accurate and authorize Hitts Homes and Properties to use the uploaded documents only for rental application review and identity verification.
                    </span>

                </label>

                {errors.verificationConsent && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.verificationConsent}
                    </p>
                )}

            </div>


        </div>
    );
}