import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, items, total_amount, shipping_address } = body;

    if (!razorpay_order_id || !items || !shipping_address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createClient();
    
    // Get the authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    
    // Fallback for guest checkout
    const userEmail = user?.email || 'guest@example.com';

    const { error } = await supabase
      .from('orders')
      .insert([
        {
          razorpay_order_id,
          razorpay_payment_id,
          user_email: userEmail,
          total_amount,
          shipping_address,
          items,
          status: 'processing'
        }
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: 'Failed to save order to database' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Save order error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
