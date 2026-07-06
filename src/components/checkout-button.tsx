"use client";

import { useState } from "react";
import { Product } from "@/types";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function CheckoutButton({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          productName: product.title,
          price: product.price,
        }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        setLoading(false);
        return;
      }

      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Terjadi kesalahan saat checkout");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-primary text-on-primary py-3.5 px-6 rounded-full font-medium hover:bg-primary-container transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <span className="material-symbols-outlined animate-spin text-lg">
            progress_activity
          </span>
          Memproses...
        </>
      ) : (
        <>
          <span className="material-symbols-outlined text-lg">shopping_cart</span>
          Beli Sekarang - {formatPrice(product.price)}
        </>
      )}
    </button>
  );
}
