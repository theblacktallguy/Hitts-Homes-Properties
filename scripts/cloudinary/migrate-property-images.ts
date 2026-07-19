import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";
import path from "path";

const propertyImagesDirectory = path.join(
  process.cwd(),
  "public",
  "property-images"
);
const shouldUpload = process.argv.includes("--upload");
const uploadConcurrency = 5;

function getRequiredEnvironmentVariable(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} must be set before running this script.`);
  }

  return value;
}

async function getPropertyImageFiles() {
  const folders = await fs.readdir(propertyImagesDirectory, {
    withFileTypes: true,
  });
  const propertyImages: Array<{ folder: string; file: string }> = [];

  for (const folder of folders) {
    if (!folder.isDirectory()) continue;

    const folderPath = path.join(propertyImagesDirectory, folder.name);
    const files = await fs.readdir(folderPath, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile() && file.name.toLowerCase().endsWith(".webp")) {
        propertyImages.push({ folder: folder.name, file: file.name });
      }
    }
  }

  return propertyImages.sort((first, second) =>
    `${first.folder}/${first.file}`.localeCompare(
      `${second.folder}/${second.file}`,
      undefined,
      { numeric: true }
    )
  );
}

async function getUploadedPublicIds() {
  const publicIds = new Set<string>();
  let nextCursor: string | undefined;

  do {
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      prefix: "hitts-homes/properties/",
      max_results: 500,
      next_cursor: nextCursor,
    });

    result.resources.forEach((resource: { public_id: string }) =>
      publicIds.add(resource.public_id)
    );
    nextCursor = result.next_cursor;
  } while (nextCursor);

  return publicIds;
}

async function main() {
  const propertyImages = await getPropertyImageFiles();

  console.log(`Found ${propertyImages.length} property images.`);

  if (!shouldUpload) {
    console.log("Dry run complete. Re-run with --upload to start uploading.");
    return;
  }

  cloudinary.config({
    cloud_name: getRequiredEnvironmentVariable("CLOUDINARY_CLOUD_NAME"),
    api_key: getRequiredEnvironmentVariable("CLOUDINARY_API_KEY"),
    api_secret: getRequiredEnvironmentVariable("CLOUDINARY_API_SECRET"),
  });

  const uploadedPublicIds = await getUploadedPublicIds();
  const imagesToUpload = propertyImages.filter((image) => {
    const publicId = `hitts-homes/properties/${image.folder}/${path.parse(image.file).name}`;
    return !uploadedPublicIds.has(publicId);
  });

  console.log(
    `${uploadedPublicIds.size} already uploaded; ${imagesToUpload.length} remaining.`
  );

  let uploaded = 0;
  let skipped = 0;

  async function uploadImage(image: { folder: string; file: string }) {
    const sourcePath = path.join(propertyImagesDirectory, image.folder, image.file);
    const publicId = `hitts-homes/properties/${image.folder}/${path.parse(image.file).name}`;

    try {
      await cloudinary.uploader.upload(sourcePath, {
        public_id: publicId,
        overwrite: false,
        resource_type: "image",
        unique_filename: false,
        use_filename: false,
      });
      return "uploaded";
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "http_code" in error &&
        error.http_code === 409
      ) {
        return "skipped";
      } else {
        throw error;
      }
    }
  }

  for (let start = 0; start < imagesToUpload.length; start += uploadConcurrency) {
    const batch = imagesToUpload.slice(start, start + uploadConcurrency);
    const results = await Promise.all(batch.map(uploadImage));

    uploaded += results.filter((result) => result === "uploaded").length;
    skipped += results.filter((result) => result === "skipped").length;

    const processed = start + batch.length;

    if (processed % 25 === 0 || processed === imagesToUpload.length) {
      console.log(
        `Processed ${processed}/${imagesToUpload.length} images (${uploaded} uploaded, ${skipped} already present).`
      );
    }
  }

  console.log(`Migration complete: ${uploaded} uploaded, ${skipped} already present.`);
}

main().catch((error) => {
  console.error("Cloudinary migration failed:", error);
  process.exit(1);
});
