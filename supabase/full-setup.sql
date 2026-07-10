-- ============================================
-- JALANKAN SEMUA INI DI SUPABASE SQL EDITOR
-- ============================================

-- 1. TABEL REVIEWS
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON reviews;
  DROP POLICY IF EXISTS "Users can insert their own reviews" ON reviews;
  DROP POLICY IF EXISTS "Users can update their own reviews" ON reviews;
  DROP POLICY IF EXISTS "Users can delete their own reviews" ON reviews;
END $$;

CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" ON reviews
  FOR DELETE USING (auth.uid() = user_id);


-- 2. STORAGE BUCKET PRODUCTS (skip kalau sudah ada)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products', 'products', true, 104857600,
  ARRAY['image/png','image/jpeg','image/webp','image/gif','application/pdf','application/zip','application/x-zip-compressed','application/octet-stream','text/plain']
)
ON CONFLICT (id) DO NOTHING;


-- 3. STORAGE POLICIES (drop lama dulu biar tidak konflik)
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can upload to their own folder" ON storage.objects;
  DROP POLICY IF EXISTS "Public read access" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete own files" ON storage.objects;
END $$;

-- Upload: authenticated users bisa upload ke bucket products
CREATE POLICY "Allow upload to products bucket"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

-- Read: semua orang bisa lihat file di bucket products
CREATE POLICY "Allow public read on products bucket"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'products');

-- Delete: authenticated users bisa hapus dari bucket products
CREATE POLICY "Allow delete on products bucket"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'products');
