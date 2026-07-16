import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard | Hitts Homes",
};

export default async function AdminDashboardPage() {
  const [totalProperties, activeProperties, rentProperties, saleProperties, recentProperties] =
    await Promise.all([
      prisma.property.count(),
      prisma.property.count({
        where: {
          status: "active",
        },
      }),
      prisma.property.count({
        where: {
          listingType: "rent",
        },
      }),
      prisma.property.count({
        where: {
          listingType: "sale",
        },
      }),
      prisma.property.findMany({
        take: 6,
        orderBy: {
          updatedAt: "desc",
        },
        select: {
          propertyId: true,
          title: true,
          city: true,
          state: true,
          listingType: true,
          status: true,
          updatedAt: true,
        },
      }),
    ]);

  const stats = [
    {
      label: "Total Properties",
      value: totalProperties,
    },
    {
      label: "Active Listings",
      value: activeProperties,
    },
    {
      label: "For Rent",
      value: rentProperties,
    },
    {
      label: "For Sale",
      value: saleProperties,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A45D]">
            Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#0B1F3A] md:text-5xl">
            Property Management
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 md:text-base">
            Review listing activity, manage active properties, and add new homes
            to the Hitts Homes website.
          </p>
        </div>

        <Link
          href="/admin/properties/new"
          className="inline-flex w-fit items-center justify-center rounded-2xl bg-[#0B1F3A] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#102b50]"
        >
          Add New Property
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold text-[#0B1F3A]">
              {stat.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 p-5">
          <div>
            <h2 className="text-lg font-bold text-[#0B1F3A]">
              Recently Updated
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Latest property records changed in the database.
            </p>
          </div>

          <Link
            href="/admin/properties"
            className="text-sm font-bold text-[#0B1F3A] transition hover:text-[#C8A45D]"
          >
            View all
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {recentProperties.map((property) => (
            <div
              key={property.propertyId}
              className="flex flex-col justify-between gap-3 p-5 md:flex-row md:items-center"
            >
              <div>
                <p className="text-sm font-bold text-[#0B1F3A]">
                  {property.propertyId} · {property.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {property.city}, {property.state}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold capitalize text-gray-700">
                  {property.listingType}
                </span>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold capitalize text-green-700">
                  {property.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
