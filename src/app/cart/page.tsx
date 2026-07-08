"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoBar from "@/components/PromoBar";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-oat">
      <PromoBar />
      <Header />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 md:py-12">
        <h1 className="font-fraunces text-3xl font-bold text-ink mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-rose/30">
            <div className="text-6xl mb-4">🧺</div>
            <h2 className="font-bold text-xl text-ink mb-2">Your cart is empty</h2>
            <p className="text-ink/60 mb-6">Looks like you haven't added anything yet.</p>
            <Link href="/shop" className="bg-raspberry text-white px-6 py-3 rounded-full font-bold hover:bg-raspberry-deep transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.colorName}`} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center text-3xl md:text-4xl flex-shrink-0" style={{ backgroundColor: item.colorHex }}>
                    {item.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-ink">{item.name}</h3>
                    <p className="text-xs text-ink/60 mb-2">Color: {item.colorName}</p>
                    <div className="font-bold text-raspberry-deep">₹{item.price}</div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <button 
                      onClick={() => removeFromCart(item.id, item.colorName)}
                      className="text-xs text-ink/40 hover:text-raspberry underline"
                    >
                      Remove
                    </button>
                    <div className="flex items-center bg-oat rounded-lg overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, item.colorName, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 hover:bg-rose/20 text-ink"
                      >-</button>
                      <span className="px-2 text-sm font-bold text-ink">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.colorName, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-rose/20 text-ink"
                      >+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-3xl border border-rose/30 shadow-sm h-fit">
              <h2 className="font-fraunces font-bold text-xl text-ink mb-6">Order Summary</h2>
              
              <div className="flex justify-between mb-3 text-ink/80 text-sm">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between mb-6 text-ink/80 text-sm pb-4 border-b border-line">
                <span>Shipping</span>
                <span>{totalPrice > 999 ? 'Free' : '₹99'}</span>
              </div>
              <div className="flex justify-between mb-8 font-bold text-lg text-ink">
                <span>Total</span>
                <span className="text-raspberry-deep">₹{totalPrice > 999 ? totalPrice : totalPrice + 99}</span>
              </div>

              <button 
                onClick={() => router.push('/checkout')}
                className="w-full bg-raspberry text-white font-bold py-4 rounded-xl shadow-md hover:bg-raspberry-deep transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout
              </button>
              <p className="text-center text-[10px] text-ink/40 mt-3 flex items-center justify-center gap-1">
                🔒 Secured by Razorpay. UPI, Cards & Netbanking accepted.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
