const CLOUDINARY_BASE_URL = "https://res.cloudinary.com";

export function getLocalPropertyImageUrl(
  imageFolder: string,
  imageIndex = 1
) {
  return `/property-images/${imageFolder}/${imageIndex}.webp`;
}

export function getPropertyImageUrl(
  imageFolder: string,
  imageIndex = 1
) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    return getLocalPropertyImageUrl(imageFolder, imageIndex);
  }

  return `${CLOUDINARY_BASE_URL}/${cloudName}/image/upload/f_auto,q_auto/hitts-homes/properties/${encodeURIComponent(imageFolder)}/${imageIndex}`;
}
