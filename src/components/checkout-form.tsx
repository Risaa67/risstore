"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Product } from "@/types";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function CheckoutForm({ product }: { product: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          buyerEmail: user?.email || "",
          buyerName: user?.user_metadata?.name || "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Gagal memproses pembayaran");
        setLoading(false);
        return;
      }

      // Redirect to Midtrans payment page
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      }
    } catch (err) {
      setError("Terjadi kesalahan: " + (err as Error).message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Ringkasan Pesanan</h2>

      <div className="border-b pb-4 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Produk</span>
          <span className="font-medium">{product.title}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-gray-600">Kategori</span>
          <span>{product.category}</span>
        </div>
      </div>

      <div className="flex justify-between text-lg font-bold mb-6">
        <span>Total</span>
        <span className="text-indigo-600">{formatPrice(product.price)}</span>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-4">
          {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Memproses..." : "Bayar Sekarang"}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Pembayaran diproses oleh Midtrans (aman & terpercaya)
      </p>
    </div>
  );
}
