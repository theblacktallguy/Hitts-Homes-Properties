import { z } from "zod";

export const stepSchemas = {
    contactInfo: z.object({
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

    tourDetails: z.object({
        propertyId: z
            .string()
            .min(2, "Please enter the property ID"),

        propertyTitle: z
            .string()
            .min(2, "Please enter the property name or title"),

        propertyAddress: z
            .string()
            .min(5, "Please enter the property address"),

        tourType: z
            .enum(["in-person", "virtual"], {
                message: "Please select a tour type",
            }),

        preferredDate: z
            .string()
            .min(1, "Please select a preferred date"),

        preferredTime: z
            .string()
            .min(1, "Please select a preferred time"),
    }),
};