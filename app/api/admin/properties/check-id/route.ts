import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get("propertyId")?.trim().toUpperCase();

  if (!propertyId) {
    return NextResponse.json(
      {
        error: "Property ID is required",
      },
      {
        status: 400,
      }
    );
  }

  const existing = await prisma.property.findUnique({
    where: {
      propertyId,
    },
    select: {
      propertyId: true,
      title: true,
    },
  });

  return NextResponse.json({
    exists: Boolean(existing),
    property: existing,
  });
}
