export function getPropertyImages(propertyId: string, max = 20) {
  const images: string[] = []

  for (let i = 1; i <= max; i++) {
    images.push(`/property-images/${propertyId}/${i}.webp`)
  }

  return images
}