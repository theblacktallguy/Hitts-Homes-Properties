import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizePropertyJson } from "@/lib/admin/normalizePropertyJson";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = normalizePropertyJson(body);

    const existing = await prisma.property.findUnique({
      where: {
        propertyId: data.propertyId,
      },
      select: {
        propertyId: true,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          error: `Property ID ${data.propertyId} is already in use`,
        },
        {
          status: 409,
        }
      );
    }

    const property = await prisma.property.create({
      data: {
        propertyId: data.propertyId,
        title: data.title,
        listingType: data.listingType,
        status: data.status,
        propertyType: data.propertyType,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode || null,
        price: data.price,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        sqft: data.sqft,
        descriptionShort: data.descriptionShort,
        imageFolder: data.imageFolder,
        amenities: data.amenities,
        petFriendly: data.petFriendly,
        applicationEnabled: data.applicationEnabled,
        agentName: data.agentName || "Agent David Hitt",
        contactEmail: data.contactEmail || "agentdavidhitt@gmail.com",
        contactPhone: data.contactPhone || "(248) 636-0376",
        virtualTourUrl: data.virtualTourUrl || null,
        videoUrl: data.videoUrl || null,
        factsFeatures: data.factsFeatures,
        construction: data.construction,
        utilities: data.utilities,
        lot: data.lot,
        financial: data.financial,
      },
      select: {
        propertyId: true,
        title: true,
      },
    });

    return NextResponse.json({
      success: true,
      property,
    });
  } catch (error) {
    console.error("Create property error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create property",
      },
      {
        status: 500,
      }
    );
  }
}
