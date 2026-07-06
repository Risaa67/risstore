import { NextRequest, NextResponse } from "next/server";
import snap from "@/lib/midtrans";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, productName, price } = body;

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Anda harus login terlebih dahulu" },
        { status: 401 }
      );
    }

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        buyer_id: user.id,
        total: price,
        status: "pending",
      })
      .select()
      .single();

    if (orderError) {
      return NextResponse.json(
        { error: "Gagal membuat order: " + orderError.message },
        { status: 500 }
      );
    }

    // Create order item
    await supabase.from("order_items").insert({
      order_id: order.id,
      product_id: productId,
      price: price,
    });

    // Create Midtrans transaction
    const parameter = {
      transaction_details: {
        order_id: order.id,
        gross_amount: price,
      },
      customer_details: {
        first_name: user.user_metadata?.name || user.email?.split("@")[0],
        email: user.email,
      },
      item_details: [
        {
          id: productId,
          name: productName,
          price: price,
          quantity: 1,
        },
      ],
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
      order_id: order.id,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: "Gagal membuat pembayaran" },
      { status: 500 }
    );
  }
}
