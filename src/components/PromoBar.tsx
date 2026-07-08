"use client";

import { useState, useEffect } from "react";

export default function PromoBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem("wooly_promo_dismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-raspberry text-white text-center text-xs font-bold tracking-wide py-2 relative">
      ✨ Free shipping over ₹999 · Handmade & shipped pan-India
      <button 
        onClick={() => {
          setIsVisible(false);
          localStorage.setItem("wooly_promo_dismissed", "true");
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
      >
        ✕
      </button>
    </div>
  );
}
