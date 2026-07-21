"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PropertyPreview = {
  propertyId: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string | null;
  price: number;
  bedrooms: number;
  bathrooms: number | null;
  listingType: string;
};

type Props = { id: string; status: string; recipientEmail: string };

export default function PropertyRequestDecisionForm({ id, status, recipientEmail }: Props) {
  const router = useRouter();
  const [propertyIds, setPropertyIds] = useState(["", "", ""]);
  const [email, setEmail] = useState(recipientEmail);
  const [note, setNote] = useState("");
  const [previews, setPreviews] = useState<PropertyPreview[]>([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const cleanIds = propertyIds.map((propertyId) => propertyId.trim().toUpperCase()).filter(Boolean);

  function updatePropertyId(index: number, value: string) {
    setPropertyIds((current) => current.map((propertyId, currentIndex) => currentIndex === index ? value : propertyId));
    setPreviews([]);
  }

  async function lookupProperties(ids = cleanIds) {
    setMessage("");
    if (!ids.length) {
      setPreviews([]);
      setMessage("Enter at least one property ID to preview it.");
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/admin/property-requests/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to look up properties.");
      setPreviews(result.properties);
      setMessage(result.properties.length === ids.length ? "Property preview updated." : "Some IDs were not found or are not active.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to look up properties.");
    } finally {
      setSending(false);
    }
  }

  async function decide(decision: "found" | "not_found") {
    setSending(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/property-requests/${id}/decision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: decision,
          email,
          note,
          propertyId1: propertyIds[0],
          propertyId2: propertyIds[1],
          propertyId3: propertyIds[2],
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send the response.");
      setMessage("Response saved and email sent.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to send the response.");
    } finally {
      setSending(false);
    }
  }

  if (status !== "pending") return <span className="text-sm font-bold capitalize text-gray-700">{status.replace("_", " ")}</span>;

  return <div className="mt-5 space-y-3 border-t border-gray-200 pt-4">
    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Recipient email" className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-black placeholder:text-gray-500" />
    <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
      {propertyIds.map((propertyId, index) => <input key={index} value={propertyId} onChange={(event) => updatePropertyId(index, event.target.value)} onBlur={() => lookupProperties()} placeholder={`Property ID ${index + 1}`} className="rounded-xl border border-gray-200 px-3 py-2 text-sm text-black placeholder:text-gray-500" />)}
      <button type="button" disabled={sending} onClick={() => lookupProperties()} className="rounded-xl border border-[#0B1F3A] px-4 py-2 text-sm font-bold text-[#0B1F3A] disabled:opacity-60">Preview</button>
    </div>
    {previews.length > 0 && <div className="grid gap-3 md:grid-cols-3">{previews.map((property) => <div key={property.propertyId} className="rounded-xl bg-[#F8F7F4] p-3 text-sm text-gray-700"><p className="font-bold text-[#0B1F3A]">{property.title}</p><p className="mt-1">{property.address}, {property.city}, {property.state} {property.zipCode ?? ""}</p><p className="mt-1 font-semibold">${property.price.toLocaleString()} · {property.bedrooms} bd · {property.bathrooms} ba</p></div>)}</div>}
    <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Optional note for the client" rows={2} className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-black placeholder:text-gray-500" />
    <div className="flex flex-wrap gap-3"><button type="button" disabled={sending} onClick={() => decide("found")} className="rounded-xl bg-[#0B1F3A] px-4 py-2 text-sm font-bold text-white disabled:opacity-60">Send Matching Properties</button><button type="button" disabled={sending} onClick={() => decide("not_found")} className="rounded-xl border border-red-200 px-4 py-2 text-sm font-bold text-red-700 disabled:opacity-60">Send Not Available</button></div>
    {message && <p className="text-sm font-semibold text-[#0B1F3A]">{message}</p>}
  </div>;
}
