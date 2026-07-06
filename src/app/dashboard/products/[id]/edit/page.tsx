import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EditProductForm from "./edit-form";

export default async function EditProductPage({
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Produk</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <EditProductForm product={product} />
      </div>
    </div>
  );
}
