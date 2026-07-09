import NewPropertyForm from "@/components/admin/NewPropertyForm";

export const metadata = {
  title: "Add Property | Hitts Homes Admin",
};

export default function NewPropertyPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A45D]">
          New Listing
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#0B1F3A] md:text-5xl">
          Import Property JSON
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 md:text-base">
          Paste the same JSON structure used by your property database. The
          importer will validate the property ID, normalize rent or sale pricing,
          and save the full nested property details.
        </p>
      </div>

      <NewPropertyForm />
    </section>
  );
}
