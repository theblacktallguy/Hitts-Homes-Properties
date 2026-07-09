"use client";

import { ApplyNowStepProps } from "../types";

export default function ReviewApplication({
    formData,
}: ApplyNowStepProps) {
    return (
        <div className="space-y-8">


            <div>
                <h3 className="
                text-lg
                font-semibold
                text-[#0B1F3A]
                ">
                    Applicant Information
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

                <p className="text-neutral-600">
                    Date of birth: {formData.dateOfBirth || "Not provided"}
                </p>

                <p className="text-neutral-600">
                    Current address: {formData.currentAddress || "Not provided"}
                </p>

                <p className="text-neutral-600 capitalize">
                    Preferred contact: {formData.preferredContactMethod || "Not selected"}
                </p>
            </div>



            <div>
                <h3 className="
                text-lg
                font-semibold
                text-[#0B1F3A]
                ">
                    Property & Move-In
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

                <p className="text-neutral-600">
                    Desired move-in: {formData.desiredMoveInDate || "Not provided"}
                </p>

                <p className="text-neutral-600">
                    Lease term: {formData.leaseTerm || "Not selected"}
                </p>
            </div>



            <div>
                <h3 className="
                text-lg
                font-semibold
                text-[#0B1F3A]
                ">
                    Employment & Income
                </h3>

                <p className="mt-3 text-neutral-600">
                    Employment status: {formData.employmentStatus || "Not provided"}
                </p>

                <p className="text-neutral-600">
                    Employer: {formData.employerName || "Not provided"}
                </p>

                <p className="text-neutral-600">
                    Job title: {formData.jobTitle || "Not provided"}
                </p>

                <p className="text-neutral-600">
                    Monthly income: ${formData.monthlyIncome || "0"}
                </p>

                <p className="text-neutral-600">
                    Employment length: {formData.employmentLength || "Not provided"}
                </p>

                {formData.additionalIncome && (
                    <p className="text-neutral-600">
                        Additional income: ${formData.additionalIncome}
                    </p>
                )}
            </div>



            <div>
                <h3 className="
                text-lg
                font-semibold
                text-[#0B1F3A]
                ">
                    Rental & Household
                </h3>

                <p className="mt-3 text-neutral-600">
                    Landlord: {formData.landlordName || "Not provided"}
                </p>

                <p className="text-neutral-600">
                    Landlord contact: {formData.landlordContact || "Not provided"}
                </p>

                <p className="text-neutral-600">
                    Current rent: ${formData.currentMonthlyRent || "0"}
                </p>

                <p className="text-neutral-600">
                    Time at current address: {formData.timeAtCurrentAddress || "Not provided"}
                </p>

                <p className="text-neutral-600">
                    Occupants: {formData.occupants || "Not provided"}
                </p>

                <p className="text-neutral-600">
                    Pets: {formData.hasPets || "Not selected"}
                </p>

                {formData.petDetails && (
                    <p className="text-neutral-600">
                        Pet details: {formData.petDetails}
                    </p>
                )}

                {formData.vehicles && (
                    <p className="text-neutral-600">
                        Vehicles: {formData.vehicles}
                    </p>
                )}

                <p className="
                mt-3
                rounded-2xl
                bg-neutral-50
                p-4
                text-neutral-600
                ">
                    Reason for moving: {formData.reasonForMoving || "Not provided"}
                </p>
            </div>



            <div>
                <h3 className="
                text-lg
                font-semibold
                text-[#0B1F3A]
                ">
                    Screening Questions
                </h3>

                <p className="mt-3 text-neutral-600">
                    Eviction history: {formData.hasEviction || "Not selected"}
                </p>

                <p className="text-neutral-600">
                    Bankruptcy history: {formData.hasBankruptcy || "Not selected"}
                </p>

                <p className="text-neutral-600">
                    Smoking inside home: {formData.willSmoke || "Not selected"}
                </p>

                <p className="text-neutral-600">
                    Screening consent: {formData.consentToScreening ? "Yes" : "No"}
                </p>
            </div>



            <div>
                <h3 className="
                text-lg
                font-semibold
                text-[#0B1F3A]
                ">
                    Identity Verification
                </h3>

                <p className="mt-3 text-neutral-600">
                    ID front: {formData.idFront?.name || "Not uploaded"}
                </p>

                <p className="text-neutral-600">
                    ID back: {formData.idBack?.name || "Not uploaded"}
                </p>

                <p className="text-neutral-600">
                    SSN card front: {formData.ssnFront?.name || "Not uploaded"}
                </p>

                <p className="text-neutral-600">
                    Verification consent: {formData.verificationConsent ? "Yes" : "No"}
                </p>
            </div>



            {formData.message && (
                <div>
                    <h3 className="
                    text-lg
                    font-semibold
                    text-[#0B1F3A]
                    ">
                        Additional Message
                    </h3>

                    <p className="
                    mt-3
                    rounded-2xl
                    bg-neutral-50
                    p-4
                    text-neutral-600
                    ">
                        {formData.message}
                    </p>
                </div>
            )}


        </div>
    );
}