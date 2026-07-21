import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizePropertyIds(value: unknown) {
  if (!Array.isArray(value)) return [];

  return [...new Set(value
    .filter((id): id is string => typeof id === "string")
    .map((id) => id.trim().toUpperCase())
    .filter(Boolean))].slice(0, 3);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ids = normalizePropertyIds(body.ids);

    if (!ids.length) return NextResponse.json({ properties: [] });

    const properties = await prisma.property.findMany({
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
    });

    return NextResponse.json({ properties });
  } catch (error) {
    console.error("Property request lookup error:", error);
    return NextResponse.json({ error: "Unable to look up properties." }, { status: 500 });
  }
}
