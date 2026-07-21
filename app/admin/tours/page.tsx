import { prisma } from "@/lib/prisma";
import RequestDecisionForm from "@/components/admin/RequestDecisionForm";

export default async function ToursPage() {
  const tours = await prisma.tourRequest.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return <section className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12"><h1 className="text-3xl font-bold text-[#0B1F3A]">Tour Requests</h1><div className="mt-6 space-y-4">{tours.map((item) => <article key={item.id} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"><div className="flex flex-col justify-between gap-2 md:flex-row"><div><h2 className="font-bold text-[#0B1F3A]">{item.fullName}</h2><p className="text-sm text-gray-600">{item.email} · {item.phone}</p><p className="mt-2 text-sm font-semibold text-gray-800">{item.propertyTitle} — {item.propertyAddress}</p><p className="mt-1 text-sm text-gray-500">Requested: {item.preferredDate} at {item.preferredTime} · {item.tourType}</p></div><span className="h-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-bold capitalize text-gray-700">{item.status}</span></div><RequestDecisionForm id={item.id} kind="tours" status={item.status} /></article>)}{!tours.length && <p className="rounded-3xl bg-white p-8 text-center text-gray-500">No tour requests yet.</p>}</div></section>;
}
