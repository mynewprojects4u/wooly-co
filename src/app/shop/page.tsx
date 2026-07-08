"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoBar from "@/components/PromoBar";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts, Product } from "@/lib/products";

const categories = [
  { name: "All Categories", slug: "all" },
  { name: "Scarves", slug: "scarves" },
  { name: "Amigurumi", slug: "amigurumi" },
  { name: "Bags", slug: "bags" },
  { name: "Home Decor", slug: "decor" },
  { name: "Accessories", slug: "accessories" },
];

const priceBands = [
  { label: "Under ₹500", value: "under500" },
  { label: "₹500–₹1500", value: "500to1500" },
  { label: "Over ₹1500", value: "1500plus" },
];

export default function ShopPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [activeBands, setActiveBands] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState("popular");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const products = await getAllProducts();
      setAllProducts(products);
      setIsLoading(false);
    }
    loadProducts();
  }, []);

  const togglePriceBand = (value: string) => {
    setActiveBands(prev => 
      prev.includes(value) ? prev.filter(b => b !== value) : [...prev, value]
    );
  };

  // Filter logic
  let filteredProducts = allProducts.filter((product) => {
    const catMatch = activeCat === "all" || product.cat === activeCat;
    
    let bandMatch = activeBands.length === 0;
    if (!bandMatch) {
      if (activeBands.includes("under500") && product.price < 500) bandMatch = true;
      if (activeBands.includes("500to1500") && product.price >= 500 && product.price <= 1500) bandMatch = true;
      if (activeBands.includes("1500plus") && product.price > 1500) bandMatch = true;
    }
    
    return catMatch && bandMatch;
  });

  // Sort logic
  if (sortOrder === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen flex flex-col bg-oat">
      <PromoBar />
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-rose/30 pb-6">
          <div>
            <h1 className="font-fraunces text-4xl font-bold text-ink mb-2">Shop Collection</h1>
            <p className="text-ink/60">Showing {isLoading ? "..." : filteredProducts.length} handmade items</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex-1 border border-rose/30 bg-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-rose/10"
            >
              Filters
            </button>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="flex-1 md:w-48 bg-white border border-rose/30 rounded-xl px-4 py-2.5 text-sm font-bold text-ink outline-none focus:border-raspberry"
            >
              <option value="popular">Sort by Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`${isFilterOpen ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0 space-y-8`}>
            <div>
              <h3 className="font-bold text-ink mb-4 uppercase tracking-wider text-sm">Categories</h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <button 
                      onClick={() => { setActiveCat(cat.slug); setIsFilterOpen(false); }}
                      className={`text-sm hover:text-raspberry transition-colors ${activeCat === cat.slug ? 'font-bold text-raspberry' : 'text-ink/70'}`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-rose/20 pt-6">
              <h3 className="font-bold text-ink mb-4 uppercase tracking-wider text-sm">Price Range</h3>
              <ul className="space-y-3">
                {priceBands.map((band) => (
                  <li key={band.value}>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${activeBands.includes(band.value) ? 'bg-raspberry border-raspberry' : 'border-rose/50 bg-white group-hover:border-raspberry'}`}>
                        {activeBands.includes(band.value) && <span className="text-white text-xs">✓</span>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden"
                        checked={activeBands.includes(band.value)}
                        onChange={() => togglePriceBand(band.value)}
                      />
                      <span className="text-sm text-ink/70 group-hover:text-ink">{band.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group border border-rose/10 flex flex-col">
                  <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] bg-rose/10 overflow-hidden">
                    {product.imageUrl ? (
                      <Image 
                        src={product.imageUrl} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-6xl">
                        {product.icon}
                      </div>
                    )}
                  </Link>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-sm text-ink line-clamp-1 mb-1 group-hover:text-raspberry transition-colors">{product.name}</h3>
                    <div className="text-xs text-yellow-500 mb-2">★★★★★ {product.rating}</div>
                    <div className="flex items-center gap-1 mb-3 mt-auto">
                      {product.colors.slice(0, 3).map((c, i) => (
                        <span key={i} className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: c.hex }}></span>
                      ))}
                      {product.colors.length > 3 && <span className="text-[10px] text-ink/50">+{product.colors.length - 3}</span>}
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="inline-flex items-center font-bold text-ink text-lg">₹{product.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <div className="text-5xl mb-4">🧶</div>
                <h3 className="font-bold text-xl text-ink mb-2">No products found</h3>
                <p className="text-ink/60">Try adjusting your filters to see more results.</p>
                <button 
                  onClick={() => { setActiveCat("all"); setActiveBands([]); }}
                  className="mt-6 text-sm font-bold text-raspberry hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
            
            {/* Pagination Mock */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 flex justify-center gap-2">
                <button className="w-10 h-10 rounded-xl bg-raspberry text-white font-bold flex items-center justify-center">1</button>
                <button className="w-10 h-10 rounded-xl bg-white border border-rose/30 text-ink hover:bg-rose/10 font-bold flex items-center justify-center transition-colors">2</button>
                <button className="w-10 h-10 rounded-xl bg-white border border-rose/30 text-ink hover:bg-rose/10 font-bold flex items-center justify-center transition-colors">&rarr;</button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
