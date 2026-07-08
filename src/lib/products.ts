import { createClient } from './supabase/client';

export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  icon: string;
  imageUrl?: string;
  bg: string;
  cat: string;
  colors: { name: string; hex: string }[];
  desc: string;
};

export async function getAllProducts(): Promise<Product[]> {
  const supabase = createClient();
  if (!supabase) return [];
  
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error("Error fetching products from Supabase:", error);
    return [];
  }
  
  return data as Product[];
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const supabase = createClient();
  if (!supabase) return undefined;
  
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) {
    console.error("Error fetching product from Supabase:", error);
    return undefined;
  }
  
  return data as Product;
}

export async function getProductsByCategory(cat: string): Promise<Product[]> {
  if (cat === 'all') return await getAllProducts();
  
  const supabase = createClient();
  if (!supabase) return [];
  
  const { data, error } = await supabase.from('products').select('*').eq('cat', cat);
  if (error) {
    console.error("Error fetching products by category from Supabase:", error);
    return [];
  }
  
  return data as Product[];
}
