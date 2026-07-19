import "server-only";
import { v2 as cloudinary } from "cloudinary";

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return false;
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  return true;
}

export async function createPropertyImageUploadSignature(
  propertyId: string,
  imageIndex: number
) {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  if (!configureCloudinary() || !apiSecret || !apiKey || !cloudName) {
    throw new Error("Cloudinary is not configured");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const publicId = `hitts-homes/properties/${propertyId}/${imageIndex}`;
  const parameters = {
    format: "webp",
    overwrite: true,
    public_id: publicId,
    timestamp,
  };

  return {
    apiKey,
    cloudName,
    publicId,
    signature: cloudinary.utils.api_sign_request(parameters, apiSecret),
    timestamp,
  };
}

export async function getCloudinaryPropertyImageCount(imageFolder: string) {
  if (!configureCloudinary()) return 0;

  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      prefix: `hitts-homes/properties/${imageFolder}/`,
      max_results: 100,
    });

    return result.resources.length;
  } catch (error) {
    console.error("Cloudinary image count lookup failed:", error);
    return 0;
  }
}
