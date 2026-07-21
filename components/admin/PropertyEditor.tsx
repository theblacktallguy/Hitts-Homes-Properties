"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function PropertyEditor({ propertyId, initialJson }: { propertyId: string; initialJson: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [jsonText, setJsonText] = useState(initialJson);
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function uploadImages() {
    for (const [index, file] of files.entries()) {
      const signatureResponse = await fetch("/api/admin/properties/images/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId, imageIndex: index + 1 }),
      });
      const signature = await signatureResponse.json();
      if (!signatureResponse.ok) throw new Error(signature.error || "Unable to prepare image upload");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signature.apiKey);
      formData.append("timestamp", String(signature.timestamp));
      formData.append("signature", signature.signature);
      formData.append("public_id", signature.publicId);
      formData.append("overwrite", "true");
      formData.append("format", "webp");
      const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`, { method: "POST", body: formData });
      if (!uploadResponse.ok) throw new Error("Unable to upload property image");
    }
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const data = JSON.parse(jsonText);
      const response = await fetch(`/api/admin/properties/${encodeURIComponent(propertyId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to update property");
      if (files.length) await uploadImages();
      setFiles([]);
      if (inputRef.current) inputRef.current.value = "";
      setMessage("Property saved successfully.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save property");
    } finally {
      setSaving(false);
    }
  }

  return <section className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
    <h1 className="text-3xl font-bold text-[#0B1F3A]">Edit {propertyId}</h1>
    <p className="mt-2 text-sm text-gray-600">Update the property JSON and optionally replace or add up to 20 images.</p>
    <textarea value={jsonText} onChange={(event) => setJsonText(event.target.value)} rows={28} spellCheck={false} className="mt-6 w-full rounded-3xl border border-gray-200 bg-gray-950 p-5 font-mono text-sm leading-6 text-white outline-none focus:border-[#C8A45D]" />
    <div className="mt-5 rounded-3xl border border-gray-200 bg-white p-5">
      <p className="font-bold text-[#0B1F3A]">Property Images</p>
      <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" onChange={(event) => setFiles(Array.from(event.target.files || []).slice(0, 20))} />
      <button type="button" onClick={() => inputRef.current?.click()} className="mt-3 rounded-2xl border border-gray-300 px-5 py-3 text-sm font-bold text-[#0B1F3A]">Select Images</button>
      {files.length > 0 && <p className="mt-3 text-sm font-semibold text-green-700">{files.length} image{files.length === 1 ? "" : "s"} ready to upload.</p>}
    </div>
    {message && <p className="mt-4 rounded-2xl bg-gray-100 px-4 py-3 text-sm font-semibold text-[#0B1F3A]">{message}</p>}
    <div className="mt-6 flex gap-3"><button type="button" onClick={save} disabled={saving} className="rounded-2xl bg-[#0B1F3A] px-6 py-3 text-sm font-bold text-white disabled:opacity-60">{saving ? "Saving..." : "Save Property"}</button><button type="button" onClick={() => router.push("/admin/properties")} className="rounded-2xl border border-gray-300 px-6 py-3 text-sm font-bold text-gray-800">Back</button></div>
  </section>;
}
