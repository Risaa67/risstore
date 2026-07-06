import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count: productCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("seller_id", user?.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-on-surface mb-2">
        Selamat Datang, {user?.user_metadata?.name || user?.email}!
      </h1>
      <p className="text-on-surface-variant mb-8">
        Kelola produk dan pantau penjualan Anda.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-container-low">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">
                inventory_2
              </span>
            </div>
            <div>
              <p className="text-sm text-on-surface-variant">Total Produk</p>
              <p className="text-2xl font-bold text-on-surface">
                {productCount || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-container-low">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">
                trending_up
              </span>
            </div>
            <div>
              <p className="text-sm text-on-surface-variant">Penjualan</p>
              <p className="text-2xl font-bold text-on-surface">0</p>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-container-low">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-yellow-600">
                payments
              </span>
            </div>
            <div>
              <p className="text-sm text-on-surface-variant">Pendapatan</p>
              <p className="text-2xl font-bold text-on-surface">Rp 0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-container-low">
        <h2 className="text-lg font-semibold text-on-surface mb-4">
          Aksi Cepat
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard/products/new"
            className="bg-primary text-on-primary px-6 py-3 rounded-full text-sm font-medium hover:bg-primary-container transition-colors shadow-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Upload Produk Baru
          </Link>
          <Link
            href="/dashboard/products"
            className="bg-surface-container-low text-on-surface px-6 py-3 rounded-full text-sm font-medium hover:bg-surface-container transition-colors border border-outline-variant flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">
              inventory_2
            </span>
            Lihat Produk Saya
          </Link>
          <Link
            href="/marketplace"
            className="bg-surface-container-low text-on-surface px-6 py-3 rounded-full text-sm font-medium hover:bg-surface-container transition-colors border border-outline-variant flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">store</span>
            Marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}
