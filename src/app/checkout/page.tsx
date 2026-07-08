"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import Script from "next/script";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  
  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = totalPrice > 999 ? 0 : 99;
  const tax = totalPrice * 0.18;
  const finalTotal = totalPrice + shipping + tax;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const checkbox = document.getElementById('policy-check') as HTMLInputElement;
    if (!checkbox?.checked) {
      setErrorMsg("Please acknowledge the no-returns policy to complete your order.");
      return;
    }
    
    setErrorMsg("");
    setIsProcessing(true);
    
    try {
      const res = await fetch('/api/create-order', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(finalTotal) })
      });
      
      const order = await res.json();
      
      if (!res.ok) {
        throw new Error(order.error || "Failed to create order");
      }
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: order.amount,
        currency: "INR",
        name: "Wooly & Co.",
        description: "Handmade crochet order",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            const saveRes = await fetch('/api/save-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id || order.id,
                razorpay_payment_id: response.razorpay_payment_id || 'mock_payment_id',
                items,
                total_amount: Math.round(finalTotal),
                shipping_address: {
                  firstName, lastName, addressLine, city, pincode, state, phone
                }
              })
            });
            if (saveRes.ok) {
              clearCart();
              window.location.href = `/order-confirmation?order_id=${response.razorpay_order_id || order.id}`;
            } else {
              setErrorMsg("Payment succeeded, but order saving failed. Please contact support.");
            }
          } catch(e) {
            setErrorMsg("Payment succeeded, but order saving failed. Please contact support.");
          }
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          contact: phone,
        },
        theme: {
          color: "#B7395A",
        },
      };

      // @ts-ignore
      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded");
      }
      // @ts-ignore
      const rzp1 = new window.Razorpay(options);
      
      rzp1.on('payment.failed', function (response: any) {
        setErrorMsg("Payment failed: " + response.error.description);
        setIsProcessing(false);
      });

      rzp1.open();
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Payment couldn't be started. Please try again.");
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-oat">
        <Header />
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-16 text-center">
          <h1 className="font-fraunces text-3xl font-bold text-ink mb-4">Checkout</h1>
          <p className="text-ink/60 mb-6">Your cart is empty.</p>
          <Link href="/shop" className="bg-raspberry text-white px-6 py-3 rounded-full font-bold">Return to Shop</Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-oat">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Header />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col md:flex-row gap-8">
        
        <div className="flex-1">
          <h1 className="font-fraunces text-3xl font-bold text-ink mb-8">Checkout</h1>

          <div className={`bg-white rounded-3xl p-6 shadow-sm mb-4 border ${step === 1 ? 'border-raspberry' : 'border-rose/20 opacity-50'}`}>
            <h2 className="font-bold text-xl text-ink mb-4">1. Delivery Address</h2>
            {step === 1 ? (
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" value={firstName} onChange={e=>setFirstName(e.target.value)} required placeholder="First Name" className="w-full border border-rose/30 rounded-lg px-4 py-3 outline-none focus:border-raspberry" />
                  <input type="text" value={lastName} onChange={e=>setLastName(e.target.value)} required placeholder="Last Name" className="w-full border border-rose/30 rounded-lg px-4 py-3 outline-none focus:border-raspberry" />
                </div>
                <input type="text" value={addressLine} onChange={e=>setAddressLine(e.target.value)} required placeholder="Street Address" className="w-full border border-rose/30 rounded-lg px-4 py-3 outline-none focus:border-raspberry" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" value={city} onChange={e=>setCity(e.target.value)} required placeholder="City" className="w-full border border-rose/30 rounded-lg px-4 py-3 outline-none focus:border-raspberry" />
                  <input type="text" value={pincode} onChange={e=>setPincode(e.target.value)} required placeholder="Pincode" className="w-full border border-rose/30 rounded-lg px-4 py-3 outline-none focus:border-raspberry" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" value={state} onChange={e=>setState(e.target.value)} required placeholder="State" className="w-full border border-rose/30 rounded-lg px-4 py-3 outline-none focus:border-raspberry" />
                  <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} required placeholder="Phone Number" className="w-full border border-rose/30 rounded-lg px-4 py-3 outline-none focus:border-raspberry" />
                </div>
                <button type="submit" className="bg-ink text-white font-bold px-8 py-3 rounded-xl hover:bg-ink/80 transition-colors">
                  Continue to Payment
                </button>
              </form>
            ) : (
              <button onClick={() => setStep(1)} className="text-sm font-bold text-raspberry hover:underline">Edit Address ({firstName} {lastName})</button>
            )}
          </div>

          <div className={`bg-white rounded-3xl p-6 shadow-sm mb-4 border ${step === 2 ? 'border-raspberry' : 'border-rose/20 opacity-50'}`}>
            <h2 className="font-bold text-xl text-ink mb-4">2. Payment Method</h2>
            {step === 2 ? (
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 border border-rose/30 rounded-xl cursor-pointer hover:border-raspberry">
                  <input type="radio" name="payment" defaultChecked className="text-raspberry" />
                  <span className="font-bold text-ink flex-1">Online Payment (Razorpay)</span>
                  <span className="text-xs font-bold text-sage bg-sage/10 px-2 py-1 rounded">Secure</span>
                </label>
                <button onClick={() => setStep(3)} className="bg-ink text-white font-bold px-8 py-3 rounded-xl hover:bg-ink/80 transition-colors mt-4">
                  Review Order
                </button>
              </div>
            ) : step > 2 ? (
              <button onClick={() => setStep(2)} className="text-sm font-bold text-raspberry hover:underline">Edit Payment</button>
            ) : null}
          </div>

          <div className={`bg-white rounded-3xl p-6 shadow-sm border ${step === 3 ? 'border-raspberry' : 'border-rose/20 opacity-50'}`}>
            <h2 className="font-bold text-xl text-ink mb-4">3. Review & Place Order</h2>
            {step === 3 && (
              <form onSubmit={handlePayment}>
                <div className="bg-rose/20 rounded-xl p-4 mb-6 text-sm text-ink/80 border border-rose/40">
                  <p className="font-bold text-raspberry-deep mb-1">⚠️ All Sales Are Final</p>
                  <label className="flex items-start gap-3 mt-3 cursor-pointer group">
                    <input type="checkbox" id="policy-check" className="mt-1 w-4 h-4 text-raspberry accent-raspberry rounded" />
                    <span>I understand and agree that all sales are final and <strong>no returns, exchanges, or refunds</strong> are accepted.</span>
                  </label>
                </div>
                {errorMsg && <p className="text-sm text-raspberry font-bold mb-4">{errorMsg}</p>}
                <button type="submit" disabled={isProcessing} className="block text-center w-full bg-raspberry text-white font-bold py-4 rounded-xl hover:bg-raspberry-deep transition-colors text-lg shadow-lg disabled:opacity-70">
                  {isProcessing ? "Processing..." : `Pay ₹${Math.round(finalTotal)} with Razorpay`}
                </button>
                <div className="flex justify-center items-center gap-2 mt-4 text-xs text-ink/60 font-bold">
                  <span>🔒 Secure 256-bit SSL Checkout</span>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="w-full md:w-80 lg:w-96">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose/20 sticky top-24">
            <h2 className="font-bold text-xl text-ink mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={`${item.id}-${item.colorName}`} className="flex gap-3 text-sm">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: item.colorHex }}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-ink leading-tight">{item.name}</p>
                    <p className="text-ink/60 text-xs">Qty: {item.quantity} | {item.colorName}</p>
                  </div>
                  <div className="font-bold text-ink">₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-rose/30 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-ink/70">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-ink/70">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-ink/70">
                <span>Estimated Tax (18%)</span>
                <span>₹{Math.round(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-ink pt-2 border-t border-rose/30 mt-2">
                <span>Total</span>
                <span className="text-raspberry-deep">₹{Math.round(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
