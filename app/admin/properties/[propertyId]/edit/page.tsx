import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PropertyEditor from "@/components/admin/PropertyEditor";

export default async function EditPropertyPage({ params }: { params: Promise<{ propertyId: string }> }) {
  const { propertyId } = await params;
  const property = await prisma.property.findUnique({ where: { propertyId } });
  if (!property) notFound();
  return <PropertyEditor propertyId={property.propertyId} initialJson={JSON.stringify({ ...property, listingType: [property.listingType], rentPrice: property.listingType === "rent" ? property.price : null, salePrice: property.listingType === "sale" ? property.price : null }, null, 2)} />;
}
