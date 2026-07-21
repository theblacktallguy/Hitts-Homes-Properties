import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

const requiredTextFields = [
    "fullName",
    "email",
    "phone",
    "dateOfBirth",
    "currentAddress",
    "preferredContactMethod",

    "propertyId",
    "propertyTitle",
    "propertyAddress",
    "desiredMoveInDate",
    "leaseTerm",

    "employmentStatus",
    "employerName",
    "jobTitle",
    "monthlyIncome",
    "employmentLength",

    "landlordName",
    "landlordContact",
    "currentMonthlyRent",
    "timeAtCurrentAddress",
    "reasonForMoving",

    "occupants",
    "hasPets",

    "hasEviction",
    "hasBankruptcy",
    "willSmoke",
] as const;

const requiredFileFields = [
    "idFront",
    "idBack",
    "ssnFront",
] as const;

const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
];

const maxFileSize =
    5 * 1024 * 1024;

function getText(formData: FormData, key: string) {
    const value =
        formData.get(key);

    if (typeof value !== "string") {
        return "";
    }

    return value.trim();
}

function getFile(formData: FormData, key: string) {
    const value =
        formData.get(key);

    if (!(value instanceof File)) {
        return null;
    }

    if (!value.size) {
        return null;
    }

    return value;
}

async function fileToAttachment(file: File) {
    const buffer =
        Buffer.from(await file.arrayBuffer());

    return {
        filename: file.name,
        content: buffer,
    };
}

