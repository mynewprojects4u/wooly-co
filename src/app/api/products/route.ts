import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { id, name, price, imageUrl } = await request.json();
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
    }

    const supabase = createClient();
    if (!supabase) throw new Error("Supabase client failed to initialize");

    const { error } = await supabase
      .from('products')
      .update({ name, price, "imageUrl": imageUrl })
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = createClient();
    if (!supabase) throw new Error("Supabase client failed to initialize");

    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to read products' }, { status: 500 });
  }
}
