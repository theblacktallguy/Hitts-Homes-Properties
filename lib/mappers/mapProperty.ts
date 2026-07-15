import imageCounts from "@/data/property-image-counts.json";
import fs from "fs";
import path from "path";
import { Property } from "@/lib/searchTypes";

const runtimeImageCountCache = new Map<string, number>();

function getImageCount(imageFolder?: string | null) {
    if (!imageFolder) return 1;

    const staticCount = (imageCounts as Record<string, number>)[imageFolder];
    if (staticCount) return staticCount;

    const cachedCount = runtimeImageCountCache.get(imageFolder);
    if (cachedCount) return cachedCount;

    const folderPath = path.join(
        process.cwd(),
        "public",
        "property-images",
        imageFolder
    );

    if (!fs.existsSync(folderPath)) {
        runtimeImageCountCache.set(imageFolder, 1);
        return 1;
    }

    const runtimeCount = fs
        .readdirSync(folderPath)
        .filter((file) => file.toLowerCase().endsWith(".webp")).length || 1;

    runtimeImageCountCache.set(imageFolder, runtimeCount);
    return runtimeCount;
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
