import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default async function ProductDetailPage({
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
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Thumbnail */}
            <div className="md:w-1/2">
              <div className="relative h-96 md:h-full min-h-[400px] bg-gray-200">
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
            </div>

            {/* Details */}
            <div className="md:w-1/2 p-8">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                {product.category}
              </span>

              <h1 className="mt-4 text-3xl font-bold text-gray-900">
                {product.title}
              </h1>

              <p className="mt-4 text-3xl font-bold text-indigo-600">
                {formatPrice(product.price)}
              </p>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Deskripsi
                </h2>
                <p className="mt-2 text-gray-600 whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Detail Produk
                </h2>
                <dl className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Kategori</dt>
                    <dd className="text-gray-900">{product.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Tanggal Upload</dt>
                    <dd className="text-gray-900">
                      {new Date(product.created_at).toLocaleDateString("id-ID")}
                    </dd>
                  </div>
                </dl>
              </div>

              <button className="mt-8 w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