export async function POST(req: Request) {
    try {
        const formData =
            await req.formData();

        const missingFields =
            requiredTextFields.filter((field) => !getText(formData, field));

        if (missingFields.length > 0) {
            return NextResponse.json(
                {
                    error: "Missing required fields",
                    fields: missingFields,
                },
                { status: 400 }
            );
        }

        const consentToScreening =
            getText(formData, "consentToScreening") === "true";

        const verificationConsent =
            getText(formData, "verificationConsent") === "true";

        if (!consentToScreening || !verificationConsent) {
            return NextResponse.json(
                {
                    error: "Required consent was not provided",
                },
                { status: 400 }
            );
        }

        const uploadedFiles =
            requiredFileFields.map((field) => ({
                field,
                file: getFile(formData, field),
            }));

        const missingFiles =
            uploadedFiles
                .filter((item) => !item.file)
                .map((item) => item.field);

        if (missingFiles.length > 0) {
            return NextResponse.json(
                {
                    error: "Missing required documents",
                    fields: missingFiles,
                },
                { status: 400 }
            );
        }

        for (const item of uploadedFiles) {
            const file =
                item.file as File;

            if (!allowedFileTypes.includes(file.type)) {
                return NextResponse.json(
                    {
                        error: "Invalid file type",
                        field: item.field,
                    },
                    { status: 400 }
                );
            }

            if (file.size > maxFileSize) {
                return NextResponse.json(
                    {
                        error: "File is too large",
                        field: item.field,
                    },
                    { status: 400 }
                );
            }
        }

        const fullName = getText(formData, "fullName");
        const email = getText(formData, "email");
        const propertyId = getText(formData, "propertyId");
        const propertyTitle = getText(formData, "propertyTitle");
        const propertyAddress = getText(formData, "propertyAddress");

        const attachments =
            await Promise.all(
                uploadedFiles.map((item) =>
                    fileToAttachment(item.file as File)
                )
            );

        await prisma.rentalApplication.create({
            data: {
                fullName,
                email,
                phone: getText(formData, "phone"),
                propertyId,
                propertyTitle,
                propertyAddress,
                desiredMoveInDate: getText(formData, "desiredMoveInDate"),
                leaseTerm: getText(formData, "leaseTerm"),
            },
        });

        const emailResult = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "Hitts Homes <onboarding@resend.dev>",
            to: "agentdavidhitt@gmail.com",
            subject: `New Rental Application from ${fullName} — Hitts Homes and Properties`,
            html: `
                <div style="font-family: sans-serif; max-width: 720px; margin: 0 auto;">
                    <h2 style="color: #111;">New Rental Application</h2>
                    <p style="color: #666;">Sensitive identity documents are attached for authorized review only.</p>
                    <hr />

                    <h3>Applicant Information</h3>
                    <p><strong>Name:</strong> ${fullName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${getText(formData, "phone")}</p>
                    <p><strong>Date of birth:</strong> ${getText(formData, "dateOfBirth")}</p>
                    <p><strong>Current address:</strong> ${getText(formData, "currentAddress")}</p>
                    <p><strong>Preferred contact:</strong> ${getText(formData, "preferredContactMethod")}</p>

                    <h3>Property & Move-In</h3>
                    <p><strong>Property ID:</strong> ${getText(formData, "propertyId")}</p>
                    <p><strong>Property:</strong> ${getText(formData, "propertyTitle")}</p>
                    <p><strong>Address:</strong> ${getText(formData, "propertyAddress")}</p>
                    <p><strong>Desired move-in:</strong> ${getText(formData, "desiredMoveInDate")}</p>
                    <p><strong>Lease term:</strong> ${getText(formData, "leaseTerm")}</p>
                    <p><strong>Source:</strong> ${getText(formData, "source") || "general"}</p>

                    <h3>Employment & Income</h3>
                    <p><strong>Employment status:</strong> ${getText(formData, "employmentStatus")}</p>
                    <p><strong>Employer:</strong> ${getText(formData, "employerName")}</p>
                    <p><strong>Job title:</strong> ${getText(formData, "jobTitle")}</p>
                    <p><strong>Monthly income:</strong> $${getText(formData, "monthlyIncome")}</p>
                    <p><strong>Employment length:</strong> ${getText(formData, "employmentLength")}</p>
                    <p><strong>Additional income:</strong> $${getText(formData, "additionalIncome") || "0"}</p>

                    <h3>Rental & Household</h3>
                    <p><strong>Landlord:</strong> ${getText(formData, "landlordName")}</p>
                    <p><strong>Landlord contact:</strong> ${getText(formData, "landlordContact")}</p>
                    <p><strong>Current rent:</strong> $${getText(formData, "currentMonthlyRent")}</p>
                    <p><strong>Time at current address:</strong> ${getText(formData, "timeAtCurrentAddress")}</p>
                    <p><strong>Reason for moving:</strong> ${getText(formData, "reasonForMoving")}</p>
                    <p><strong>Occupants:</strong> ${getText(formData, "occupants")}</p>
                    <p><strong>Pets:</strong> ${getText(formData, "hasPets")}</p>
                    <p><strong>Pet details:</strong> ${getText(formData, "petDetails") || "Not provided"}</p>
                    <p><strong>Vehicles:</strong> ${getText(formData, "vehicles") || "Not provided"}</p>

                    <h3>Screening Questions</h3>
                    <p><strong>Eviction history:</strong> ${getText(formData, "hasEviction")}</p>
                    <p><strong>Bankruptcy history:</strong> ${getText(formData, "hasBankruptcy")}</p>
                    <p><strong>Will smoke inside:</strong> ${getText(formData, "willSmoke")}</p>
                    <p><strong>Consent to screening:</strong> ${consentToScreening ? "Yes" : "No"}</p>
                    <p><strong>Verification consent:</strong> ${verificationConsent ? "Yes" : "No"}</p>

                    <h3>Identity Documents</h3>
                    <p><strong>ID Front:</strong> ${getFile(formData, "idFront")?.name || "Not uploaded"}</p>
                    <p><strong>ID Back:</strong> ${getFile(formData, "idBack")?.name || "Not uploaded"}</p>
                    <p><strong>SSN Card Front:</strong> ${getFile(formData, "ssnFront")?.name || "Not uploaded"}</p>
                    <p style="color: #666; font-size: 13px;">
                        Uploaded identity documents are attached to this email for authorized review.
                    </p>

                    <h3>Additional Message</h3>
                    <p style="background: #f9f9f9; padding: 16px; border-radius: 8px;">
                        ${getText(formData, "message") || "No additional message provided"}
                    </p>

                    <hr />
                    <p style="color: #888; font-size: 12px;">
                        Sent from hittshomes.com rental application form. Documents should be reviewed only by authorized personnel and deleted after review.
                    </p>
                </div>
            `,
            replyTo: email,
            attachments,
        });

        if (emailResult.error) {
            throw new Error(emailResult.error.message);
        }

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error("Rental application email error:", error);

        return NextResponse.json(
            {
                error: "Failed to send application",
            },
            { status: 500 }
        );
    }
}
