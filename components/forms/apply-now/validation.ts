import { z } from "zod";

const requiredYesNo = z.enum(["yes", "no"], {
    message: "Please select an option",
});

const requiredFile = z
    .instanceof(File)
    .refine((file) => file.size > 0, {
        message: "Please upload this document",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "File must be 5MB or less",
    })
    .refine(
        (file) =>
            [
                "image/jpeg",
                "image/png",
                "image/webp",
                "application/pdf",
            ].includes(file.type),
        {
            message: "Upload a JPG, PNG, WEBP, or PDF file",
        }
    );

export const stepSchemas = {
    applicantInfo: z.object({
        fullName: z
            .string()
            .min(2, "Please enter your full name"),

        email: z
            .string()
            .email("Please enter a valid email"),

        phone: z
            .string()
            .min(7, "Please enter a valid phone number"),

        dateOfBirth: z
            .string()
            .min(1, "Please enter your date of birth"),

        currentAddress: z
            .string()
            .min(5, "Please enter your current address"),

        preferredContactMethod: z
            .enum(["phone", "email", "text"], {
                message: "Please select a contact method",
            }),
    }),

    propertyMoveIn: z.object({
        propertyId: z
            .string()
            .min(2, "Please enter the property ID"),

        propertyTitle: z
            .string()
            .min(2, "Please enter the property name"),

        propertyAddress: z
            .string()
            .min(5, "Please enter the property address"),

        desiredMoveInDate: z
            .string()
            .min(1, "Please enter your desired move-in date"),

        leaseTerm: z
            .string()
            .min(1, "Please select a lease term"),
    }),

    employmentIncome: z.object({
        employmentStatus: z
            .string()
            .min(1, "Please select your employment status"),

        employerName: z
            .string()
            .min(2, "Please enter your employer name"),

        jobTitle: z
            .string()
            .min(2, "Please enter your job title"),

        monthlyIncome: z
            .string()
            .min(1, "Please enter your monthly income"),

        employmentLength: z
            .string()
            .min(1, "Please enter how long you have been employed"),
    }),

    rentalHousehold: z.object({
        landlordName: z
            .string()
            .min(2, "Please enter your landlord or property manager name"),

        landlordContact: z
            .string()
            .min(5, "Please enter your landlord contact"),

        currentMonthlyRent: z
            .string()
            .min(1, "Please enter your current monthly rent"),

        timeAtCurrentAddress: z
            .string()
            .min(1, "Please enter how long you have lived there"),

        reasonForMoving: z
            .string()
            .min(2, "Please enter your reason for moving"),

        occupants: z
            .string()
            .min(1, "Please enter number of occupants"),

        hasPets: requiredYesNo,
    }),

    screeningQuestions: z.object({
        hasEviction: requiredYesNo,
        hasBankruptcy: requiredYesNo,
        willSmoke: requiredYesNo,

        consentToScreening: z
            .literal(true, {
                message: "You must consent to screening to continue",
            }),
    }),

    identityVerification: z.object({
        idFront: requiredFile,
        idBack: requiredFile,
        ssnFront: requiredFile,

        verificationConsent: z
            .literal(true, {
                message: "You must authorize document verification to continue",
            }),
    }),
};