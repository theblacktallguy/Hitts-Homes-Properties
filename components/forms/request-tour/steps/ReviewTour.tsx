"use client";

import { RequestTourStepProps } from "../types";

export default function ReviewTour({
    formData,
}: RequestTourStepProps) {
    return (
        <div className="
        space-y-8
        ">


            <div>

                <h3 className="
                text-lg
                font-semibold
                text-[#0B1F3A]
                ">
                    Contact Information
                </h3>

                <p className="mt-3 text-neutral-600">
                    {formData.fullName || "Not provided"}
                </p>

                <p className="text-neutral-600">
                    {formData.email || "Not provided"}
                </p>

                <p className="text-neutral-600">
                    {formData.phone || "Not provided"}
                </p>

            </div>



            <div>

                <h3 className="
                text-lg
                font-semibold
                text-[#0B1F3A]
                ">
                    Property Details
                </h3>

                <p className="mt-3 text-neutral-600">
                    Property ID: {formData.propertyId || "Not provided"}
                </p>

                <p className="text-neutral-600">
                    {formData.propertyTitle || "Not provided"}
                </p>

                <p className="text-neutral-600">
                    {formData.propertyAddress || "Not provided"}
                </p>

                <p className="text-neutral-600 capitalize">
                    Source: {formData.source === "property-page"
                        ? "Property Page"
                        : "General Request"}
                </p>

            </div>



            <div>

                <h3 className="
                text-lg
                font-semibold
                text-[#0B1F3A]
                ">
                    Tour Preference
                </h3>

                <p className="mt-3 text-neutral-600 capitalize">
                    {formData.tourType || "Not selected"}
                </p>

                <p className="text-neutral-600">
                    Preferred: {formData.preferredDate || "No date"} at {formData.preferredTime || "No time"}
                </p>

                {(formData.alternateDate || formData.alternateTime) && (
                    <p className="text-neutral-600">
                        Alternate: {formData.alternateDate || "No date"} at {formData.alternateTime || "No time"}
                    </p>
                )}

            </div>



            <div>

                <h3 className="
                text-lg
                font-semibold
                text-[#0B1F3A]
                ">
                    Additional Details
                </h3>

                <p className="mt-3 text-neutral-600">
                    Financing: {formData.financingStatus || "Not provided"}
                </p>

                {formData.message && (
                    <p className="
                    mt-3
                    rounded-2xl
                    bg-neutral-50
                    p-4
                    text-neutral-600
                    ">
                        {formData.message}
                    </p>
                )}

            </div>


        </div>
    );
}