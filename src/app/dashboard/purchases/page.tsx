import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    success: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${
        colors[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status === "success"
        ? "Berhasil"
        : status === "pending"
        ? "Pending"
        : "Gagal"}
    </span>
  );
}

export default async function PurchasesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*, products(*))")
    .eq("buyer_id", user?.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                RisStore
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/marketplace"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Marketplace
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Riwayat Pembelian
        </h1>

        {orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order #{order.id.slice(0, 8)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                {order.order_items?.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-t pt-4"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {item.products?.title || "Produk"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.products?.category}
                      </p>
                    </div>
                    <p className="font-medium text-indigo-600">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                ))}

                <div className="border-t mt-4 pt-4 flex justify-between">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-bold text-indigo-600">
                    {formatPrice(order.total)}
                  </span>
                </div>

                {order.status === "success" && (
                  <div className="mt-4">
                    <Link
                      href={`/dashboard/purchases/${order.id}/download`}
                      className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                      Download Produk →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">Belum ada pembelian</p>
            <Link
              href="/marketplace"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              Mulai Belanja
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
