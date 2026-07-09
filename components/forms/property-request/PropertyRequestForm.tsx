"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ProgressIndicator from "./ProgressIndicator";
import FormNavigation from "./FormNavigation";
import PersonalInfo from "./steps/PersonalInfo";
import PropertyGoal from "./steps/PropertyGoal";
import LocationPreference from "./steps/LocationPreference";
import PropertyDetails from "./steps/PropertyDetails";
import FinalDetails from "./steps/FinalDetails";
import ReviewRequest from "./steps/ReviewRequest";

import { PropertyRequestData } from "./formTypes";
import { stepSchemas } from "./validation";
import { FormErrors } from "./formErrors";



const initialData: PropertyRequestData = {
  fullName: "",
  email: "",
  phone: "",

  lookingFor: "",

  state: "",
  city: "",
  neighborhood: "",
  openToSuggestions: false,

  propertyType: "",
  bedrooms: "",
  bathrooms: "",
  amenities: [],

  minBudget: "",
  maxBudget: "",

  timeline: "",
  message: "",
};


const steps = [
  {
    id: 1,
    title: "Let's get to know you",
    component: PersonalInfo,
  },
  {
    id: 2,
    title: "What are you searching for?",
    component: PropertyGoal,
  },
  {
    id: 3,
    title: "Where would you like to live?",
    component: LocationPreference,
  },
  {
    id: 4,
    title: "Describe your ideal property",
    component: PropertyDetails,
  },
  {
    id: 5,
    title: "Almost there",
    component: FinalDetails,
  },
  {
    id: 6,
    title: "Review Your Request",
    component: ReviewRequest,
  },
];






export default function PropertyRequestForm() {

  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState(initialData);

  const [errors, setErrors] = useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);


  const CurrentStepComponent = steps[currentStep].component;

  async function submitRequest() {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/property-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit property request");
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
    console.log("Continue clicked");
    console.log("Current step:", currentStep);
    console.log("Form data:", formData);

    const valid = validateStep();

    if (!valid) {
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      submitRequest();
    }
  }


  function back() {

    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }

  }

  function validateStep() {

    let schema: any;


    switch (currentStep) {

      case 0:
        schema = stepSchemas.personalInfo;
        break;

      case 1:
        schema = stepSchemas.propertyGoal;
        break;

      case 2:
        schema = stepSchemas.location;
        break;

      case 3:
        schema = stepSchemas.propertyDetails;
        break;

      case 4:
        schema = stepSchemas.finalDetails;
        break;

      case 5:
        return true;

    }


    const result = schema.safeParse(formData);


    if (!result.success) {

      const fieldErrors: FormErrors = {};


      result.error.issues.forEach((issue: any) => {

        const field =
          issue.path[0] as string;


        fieldErrors[field] =
          issue.message;

      });


      setErrors(fieldErrors);

      console.log("Validation failed:", fieldErrors);

      return false;

    }


    setErrors({});

    console.log("Validation passed");


    return true;

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
            Request Sent Successfully
          </h2>

          <p className="
        mt-4
        text-neutral-600
        ">
            Thank you for sharing your property preferences. Our team will review your request and contact you soon.
          </p>

          <a
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
          </a>

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

              <h2 className=" text-black text-center">
                {steps[currentStep].title}
              </h2>


              <CurrentStepComponent

                formData={formData}

                errors={errors}

                onChange={(field: string, value: any) => {

                  setFormData(prev => ({
                    ...prev,
                    [field]: value
                  }));

                }}

              />


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