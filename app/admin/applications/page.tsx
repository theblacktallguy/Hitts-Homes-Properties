import { prisma } from "@/lib/prisma";
import RequestDecisionForm from "@/components/admin/RequestDecisionForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Rental Applications | Hitts Homes Admin",
};

export default async function ApplicationsPage() {
  const applications = await prisma.rentalApplication.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A45D]">
          Admin Panel
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#0B1F3A] md:text-5xl">
          Rental Applications
        </h1>
        <p className="mt-4 text-sm leading-6 text-gray-600 md:text-base">
          Review and respond to incoming rental applications from prospective tenants.
        </p>
      </div>

      {/* Stats row */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: applications.length },
          { label: "Pending", value: applications.filter((a) => a.status === "pending").length },
          { label: "Approved", value: applications.filter((a) => a.status === "approved").length },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-[#0B1F3A]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Applications list */}
      <div className="space-y-4">
        {applications.map((item) => (
          <article
            key={item.id}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-2 md:flex-row">
              <div className="space-y-1">
                <h2 className="font-bold text-[#0B1F3A]">{item.fullName}</h2>
                <p className="text-sm text-gray-600">
                  {item.email} · {item.phone}
                </p>
                <p className="mt-2 text-sm font-semibold text-gray-800">
                  {item.propertyTitle} — {item.propertyAddress}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
                    Move-in: {item.desiredMoveInDate}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
                    Lease: {item.leaseTerm}
                  </span>
                  {item.applicationFee && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      Fee: ${item.applicationFee.toLocaleString()}
                    </span>
                  )}
                  {item.additionalFees && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      Deposit: ${item.additionalFees.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start gap-2 md:items-end">
                <span
                  className={`h-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${
                    item.status === "approved"
                      ? "bg-green-50 text-green-700"
                      : item.status === "denied"
                      ? "bg-red-50 text-red-700"
                      : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
                {item.decidedAt && (
                  <span className="text-xs text-gray-500">
                    Decided: {new Date(item.decidedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            <RequestDecisionForm id={item.id} kind="applications" status={item.status} />
          </article>
        ))}

        {!applications.length && (
          <p className="rounded-3xl bg-white p-8 text-center text-gray-500">
            No applications yet.
          </p>
        )}
      </div>
    </section>
  );
}