"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import ProgressIndicator from "./ProgressIndicator";
import FormNavigation from "./FormNavigation";
import ContactInfo from "./steps/ContactInfo";
import TourDetails from "./steps/TourDetails";
import ReviewTour from "./steps/ReviewTour";

import { RequestTourData } from "./formTypes";
import { FormErrors } from "./formErrors";
import { stepSchemas } from "./validation";

const initialData: RequestTourData = {
    fullName: "",
    email: "",
    phone: "",

    propertyId: "",
    propertyTitle: "",
    propertyAddress: "",

    tourType: "",

    preferredDate: "",
    preferredTime: "",

    alternateDate: "",
    alternateTime: "",

    financingStatus: "",
    message: "",

    source: "general",
};

function getInitialData(searchParams: { get: (name: string) => string | null }): RequestTourData {
    const propertyId = searchParams.get("propertyId") || "";
    const propertyTitle = searchParams.get("title") || "";
    const propertyAddress = searchParams.get("address") || "";

    if (!propertyId && !propertyTitle && !propertyAddress) {
        return initialData;
    }

    return {
        ...initialData,
        propertyId,
        propertyTitle,
        propertyAddress,
        source: "property-page",
    };
}

const steps = [
    {
        id: 1,
        title: "Tell us how to reach you",
        component: ContactInfo,
    },
    {
        id: 2,
        title: "Choose your tour details",
        component: TourDetails,
    },
    {
        id: 3,
        title: "Review Your Tour Request",
        component: ReviewTour,
    },
];

export default function RequestTourForm() {
    const searchParams = useSearchParams();

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(() => getInitialData(searchParams));
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const CurrentStepComponent =
        steps[currentStep].component;

    function validateStep() {
        const schemas = [stepSchemas.contactInfo, stepSchemas.tourDetails];
        const schema = schemas[currentStep];

        if (!schema) {
            return true;
        }

        const result = schema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: FormErrors = {};

            result.error.issues.forEach((issue) => {
                const field = String(issue.path[0]);

                fieldErrors[field] = issue.message;
            });

            setErrors(fieldErrors);

            return false;
        }

        setErrors({});

        return true;
    }

    async function submitRequest() {
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/request-tour", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit tour request");
            }

            setIsSubmitted(true);
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    function next() {
        const valid = validateStep();

        if (!valid) {
            return;
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            submitRequest();
        }
    }

    function back() {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    }

    if (isSubmitted) {
        return (
            <section className="
            py-16
            px-4
            ">

                <div className="
                mx-auto
                max-w-2xl
                rounded-[32px]
                border
                border-neutral-200
                bg-white/80
                backdrop-blur-xl
                shadow-2xl
                p-8
                md:p-12
                text-center
                ">

                    <div className="
                    mx-auto
                    mb-6
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-[#C8A45D]/15
                    text-3xl
                    text-[#C8A45D]
                    ">
                        ✓
                    </div>

                    <h2 className="
                    text-2xl
                    font-semibold
                    text-[#0B1F3A]
                    ">
                        Tour Request Sent
                    </h2>

                    <p className="
                    mt-4
                    text-neutral-600
                    ">
                        Thank you for requesting a tour. Our team will review your preferred time and contact you soon.
                    </p>

                    <Link
                        href="/"
                        className="
                        mt-8
                        inline-flex
                        items-center
                        justify-center
                        rounded-full
                        bg-[#0B1F3A]
                        px-8
                        py-3
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:scale-105
                        hover:shadow-lg
                        "
                    >
                        Back to Home
                    </Link>

                </div>

            </section>
        );
    }

    return (
        <section className="
        py-16
        px-4
        ">

            <div className="
            mx-auto
            max-w-4xl
            rounded-[32px]
            border
            border-neutral-200
            bg-white/80
            backdrop-blur-xl
            shadow-2xl
            p-6
            md:p-12
            ">

                <ProgressIndicator
                    currentStep={currentStep}
                    totalSteps={steps.length}
                />


                <div className="mt-10">

                    <AnimatePresence
                        mode="wait"
                        initial={false}
                    >

                        <motion.div
                            key={currentStep}
                        >

                            <h2 className="
                            text-2xl
                            font-semibold
                            text-[#0B1F3A]
                            ">
                                {steps[currentStep].title}
                            </h2>


                            <div className="mt-8">

                                <CurrentStepComponent
                                    formData={formData}
                                    errors={errors}
                                    onChange={(field, value) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            [field]: value,
                                        }));
                                    }}
                                />

                            </div>

                        </motion.div>

                    </AnimatePresence>

                </div>


                <FormNavigation
                    currentStep={currentStep}
                    totalSteps={steps.length}
                    onNext={next}
                    onBack={back}
                    isSubmitting={isSubmitting}
                />

            </div>

        </section>
    );
}
