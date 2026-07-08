"use client";

import { useState, useEffect } from "react";
import { getAllProducts, Product } from "@/lib/products";
import Image from "next/image";

export default function DashboardClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Edit State
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [editImageUrl, setEditImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const startEditing = (p: any) => {
    setEditingId(p.id);
    setEditName(p.name);
    setEditPrice(p.price);
    setEditImageUrl(p.imageUrl || "");
  };

  const saveEdit = async (id: string) => {
    const updatedProducts = products.map(p => 
      p.id === id ? { ...p, name: editName, price: editPrice, imageUrl: editImageUrl } : p
    );
    setProducts(updatedProducts);
    setEditingId(null);
    
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: editName, price: editPrice, imageUrl: editImageUrl }),
      });
      if (!res.ok) throw new Error("Failed to update");
      alert('Product updated successfully!');
      fetchProducts(); // Refresh from DB
    } catch (error) {
      console.error('Failed to save', error);
      alert('Failed to save product');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setEditImageUrl(data.url);
    } catch (error: any) {
      console.error("Upload error:", error);
      alert("Error uploading image: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose/30">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-fraunces text-xl font-bold text-ink">Product Catalog</h2>
        <div className="flex gap-2">
          <button className="bg-raspberry text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-raspberry-deep transition-colors">
            + Add Product
          </button>
          <button onClick={handleLogout} className="bg-ink/10 text-ink px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-ink/20 transition-colors">
            Logout
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-line">
              <th className="pb-3 text-xs uppercase tracking-wide text-ink/60 font-bold">Image</th>
              <th className="pb-3 text-xs uppercase tracking-wide text-ink/60 font-bold">Item</th>
              <th className="pb-3 text-xs uppercase tracking-wide text-ink/60 font-bold">Category</th>
              <th className="pb-3 text-xs uppercase tracking-wide text-ink/60 font-bold">Price</th>
              <th className="pb-3 text-xs uppercase tracking-wide text-ink/60 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="py-8 text-center text-ink/50">Loading products...</td></tr>
            ) : products.map((product) => {
              const isEditing = editingId === product.id;
              const displayImage = isEditing ? editImageUrl : product.imageUrl;
              
              return (
                <tr key={product.id} className="border-b border-line last:border-0 hover:bg-oat/20 transition-colors">
                  <td className="py-4">
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center text-xl flex-shrink-0 bg-rose/10 overflow-hidden relative">
                      {displayImage ? (
                        <Image src={displayImage} alt={product.name} fill className="object-cover" />
                      ) : (
                        product.icon
                      )}
                      
                      {isEditing && (
                        <label className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer text-white text-[10px] font-bold opacity-0 hover:opacity-100 transition-opacity">
                          {isUploading ? "..." : "Upload"}
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                        </label>
                      )}
                    </div>
                  </td>
                  
                  <td className="py-4">
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editName} 
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-oat border border-rose px-2 py-1 rounded-md text-sm font-bold text-ink w-40 outline-none"
                      />
                    ) : (
                      <span className="font-bold text-sm text-ink">{product.name}</span>
                    )}
                  </td>
                  
                  <td className="py-4">
                    <span className="bg-oat text-ink/70 px-2 py-1 rounded text-xs font-bold capitalize">
                      {product.cat}
                    </span>
                  </td>
                  
                  <td className="py-4">
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <span className="text-ink/60 text-sm">₹</span>
                        <input 
                          type="number" 
                          value={editPrice} 
                          onChange={(e) => setEditPrice(Number(e.target.value))}
                          className="bg-oat border border-rose px-2 py-1 rounded-md text-sm font-bold text-ink w-20 outline-none"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center font-bold text-raspberry-deep">₹{product.price}</div>
                        <span className="text-xs text-ink/50">{Number(product.rating).toFixed(1)} ⭐</span>
                      </div>
                    )}
                  </td>
                  
                  <td className="py-4 text-right">
                    {isEditing ? (
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => saveEdit(product.id)} className="text-xs font-bold text-white bg-sage px-3 py-1.5 rounded-lg hover:bg-sage/80 transition-colors">Save</button>
                        <button onClick={() => setEditingId(null)} className="text-xs font-bold text-ink/60 hover:text-ink">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => startEditing(product)} className="text-xs font-bold text-raspberry hover:text-raspberry-deep underline underline-offset-2">
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
