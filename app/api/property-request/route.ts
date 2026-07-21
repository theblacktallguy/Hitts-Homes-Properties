import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { stepSchemas } from "@/components/forms/property-request/validation";

const resend = new Resend(process.env.RESEND_API_KEY);

const propertyRequestSchema = stepSchemas.personalInfo
    .merge(stepSchemas.propertyGoal)
    .merge(stepSchemas.location)
    .merge(stepSchemas.propertyDetails)
    .merge(stepSchemas.finalDetails)
    .extend({
        neighborhood: z.string().optional(),
        openToSuggestions: z.boolean().optional(),
        amenities: z.array(z.string()).optional(),
        message: z.string().optional(),
    });

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const result = propertyRequestSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: "Invalid property request details" },
                { status: 400 }
            );
        }

        const data = result.data;

        const emailResult = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "Hitts Homes <onboarding@resend.dev>",
            to: "agentdavidhitt@gmail.com",
            subject: `New Property Request from ${data.fullName} — Hitts Homes and Properties`,
            html: `
                <div style="font-family: sans-serif; max-width: 640px; margin: 0 auto;">
                    <h2 style="color: #111;">New Property Request</h2>
                    <hr />

                    <h3>Contact Information</h3>
                    <p><strong>Name:</strong> ${data.fullName}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>

                    <h3>Property Goal</h3>
                    <p><strong>Looking to:</strong> ${data.lookingFor}</p>

                    <h3>Location</h3>
                    <p><strong>State:</strong> ${data.state}</p>
                    <p><strong>City:</strong> ${data.city}</p>
                    <p><strong>Neighborhood:</strong> ${data.neighborhood || "Not provided"}</p>
                    <p><strong>Open to suggestions:</strong> ${data.openToSuggestions ? "Yes" : "No"}</p>

                    <h3>Property Details</h3>
                    <p><strong>Property type:</strong> ${data.propertyType}</p>
                    <p><strong>Bedrooms:</strong> ${data.bedrooms}</p>
                    <p><strong>Bathrooms:</strong> ${data.bathrooms}</p>
                    <p><strong>Amenities:</strong> ${data.amenities?.join(", ") || "None selected"}</p>

                    <h3>Budget & Timeline</h3>
                    <p><strong>Budget:</strong> $${data.minBudget} - $${data.maxBudget}</p>
                    <p><strong>Timeline:</strong> ${data.timeline}</p>

                    <h3>Additional Details</h3>
                    <p style="background: #f9f9f9; padding: 16px; border-radius: 8px;">
                        ${data.message || "No additional details provided"}
                    </p>

                    <hr />
                    <p style="color: #888; font-size: 12px;">Sent from hittshomes.com property request form</p>
                </div>
            `,
            replyTo: data.email,
        });

        if (emailResult.error) {
            throw new Error(emailResult.error.message);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Property request email error:", error);

        return NextResponse.json(
            { error: "Failed to send property request" },
            { status: 500 }
        );
    }
}
