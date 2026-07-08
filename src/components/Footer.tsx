"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    
    // In a real app, this would hit an API endpoint to store the email
    // e.g. await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
    setMessage("Thanks for subscribing! Check your inbox.");
    setEmail("");
  };

  return (
    <footer className="bg-white border-t border-rose/30 mt-12 py-10 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-fraunces font-bold text-lg text-raspberry-deep mb-4">🧶 Wooly & Co.</h3>
          <p className="text-sm text-ink/70 mb-4 leading-relaxed">
            Handmade crochet scarves, amigurumi, bags, and home decor. Crafted with love and cozy vibes.
          </p>
          <div className="text-sm text-ink/70">
            <p><strong>Email:</strong> support@woolyandco.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> Mumbai, Maharashtra, India</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-ink">Shop</h4>
          <ul className="space-y-2 text-sm text-ink/70">
            <li><Link href="/shop?cat=all" className="hover:text-raspberry transition-colors">All Products</Link></li>
            <li><Link href="/shop?cat=scarves" className="hover:text-raspberry transition-colors">Scarves</Link></li>
            <li><Link href="/shop?cat=amigurumi" className="hover:text-raspberry transition-colors">Amigurumi</Link></li>
            <li><Link href="/shop?cat=bags" className="hover:text-raspberry transition-colors">Bags</Link></li>
            <li><Link href="/shop?cat=decor" className="hover:text-raspberry transition-colors">Home Decor</Link></li>
            <li><Link href="/shop?cat=accessories" className="hover:text-raspberry transition-colors">Accessories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-ink">Help & Legal</h4>
          <ul className="space-y-2 text-sm text-ink/70">
            <li><Link href="/faq" className="hover:text-raspberry transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-raspberry transition-colors">Contact Us</Link></li>
            <li><Link href="/terms" className="hover:text-raspberry transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-raspberry transition-colors">Privacy Policy</Link></li>
            <li><Link href="/shipping" className="hover:text-raspberry transition-colors">Shipping Policy</Link></li>
            <li><Link href="/returns" className="hover:text-raspberry transition-colors">Returns Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-ink">Let&apos;s Connect</h4>
          <p className="text-sm text-ink/70 mb-4">Join our newsletter for 10% off your first order!</p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mb-6">
            <div className="flex gap-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email" 
                required
                className="flex-1 rounded-lg border border-rose/50 px-3 py-2 text-sm outline-none focus:border-raspberry" 
              />
              <button type="submit" className="bg-raspberry text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-raspberry-deep transition-colors">Join</button>
            </div>
            {message && <p className="text-xs font-bold text-raspberry-deep">{message}</p>}
          </form>
          
          <h4 className="font-bold mb-3 text-ink text-sm">Follow Us</h4>
          <div className="flex gap-4 text-sm font-bold">
            <a href="https://instagram.com/woolyandco" target="_blank" rel="noopener noreferrer" className="text-ink/60 hover:text-raspberry transition-colors" aria-label="Instagram">IG</a>
            <a href="https://facebook.com/woolyandco" target="_blank" rel="noopener noreferrer" className="text-ink/60 hover:text-raspberry transition-colors" aria-label="Facebook">FB</a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-ink/60 hover:text-raspberry transition-colors" aria-label="WhatsApp">WA</a>
            <a href="https://pinterest.com/woolyandco" target="_blank" rel="noopener noreferrer" className="text-ink/60 hover:text-raspberry transition-colors" aria-label="Pinterest">PIN</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto mt-12 pt-6 border-t border-rose/30 flex flex-row flex-wrap justify-between items-center gap-4 text-xs text-ink/50">
        <div className="flex items-center gap-3 font-bold opacity-70 uppercase text-[10px] tracking-wider">
          <span title="Visa">VISA</span>
          <span title="Mastercard">MASTERCARD</span>
          <span title="UPI">UPI</span>
          <span title="Cash on Delivery">COD</span>
        </div>
        <p className="whitespace-nowrap">&copy; {new Date().getFullYear()} Wooly & Co. All rights reserved.</p>
      </div>
    </footer>
  );
}
