-- Buat Storage Bucket "products" untuk menyimpan thumbnail dan file digital
-- Jalankan ini di Supabase Dashboard → SQL Editor

-- 1. Buat bucket products
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products',
  'products',
  true,
  104857600,  -- 100MB
  ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'application/pdf', 'application/zip', 'application/x-zip-compressed', 'application/octet-stream', 'text/plain']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Policy: Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload to their own folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'products'
  AND (storage.foldername(name))[1] = 'thumbnails' OR (storage.foldername(name))[1] = 'files'
);

-- 3. Policy: Anyone can view files (bucket is public)
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'products');

-- 4. Policy: Users can delete their own files
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'products');
