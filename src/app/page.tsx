"use client";

import Link from "next/link";
import { useState } from "react";

const CATEGORIES = [
  { name: "Template", icon: "dashboard", count: "240+" },
  { name: "Desain", icon: "palette", count: "180+" },
  { name: "E-Book", icon: "menu_book", count: "95+" },
  { name: "Source Code", icon: "code", count: "150+" },
  { name: "Preset", icon: "auto_awesome", count: "80+" },
  { name: "Kursus", icon: "school", count: "45+" },
];

const TRENDING_PRODUCTS = [
  {
    id: 1,
    title: "Nova - Modern SaaS UI Kit",
    category: "UI Kit",
    price: 49000,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Advanced Framer Techniques",
    category: "E-Book",
    price: 24000,
    rating: 5.0,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Complete React Developer Kit",
    category: "Source Code",
    price: 79000,
    rating: 4.8,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Minimal Portfolio Template",
    category: "Template",
    price: 35000,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=300&fit=crop",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-surface-container-lowest shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-primary">
              RisStore
            </Link>
            <div className="hidden md:flex relative items-center max-w-md w-full ml-4">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant">
                search
              </span>
              <input
                type="text"
                placeholder="Cari produk, template, desain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/marketplace"
              className="text-primary font-semibold border-b-2 border-primary pb-1 text-sm"
            >
              Marketplace
            </Link>
            <Link
              href="/marketplace?category=Ebook"
              className="text-on-surface-variant hover:text-primary transition-colors text-sm"
            >
              Kategori
            </Link>
          </nav>

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

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-12 flex flex-col gap-20">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-12 pt-8">
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-bold text-on-surface leading-tight">
              Temukan Produk Digital Premium untuk Kreator
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl">
              Tingkatkan proyek Anda dengan template, aset desain, dan ebook
              berkualitas dari kreator profesional terbaik.
            </p>

            <div className="md:hidden flex relative items-center w-full mt-4">
              <span className="material-symbols-outlined absolute left-4 text-on-surface-variant">
                search
              </span>
              <input
                type="text"
                placeholder="Cari produk..."
                className="w-full pl-12 pr-4 py-4 bg-surface border border-outline-variant rounded-full text-sm shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
            </div>

            <div className="flex gap-4 mt-4">
              <Link
                href="/marketplace"
                className="bg-primary text-on-primary px-8 py-3 rounded-full text-sm font-medium hover:bg-primary-container transition-colors shadow-sm hover:shadow-md"
              >
                Jelajahi Sekarang
              </Link>
              <Link
                href="/register"
                className="bg-surface text-on-surface border border-outline-variant px-8 py-3 rounded-full text-sm font-medium hover:bg-surface-container-low transition-colors"
              >
                Mulai Berjualan
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full h-[400px] rounded-2xl overflow-hidden shadow-lg relative bg-surface-container-low">
            <div
              className="bg-cover bg-center w-full h-full absolute inset-0"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=600&fit=crop')",
              }}
            />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-surface/80 backdrop-blur-md border border-white/20 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined icon-fill">
                  rocket_launch
                </span>
              </div>
              <div>
                <p className="font-medium text-on-surface text-sm">
                  Produk Baru Setiap Hari
                </p>
                <p className="text-xs text-on-surface-variant">
                  Bergabung dengan 5000+ kreator
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="flex flex-col gap-8">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-on-surface">
                Jelajahi Kategori
              </h2>
              <p className="text-on-surface-variant mt-2">
                Temukan apa yang Anda butuhkan untuk proyek berikutnya.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="text-primary hover:underline text-sm font-medium hidden md:block"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/marketplace?category=${cat.name}`}
                className="bg-surface-container-lowest rounded-xl p-6 flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-all border border-surface-container-low group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined">{cat.icon}</span>
                </div>
                <div className="text-center">
                  <p className="font-medium text-on-surface text-sm">{cat.name}</p>
                  <p className="text-xs text-on-surface-variant">{cat.count} produk</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Products */}
        <section className="flex flex-col gap-8">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-on-surface">
                Produk Trending
              </h2>
              <p className="text-on-surface-variant mt-2">
                Aset terbaik yang diminati komunitas kami.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="text-primary hover:underline text-sm font-medium"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRENDING_PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-surface-container-low group cursor-pointer flex flex-col"
              >
                <div className="aspect-video relative overflow-hidden bg-surface-container-low">
                  <div
                    className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {formatPrice(product.price)}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <span className="inline-block bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full text-[10px] font-medium mb-2 self-start">
                    {product.category}
                  </span>
                  <h3 className="font-medium text-on-surface mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1 text-sm">
                      <span className="material-symbols-outlined icon-fill text-yellow-400 text-sm">
                        star
                      </span>
                      <span className="font-medium text-on-surface">
                        {product.rating}
                      </span>
                      <span className="text-on-surface-variant text-xs">
                        ({product.reviews})
                      </span>
                    </div>
                    <button className="text-primary hover:bg-primary/10 p-1.5 rounded-full transition-colors">
                      <span className="material-symbols-outlined text-lg">
                        bookmark_border
                      </span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-primary-container rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Mulai Berjualan di RisStore
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Upload produk digital Anda dan mulai menghasilkan. Tanpa biaya
            pendaftaran, kompetitif untuk kreator.
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-primary px-8 py-3 rounded-full font-medium hover:bg-surface-container-low transition-colors shadow-sm"
          >
            Daftar Sekarang
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold text-primary mb-4">RisStore</h3>
              <p className="text-sm text-on-surface-variant">
                Marketplace produk digital untuk kreator Indonesia.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-on-surface mb-4">Produk</h4>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li>
                  <Link href="/marketplace" className="hover:text-primary transition-colors">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-primary transition-colors">
                    Mulai Berjualan
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-on-surface mb-4">Bantuan</h4>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Hubungi Kami
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-on-surface mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Syarat & Ketentuan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Kebijakan Privasi
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-outline-variant mt-8 pt-8 text-center text-sm text-on-surface-variant">
            &copy; 2024 RisStore. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
