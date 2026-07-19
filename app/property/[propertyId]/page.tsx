import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import SearchHeader from "@/components/layout/SearchHeader";
import PropertyImageCarousel from "@/components/property/PropertyImageCarousel";
import PropertyHeroHeader from "@/components/property/PropertyHeroHeader";
import PropertyFactsHighlights from "@/components/property/PropertyFactsHighlights";
import PropertyAboutActivity from "@/components/property/PropertyAboutActivity";
import PropertyFactsFeatures from "@/components/property/PropertyFactsFeatures";
import PropertyListedByCTA from "@/components/property/PropertyListedByCTA";
import SimilarProperties from "@/components/property/SimilarProperties";

type PageProps = {
  params: Promise<{
    propertyId: string;
  }>;
};

function getPropertyImageCount(imageFolder: string | null) {
  if (!imageFolder) return 1;

  const folderPath = path.join(
    process.cwd(),
    "public",
    "property-images",
    imageFolder
  );

  if (!fs.existsSync(folderPath)) return 1;

  const count = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".webp")).length;

  return count || 1;
}

export default async function PropertyPage({ params }: PageProps) {
  const { propertyId } = await params;

  const property = await prisma.property.findFirst({
    where: {
      propertyId: propertyId,
    },
  });

  if (!property) {
    notFound();
  }

  const imageCount = getPropertyImageCount(property.imageFolder);
  const propertyAddress = [
    property.address,
    `${property.city}, ${property.state}${property.zipCode ? ` ${property.zipCode}` : ""}`,
  ]
    .filter(Boolean)
    .join(", ");
  const propertyQuery = new URLSearchParams({
    propertyId: property.propertyId,
    title: property.title,
    address: propertyAddress,
  }).toString();
  const applyHref = `/apply?${propertyQuery}`;
  const requestTourHref = `/request-tour?${propertyQuery}`;

  const similarProperties = await prisma.property.findMany({
    where: {
      status: "active",
      listingType: property.listingType,
      state: property.state,
      propertyId: {
        not: property.propertyId,
      },
    },
    take: 6,
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <main className="bg-gray-50 min-h-screen">
      <SearchHeader />

      <div className="max-w-6xl mx-auto md:px-6">
        <PropertyImageCarousel
          imageFolder={property.imageFolder}
          listingType={property.listingType}
          total={imageCount}
        />

        <PropertyHeroHeader
          title={property.title}
          city={property.city}
          state={property.state}
          address={property.address}
          listingType={
            Array.isArray(property.listingType)
              ? property.listingType
              : [property.listingType]
          }
          rentPrice={property.listingType === "rent" ? property.price : null}
          salePrice={property.listingType === "sale" ? property.price : null}
          propertyId={property.propertyId}
          applyHref={applyHref}
          requestTourHref={requestTourHref}
        />

        <PropertyFactsHighlights
          property={property}
          applyHref={applyHref}
          requestTourHref={requestTourHref}
        />

        <PropertyAboutActivity property={property} />

        <PropertyFactsFeatures property={property} />

        <PropertyListedByCTA property={property} />

        <SimilarProperties properties={similarProperties} />

      </div>
    </main>
  );
}
