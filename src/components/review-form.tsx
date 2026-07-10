"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ReviewFormProps {
  productId: string;
  hasPurchased: boolean;
  hasReviewed: boolean;
}

export default function ReviewForm({
  productId,
  hasPurchased,
  hasReviewed,
}: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (!hasPurchased) {
    return (
      <div className="bg-surface-container-low rounded-xl p-4 text-center">
        <p className="text-on-surface-variant text-sm">
          Beli produk ini untuk bisa memberikan review
        </p>
      </div>
    );
  }

  if (hasReviewed) {
    return (
      <div className="bg-surface-container-low rounded-xl p-4 text-center">
        <p className="text-on-surface-variant text-sm">
          Anda sudah memberikan review untuk produk ini
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, rating, comment }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal mengirim review");
      }

      setComment("");
      setRating(5);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface-container-low rounded-xl p-4">
      <h3 className="text-sm font-semibold text-on-surface mb-3">
        Tulis Review
      </h3>

      <div className="mb-4">
        <label className="block text-sm text-on-surface-variant mb-2">
          Rating
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-1"
            >
              <span
                className={`material-symbols-outlined text-2xl ${
                  star <= rating
                    ? "text-yellow-400 icon-fill"
                    : "text-gray-300"
                }`}
              >
                star
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-on-surface-variant mb-2">
          Komentar
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Tulis pendapat Anda tentang produk ini..."
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-on-primary px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isSubmitting ? "Mengirim..." : "Kirim Review"}
      </button>
    </form>
  );
}
