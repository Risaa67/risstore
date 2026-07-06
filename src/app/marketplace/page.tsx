import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/search-bar";
import { Product } from "@/types";

const CATEGORIES = [
  { name: "Semua", icon: "grid_view" },
  { name: "Ebook", icon: "menu_book" },
  { name: "Template", icon: "dashboard" },
  { name: "Desain", icon: "palette" },
  { name: "Preset", icon: "auto_awesome" },
  { name: "Source Code", icon: "code" },
  { name: "Kursus", icon: "school" },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("products").select("*");

  if (params.q) {
    query = query.ilike("title", `%${params.q}%`);
  }

  if (params.category && params.category !== "Semua") {
    query = query.eq("category", params.category);
  }

  const { data: products, error } = await query.order("created_at", {
    ascending: false,
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-surface-container-lowest shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-primary">
              RisStore
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-primary font-medium text-sm hover:bg-surface-container-low px-4 py-2 rounded-full transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="bg-primary text-on-primary text-sm font-medium px-6 py-2 rounded-full hover:bg-primary-container transition-colors shadow-sm"
            >
              Daftar
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-on-surface">Marketplace</h1>
          <p className="text-on-surface-variant mt-2">
            Temukan produk digital yang Anda butuhkan
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-2xl">
          <SearchBar />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={
                cat.name === "Semua"
                  ? "/marketplace"
                  : `/marketplace?category=${cat.name}`
              }
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                (!params.category && cat.name === "Semua") ||
                params.category === cat.name
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low border border-outline-variant"
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                {cat.icon}
              </span>
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-surface-container-low group cursor-pointer flex flex-col"
              >
                <div className="aspect-video relative overflow-hidden bg-surface-container-low">
                  {product.thumbnail ? (
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-on-surface-variant">
                      <span className="material-symbols-outlined text-4xl">
                        image
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {formatPrice(product.price)}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <span className="inline-block bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full text-[10px] font-medium mb-2 self-start">
                    {product.category}
                  </span>
                  <h3 className="font-medium text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-12 text-center border border-surface-container-low">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">
              search_off
            </span>
            <p className="text-on-surface-variant text-lg">
              {params.q
                ? `Tidak ada produk ditemukan untuk "${params.q}"`
                : "Belum ada produk tersedia"}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 text-center text-sm text-on-surface-variant">
          &copy; 2024 RisStore. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
