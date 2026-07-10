import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { product_id, rating, comment } = body;

  if (!product_id || !rating) {
    return NextResponse.json(
      { error: "Product ID dan rating wajib diisi" },
      { status: 400 }
    );
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Rating harus antara 1-5" },
      { status: 400 }
    );
  }

  // Check if user has purchased this product
  const { data: orderItem } = await supabase
    .from("order_items")
    .select("id, orders!inner(buyer_id, status)")
    .eq("product_id", product_id)
    .eq("orders.buyer_id", user.id)
    .eq("orders.status", "success")
    .single();

  if (!orderItem) {
    return NextResponse.json(
      { error: "Anda harus membeli produk ini terlebih dahulu" },
      { status: 403 }
    );
  }

  // Check if user already reviewed this product
  const { data: existingReview } = await supabase
    .from("reviews")
    .select("id")
    .eq("product_id", product_id)
    .eq("user_id", user.id)
    .single();

  if (existingReview) {
    return NextResponse.json(
      { error: "Anda sudah memberikan review untuk produk ini" },
      { status: 409 }
    );
  }

  // Insert review
  const { data, error } = await supabase
    .from("reviews")
    .insert({
      product_id,
      user_id: user.id,
      rating,
      comment: comment || "",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const product_id = searchParams.get("product_id");

  if (!product_id) {
    return NextResponse.json(
      { error: "Product ID wajib diisi" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select("*, user:auth.users(email, user_metadata)")
    .eq("product_id", product_id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
