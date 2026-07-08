import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function OrderConfirmationPage({ searchParams }: { searchParams: { order_id?: string } }) {
  const orderId = searchParams.order_id;

  if (!orderId) {
    redirect("/");
  }

  const supabase = createClient();
  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('razorpay_order_id', orderId)
    .single();

  return (
    <div className="min-h-screen flex flex-col bg-oat">
      <Header />
      
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-20 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-sage text-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm">
          ✓
        </div>
        
        <h1 className="font-fraunces text-4xl font-bold text-ink mb-2">Order Confirmed!</h1>
        <p className="text-ink/80 text-lg mb-8">
          Thank you for shopping with Wooly & Co. We're getting your handmade items ready.
        </p>

        <div className="bg-white p-6 md:p-8 rounded-3xl w-full border border-rose/30 shadow-sm text-left mb-8 relative overflow-hidden">
          {/* Decorative accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-raspberry to-rose"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-line pb-6 mb-6">
            <div>
              <p className="text-xs text-ink/60 uppercase tracking-widest mb-1">Order Number</p>
              <p className="font-mono text-xl font-bold text-ink">{orderId}</p>
            </div>
            {order && (
              <div>
                <p className="text-xs text-ink/60 uppercase tracking-widest mb-1">Total Paid</p>
                <p className="font-mono text-xl font-bold text-ink">₹{order.total_amount}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-ink/60 uppercase tracking-widest mb-1">Expected Delivery</p>
              <p className="font-bold text-ink">2-3 Days to 3 Weeks</p>
            </div>
          </div>

          {order && (
            <div className="mb-6">
              <h3 className="font-bold text-sm mb-2 text-ink">Shipping To:</h3>
              <p className="text-sm text-ink/80">
                {order.shipping_address.firstName} {order.shipping_address.lastName}<br />
                {order.shipping_address.addressLine}<br />
                {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.pincode}
              </p>
            </div>
          )}

          <div className="bg-oat/50 rounded-2xl p-5 border border-line">
            <p className="font-karla text-ink leading-relaxed mb-4">
              Your order is currently: <span className="font-bold text-raspberry-deep bg-rose/20 px-2 py-1 rounded-md">Being Crocheted 🧶</span><br/><br/>
              Your order is being processed. You'll receive an email update when it ships.
            </p>
            <div className="bg-white p-3 rounded-xl border border-rose/30 text-xs text-ink/70">
              <strong>Important Note:</strong> As a reminder, all sales are final. If your item arrives damaged in transit, you must <Link href="/contact" className="text-raspberry underline">contact us</Link> within 48 hours of delivery with photographic evidence to be eligible for a replacement.
            </div>
          </div>
        </div>

        <Link href="/" className="text-raspberry-deep font-bold hover:text-raspberry underline underline-offset-4">
          &larr; Return to Home
        </Link>
      </main>

      <Footer />
    </div>
  );
}
