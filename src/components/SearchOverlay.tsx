"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { getAllProducts, Product } from "@/lib/products";

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch products once on mount so we can search client-side
    getAllProducts().then(res => setAllProducts(res));
  }, []);

  useEffect(() => {
    if (query.trim().length > 2) {
      setIsSearching(true);
      
      const lowerQ = query.toLowerCase();
      const hits = allProducts.filter(p => {
        const colorMatch = p.colors.some(c => c.name.toLowerCase().includes(lowerQ));
        return p.name.toLowerCase().includes(lowerQ) || 
                p.desc.toLowerCase().includes(lowerQ) ||
                p.cat.toLowerCase().includes(lowerQ) ||
                colorMatch;
      });
      setResults(hits);
      setIsSearching(false);
      
    } else {
      setResults([]);
    }
  }, [query, allProducts]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/30 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-[15%] left-[5%] right-[5%] md:left-[20%] md:right-[20%] bg-white rounded-3xl shadow-2xl z-[70] overflow-hidden border border-rose/30 flex flex-col max-h-[70vh]"
          >
            <div className="p-4 md:p-6 border-b border-line flex items-center gap-3 bg-oat/30">
              <span className="text-2xl">🔍</span>
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products by name, category, or color..."
                className="flex-1 bg-transparent border-none outline-none font-karla text-lg md:text-xl text-ink placeholder:text-ink/40"
              />
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-rose/30 flex items-center justify-center text-ink/60 hover:bg-rose/60 hover:text-ink transition-colors">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {query.length === 0 ? (
                <div>
                  <h3 className="font-bold text-xs text-ink/60 uppercase tracking-widest mb-4">Suggested Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {["sage green", "bags", "amigurumi", "scarf", "rose"].map(sugg => (
                      <button 
                        key={sugg}
                        onClick={() => setQuery(sugg)}
                        className="font-mono text-xs text-ink/70 bg-oat px-3 py-2 rounded-full hover:bg-rose/40 hover:text-raspberry transition-colors border border-rose/30"
                      >
                        {sugg}
                      </button>
                    ))}
                  </div>
                </div>
              ) : isSearching ? (
                <div className="flex flex-col items-center justify-center py-12 text-ink/60">
                  <div className="w-8 h-8 rounded-full border-2 border-rose border-t-raspberry animate-spin mb-4"></div>
                  <p className="font-mono text-xs uppercase tracking-widest animate-pulse">Searching...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.map(product => (
                    <div 
                      key={product.id} 
                      onClick={() => {
                        onClose();
                        router.push(`/product/${product.id}`);
                      }}
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-oat cursor-pointer transition-colors border border-transparent hover:border-rose/30"
                    >
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-sm" style={{ backgroundColor: product.colors[0]?.hex }}>
                        {product.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-ink">{product.name}</h4>
                        <p className="text-xs text-ink/60 line-clamp-1">{product.desc}</p>
                        <div className="inline-flex items-center font-bold text-raspberry-deep mt-1">₹{product.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-ink/60">
                  <p className="mb-2 text-3xl">🧶</p>
                  <p>No products found for "{query}".</p>
                  <p className="text-sm mt-2 mb-6">Try checking your spelling or use more general terms!</p>
                  
                  <h3 className="font-bold text-xs text-ink/60 uppercase tracking-widest mb-4">Recommended</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["sage green", "bags", "amigurumi", "scarf", "rose"].map(sugg => (
                      <button 
                        key={sugg}
                        onClick={() => setQuery(sugg)}
                        className="font-mono text-xs text-ink/70 bg-oat px-3 py-2 rounded-full hover:bg-rose/40 hover:text-raspberry transition-colors border border-rose/30"
                      >
                        {sugg}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
