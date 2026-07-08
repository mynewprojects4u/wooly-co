-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_email TEXT NOT NULL,
    total_amount NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'processing',
    shipping_address JSONB NOT NULL,
    items JSONB NOT NULL,
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own orders
CREATE POLICY "Users can view their own orders" ON public.orders
    FOR SELECT
    USING (auth.jwt() ->> 'email' = user_email);

-- Allow authenticated users to insert their own orders
CREATE POLICY "Users can insert their own orders" ON public.orders
    FOR INSERT
    WITH CHECK (auth.jwt() ->> 'email' = user_email);

-- Allow the owner to view all orders
CREATE POLICY "Owner can view all orders" ON public.orders
    FOR SELECT
    USING (auth.jwt() ->> 'email' = 'suhanisharma180801@gmail.com');

-- Allow the owner to update any order
CREATE POLICY "Owner can update all orders" ON public.orders
    FOR UPDATE
    USING (auth.jwt() ->> 'email' = 'suhanisharma180801@gmail.com');
