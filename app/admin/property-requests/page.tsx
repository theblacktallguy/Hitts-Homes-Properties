import Link from "next/link";
import PropertyRequestDecisionForm from "@/components/admin/PropertyRequestDecisionForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Property Requests | Hitts Homes Admin",
};

export default async function PropertyRequestsPage() {
  const requests = await prisma.propertyRequest.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  const pending = requests.filter((request) => request.status === "pending").length;
  const matched = requests.filter((request) => request.status === "found").length;

  return <section className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
    <div className="mb-8"><Link href="/admin" className="text-sm font-bold text-[#0B1F3A] transition hover:text-[#C8A45D]">← Back to Dashboard</Link><p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A45D]">Admin Panel</p><h1 className="mt-3 text-3xl font-bold text-[#0B1F3A] md:text-5xl">Property Requests</h1><p className="mt-4 text-sm leading-6 text-gray-600 md:text-base">Match client requests with available listings and email a professional response.</p></div>
    <div className="mb-8 grid grid-cols-3 gap-4">{[{ label: "Total", value: requests.length }, { label: "Pending", value: pending }, { label: "Matches Sent", value: matched }].map((stat) => <div key={stat.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-gray-500">{stat.label}</p><p className="mt-2 text-3xl font-bold text-[#0B1F3A]">{stat.value}</p></div>)}</div>
    <div className="space-y-4">{requests.map((item) => <article key={item.id} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"><div className="flex flex-col justify-between gap-3 md:flex-row"><div className="space-y-1"><h2 className="font-bold text-[#0B1F3A]">{item.fullName}</h2><p className="text-sm text-gray-600">{item.email} · {item.phone}</p><p className="mt-2 text-sm font-semibold text-gray-800">Looking to {item.lookingFor} a {item.propertyType} in {item.city}, {item.state}{item.neighborhood ? ` (${item.neighborhood})` : ""}</p><div className="flex flex-wrap gap-2 pt-1"><span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">{item.bedrooms} bd · {item.bathrooms} ba</span><span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">${item.minBudget}–${item.maxBudget}</span><span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">{item.timeline}</span>{item.openToSuggestions && <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">Open to suggestions</span>}</div>{item.amenities.length > 0 && <p className="pt-2 text-sm text-gray-600">Amenities: {item.amenities.join(", ")}</p>}{item.message && <p className="pt-1 text-sm leading-6 text-gray-600">“{item.message}”</p>}</div><div className="flex flex-col items-start gap-2 md:items-end"><span className={`h-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${item.status === "found" ? "bg-green-50 text-green-700" : item.status === "not_found" ? "bg-red-50 text-red-700" : "bg-yellow-50 text-yellow-700"}`}>{item.status.replace("_", " ")}</span><span className="text-xs text-gray-500">Received: {item.createdAt.toLocaleDateString()}</span></div></div><PropertyRequestDecisionForm id={item.id} status={item.status} recipientEmail={item.email} /></article>)}{!requests.length && <p className="rounded-3xl bg-white p-8 text-center text-gray-500">No property requests yet.</p>}</div>
  </section>;
}
