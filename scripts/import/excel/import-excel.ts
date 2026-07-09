import fs from "fs"
import path from "path"
import * as xlsx from "xlsx"
import { prisma } from "../../../lib/prisma"

function cleanPrice(value: any) {
    if (!value) return 0
    return Number(String(value).replace(/[$,]/g, ""))
}

function cleanNumber(value: any) {
    const n = Number(value)
    return Number.isFinite(n) ? n : 0
}

async function importExcel() {
    const filePath = path.join(process.cwd(), "data/excel/listings.xlsx")

    const workbook = xlsx.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]

    const rows = xlsx.utils.sheet_to_json(sheet)

    console.log(`Found ${rows.length} Excel rows`)

    for (const row of rows as any[]) {
        try {
            const propertyId = String(row.propertyId)

            await prisma.property.upsert({
                where: { propertyId },
                update: {
                    status: row.status,
                    listingType: String(row.listingType).toLowerCase(),

                    title: row.title,
                    price: cleanPrice(row.price) ?? 0,

                    state: row.state,
                    city: row.city,
                    address: row.address,
                    zipCode: row.zipCode ? String(row.zipCode) : null,

                    bedrooms: cleanNumber(row.bedrooms),
                    bathrooms: cleanNumber(row.bathrooms),
                    sqft: cleanNumber(row.sqft) || 0,

                    propertyType: row.propertyType,
                    imageFolder: row.imageFolder,
                    descriptionShort: row.descriptionShort,
                },

                create: {
                    propertyId,

                    status: row.status,
                    listingType: String(row.listingType).toLowerCase(),

                    title: row.title,
                    price: cleanPrice(row.price) ?? 0,

                    state: row.state,
                    city: row.city,
                    address: row.address,
                    zipCode: row.zipCode ? String(row.zipCode) : null,

                    bedrooms: cleanNumber(row.bedrooms),
                    bathrooms: cleanNumber(row.bathrooms),
                    sqft: cleanNumber(row.sqft) || 0,

                    propertyType: row.propertyType,
                    imageFolder: row.imageFolder,
                    descriptionShort: row.descriptionShort,

                    amenities: [],
                    factsFeatures: {},
                    lot: {},
                    construction: {},
                    utilities: {},
                    financial: {},
                },
            })

            console.log(`✔ Excel synced ${propertyId}`)
        } catch (err) {
            console.error(`✖ Excel import failed: ${row.propertyId}`, err)
        }
    }
}

importExcel()
    .then(() => {
        console.log("Excel import finished")
        process.exit(0)
    })
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })