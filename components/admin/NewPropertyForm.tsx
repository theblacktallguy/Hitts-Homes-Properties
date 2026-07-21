"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type PreviewProperty = {
  propertyId: string;
  status?: string;
  listingType?: string | string[];
  title?: string;
  state?: string;
  city?: string;
  address?: string;
  rentPrice?: number | null;
  salePrice?: number | null;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  propertyType?: string;
  imageFolder?: string;
};

type IdStatus = "idle" | "checking" | "available" | "used";

const sampleJson = `{
  "propertyId": "KO290",
  "status": "active",
  "listingType": ["rent"],
  "title": "Sample Property - Dallas, TX",
  "state": "Texas",
  "city": "Dallas",
  "address": "123 Sample St",
  "zipCode": "75201",
  "rentPrice": 1800,
  "salePrice": null,
  "bedrooms": 2,
  "bathrooms": 2,
  "sqft": 1100,
  "propertyType": "Apartment",
  "petFriendly": true,
  "descriptionShort": "Paste the full property JSON here using this exact structure.",
  "imageFolder": "KO290",
  "amenities": [],
  "factsFeatures": {},
  "lot": {},
  "construction": {},
  "utilities": {},
  "financial": {},
  "virtualTourUrl": "",
  "videoUrl": "",
  "applicationEnabled": true,
  "agentName": "Agent David Hitt",
  "contactPhone": "(248) 636-0376",
  "contactEmail": "agentdavidhitt@gmail.com"
}`;

