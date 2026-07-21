import Link from "next/link";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <Link href="/admin" className="flex items-center gap-3">
            <img
              src="/logo/logobg.png"
              alt="Hitts Homes"
              className="h-10 w-10 object-contain"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C8A45D]">
                Hitts Homes & Properties
              </p>
              <p className="text-base font-bold text-[#0B1F3A]">
                Admin Panel
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-semibold text-gray-700 md:flex">
            <Link href="/admin" className="transition hover:text-[#0B1F3A]">
              Dashboard
            </Link>
            <Link
              href="/admin/properties"
              className="transition hover:text-[#0B1F3A]"
            >
              Properties
            </Link>
            <Link
              href="/admin/properties/new"
              className="transition hover:text-[#0B1F3A]"
            >
              Add Property
            </Link>
            <Link href="/admin/applications" className="transition hover:text-[#0B1F3A]">Applications</Link>
            <Link href="/admin/tours" className="transition hover:text-[#0B1F3A]">Tours</Link>
          </nav>

          <AdminLogoutButton />
        </div>
      </header>

      {children}
    </main>
  );
}
