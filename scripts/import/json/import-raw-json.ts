import fs from "fs"
import { prisma } from "../../../lib/prisma"
import { cleanProperty } from "../clean/clean-json"

function extractObjects(rawText: string) {
  const matches = rawText.match(/\{[\s\S]*?\}(?=\s*\{|$)/g)
  if (!matches) return []

  return matches.map((item) => {
    try {
      // fix smart quotes first
      const fixed = item
        .replace(/“|”/g, '"')
        .replace(/‘|’/g, "'")

      return JSON.parse(fixed)
    } catch (err) {
      console.log("Failed to parse object")
      return null
    }
  }).filter(Boolean)
}

export async function importRawJSON() {
  const file = fs.readFileSync("data/properties.json", "utf-8")

  const properties = extractObjects(file)

  console.log(`Found ${properties.length} properties`)

  for (const raw of properties) {
    try {
      const data = cleanProperty(raw)

      await prisma.property.upsert({
        where: { propertyId: data.propertyId },
        update: data,
        create: data,
      })

      console.log(`✔ Imported ${data.propertyId}`)
    } catch (err) {
      console.error("Failed:", raw.propertyId, err)
    }
  }
}