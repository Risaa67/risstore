import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">RisStore</h1>
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

      <main>
        <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Marketplace Produk Digital
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Beli dan jual produk digital seperti ebook, template, desain, dan
              masih banyak lagi.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/register"
                className="bg-indigo-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-indigo-700"
              >
                Mulai Berjualan
              </Link>
              <Link
                href="/login"
                className="bg-white text-gray-700 px-6 py-3 rounded-md text-base font-medium border border-gray-300 hover:bg-gray-50"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900">
                Produk Digital
              </h3>
              <p className="mt-2 text-gray-600">
                Temukan ribuan produk digital berkualitas dari kreator lokal.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900">
                Pembayaran Aman
              </h3>
              <p className="mt-2 text-gray-600">
                Transaksi aman dengan payment gateway terpercaya.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900">
                Download Instan
              </h3>
              <p className="mt-2 text-gray-600">
                Langsung download setelah pembayaran berhasil.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
