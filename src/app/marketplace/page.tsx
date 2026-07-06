import { createClient } from "@/lib/supabase/server";
import ProductCard from "@/components/product-card";
import SearchBar from "@/components/search-bar";
import Link from "next/link";
import { Product } from "@/types";

const CATEGORIES = [
  "Semua",
  "Ebook",
  "Template",
  "Desain",
  "Preset",
  "Source Code",
  "Kursus",
];

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("products").select("*");

  // Search filter
  if (params.q) {
    query = query.ilike("title", `%${params.q}%`);
  }

  // Category filter
  if (params.category && params.category !== "Semua") {
    query = query.eq("category", params.category);
  }

  const { data: products, error } = await query.order("created_at", {
    ascending: false,
  });

  if (error) {
    console.error("Error fetching products:", error);
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
                href="/login"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="mt-2 text-gray-600">
            Temukan produk digital yang Anda butuhkan
          </p>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-8">
          <SearchBar />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={
                category === "Semua"
                  ? "/marketplace"
                  : `/marketplace?category=${category}`
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                (!params.category && category === "Semua") ||
                params.category === category
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {category}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {params.q
                ? `Tidak ada produk ditemukan untuk "${params.q}"`
                : "Belum ada produk tersedia"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
