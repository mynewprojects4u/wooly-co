"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import { useState } from "react";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const { totalItems } = useCart();
  const { totalItems: wishlistTotal } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex flex-wrap items-center gap-3 px-4 py-3 bg-white shadow-[0_2px_10px_rgba(61,49,41,0.06)]">
        <div className="flex items-center gap-2">
          <button 
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`w-5 h-0.5 bg-ink transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-ink transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-ink transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
          <Link href="/" className="font-fraunces font-bold text-xl text-raspberry-deep whitespace-nowrap">
            🧶 Wooly & Co.
          </Link>
        </div>
        
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const query = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value;
            if (query) window.location.href = `/shop?q=${encodeURIComponent(query)}`;
          }}
          className="hidden md:flex flex-1 min-w-[220px] items-center bg-oat rounded-full px-3 py-1 gap-2 border border-transparent hover:border-rose transition-colors max-w-md mx-auto"
        >
          <input 
            type="text" 
            name="q"
            placeholder="Search products..." 
            className="flex-1 min-w-0 border-none bg-transparent outline-none font-karla text-sm py-2 text-ink placeholder:text-ink/60"
            onChange={(e) => {
              if (e.target.value.length > 0) setIsSearchOpen(true);
            }}
          />
          <button type="submit" className="border-none bg-raspberry text-white text-[10px] font-bold tracking-wide px-3 py-2 rounded-full cursor-pointer whitespace-nowrap shadow-sm hover:bg-raspberry-deep transition-colors pointer-events-auto">
            🔍 Search
          </button>
        </form>

      <div className="flex gap-2 items-center ml-auto">
        <button onClick={() => setIsSearchOpen(true)} className="md:hidden relative border-none bg-oat rounded-full w-9 h-9 flex items-center justify-center text-sm cursor-pointer text-ink font-karla font-bold hover:bg-rose/40 transition-colors">
          🔍
        </button>
        <Link href="/wishlist" className="relative border-none bg-oat rounded-full px-3 py-2 text-sm cursor-pointer text-ink font-karla font-bold whitespace-nowrap hover:bg-rose/40 transition-colors hidden sm:flex">
          ♡
          {wishlistTotal > 0 && (
            <span className="absolute -top-1 -right-1 bg-raspberry text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistTotal}
            </span>
          )}
        </Link>
        <Link href="/cart" className="relative border-none bg-oat rounded-full px-3 py-2 text-sm cursor-pointer text-ink font-karla font-bold whitespace-nowrap hover:bg-rose/40 transition-colors">
          🧺
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-raspberry text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce-short">
              {totalItems}
            </span>
          )}
        </Link>
        <Link href="/login" className="relative border-none bg-oat rounded-full px-3 py-2 text-sm cursor-pointer text-ink font-karla font-bold whitespace-nowrap hover:bg-rose/40 transition-colors">
          👤 Login
        </Link>
      </div>
    </header>
    
    {/* Mobile Menu */}
    {isMobileMenuOpen && (
      <div className="md:hidden fixed inset-0 top-[60px] bg-white z-40 flex flex-col p-6 shadow-xl border-t border-rose/20">
        <nav className="flex flex-col gap-4 text-xl font-bold text-ink">
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop All</Link>
          <Link href="/shop?cat=scarves" onClick={() => setIsMobileMenuOpen(false)}>Scarves</Link>
          <Link href="/shop?cat=amigurumi" onClick={() => setIsMobileMenuOpen(false)}>Amigurumi</Link>
          <Link href="/wishlist" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            Wishlist {wishlistTotal > 0 && <span className="bg-raspberry text-white text-xs px-2 py-0.5 rounded-full">{wishlistTotal}</span>}
          </Link>
          <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>My Account</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
        </nav>
      </div>
    )}

    <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
