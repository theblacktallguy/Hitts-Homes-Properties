"use client";

import { PropertyStepProps } from "../types";


export default function ReviewRequest({
    formData,
}: PropertyStepProps) {


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
                    Property Goal
                </h3>


                <p className="
                mt-3
                text-neutral-600
                capitalize
                ">
                    {formData.lookingFor || "Not selected"}
                </p>

            </div>





            <div>

                <h3 className="
                text-lg
                font-semibold
                text-[#0B1F3A]
                ">
                    Location
                </h3>


                <p className="mt-3 text-neutral-600">
                    {formData.city && formData.state
                        ? `${formData.city}, ${formData.state}`
                        : "Not provided"}
                </p>


                {
                    formData.neighborhood &&
                    <p className="text-neutral-600">
                        {formData.neighborhood}
                    </p>
                }


            </div>





            <div>

                <h3 className="
                text-lg
                font-semibold
                text-[#0B1F3A]
                ">
                    Property Preferences
                </h3>


                <p className="mt-3 text-neutral-600 capitalize">
                    {formData.propertyType || "Not selected"}
                </p>


                <p className="text-neutral-600">
                    {formData.bedrooms || "0"} Bedrooms · {formData.bathrooms || "0"} Bathrooms
                </p>


            </div>





            <div>

                <h3 className="
                text-lg
                font-semibold
                text-[#0B1F3A]
                ">
                    Budget & Timeline
                </h3>


                <p className="mt-3 text-neutral-600">
                    ${formData.minBudget || "0"} - ${formData.maxBudget || "0"}
                </p>


                <p className="text-neutral-600">
                    {formData.timeline || "Not selected"}
                </p>


            </div>





            {
                formData.message &&

                <div>

                    <h3 className="
                    text-lg
                    font-semibold
                    text-[#0B1F3A]
                    ">
                        Additional Notes
                    </h3>


                    <p className="
                    mt-3
                    text-neutral-600
                    ">
                        {formData.message}
                    </p>


                </div>

            }



        </div>

    );

}