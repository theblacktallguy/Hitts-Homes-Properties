import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { companyEmail, detailCard, escapeHtml, formatCurrency } from "@/lib/emailTemplates";
import { getResendSender } from "@/lib/emailSender";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

function requestedPropertyIds(body: Record<string, unknown>) {
  return [...new Set([body.propertyId1, body.propertyId2, body.propertyId3]
    .filter((id): id is string => typeof id === "string")
    .map((id) => id.trim().toUpperCase())
    .filter(Boolean))].slice(0, 3);
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body: Record<string, unknown> = await request.json();
    const status = body.status === "found" ? "found" : body.status === "not_found" ? "not_found" : "";

    if (!status) {
      return NextResponse.json({ error: "Choose whether matching properties were found." }, { status: 400 });
    }

    const ids = requestedPropertyIds(body);
    const email = z.string().email().safeParse(body.email);
    if (!email.success) {
      return NextResponse.json({ error: "Enter a valid recipient email address." }, { status: 400 });
    }
    if (status === "found" && !ids.length) {
      return NextResponse.json({ error: "Add at least one matching property ID." }, { status: 400 });
    }

    const properties = ids.length
      ? await prisma.property.findMany({
        where: { propertyId: { in: ids }, status: "active" },
        select: {
          propertyId: true,
          title: true,
          address: true,
          city: true,
          state: true,
          zipCode: true,
          price: true,
          bedrooms: true,
          bathrooms: true,
          listingType: true,
        },
      })
      : [];

    const foundIds = new Set(properties.map((property) => property.propertyId));
    const unavailableIds = ids.filter((propertyId) => !foundIds.has(propertyId));
    if (unavailableIds.length) {
      return NextResponse.json({ error: `These property IDs are unavailable: ${unavailableIds.join(", ")}` }, { status: 400 });
    }

    const propertyRequest = await prisma.propertyRequest.update({
      where: { id },
      data: {
        status,
        decisionNote: typeof body.note === "string" ? body.note.trim() || null : null,
        decidedAt: new Date(),
      },
    });

    const note = propertyRequest.decisionNote
      ? `<div style="background:#f8f7f4;border-left:4px solid #C8A45D;border-radius:8px;padding:16px 20px;margin:20px 0;"><div style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#7c6233;margin-bottom:6px;">Note from your agent</div><p style="margin:0;font-size:14px;line-height:1.7;color:#344054;">${escapeHtml(propertyRequest.decisionNote)}</p></div>`
      : "";

    const propertyCards = `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0;"><tr>${properties.map((property) => `<td width="${Math.floor(100 / properties.length)}%" style="vertical-align:top;padding:0 5px 10px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="height:100%;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;"><tr><td style="padding:16px 14px;"><div style="font-size:14px;line-height:1.35;font-weight:700;color:#0B1F3A;margin-bottom:8px;">${escapeHtml(property.title)}</div><div style="font-size:12px;line-height:1.55;color:#667085;margin-bottom:10px;">${escapeHtml(`${property.address}, ${property.city}, ${property.state}${property.zipCode ? ` ${property.zipCode}` : ""}`)}</div><div style="font-size:12px;line-height:1.55;color:#344054;font-weight:700;">${escapeHtml(`${formatCurrency(property.price)} · ${property.bedrooms} bd · ${property.bathrooms} ba`)}</div></td></tr><tr><td style="padding:0 14px 16px;"><a href="https://hittshomes.com/property/${encodeURIComponent(property.propertyId)}" style="display:block;background:#0B1F3A;border-radius:8px;padding:11px 8px;color:#ffffff;font-size:12px;font-weight:700;text-align:center;text-decoration:none;">View Property</a></td></tr></table></td>`).join("")}</tr></table>`;

    const hasMatches = status === "found";
    const content = hasMatches
      ? `
        <div style="background:linear-gradient(135deg,#0B1F3A 0%,#1a3a5c 100%);border-radius:14px;padding:28px 24px;margin-bottom:28px;text-align:center;"><div style="font-size:32px;margin-bottom:8px;">🏡</div><div style="font-size:20px;font-weight:700;color:#ffffff;margin-bottom:6px;">We found homes for you, ${escapeHtml(propertyRequest.fullName.split(" ")[0])}!</div><div style="font-size:14px;color:#C8A45D;font-weight:500;">Selected for your ${escapeHtml(propertyRequest.lookingFor)} search</div></div>
        <p style="font-size:15px;line-height:1.8;color:#344054;margin:0 0 20px;">Our team reviewed your request and selected these available properties that may be a great fit.</p>
        ${propertyCards}
        ${note}
        <p style="font-size:14px;line-height:1.7;color:#667085;margin:24px 0 0;">Reply to this email or contact your Hitts Homes agent to arrange a tour or discuss your options.</p>
      `
      : `
        <div style="background:#fafafa;border:1px solid #e5e7eb;border-radius:14px;padding:24px;margin-bottom:28px;text-align:center;"><div style="font-size:32px;margin-bottom:8px;">🔎</div><div style="font-size:18px;font-weight:700;color:#162033;margin-bottom:6px;">An update on your property request</div></div>
        <p style="font-size:15px;line-height:1.8;color:#344054;margin:0 0 20px;">Thank you for sharing what you are looking for. We do not have a matching property available right now, but we will keep your request in mind as new listings become available.</p>
        ${note}
        <div style="text-align:center;margin:28px 0;"><a href="https://hittshomes.com/search" style="display:inline-block;background:#0B1F3A;color:#ffffff;font-size:15px;font-weight:700;padding:14px 30px;border-radius:10px;text-decoration:none;">Browse Available Properties</a></div>
      `;

    const emailResult = await resend.emails.send({
      from: getResendSender(),
      to: email.data,
      subject: hasMatches ? "Properties selected for you — Hitts Homes & Properties" : "Update on your property request — Hitts Homes & Properties",
      html: companyEmail({
        title: hasMatches ? "We Found Properties for You" : "Your Property Request Update",
        preview: hasMatches ? "Our team selected available properties for your search." : "There is an update regarding your property request.",
        greeting: `Hello ${escapeHtml(propertyRequest.fullName)},`,
        content,
      }),
    });

    if (emailResult.error) throw new Error(emailResult.error.message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Property request decision error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to send property request decision." }, { status: 500 });
  }
}
