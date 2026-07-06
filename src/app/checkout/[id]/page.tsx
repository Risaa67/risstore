import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CheckoutForm from "@/components/checkout-form";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
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
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
              {product.thumbnail ? (
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{product.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{product.category}</p>
            <p className="text-2xl font-bold text-indigo-600 mt-2">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Checkout Form */}
          <CheckoutForm product={product} />
        </div>
      </main>
    </div>
  );
}
