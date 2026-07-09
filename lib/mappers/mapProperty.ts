import imageCounts from "@/data/property-image-counts.json";
import { Property } from "@/lib/searchTypes";

function getImageCount(imageFolder?: string | null) {
    if (!imageFolder) return 1;

    return (imageCounts as Record<string, number>)[imageFolder] || 1;
}

export function mapProperty(p: any): Property {
    const imageFolder = p.imageFolder ?? p.propertyId;

    return {
        id: p.id,
        propertyId: p.propertyId,
        imageFolder,
        imageCount: p.imageCount ?? getImageCount(imageFolder),

        title: p.title,

        price: p.price ?? p.salePrice ?? p.rentPrice ?? 0,

        sqft: p.sqft ?? null,

        beds: p.beds ?? p.bedrooms ?? 0,
        baths: p.baths ?? p.bathrooms ?? 0,

        type: p.propertyType ?? p.type ?? "apartment",

        status: p.listingType ?? p.status ?? "sale",

        address: p.address,
        city: p.city,
        state: p.state,

        images: p.images ?? [],
    };
}
