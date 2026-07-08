"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type WishlistItem = {
  productId: string;
  addedAt: number;
};

type WishlistContextType = {
  items: WishlistItem[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: number;
  isLoaded: boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wooly_wishlist_new');
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist");
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('wooly_wishlist_new', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'wooly_wishlist_new' && e.newValue) {
        try {
          setItems(JSON.parse(e.newValue));
        } catch (err) {
          console.error("Failed to parse wishlist from storage event");
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addToWishlist = (productId: string) => {
    setItems((prev) => {
      if (prev.some(item => item.productId === productId)) return prev;
      return [...prev, { productId, addedAt: Date.now() }];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setItems((prev) => prev.filter(item => item.productId !== productId));
  };

  const toggleWishlist = (productId: string) => {
    setItems((prev) => {
      if (prev.some(item => item.productId === productId)) {
        return prev.filter(item => item.productId !== productId);
      }
      return [...prev, { productId, addedAt: Date.now() }];
    });
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item.productId === productId);
  };

  const totalItems = items.length;

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, totalItems, isLoaded }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
