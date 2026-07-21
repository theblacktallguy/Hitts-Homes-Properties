import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { companyEmail, detailCard, escapeHtml } from "@/lib/emailTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const status = body.status === "approved" ? "approved" : body.status === "denied" ? "denied" : "";
    const confirmedDate = String(body.confirmedDate || "").trim();
    const confirmedTime = String(body.confirmedTime || "").trim();
    if (!status || (status === "approved" && (!confirmedDate || !confirmedTime))) return NextResponse.json({ error: "Approved tours require a confirmed date and time." }, { status: 400 });
    const tour = await prisma.tourRequest.update({ where: { id }, data: { status, decisionNote: String(body.note || "").trim() || null, confirmedDate: status === "approved" ? confirmedDate : null, confirmedTime: status === "approved" ? confirmedTime : null, decidedAt: new Date() } });
    const approved = status === "approved";
    const content = approved ? `<p style="font-size:16px;line-height:1.6;">Your property tour is confirmed. We look forward to meeting you.</p>${detailCard([["Property", `${tour.propertyTitle} — ${tour.propertyAddress}`], ["Tour type", tour.tourType], ["Confirmed date", confirmedDate], ["Confirmed time", confirmedTime]])}${tour.decisionNote ? `<p style="font-size:14px;line-height:1.6;color:#475467;"><strong>Note from your agent:</strong> ${escapeHtml(tour.decisionNote)}</p>` : ""}` : `<p style="font-size:16px;line-height:1.6;">Thank you for requesting a tour of ${escapeHtml(tour.propertyTitle)}. We are unable to confirm this tour request at this time.</p>${tour.decisionNote ? `<p style="font-size:14px;line-height:1.6;color:#475467;"><strong>Note from your agent:</strong> ${escapeHtml(tour.decisionNote)}</p>` : ""}<p style="font-size:14px;line-height:1.6;color:#475467;">Please contact us and we will help find another time or property.</p>`;
    await resend.emails.send({ from: process.env.RESEND_FROM_EMAIL || "Hitts Homes <onboarding@resend.dev>", to: tour.email, subject: `${approved ? "Tour confirmed" : "Tour request update"} — Hitts Homes & Properties`, html: companyEmail({ title: approved ? "Your tour is confirmed" : "Your tour request update", preview: approved ? "Your confirmed tour details are inside." : "There is an update to your tour request.", greeting: `Hello ${tour.fullName},`, content }) });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to send tour decision" }, { status: 500 });
  }
}
