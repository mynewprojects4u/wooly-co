"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useWishlist } from "@/lib/WishlistContext";
import { getAllProducts, Product } from "@/lib/products";
import { useCart } from "@/lib/CartContext";
import { useState, useEffect } from "react";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const products = await getAllProducts();
      setAllProducts(products);
      setIsLoading(false);
    }
    fetchProducts();
  }, []);

  const wishlistedProducts = items
    .map(item => allProducts.find(p => p.id === item.productId))
    .filter(Boolean);

  const handleMoveToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      icon: product.icon,
      colorName: product.colors[0].name,
      colorHex: product.colors[0].hex,
      quantity: 1
    });
    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-oat">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        <h1 className="font-fraunces text-3xl md:text-4xl font-bold text-ink mb-8">My Wishlist</h1>
        
        {isLoading ? (
          <div className="text-center py-12 text-ink/60">Loading your wishlist...</div>
        ) : wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">🤍</div>
            <h2 className="font-bold text-xl text-ink mb-2">Your wishlist is empty</h2>
            <p className="text-ink/60 mb-6">Explore our collection and find something you love.</p>
            <Link href="/shop" className="inline-block bg-raspberry text-white font-bold px-8 py-3 rounded-full hover:bg-raspberry-deep transition-colors">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistedProducts.map((product: any) => (
              <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm flex gap-4 border border-rose/20 relative">
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 text-ink/40 hover:text-raspberry transition-colors z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-rose/20"
                >
                  ✕
                </button>
                <div 
                  className="w-24 h-24 rounded-xl flex items-center justify-center text-4xl flex-shrink-0"
                  style={{ backgroundColor: product.colors[0]?.hex || '#EFC4CE' }}
                >
                  {product.icon}
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <Link href={`/product/${product.id}`} className="font-bold text-ink hover:text-raspberry transition-colors line-clamp-1 pr-6">
                      {product.name}
                    </Link>
                    <div className="inline-flex items-center text-raspberry-deep font-bold mt-1">₹{product.price}</div>
                  </div>
                  <button 
                    onClick={() => handleMoveToCart(product)}
                    className="w-full bg-rose text-raspberry-deep font-bold text-xs py-2 rounded-lg hover:bg-rose/80 transition-colors mt-2"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
