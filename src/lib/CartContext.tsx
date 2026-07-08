"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  icon: string;
  colorName: string;
  colorHex: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, colorName: string) => void;
  updateQuantity: (id: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoaded: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    const savedCart = localStorage.getItem('wooly_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart");
      }
    }
    setIsLoaded(true);
  }, []);

  React.useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('wooly_cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'wooly_cart' && e.newValue) {
        try {
          setItems(JSON.parse(e.newValue));
        } catch (err) {
          console.error("Failed to parse cart from storage event");
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addToCart = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id && i.colorName === newItem.colorName);
      if (existing) {
        return prev.map((i) => 
          i.id === newItem.id && i.colorName === newItem.colorName
            ? { ...i, quantity: Math.min(10, i.quantity + newItem.quantity) } // Max 10 items
            : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string, colorName: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.colorName === colorName)));
  };

  const updateQuantity = (id: string, colorName: string, quantity: number) => {
    const validQty = Math.max(1, Math.min(10, quantity)); // Min 1, Max 10
    setItems((prev) => prev.map((i) => 
      i.id === id && i.colorName === colorName ? { ...i, quantity: validQty } : i
    ));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isLoaded }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
