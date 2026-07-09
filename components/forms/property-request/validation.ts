import { z } from "zod";


export const stepSchemas = {

    personalInfo: z.object({

        fullName: z
            .string()
            .min(2, "Please enter your full name"),

        email: z
            .string()
            .email("Please enter a valid email"),

        phone: z
            .string()
            .min(7, "Please enter a valid phone number"),

    }),



    propertyGoal: z.object({

        lookingFor: z
            .enum(["rent", "buy"], {
                message: "Please select an option",
            }),

    }),



    location: z.object({

        state: z
            .string()
            .min(2, "Please enter a state"),

        city: z
            .string()
            .min(2, "Please enter a city"),

    }),



    propertyDetails: z.object({

        propertyType: z
            .string()
            .min(1, "Please select a property type"),

        bedrooms: z
            .string()
            .min(1, "Please select the number of bedrooms")
            .refine((value) => Number(value) > 0, {
                message: "Please select at least 1 bedroom",
            }),

        bathrooms: z
            .string()
            .min(1, "Please select the number of bathrooms")
            .refine((value) => Number(value) > 0, {
                message: "Please select at least 1 bathroom",
            }),

    }),



    finalDetails: z.object({

        minBudget: z
            .string()
            .min(1, "Please enter your minimum budget"),

        maxBudget: z
            .string()
            .min(1, "Please enter your maximum budget"),

        timeline: z
            .string()
            .min(1, "Please select your timeline"),

    }),

};