import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ propertyId: string }> }
) {
  try {
    const { propertyId } = await params;

    const filePath = path.join(
      process.cwd(),
      "data",
      "properties",
      "properties.json"
    );

    const file = fs.readFileSync(filePath, "utf-8");
    const properties = JSON.parse(file);

    const property = properties.find(
      (p: any) => p.propertyId === propertyId
    );

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}