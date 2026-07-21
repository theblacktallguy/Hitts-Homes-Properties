import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizePropertyJson } from "@/lib/admin/normalizePropertyJson";
import { deletePropertyImages } from "@/lib/cloudinary";

type RouteContext = {
  params: Promise<{ propertyId: string }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { propertyId } = await params;
    const data = normalizePropertyJson(await request.json());

    if (data.propertyId !== propertyId.toUpperCase()) {
      return NextResponse.json({ error: "Property ID cannot be changed." }, { status: 400 });
    }

    const property = await prisma.property.update({
      where: { propertyId: data.propertyId },
      data,
      select: { propertyId: true, title: true },
    });

    return NextResponse.json({ success: true, property });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update property" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { propertyId } = await params;
    const property = await prisma.property.findUnique({
      where: { propertyId: propertyId.toUpperCase() },
      select: { imageFolder: true },
    });

    if (!property) {
      return NextResponse.json({ error: "Property was not found" }, { status: 404 });
    }

    await deletePropertyImages(property.imageFolder);
    await prisma.property.delete({ where: { propertyId: propertyId.toUpperCase() } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to delete property" },
      { status: 500 }
    );
  }
}
