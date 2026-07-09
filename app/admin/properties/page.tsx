import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin Properties | Hitts Homes",
};

type PropertiesPageProps = {
  searchParams: Promise<{
    q?: string;
    listingType?: string;
    status?: string;
  }>;
};

export default async function AdminPropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const params = await searchParams;
  const q = params.q?.trim() || "";
  const listingType = params.listingType || "all";
  const status = params.status || "all";

  const properties = await prisma.property.findMany({
    where: {
      AND: [
        listingType !== "all"
          ? {
              listingType,
            }
          : {},
        status !== "all"
          ? {
              status,
            }
          : {},
        q
          ? {
              OR: [
                {
                  propertyId: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  title: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  city: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
                {
                  state: {
                    contains: q,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},
      ],
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 100,
    select: {
      propertyId: true,
      title: true,
      city: true,
      state: true,
      price: true,
      listingType: true,
      status: true,
      bedrooms: true,
      bathrooms: true,
      updatedAt: true,
    },
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A45D]">
            Listings
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#0B1F3A] md:text-5xl">
            Manage Properties
          </h1>
        </div>

        <Link
          href="/admin/properties/new"
          className="inline-flex w-fit items-center justify-center rounded-2xl bg-[#0B1F3A] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#102b50]"
        >
          Add Property
        </Link>
      </div>

      <form className="mt-8 grid gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_180px_180px_auto]">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search ID, title, city, or state"
          className="rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#C8A45D]"
        />

        <select
          name="listingType"
          defaultValue={listingType}
          className="rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#C8A45D]"
        >
          <option value="all">All Types</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>

        <select
          name="status"
          defaultValue={status}
          className="rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#C8A45D]"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>

        <button
          type="submit"
          className="rounded-2xl bg-[#0B1F3A] px-5 py-3 text-sm font-bold text-white"
        >
          Filter
        </button>
      </form>

      <div className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-[0.12em] text-gray-500">
              <tr>
                <th className="px-5 py-4">Property</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Beds/Baths</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((property) => (
                <tr key={property.propertyId}>
                  <td className="px-5 py-4">
                    <p className="font-bold text-[#0B1F3A]">
                      {property.propertyId}
                    </p>
                    <p className="mt-1 max-w-xs truncate text-gray-600">
                      {property.title}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {property.city}, {property.state}
                  </td>
                  <td className="px-5 py-4 font-semibold text-gray-900">
                    ${property.price.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {property.bedrooms} / {property.bathrooms ?? "-"}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold capitalize text-gray-700">
                      {property.listingType}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold capitalize text-green-700">
                      {property.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/property/${property.propertyId}`}
                      className="text-sm font-bold text-[#0B1F3A] transition hover:text-[#C8A45D]"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {properties.length === 0 && (
          <div className="p-10 text-center text-sm text-gray-500">
            No properties found.
          </div>
        )}
      </div>
    </section>
  );
}
