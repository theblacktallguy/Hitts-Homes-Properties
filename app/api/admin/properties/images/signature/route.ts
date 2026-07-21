import { NextResponse } from "next/server";
import { createPropertyImageUploadSignature } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const { propertyId, imageIndex } = await request.json();
    const normalizedPropertyId = String(propertyId || "").trim().toUpperCase();
    const normalizedImageIndex = Number(imageIndex);

    if (!normalizedPropertyId || !Number.isInteger(normalizedImageIndex) || normalizedImageIndex < 1 || normalizedImageIndex > 20) {
      return NextResponse.json({ error: "Invalid image upload request" }, { status: 400 });
    }

    const signature = await createPropertyImageUploadSignature(
      normalizedPropertyId,
      normalizedImageIndex
    );

    return NextResponse.json(signature);
  } catch (error) {
    console.error("Property image signature failed:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to prepare image upload",
      },
      { status: 500 }
    );
  }
}
