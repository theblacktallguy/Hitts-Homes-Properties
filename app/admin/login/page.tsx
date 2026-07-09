import { Suspense } from "react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata = {
  title: "Admin Login | Hitts Homes",
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md flex-col justify-center">
        <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-xl md:p-8">
          <div className="flex items-center gap-3">
            <img
              src="/logo/logobg.png"
              alt="Hitts Homes"
              className="h-12 w-12 object-contain"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A45D]">
                Admin Panel
              </p>
              <h1 className="text-2xl font-bold text-[#0B1F3A]">
                Sign in
              </h1>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-gray-600">
            Access property uploads, listing management, and dashboard tools for
            Hitts Homes & Properties.
          </p>

          <Suspense fallback={null}>
            <AdminLoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
