import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import imageCounts from "@/data/property-image-counts.json";

import { prisma } from "@/lib/prisma";
import { getCloudinaryPropertyImageCount } from "@/lib/cloudinary";
import { getPropertyImageUrl } from "@/lib/propertyImages";
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { propertyId } = await params;
  const property = await prisma.property.findUnique({
    where: { propertyId },
    select: {
      propertyId: true,
      title: true,
      descriptionShort: true,
      address: true,
      city: true,
      state: true,
      zipCode: true,
      imageFolder: true,
    },
  });

  if (!property) {
    return { title: "Property Not Found", robots: { index: false, follow: false } };
  }

  const address = [
    property.address,
    `${property.city}, ${property.state}${property.zipCode ? ` ${property.zipCode}` : ""}`,
  ].join(", ");
  const title = `${property.title} in ${property.city}, ${property.state}`;
  const image = getPropertyImageUrl(property.imageFolder || property.propertyId);

  return {
    title,
    description: property.descriptionShort,
    alternates: { canonical: `/property/${property.propertyId}` },
    openGraph: {
      title,
      description: property.descriptionShort,
      url: `/property/${property.propertyId}`,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: `${property.title} — ${address}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: property.descriptionShort,
      images: [image],
    },
  };
}

async function getPropertyImageCount(imageFolder: string | null) {
  if (!imageFolder) return 1;

  const recordedCount = (imageCounts as Record<string, number>)[imageFolder];
  if (recordedCount) return recordedCount;

  const folderPath = path.join(
    process.cwd(),
    "public",
    "property-images",
    imageFolder
  );

  if (!fs.existsSync(folderPath)) {
    return (await getCloudinaryPropertyImageCount(imageFolder)) || 1;
  }

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

  const imageCount = await getPropertyImageCount(property.imageFolder);
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
