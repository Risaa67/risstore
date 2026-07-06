import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get order with items and products
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*, order_items(*, products(*))")
    .eq("id", id)
    .eq("buyer_id", user.id)
    .single();

  if (orderError || !order) {
    notFound();
  }

  if (order.status !== "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Pembayaran belum selesai
          </h1>
          <p className="text-gray-600 mb-6">
            Silakan selesaikan pembayaran terlebih dahulu.
          </p>
          <Link
            href="/dashboard/purchases"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            Lihat Riwayat Pembelian
          </Link>
        </div>
      </div>
    );
  }

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
                href="/dashboard/purchases"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Riwayat Pembelian
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-50 border-b border-green-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Download Produk
                </h1>
                <p className="text-sm text-gray-600">
                  Order #{order.id.slice(0, 8)}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {order.order_items?.map((item: any) => {
              const product = item.products;
              if (!product) return null;

              return (
                <div
                  key={item.id}
                  className="border rounded-lg p-4"
                >
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-semibold text-gray-900">
                        {product.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {product.category}
                      </p>
                      <p className="text-indigo-600 font-medium mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    {product.file_url ? (
                      <a
                        href={product.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download File
                      </a>
                    ) : (
                      <p className="text-sm text-gray-500">
                        File tidak tersedia
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Pembayaran</span>
              <span className="text-lg font-bold text-indigo-600">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/marketplace"
            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
          >
            ← Lanjut Belanja
          </Link>
        </div>
      </main>
    </div>
  );
}