function buildAiPrompt(propertyId: string) {
  return `You are a real estate property JSON formatter for Hitts Homes & Properties.

Your task is to convert the property write-up I provide into ONE valid JSON object that exactly matches the template below.

Output rules:
- Return ONLY the JSON object.
- Do not include explanations.
- Do not include markdown.
- Do not wrap the response in \`\`\`json.
- Do not add comments.
- Do not include a trailing comma after the final closing brace.
- The result must be valid JSON that can be pasted directly into an admin import form.

Critical formatting rules:
- propertyId is "${propertyId}".
- imageFolder must always be exactly "${propertyId}".
- listingType must always be an array: ["rent"] or ["sale"].
- status should be "active" unless I say otherwise.
- State must be the full state name, not abbreviation. Example: use "New Mexico", not "NM".
- For rental properties:
  - listingType must be ["rent"].
  - rentPrice must be the starting monthly rent as a number.
  - salePrice must be null.
  - applicationEnabled must be true.
- For sale properties:
  - listingType must be ["sale"].
  - salePrice must be the sale price as a number.
  - rentPrice must be null.
  - applicationEnabled must be false.
- Top-level bedrooms, bathrooms, and sqft must always be numbers.
- If bedrooms or bathrooms are shown as a range, use the lowest available number.
- If bathrooms are not mentioned but the property is a home or apartment, use 1.
- If sqft is unknown, use 0.
- Other unknown optional values can be null, "", [], or {} depending on the field.
- contactEmail must be exactly this plain string: "agentdavidhitt@gmail.com".
- Never format contactEmail as a link.
- Never output this: "[agentdavidhitt@gmail.com](mailto:agentdavidhitt@gmail.com)".
- agentName must be exactly: "Agent David Hitt".
- contactPhone must be exactly: "(248) 636-0376".
- Lease terms must be readable. Example: use "12 months", not "12".

Data interpretation rules:
- If the property has a range like "1-2 beds", use the lowest bedroom count for top-level bedrooms unless I say otherwise.
- If rent has a range like "$1,280 - $1,790", use the lowest rent as rentPrice.
- If square footage is not provided, use 0.
- descriptionShort should be one polished sentence.
- amenities should include the important building amenities, unit features, pet features, parking, laundry, and community features.
- factsFeatures.interior should summarize bedroom/bathroom, flooring, kitchen, laundry, cooling, ceiling fans, smart home, and closets when known.
- factsFeatures.interior.bathrooms and factsFeatures.interior.fullBathrooms should match top-level bathrooms when no better detail is provided.
- factsFeatures.appliances should list appliances only.
- factsFeatures.parking should summarize covered parking, garage, off-street parking, or parking lot details.
- lot.features should include community setting, neighborhood, outdoor features, nearby lifestyle details, and special location notes.
- construction.homeType should match propertyType.
- utilities should include internet, electric, gas, water, and sewer only when mentioned.
- financial should include leaseTerms, monthlyPetRent, and oneTimePetFee when available.
- virtualTourUrl should be "" unless an actual URL is provided.
- videoUrl should be "" unless an actual URL is provided.

Use this exact JSON template:

{
  "propertyId": "${propertyId}",
  "status": "active",
  "listingType": ["rent"],
  "title": "",
  "state": "",
  "city": "",
  "address": "",
  "zipCode": "",
  "rentPrice": null,
  "salePrice": null,
  "bedrooms": 0,
  "bathrooms": 0,
  "sqft": 0,
  "propertyType": "",
  "yearBuilt": null,
  "garage": false,
  "petFriendly": false,
  "descriptionShort": "",
  "imageFolder": "${propertyId}",
  "amenities": [],
  "factsFeatures": {
    "interior": {
      "bedrooms": 0,
      "bathrooms": 0,
      "fullBathrooms": 0,
      "flooring": [],
      "kitchen": [],
      "laundry": [],
      "cooling": null,
      "ceilingFans": false,
      "smartHome": false,
      "walkInClosets": false
    },
    "basement": {
      "finished": false,
      "type": null,
      "areaSqft": 0
    },
    "heating": null,
    "appliances": [],
    "parking": {
      "totalSpaces": null,
      "garageSpaces": 0,
      "uncoveredSpaces": null
    },
    "levels": null,
    "stories": null
  },
  "lot": {
    "sizeAcres": null,
    "dimensions": null,
    "features": []
  },
  "construction": {
    "homeType": "",
    "style": null,
    "materials": {}
  },
  "utilities": {
    "internet": null,
    "electric": null,
    "gas": null,
    "water": null,
    "sewer": null
  },
  "financial": {
    "leaseTerms": [],
    "monthlyPetRent": {
      "dog": null,
      "cat": null
    },
    "oneTimePetFee": {
      "dog": null,
      "cat": null
    }
  },
  "virtualTourUrl": "",
  "videoUrl": "",
  "applicationEnabled": true,
  "agentName": "Agent David Hitt",
  "contactPhone": "(248) 636-0376",
  "contactEmail": "agentdavidhitt@gmail.com"
}

Now convert the property write-up below into this exact JSON structure.

PROPERTY ID:
${propertyId}

PROPERTY WRITE-UP:
PASTE_PROPERTY_WRITE_UP_HERE`;
}

function getListingType(value: PreviewProperty["listingType"]) {
  const firstValue = Array.isArray(value) ? value[0] : value;
  return String(firstValue || "").toLowerCase();
}

function formatPrice(property: PreviewProperty) {
  const listingType = getListingType(property.listingType);
  const price = listingType === "rent" ? property.rentPrice : property.salePrice;

  if (!price) return "Not provided";

  return listingType === "rent"
    ? `$${Number(price).toLocaleString()}/mo`
    : `$${Number(price).toLocaleString()}`;
}

