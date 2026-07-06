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
        <div className="bg-error-container text-on-error-container px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              Nama Produk *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-on-surface"
              placeholder="Masukkan nama produk"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              Deskripsi *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-on-surface resize-none"
              placeholder="Jelaskan produk Anda"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">
                Harga (Rp) *
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-on-surface"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-1.5">
                Kategori *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-on-surface"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              Thumbnail Produk
            </label>
            <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 text-center hover:border-primary transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                className="hidden"
                id="thumbnail"
              />
              <label htmlFor="thumbnail" className="cursor-pointer">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">
                  cloud_upload
                </span>
                <p className="text-sm text-on-surface-variant">
                  {thumbnail ? thumbnail.name : "Klik untuk upload thumbnail"}
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  PNG, JPG, atau WebP (maks 5MB)
                </p>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-on-surface mb-1.5">
              File Digital *
            </label>
            <div className="border-2 border-dashed border-outline-variant rounded-xl p-6 text-center hover:border-primary transition-colors">
              <input
                type="file"
                onChange={(e) => setDigitalFile(e.target.files?.[0] || null)}
                required
                className="hidden"
                id="digitalFile"
              />
              <label htmlFor="digitalFile" className="cursor-pointer">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">
                  folder_upload
                </span>
                <p className="text-sm text-on-surface-variant">
                  {digitalFile ? digitalFile.name : "Klik untuk upload file digital"}
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  PDF, ZIP, atau file lainnya (maks 100MB)
                </p>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-on-primary px-8 py-3 rounded-full text-sm font-medium hover:bg-primary-container transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined animate-spin text-lg">
                progress_activity
              </span>
              Uploading...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">upload</span>
              Upload Produk
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-surface-container-low text-on-surface px-6 py-3 rounded-full text-sm font-medium hover:bg-surface-container transition-colors border border-outline-variant"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
