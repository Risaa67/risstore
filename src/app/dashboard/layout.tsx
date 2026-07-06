import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-surface-container-lowest shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-primary">
              RisStore
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/marketplace"
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium"
              >
                Marketplace
              </Link>
              <Link
                href="/dashboard"
                className="text-primary font-semibold border-b-2 border-primary pb-1 text-sm"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/products"
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium"
              >
                Produk Saya
              </Link>
              <Link
                href="/dashboard/purchases"
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium"
              >
                Riwayat
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/products/new"
              className="bg-primary text-on-primary text-sm font-medium px-5 py-2 rounded-full hover:bg-primary-container transition-colors shadow-sm hidden md:flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Upload
            </Link>
            <span className="text-sm text-on-surface-variant hidden md:block">
              {user.email}
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
