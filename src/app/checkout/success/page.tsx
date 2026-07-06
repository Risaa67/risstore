import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let order = null;
  if (params.order_id) {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("id", params.order_id)
      .single();
    order = data;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Pembayaran Berhasil!
        </h1>
        <p className="text-gray-600 mb-6">
          Terima kasih telah melakukan pembelian. Pesanan Anda sedang diproses.
        </p>
        {order && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Order ID:</span> {order.id}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Total:</span>{" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(order.total)}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Status:</span>{" "}
              <span className="capitalize">{order.status}</span>
            </p>
          </div>
        )}
        <div className="flex gap-4 justify-center">
          <Link
            href="/marketplace"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            Lanjut Belanja
          </Link>
          <Link
            href="/dashboard/purchases"
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
          >
            Lihat Riwayat
          </Link>
        </div>
      </div>
    </div>
  );
}
