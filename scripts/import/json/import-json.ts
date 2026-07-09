import fs from "fs"
import path from "path"
import { prisma } from "../../../lib/prisma"
import { cleanProperty } from "../clean/clean-json"

export async function importRawJSON() {
  const filePath = path.join(process.cwd(), "data/properties/properties.json")

  const file = fs.readFileSync(filePath, "utf-8")
  const properties = JSON.parse(file)

  console.log(`Found ${properties.length} properties in JSON`)

  for (const raw of properties) {
    try {
      const data = cleanProperty(raw)

      await prisma.property.upsert({
        where: { propertyId: data.propertyId },

        update: {
          amenities: data.amenities,
          factsFeatures: data.factsFeatures,
          lot: data.lot,
          construction: data.construction,
          utilities: data.utilities,
          financial: data.financial,
          virtualTourUrl: data.virtualTourUrl,
          videoUrl: data.videoUrl,
          agentName: data.agentName,
          contactPhone: data.contactPhone,
          contactEmail: data.contactEmail,
        },

        create: {
          propertyId: data.propertyId,
          status: data.status,
          listingType: data.listingType,
          title: data.title,
          state: data.state,
          city: data.city,
          address: data.address,
          zipCode: data.zipCode,
          price: data.price,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          sqft: data.sqft,
          propertyType: data.propertyType,
          imageFolder: data.imageFolder,
          descriptionShort: data.descriptionShort,

          amenities: data.amenities,
          factsFeatures: data.factsFeatures,
          lot: data.lot,
          construction: data.construction,
          utilities: data.utilities,
          financial: data.financial,

          virtualTourUrl: data.virtualTourUrl,
          videoUrl: data.videoUrl,

          applicationEnabled: data.applicationEnabled,

          agentName: data.agentName,
          contactPhone: data.contactPhone,
          contactEmail: data.contactEmail,
        },
      })

      console.log(`✔ Enriched ${data.propertyId}`)
    } catch (err) {
      console.error(`✖ Failed JSON import: ${raw.propertyId}`, err)
    }
  }
}

importRawJSON()
  .then(() => {
    console.log("Import finished")
    process.exit(0)
  })
  .catch((err) => {
    console.error("Import failed:", err)
    process.exit(1)
  })