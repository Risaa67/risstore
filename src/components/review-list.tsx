import { Review } from "@/types";

interface ReviewListProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`material-symbols-outlined text-sm ${
            star <= rating ? "text-yellow-400 icon-fill" : "text-gray-300"
          }`}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function ReviewList({
  reviews,
  averageRating,
  totalReviews,
}: ReviewListProps) {
  if (totalReviews === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-on-surface-variant">Belum ada review</p>
      </div>
    );
  }

  return (
    <div>
      {/* Rating Summary */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-surface-container-low rounded-xl">
        <div className="text-center">
          <div className="text-3xl font-bold text-on-surface">
            {averageRating.toFixed(1)}
          </div>
          <StarRating rating={Math.round(averageRating)} />
          <div className="text-xs text-on-surface-variant mt-1">
            {totalReviews} review
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-outline-variant pb-4 last:border-0"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-container rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-on-primary-container">
                    U
                  </span>
                </div>
                <span className="text-sm font-medium text-on-surface">
                  Pembeli
                </span>
              </div>
              <StarRating rating={review.rating} />
            </div>
            {review.comment && (
              <p className="text-sm text-on-surface-variant ml-10">
                {review.comment}
              </p>
            )}
            <p className="text-xs text-on-surface-variant ml-10 mt-2">
              {new Date(review.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
