-- Supabase Schema for Wooly & Co.

-- 1. Create a table for Products
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  rating NUMERIC(2,1) DEFAULT 5.0,
  icon TEXT,
  image_url TEXT,
  bg TEXT DEFAULT 'bg-rose',
  cat TEXT NOT NULL,
  desc TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create a table for Colors associated with Products
CREATE TABLE IF NOT EXISTS product_colors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  hex TEXT NOT NULL
);

-- 3. Create Storage Bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to read images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'products');

-- Allow authenticated users (the owner) to upload/update/delete images
CREATE POLICY "Auth Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');
CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE USING (bucket_id = 'products' AND auth.role() = 'authenticated');
CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE USING (bucket_id = 'products' AND auth.role() = 'authenticated');

-- RLS Policies for Products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_colors ENABLE ROW LEVEL SECURITY;

-- Anyone can read products
CREATE POLICY "Allow public read-only access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access on product_colors" ON product_colors FOR SELECT USING (true);

-- Only authenticated users (owner) can modify products
CREATE POLICY "Allow authenticated full access on products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on product_colors" ON product_colors FOR ALL USING (auth.role() = 'authenticated');
