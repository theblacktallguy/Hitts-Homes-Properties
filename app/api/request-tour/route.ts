import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { stepSchemas } from "@/components/forms/request-tour/validation";
import { prisma } from "@/lib/prisma";
import { getResendSender } from "@/lib/emailSender";

const resend = new Resend(process.env.RESEND_API_KEY);

const requestTourSchema = stepSchemas.contactInfo
    .merge(stepSchemas.tourDetails)
    .extend({
        alternateDate: z.string().optional(),
        alternateTime: z.string().optional(),
        financingStatus: z.string().optional(),
        message: z.string().optional(),
        source: z.enum(["property-page", "general"]),
    });

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const result = requestTourSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: "Invalid tour request details" },
                { status: 400 }
            );
        }

        const data = result.data;

        await prisma.tourRequest.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                propertyId: data.propertyId,
                propertyTitle: data.propertyTitle,
                propertyAddress: data.propertyAddress,
                tourType: data.tourType,
                preferredDate: data.preferredDate,
                preferredTime: data.preferredTime,
                alternateDate: data.alternateDate || null,
                alternateTime: data.alternateTime || null,
            },
        });

        const emailResult = await resend.emails.send({
            from: getResendSender(),
            to: "agentdavidhitt@gmail.com",
            subject: `New Tour Request from ${data.fullName} — Hitts Homes and Properties`,
            html: `
                <div style="font-family: sans-serif; max-width: 640px; margin: 0 auto;">
                    <h2 style="color: #111;">New Tour Request</h2>
                    <hr />

                    <h3>Contact Information</h3>
                    <p><strong>Name:</strong> ${data.fullName}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>

                    <h3>Property Details</h3>
                    <p><strong>Property ID:</strong> ${data.propertyId}</p>
                    <p><strong>Property:</strong> ${data.propertyTitle}</p>
                    <p><strong>Address:</strong> ${data.propertyAddress}</p>
                    <p><strong>Source:</strong> ${data.source === "property-page" ? "Property Page" : "General Request"}</p>

                    <h3>Tour Details</h3>
                    <p><strong>Tour type:</strong> ${data.tourType}</p>
                    <p><strong>Preferred:</strong> ${data.preferredDate} at ${data.preferredTime}</p>
                    <p><strong>Alternate:</strong> ${data.alternateDate || "Not provided"} at ${data.alternateTime || "Not provided"}</p>

                    <h3>Extra Details</h3>
                    <p><strong>Financing status:</strong> ${data.financingStatus || "Not provided"}</p>
                    <p style="background: #f9f9f9; padding: 16px; border-radius: 8px;">
                        ${data.message || "No additional message provided"}
                    </p>

                    <hr />
                    <p style="color: #888; font-size: 12px;">Sent from hittshomes.com request tour form</p>
                </div>
            `,
            replyTo: data.email,
        });

        if (emailResult.error) {
            throw new Error(emailResult.error.message);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Tour request email error:", error);

        return NextResponse.json(
            { error: "Failed to send tour request" },
            { status: 500 }
        );
    }
}
