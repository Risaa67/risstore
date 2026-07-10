import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CheckoutButton from "@/components/checkout-button";
import ReviewList from "@/components/review-list";
import ReviewForm from "@/components/review-form";

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

  // Fetch reviews
  const { data: reviewsData } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", id)
    .order("created_at", { ascending: false });

  const reviews = (reviewsData || []) as any[];
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / totalReviews
      : 0;

  // Check if current user has purchased this product
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let hasPurchased = false;
  let hasReviewed = false;

  if (user) {
    const { data: orderItem } = await supabase
      .from("order_items")
      .select("id, orders!inner(buyer_id, status)")
      .eq("product_id", id)
      .eq("orders.buyer_id", user.id)
      .eq("orders.status", "success")
      .single();

    hasPurchased = !!orderItem;

    const { data: existingReview } = await supabase
      .from("reviews")
      .select("id")
      .eq("product_id", id)
      .eq("user_id", user.id)
      .single();

    hasReviewed = !!existingReview;
  }

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
              href="/marketplace"
              className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium"
            >
              Marketplace
            </Link>
            <Link
              href="/login"
              className="text-primary font-medium text-sm hover:bg-surface-container-low px-4 py-2 rounded-full transition-colors"
            >
              Masuk
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Beranda
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <Link
            href="/marketplace"
            className="hover:text-primary transition-colors"
          >
            Marketplace
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-on-surface">{product.title}</span>
        </nav>

        <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-surface-container-low">
          <div className="md:flex">
            {/* Thumbnail */}
            <div className="md:w-1/2">
              <div className="relative h-96 md:h-full min-h-[400px] bg-surface-container-low">
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-on-surface-variant">
                    <span className="material-symbols-outlined text-6xl">
                      image
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="md:w-1/2 p-8 flex flex-col">
              <span className="inline-block w-fit bg-surface-container text-on-surface-variant px-3 py-1 rounded-full text-xs font-medium mb-4">
                {product.category}
              </span>

              <h1 className="text-2xl md:text-3xl font-bold text-on-surface">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mt-4">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {totalReviews > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <span className="material-symbols-outlined icon-fill text-yellow-400 text-sm">
                      star
                    </span>
                    <span className="text-on-surface">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-on-surface-variant">
                      ({totalReviews})
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-on-surface mb-2">
                  Deskripsi
                </h2>
                <p className="text-on-surface-variant leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 p-4 bg-surface-container-low rounded-xl">
                <h2 className="text-sm font-semibold text-on-surface mb-3">
                  Detail Produk
                </h2>
                <dl className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <dt className="text-on-surface-variant">Kategori</dt>
                    <dd className="text-on-surface font-medium">
                      {product.category}
                    </dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-on-surface-variant">Tanggal Upload</dt>
                    <dd className="text-on-surface font-medium">
                      {new Date(product.created_at).toLocaleDateString("id-ID")}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8">
                <CheckoutButton product={product} />
                <p className="text-xs text-on-surface-variant text-center mt-3">
                  Pembayaran aman via Midtrans
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-low p-6">
          <h2 className="text-xl font-bold text-on-surface mb-6">Review</h2>

          <ReviewForm
            productId={id}
            hasPurchased={hasPurchased}
            hasReviewed={hasReviewed}
          />

          <div className="mt-6">
            <ReviewList
              reviews={reviews || []}
              averageRating={averageRating}
              totalReviews={totalReviews}
            />
          </div>
        </div>
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
