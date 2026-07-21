import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { companyEmail, detailCard, escapeHtml } from "@/lib/emailTemplates";
import { getResendSender } from "@/lib/emailSender";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const status = body.status === "approved" ? "approved" : body.status === "denied" ? "denied" : "";
    const confirmedDate = String(body.confirmedDate || "").trim();
    const confirmedTime = String(body.confirmedTime || "").trim();

    if (!status || (status === "approved" && (!confirmedDate || !confirmedTime))) {
      return NextResponse.json({ error: "Approved tours require a confirmed date and time." }, { status: 400 });
    }

    const tour = await prisma.tourRequest.update({
      where: { id },
      data: {
        status,
        decisionNote: String(body.note || "").trim() || null,
        confirmedDate: status === "approved" ? confirmedDate : null,
        confirmedTime: status === "approved" ? confirmedTime : null,
        decidedAt: new Date(),
      },
    });

    const approved = status === "approved";

    const approvedContent = `
      <!-- Confirmed banner -->
      <div style="background:linear-gradient(135deg,#0B1F3A 0%,#1a3a5c 100%);border-radius:14px;padding:28px 24px;margin-bottom:28px;text-align:center;">
        <div style="font-size:36px;margin-bottom:8px;">🗓️</div>
        <div style="font-size:20px;font-weight:700;color:#ffffff;margin-bottom:6px;">Your Tour is Confirmed, ${escapeHtml(tour.fullName.split(" ")[0])}!</div>
        <div style="font-size:14px;color:#C8A45D;font-weight:500;">${confirmedDate} at ${confirmedTime}</div>
      </div>

      <p style="font-size:15px;line-height:1.8;color:#344054;margin:0 0 24px;">
        Great news! Your property tour for <strong>${escapeHtml(tour.propertyTitle)}</strong> has been confirmed. We are excited to show you this property and help you find your perfect home. Please review the details below and make sure to arrive on time.
      </p>

      <!-- Tour details -->
      <div style="margin-bottom:10px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#667085;">📋 Tour Details</div>
      ${detailCard([
        ["Property", `${tour.propertyTitle} — ${tour.propertyAddress}`],
        ["Tour Type", tour.tourType],
        ["Date", confirmedDate],
        ["Time", confirmedTime],
        ["Status", "✅ Confirmed"],
      ])}

      ${tour.decisionNote ? `
      <div style="background:#f0fdf4;border-left:4px solid #16a34a;border-radius:8px;padding:16px 20px;margin:20px 0;">
        <div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#16a34a;margin-bottom:6px;">Note from your agent</div>
        <p style="margin:0;font-size:14px;line-height:1.7;color:#166534;">${escapeHtml(tour.decisionNote)}</p>
      </div>` : ""}

      <!-- How to prepare -->
      <div style="margin:28px 0 10px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#667085;">✅ How to Prepare for Your Tour</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:28px;">
        ${[
          ["1", "Arrive 5–10 minutes early so we can get started on time", "#C8A45D"],
          ["2", "Bring a valid government-issued ID for verification", "#C8A45D"],
          ["3", "Prepare a list of questions you have about the property", "#C8A45D"],
          ["4", "Take note of the neighborhood, parking, and surroundings", "#C8A45D"],
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

      <!-- What to expect -->
      <div style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#667085;">🏡 What to Expect</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:28px;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
        ${[
          ["🔑", "Full property walkthrough", "Your agent will walk you through every room and highlight key features."],
          ["📸", "Feel free to take photos", "Capture anything you want to revisit or compare with other properties."],
          ["💬", "Ask anything", "No question is too small — our agents are here to help you make the best decision."],
          ["📄", "Application info available", "If you love the property, your agent can walk you through the next steps on the spot."],
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
        <a href="mailto:agentdavidhitt@gmail.com" style="display:inline-block;background:#C8A45D;color:#0B1F3A;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;text-decoration:none;letter-spacing:0.3px;">Contact Your Agent</a>
      </div>

      <p style="font-size:13px;line-height:1.7;color:#667085;text-align:center;margin:0;">
        Need to reschedule? Reach out to your agent as soon as possible.<br/>
        We look forward to seeing you! 🏡
      </p>
    `;

    const deniedContent = `
      <!-- Status banner -->
      <div style="background:#fafafa;border:1px solid #e5e7eb;border-radius:14px;padding:24px;margin-bottom:28px;text-align:center;">
        <div style="font-size:32px;margin-bottom:8px;">🗓️</div>
        <div style="font-size:18px;font-weight:700;color:#162033;margin-bottom:6px;">Tour Request Update</div>
        <div style="font-size:13px;color:#667085;">Regarding your tour request for <strong>${escapeHtml(tour.propertyTitle)}</strong></div>
      </div>

      <p style="font-size:15px;line-height:1.8;color:#344054;margin:0 0 20px;">
        Thank you for your interest in touring <strong>${escapeHtml(tour.propertyTitle)}</strong>. Unfortunately, we are unable to confirm your tour request at this time. We sincerely apologize for any inconvenience this may cause.
      </p>

      <p style="font-size:15px;line-height:1.8;color:#344054;margin:0 0 24px;">
        This may be due to scheduling conflicts or property availability. Please don't be discouraged — our team is ready to help you find a convenient time or explore other great properties.
      </p>

      ${tour.decisionNote ? `
      <div style="background:#fff7ed;border-left:4px solid #f97316;border-radius:8px;padding:16px 20px;margin:20px 0;">
        <div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#ea580c;margin-bottom:6px;">Note from your agent</div>
        <p style="margin:0;font-size:14px;line-height:1.7;color:#9a3412;">${escapeHtml(tour.decisionNote)}</p>
      </div>` : ""}

      <!-- What's next -->
      <div style="margin:28px 0 10px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#667085;">💡 What You Can Do Next</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:28px;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
        ${[
          ["📞", "Contact your agent to reschedule", "Our agents are flexible and happy to find a time that works for you."],
          ["🏠", "Browse other available properties", "We have a wide selection of verified homes ready for tours."],
          ["📅", "Request a virtual tour", "Can't make it in person? Ask your agent about a virtual walkthrough option."],
          ["🔔", "Stay in the loop", "New properties and tour slots open up regularly — your perfect home is out there."],
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
        <a href="mailto:agentdavidhitt@gmail.com" style="display:inline-block;background:#0B1F3A;color:#ffffff;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;text-decoration:none;letter-spacing:0.3px;">Reschedule Your Tour</a>
      </div>

      <p style="font-size:13px;line-height:1.7;color:#667085;text-align:center;margin:0;">
        We appreciate your patience and look forward to helping you find your perfect home.<br/>
        Thank you for trusting Hitts Homes & Properties. 🏡
      </p>
    `;

    await resend.emails.send({
      from: getResendSender(),
      to: tour.email,
      subject: `${approved ? "🗓️ Tour Confirmed" : "Update on your tour request"} — Hitts Homes & Properties`,
      html: companyEmail({
        title: approved ? "Your Tour is Confirmed! 🗓️" : "Your Tour Request Update",
        preview: approved ? `Your tour is confirmed for ${confirmedDate} at ${confirmedTime}.` : "There is an update regarding your tour request.",
        greeting: `Hello ${escapeHtml(tour.fullName)},`,
        content: approved ? approvedContent : deniedContent,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to send tour decision" }, { status: 500 });
  }
}