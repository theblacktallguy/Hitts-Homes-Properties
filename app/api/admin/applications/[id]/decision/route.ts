import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { companyEmail, detailCard, escapeHtml, formatCurrency } from "@/lib/emailTemplates";
import { getResendSender } from "@/lib/emailSender";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const status = body.status === "approved" ? "approved" : body.status === "denied" ? "denied" : "";
    if (!status) return NextResponse.json({ error: "Choose approved or denied." }, { status: 400 });

    const applicationFee = Number(body.applicationFee || 0);
    const additionalFees = Number(body.additionalFees || 0);
    if (
      status === "approved" &&
      (!Number.isFinite(applicationFee) || !Number.isFinite(additionalFees) || applicationFee < 0 || additionalFees < 0)
    ) {
      return NextResponse.json({ error: "Fees must be valid positive amounts." }, { status: 400 });
    }

    const application = await prisma.rentalApplication.update({
      where: { id },
      data: {
        status,
        decisionNote: String(body.note || "").trim() || null,
        applicationFee: status === "approved" ? Math.round(applicationFee) : null,
        additionalFees: status === "approved" ? Math.round(additionalFees) : null,
        decidedAt: new Date(),
      },
    });

    const approved = status === "approved";

    const approvedContent = `
      <!-- Congrats banner -->
      <div style="background:linear-gradient(135deg,#0B1F3A 0%,#1a3a5c 100%);border-radius:14px;padding:28px 24px;margin-bottom:28px;text-align:center;">
        <div style="font-size:36px;margin-bottom:8px;">🎉</div>
        <div style="font-size:20px;font-weight:700;color:#ffffff;margin-bottom:6px;">Congratulations, ${escapeHtml(application.fullName.split(" ")[0])}!</div>
        <div style="font-size:14px;color:#C8A45D;font-weight:500;">Your rental application has been approved</div>
      </div>

      <p style="font-size:15px;line-height:1.8;color:#344054;margin:0 0 24px;">
        We are thrilled to welcome you as a future resident. Your application for <strong>${escapeHtml(application.propertyTitle)}</strong> has been reviewed and approved by your Hitts Homes agent. Please review the details below and follow the next steps to finalize your lease.
      </p>

      <!-- Property details -->
      <div style="margin-bottom:10px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#667085;">📋 Application Summary</div>
      ${detailCard([
        ["Property", `${application.propertyTitle} — ${application.propertyAddress}`],
        ["Application Fee", formatCurrency(applicationFee)],
        ["Security Deposit", formatCurrency(additionalFees)],
        ["Total Due", formatCurrency(applicationFee + additionalFees)],
        ["Status", "✅ Approved"],
      ])}

      ${application.decisionNote ? `
      <div style="background:#f0fdf4;border-left:4px solid #16a34a;border-radius:8px;padding:16px 20px;margin:20px 0;">
        <div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#16a34a;margin-bottom:6px;">Note from your agent</div>
        <p style="margin:0;font-size:14px;line-height:1.7;color:#166534;">${escapeHtml(application.decisionNote)}</p>
      </div>` : ""}

      <!-- Next steps -->
      <div style="margin:28px 0 10px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#667085;">🚀 Your Next Steps</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:28px;">
        ${[
          ["1", "Review your lease agreement sent separately by your agent", "#C8A45D"],
          ["2", "Submit your application fee and security deposit to secure the property", "#C8A45D"],
          ["3", "Schedule a move-in walkthrough with your Hitts Homes agent", "#C8A45D"],
          ["4", "Collect your keys and welcome to your new home!", "#C8A45D"],
        ].map(([num, text, color]) => `
        <tr>
          <td style="padding:10px 0;vertical-align:top;">
            <table role="presentation" cellspacing="0" cellpadding="0">
              <tr>
                <td style="vertical-align:top;padding-right:14px;">
                  <div style="width:28px;height:28px;border-radius:50%;background:${color};color:#0B1F3A;font-size:13px;font-weight:700;text-align:center;line-height:28px;">${num}</div>
                </td>
                <td style="vertical-align:middle;font-size:14px;line-height:1.6;color:#344054;padding-top:4px;">${text}</td>
              </tr>
            </table>
          </td>
        </tr>`).join("")}
      </table>

      <!-- CTA -->
      <div style="text-align:center;margin:28px 0;">
        <a href="mailto:agentdavidhitt@gmail.com" style="display:inline-block;background:#C8A45D;color:#0B1F3A;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;text-decoration:none;letter-spacing:0.3px;">Contact Your Agent Now</a>
      </div>

      <p style="font-size:13px;line-height:1.7;color:#667085;text-align:center;margin:0;">
        Please secure your property as soon as possible — approved applications are held for a limited time.<br/>
        We look forward to welcoming you to your new home! 🏡
      </p>
    `;

    const deniedContent = `
      <!-- Status banner -->
      <div style="background:#fafafa;border:1px solid #e5e7eb;border-radius:14px;padding:24px;margin-bottom:28px;text-align:center;">
        <div style="font-size:32px;margin-bottom:8px;">📋</div>
        <div style="font-size:18px;font-weight:700;color:#162033;margin-bottom:6px;">Application Update</div>
        <div style="font-size:13px;color:#667085;">Regarding your application for <strong>${escapeHtml(application.propertyTitle)}</strong></div>
      </div>

      <p style="font-size:15px;line-height:1.8;color:#344054;margin:0 0 20px;">
        Thank you for choosing Hitts Homes & Properties and for taking the time to apply for <strong>${escapeHtml(application.propertyTitle)}</strong>. After a careful review of your application, we regret to inform you that we are unable to move forward at this time.
      </p>

      <p style="font-size:15px;line-height:1.8;color:#344054;margin:0 0 24px;">
        We understand this may be disappointing news, and we truly appreciate your interest. Please know that this decision is not a reflection of your character — rental decisions are based on a variety of factors that can change with different properties.
      </p>

      ${application.decisionNote ? `
      <div style="background:#fff7ed;border-left:4px solid #f97316;border-radius:8px;padding:16px 20px;margin:20px 0;">
        <div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#ea580c;margin-bottom:6px;">Note from your agent</div>
        <p style="margin:0;font-size:14px;line-height:1.7;color:#9a3412;">${escapeHtml(application.decisionNote)}</p>
      </div>` : ""}

      <!-- What's next -->
      <div style="margin:28px 0 10px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#667085;">💡 What You Can Do Next</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:28px;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
        ${[
          ["🏠", "Browse other available listings on our website", "We have a wide selection of verified homes and apartments."],
          ["📞", "Speak with your Hitts Homes agent", "Our agents can help match you with properties that better fit your profile."],
          ["📄", "Review your application details", "Understanding what lenders look for can strengthen future applications."],
          ["🔔", "Stay updated", "New properties are listed regularly — your perfect home may be just around the corner."],
        ].map(([icon, title, desc]) => `
        <tr>
          <td style="padding:16px;border-bottom:1px solid #e5e7eb;">
            <table role="presentation" cellspacing="0" cellpadding="0">
              <tr>
                <td style="font-size:22px;padding-right:14px;vertical-align:top;padding-top:2px;">${icon}</td>
                <td>
                  <div style="font-size:14px;font-weight:600;color:#162033;margin-bottom:3px;">${title}</div>
                  <div style="font-size:13px;color:#667085;line-height:1.6;">${desc}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>`).join("")}
      </table>

      <!-- CTA -->
      <div style="text-align:center;margin:28px 0;">
        <a href="mailto:agentdavidhitt@gmail.com" style="display:inline-block;background:#0B1F3A;color:#ffffff;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;text-decoration:none;letter-spacing:0.3px;">Talk to an Agent</a>
      </div>

      <p style="font-size:13px;line-height:1.7;color:#667085;text-align:center;margin:0;">
        We remain committed to helping you find the right home.<br/>
        Thank you for trusting Hitts Homes & Properties. 🏡
      </p>
    `;

    await resend.emails.send({
      from: getResendSender(),
      to: application.email,
      subject: `${approved ? "🎉 Application Approved" : "Update on your application"} — Hitts Homes & Properties`,
      html: companyEmail({
        title: approved ? "Your Application is Approved! 🎉" : "Your Application Update",
        preview: approved ? "Congratulations! Your next steps to your new home are ready." : "There is an update regarding your rental application.",
        greeting: `Hello ${escapeHtml(application.fullName)},`,
        content: approved ? approvedContent : deniedContent,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to send application decision" }, { status: 500 });
  }
}