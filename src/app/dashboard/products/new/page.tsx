import UploadProductForm from "@/components/upload-product-form";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Upload Produk Baru</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <UploadProductForm />
      </div>
    </div>
  );
}