export default function NewPropertyForm() {
  const router = useRouter();
  const [propertyIdInput, setPropertyIdInput] = useState("");
  const [checkedPropertyId, setCheckedPropertyId] = useState("");
  const [idStatus, setIdStatus] = useState<IdStatus>("idle");
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState("");
  const [successPropertyId, setSuccessPropertyId] = useState("");
  const [promptCopied, setPromptCopied] = useState(false);
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageUploadError, setImageUploadError] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const normalizedInputId = propertyIdInput.trim().toUpperCase();

  const parsed = useMemo(() => {
    if (!jsonText.trim()) {
      return {
        data: null,
        error: "",
      };
    }

    try {
      const data = JSON.parse(jsonText) as PreviewProperty;

      if (!data || typeof data !== "object" || Array.isArray(data)) {
        throw new Error("Paste one property JSON object, not an array.");
      }

      return {
        data,
        error: "",
      };
    } catch (parseError) {
      return {
        data: null,
        error:
          parseError instanceof Error
            ? parseError.message
            : "Invalid JSON format",
      };
    }
  }, [jsonText]);

  const jsonPropertyId = String(parsed.data?.propertyId || "").trim().toUpperCase();
  const listingType = getListingType(parsed.data?.listingType);
  const canPasteJson = idStatus === "available" && checkedPropertyId;
  const aiPrompt = canPasteJson ? buildAiPrompt(checkedPropertyId) : "";
  const idMismatch =
    Boolean(parsed.data) &&
    Boolean(jsonPropertyId) &&
    Boolean(checkedPropertyId) &&
    jsonPropertyId !== checkedPropertyId;

  async function checkPropertyId() {
    setError("");
    setSuccessPropertyId("");
    setPromptCopied(false);

    if (normalizedInputId.length < 3) {
      setIdStatus("idle");
      setCheckedPropertyId("");
      setError("Enter a property ID with at least 3 characters.");
      return;
    }

    setIsCheckingId(true);
    setIdStatus("checking");

    try {
      const response = await fetch(
        `/api/admin/properties/check-id?propertyId=${encodeURIComponent(normalizedInputId)}`
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to check property ID");
      }

      setCheckedPropertyId(normalizedInputId);
      setIdStatus(result.exists ? "used" : "available");
    } catch (checkError) {
      setIdStatus("idle");
      setCheckedPropertyId("");
      setError(
        checkError instanceof Error
          ? checkError.message
          : "Unable to check property ID"
      );
    } finally {
      setIsCheckingId(false);
    }
  }

  async function copyAiPrompt() {
    if (!aiPrompt) return;

    await navigator.clipboard.writeText(aiPrompt);
    setPromptCopied(true);

    window.setTimeout(() => {
      setPromptCopied(false);
    }, 2500);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccessPropertyId("");

    if (!canPasteJson) {
      setError("Check that the property ID is available before importing JSON.");
      return;
    }

    if (parsed.error || !parsed.data) {
      setError("Paste valid property JSON before importing.");
      return;
    }

    if (idMismatch) {
      setError(
        `The checked property ID is ${checkedPropertyId}, but the JSON contains ${jsonPropertyId}. They must match.`
      );
      return;
    }

    if (!jsonPropertyId) {
      setError("The pasted JSON must include propertyId.");
      return;
    }

    if (selectedImages.length === 0) {
      setError("Select at least one property image before importing.");
      return;
    }

    setIsSubmitting(true);

    try {
      await uploadImages(jsonPropertyId);

      const response = await fetch("/api/admin/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to import property");
      }

      setSuccessPropertyId(jsonPropertyId);
      setJsonText("");
      setSelectedImages([]);
      if (imageInputRef.current) imageInputRef.current.value = "";
      setPropertyIdInput("");
      setCheckedPropertyId("");
      setIdStatus("idle");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to import property"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function selectImages(files: FileList | null) {
    const images = Array.from(files || []).sort((first, second) =>
      first.name.localeCompare(second.name, undefined, { numeric: true })
    );

    if (images.length > 20) {
      setSelectedImages([]);
      setImageUploadError("Select up to 20 images at once.");
      return;
    }

    if (images.some((image) => !image.type.startsWith("image/"))) {
      setSelectedImages([]);
      setImageUploadError("Select image files only.");
      return;
    }

    setSelectedImages(images);
    setImageUploadError("");
  }

  async function uploadImages(propertyId: string) {
    if (selectedImages.length === 0) {
      throw new Error("Select at least one property image.");
    }

    setImageUploadError("");

    try {
      for (const [index, image] of selectedImages.entries()) {
        const signatureResponse = await fetch(
          "/api/admin/properties/images/signature",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              propertyId,
              imageIndex: index + 1,
            }),
          }
        );
        const signature = await signatureResponse.json();

        if (!signatureResponse.ok) {
          throw new Error(signature.error || "Unable to prepare image upload");
        }

        const uploadData = new FormData();
        uploadData.append("file", image);
        uploadData.append("api_key", signature.apiKey);
        uploadData.append("timestamp", String(signature.timestamp));
        uploadData.append("signature", signature.signature);
        uploadData.append("public_id", signature.publicId);
        uploadData.append("overwrite", "true");
        uploadData.append("format", "webp");

        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
          {
            method: "POST",
            body: uploadData,
          }
        );
        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadResult.error?.message || "Unable to upload image");
        }

      }

    } catch (uploadError) {
      const message = uploadError instanceof Error ? uploadError.message : "Unable to upload property images";
      setImageUploadError(message);
      throw new Error(message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {successPropertyId && (
        <section className="rounded-3xl border border-green-200 bg-green-50 p-5 shadow-sm md:p-7">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
            Property Imported
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#0B1F3A]">
            {successPropertyId} was added successfully
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-green-800">
            Your required property images were uploaded to Cloudinary before this listing was imported.
          </p>

          <div className="mt-5 flex flex-col gap-3 md:flex-row">
            <button
              type="button"
              onClick={() => router.push("/admin/properties")}
              className="rounded-2xl bg-[#0B1F3A] px-5 py-3 text-sm font-bold text-white"
            >
              View Properties
            </button>
            <button
              type="button"
              onClick={() => {
                setSuccessPropertyId("");
                setSelectedImages([]);
                setImageUploadError("");
              }}
              className="rounded-2xl border border-green-300 bg-white px-5 py-3 text-sm font-bold text-green-800"
            >
              Import Another
            </button>
          </div>
        </section>
      )}

      <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
        <div>
          <h2 className="text-xl font-bold text-[#0B1F3A]">
            1. Check Property ID
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Enter the property ID first. If it is available, the JSON importer
            will unlock below.
          </p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            value={propertyIdInput}
            onChange={(event) => {
              setPropertyIdInput(event.target.value.toUpperCase());
              setCheckedPropertyId("");
              setIdStatus("idle");
              setError("");
            }}
            placeholder="Example: KO290"
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-[#C8A45D] focus:ring-4 focus:ring-[#C8A45D]/10"
          />
          <button
            type="button"
            onClick={checkPropertyId}
            disabled={isCheckingId}
            className="rounded-2xl bg-[#0B1F3A] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#102b50] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCheckingId ? "Checking..." : "Check ID"}
          </button>
        </div>

        {idStatus === "available" && (
          <p className="mt-3 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            Property ID {checkedPropertyId} is available. You can paste the JSON now.
          </p>
        )}

        {idStatus === "used" && (
          <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            Property ID {checkedPropertyId} is already in use. Choose another ID.
          </p>
        )}
      </section>

      {canPasteJson && (
        <section className="rounded-3xl border border-[#C8A45D]/40 bg-[#FFF9EC] p-5 shadow-sm md:p-7">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <h2 className="text-xl font-bold text-[#0B1F3A]">
                2. Generate JSON With AI
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[#6F5200]">
                Copy this prompt, paste it into AI, then add the property write-up.
                It already includes property ID {checkedPropertyId}.
              </p>
            </div>

            <button
              type="button"
              onClick={copyAiPrompt}
              className="w-fit rounded-2xl bg-[#0B1F3A] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#102b50]"
            >
              {promptCopied ? "Prompt Copied" : "Copy AI Prompt"}
            </button>
          </div>

          <textarea
            value={aiPrompt}
            readOnly
            rows={10}
            className="mt-5 w-full rounded-2xl border border-[#C8A45D]/40 bg-white px-4 py-4 font-mono text-xs leading-5 text-gray-800 outline-none"
          />
        </section>
      )}

      {canPasteJson && (
        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <h2 className="text-xl font-bold text-[#0B1F3A]">
                3. Paste Property JSON
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                The JSON propertyId must match {checkedPropertyId}. The importer
                will convert listingType arrays, use rentPrice or salePrice as
                the database price, and preserve nested property details.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setJsonText(sampleJson.replaceAll("KO290", checkedPropertyId))
              }
              className="w-fit rounded-2xl border border-gray-300 px-4 py-2 text-sm font-bold text-gray-900 transition hover:bg-gray-100"
            >
              Use Sample
            </button>
          </div>

          <textarea
            value={jsonText}
            onChange={(event) => {
              setError("");
              setJsonText(event.target.value);
            }}
            rows={22}
            spellCheck={false}
            placeholder="Paste property JSON here..."
            className="mt-6 w-full rounded-2xl border border-gray-200 bg-gray-950 px-4 py-4 font-mono text-sm leading-6 text-white outline-none transition focus:border-[#C8A45D] focus:ring-4 focus:ring-[#C8A45D]/10"
          />

          <div className="mt-4 rounded-2xl bg-[#FFF7E4] px-4 py-3 text-sm font-medium leading-6 text-[#6F5200]">
            Do not include a trailing comma after the final closing brace. The
            Cloudinary image folder should be exactly:
            <span className="font-bold">
              {" "}hitts-homes/properties/{checkedPropertyId}
            </span>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-base font-bold text-[#0B1F3A]">4. Required Property Images</h3>
            <p className="mt-1 text-sm text-gray-500">Select up to 20 images. They upload to Cloudinary automatically when you import this property.</p>
            <input ref={imageInputRef} type="file" accept="image/*" multiple onChange={(event) => selectImages(event.target.files)} className="sr-only" />
            <button type="button" onClick={() => imageInputRef.current?.click()} disabled={isSubmitting} className="mt-4 rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-[#0B1F3A] transition hover:bg-gray-50 disabled:opacity-60">Select Property Images</button>
            {selectedImages.length > 0 && <p className="mt-3 text-sm font-semibold text-green-700">{selectedImages.length} image{selectedImages.length === 1 ? "" : "s"} selected: {selectedImages.slice(0, 3).map((image) => image.name).join(", ")}{selectedImages.length > 3 ? "…" : ""}</p>}
            {imageUploadError && <p className="mt-3 text-sm font-semibold text-red-700">{imageUploadError}</p>}
          </div>
        </section>
      )}

      {parsed.error && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          Invalid JSON: {parsed.error}
        </p>
      )}

      {idMismatch && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          Property ID mismatch: you checked {checkedPropertyId}, but the JSON
          contains {jsonPropertyId}.
        </p>
      )}

      {canPasteJson && parsed.data && !parsed.error && (
        <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
          <div>
              <h2 className="text-xl font-bold text-[#0B1F3A]">
              5. Import Preview
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Confirm this is the property you want to add.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                Property
              </p>
              <p className="mt-2 font-bold text-[#0B1F3A]">
                {jsonPropertyId || "Missing ID"}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {parsed.data.title || "Missing title"}
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                Location
              </p>
              <p className="mt-2 font-bold text-[#0B1F3A]">
                {parsed.data.city || "City"}, {parsed.data.state || "State"}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {parsed.data.address || "Missing address"}
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                Listing
              </p>
              <p className="mt-2 font-bold capitalize text-[#0B1F3A]">
                {listingType || "Missing type"} · {formatPrice(parsed.data)}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {parsed.data.bedrooms ?? "-"} beds · {parsed.data.bathrooms ?? "-"} baths ·{" "}
                {parsed.data.sqft ?? "-"} sqft
              </p>
            </div>
          </div>
        </section>
      )}

      {error && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-end">
        <button
          type="button"
          onClick={() => router.push("/admin/properties")}
          className="rounded-2xl border border-gray-300 px-6 py-3 text-sm font-bold text-gray-900 transition hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            isSubmitting ||
            !canPasteJson ||
            !parsed.data ||
            Boolean(parsed.error) ||
            idMismatch ||
            selectedImages.length === 0
          }
          className="rounded-2xl bg-[#0B1F3A] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#102b50] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Uploading Images & Importing..." : "Import Property"}
        </button>
      </div>
    </form>
  );
}
