import { Property } from "@/lib/searchTypes";

export function mapProperty(p: any): Property {
    return {
        id: p.id,
        propertyId: p.propertyId,
        imageFolder: p.imageFolder ?? p.propertyId,

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