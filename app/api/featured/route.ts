import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mapProperty } from "@/lib/mappers/mapProperty";

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export async function GET() {
  // Fetch a larger pool of both sale and rent properties separately
  const [forSale, forRent] = await Promise.all([
    prisma.property.findMany({
      where: { status: "active", listingType: "sale" },
      take: 50,
    }),
    prisma.property.findMany({
      where: { status: "active", listingType: "rent" },
      take: 50,
    }),
  ]);

  // Pick 6 random from each so we always get a balanced mix
  const selectedSale = pickRandom(forSale, 6);
  const selectedRent = pickRandom(forRent, 6);

  // Interleave them: sale, rent, sale, rent...
  const interleaved = [];
  for (let i = 0; i < 6; i++) {
    if (selectedSale[i]) interleaved.push(selectedSale[i]);
    if (selectedRent[i]) interleaved.push(selectedRent[i]);
  }

  return NextResponse.json(interleaved.map(mapProperty));
}