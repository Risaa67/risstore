"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

const CATEGORIES = [
  "Ebook",
  "Template",
  "Desain",
  "Preset",
  "Source Code",
  "Kursus",
];

export default function UploadProductForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [digitalFile, setDigitalFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Anda harus login terlebih dahulu");
        setLoading(false);
        return;
      }

      let thumbnailUrl = "";
      let fileUrl = "";

      // Upload thumbnail
      if (thumbnail) {
        const thumbnailExt = thumbnail.name.split(".").pop();
        const thumbnailPath = `thumbnails/${user.id}/${Date.now()}.${thumbnailExt}`;

        const { error: thumbnailError } = await supabase.storage
          .from("products")
          .upload(thumbnailPath, thumbnail);

        if (thumbnailError) {
          setError("Gagal upload thumbnail: " + thumbnailError.message);
          setLoading(false);
          return;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("products").getPublicUrl(thumbnailPath);

        thumbnailUrl = publicUrl;
      }

      // Upload digital file
      if (digitalFile) {
        const fileExt = digitalFile.name.split(".").pop();
        const filePath = `files/${user.id}/${Date.now()}.${fileExt}`;

        const { error: fileError } = await supabase.storage
          .from("products")
          .upload(filePath, digitalFile);

        if (fileError) {
          setError("Gagal upload file: " + fileError.message);
          setLoading(false);
          return;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("products").getPublicUrl(filePath);

        fileUrl = publicUrl;
      }

      // Save product to database
      const { error: insertError } = await supabase.from("products").insert({
        seller_id: user.id,
        title,
        description,
        price: parseInt(price),
        category,
        thumbnail: thumbnailUrl,
        file_url: fileUrl,
      });

      if (insertError) {
        setError("Gagal simpan produk: " + insertError.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard/products");
      router.refresh();
    } catch (err) {
      setError("Terjadi kesalahan: " + (err as Error).message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Nama Produk *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Masukkan nama produk"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Deskripsi *
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Jelaskan produk Anda"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Harga (Rp) *
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="0"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Kategori *
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="thumbnail"
          className="block text-sm font-medium text-gray-700"
        >
          Thumbnail Produk
        </label>
        <input
          type="file"
          id="thumbnail"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <p className="mt-1 text-xs text-gray-500">PNG, JPG, atau WebP (maks 5MB)</p>
      </div>

      <div>
        <label
          htmlFor="digitalFile"
          className="block text-sm font-medium text-gray-700"
        >
          File Digital *
        </label>
        <input
          type="file"
          id="digitalFile"
          onChange={(e) => setDigitalFile(e.target.files?.[0] || null)}
          required
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <p className="mt-1 text-xs text-gray-500">
          PDF, ZIP, atau file lainnya (maks 100MB)
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Uploading..." : "Upload Produk"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
