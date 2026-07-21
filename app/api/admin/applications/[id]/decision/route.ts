import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { companyEmail, detailCard, escapeHtml, formatCurrency } from "@/lib/emailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const status = body.status === "approved" ? "approved" : body.status === "denied" ? "denied" : "";
    if (!status) return NextResponse.json({ error: "Choose approved or denied." }, { status: 400 });

    const applicationFee = Number(body.applicationFee || 0);
    const additionalFees = Number(body.additionalFees || 0);
    if (status === "approved" && (!Number.isFinite(applicationFee) || !Number.isFinite(additionalFees) || applicationFee < 0 || additionalFees < 0)) {
      return NextResponse.json({ error: "Fees must be valid positive amounts." }, { status: 400 });
    }

    const application = await prisma.rentalApplication.update({
      where: { id },
      data: { status, decisionNote: String(body.note || "").trim() || null, applicationFee: status === "approved" ? Math.round(applicationFee) : null, additionalFees: status === "approved" ? Math.round(additionalFees) : null, decidedAt: new Date() },
    });
    const approved = status === "approved";
    const content = approved
      ? `<p style="font-size:16px;line-height:1.6;">We are pleased to let you know that your rental application has been approved. Please contact your agent to finalize the remaining lease steps.</p>${detailCard([["Property", `${application.propertyTitle} — ${application.propertyAddress}`], ["Application fee", formatCurrency(applicationFee)], ["Other required fees", formatCurrency(additionalFees)], ["Next step", "Contact your Hitts Homes agent to finalize your rental application"]])}${application.decisionNote ? `<p style="font-size:14px;line-height:1.6;color:#475467;"><strong>Note from your agent:</strong> ${escapeHtml(application.decisionNote)}</p>` : ""}`
      : `<p style="font-size:16px;line-height:1.6;">Thank you for your interest in ${escapeHtml(application.propertyTitle)}. After careful review, we are unable to move forward with your application at this time.</p>${application.decisionNote ? `<p style="font-size:14px;line-height:1.6;color:#475467;"><strong>Note from your agent:</strong> ${escapeHtml(application.decisionNote)}</p>` : ""}<p style="font-size:14px;line-height:1.6;color:#475467;">Our team can help you explore other available homes.</p>`;
    await resend.emails.send({ from: process.env.RESEND_FROM_EMAIL || "Hitts Homes <onboarding@resend.dev>", to: application.email, subject: `${approved ? "Application approved" : "Application update"} — Hitts Homes & Properties`, html: companyEmail({ title: approved ? "Your application is approved" : "Your application update", preview: approved ? "Your next rental steps are ready." : "There is an update to your rental application.", greeting: `Hello ${application.fullName},`, content }) });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to send application decision" }, { status: 500 });
  }
}
