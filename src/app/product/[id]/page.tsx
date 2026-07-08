"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoBar from "@/components/PromoBar";
import { getProduct, Product } from "@/lib/products";
import { useCart } from "@/lib/CartContext";
import { useWishlist } from "@/lib/WishlistContext";
import Link from "next/link";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      const p = await getProduct(params.id);
      if (!p) {
        router.push("/404");
      } else {
        setProduct(p);
        setActiveColor(p.colors[0]);
      }
      setIsLoading(false);
    }
    loadProduct();
  }, [params.id, router]);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const [activeColor, setActiveColor] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiking, setIsLiking] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
  const [deliveryEstimate, setDeliveryEstimate] = useState("");
  
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isWishlisted = product ? isInWishlist(product.id) : false;

  const handleLike = () => {
    if (!product) return;
    setIsLiking(true);
    toggleWishlist(product.id);
    setTimeout(() => setIsLiking(false), 400);
  };

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (!product || !activeColor || isAddingToCart) return;
    setIsAddingToCart(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      icon: product.icon,
      colorName: activeColor.name,
      colorHex: activeColor.hex,
      quantity,
    });
    setTimeout(() => setIsAddingToCart(false), 600);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6) return;
    
    setPincodeStatus("checking");
    setTimeout(() => {
      if (pincode.startsWith("1") || pincode.startsWith("2") || pincode.startsWith("3") || pincode.startsWith("4") || pincode.startsWith("5") || pincode.startsWith("6") || pincode.startsWith("7") || pincode.startsWith("8")) {
        setPincodeStatus("valid");
        const days = Math.floor(Math.random() * 4) + 2;
        setDeliveryEstimate(`Delivery in ${days}-${days+2} days`);
      } else {
        setPincodeStatus("invalid");
      }
    }, 800);
  };

  let jsonLd = null;
  if (product) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: `https://wooly-co.netlify.app${product.imageUrl || ''}`,
      description: product.desc,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `https://wooly-co.netlify.app/product/${product.id}`,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: Math.floor(Math.random() * 50) + 10,
      }
    };
  }

  return (
    <div className="min-h-screen flex flex-col bg-oat">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <PromoBar />
      <Header />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-12">
        {isLoading ? (
          <div className="text-center py-20 text-ink/60">Loading product...</div>
        ) : !product ? (
          <div className="text-center py-20 text-ink/60">Product not found.</div>
        ) : (
        <>
          <nav className="text-sm font-bold text-ink/60 mb-6 flex gap-2 items-center">
            <Link href="/" className="hover:text-raspberry transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-raspberry transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-ink">{product.name}</span>
          </nav>
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              <div 
                className={`w-full aspect-square rounded-3xl overflow-hidden relative cursor-zoom-in bg-white border border-rose/20 transition-all ${isZoomed ? 'scale-105 z-10 shadow-2xl' : 'shadow-sm'}`}
                onClick={() => setIsZoomed(!isZoomed)}
                style={{ backgroundColor: (activeColor?.hex || '#ffffff') + '20' }}
              >
              {product.imageUrl ? (
                <Image 
                  src={product.imageUrl} 
                  alt={product.name}
                  fill
                  className={`object-cover transition-transform duration-500 ${isZoomed ? 'scale-125' : 'scale-100 hover:scale-105'}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center text-rose/50 bg-oat/30 font-karla">
                  <span className="text-6xl mb-4 opacity-50">{product.icon}</span>
                  <span className="text-sm font-bold tracking-widest uppercase opacity-50">Preview Coming Soon</span>
                </div>
              )}
              
              <button 
                onClick={(e) => { e.stopPropagation(); handleLike(); }}
                className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-2xl shadow-md transition-all ${isLiking ? 'scale-125' : 'hover:scale-110'} ${isWishlisted ? 'text-raspberry' : 'text-ink/30 hover:text-raspberry/50'}`}
              >
                {isWishlisted ? '♥' : '♡'}
              </button>
            </div>
            
            {/* Thumbnail Strip */}
            {product.imageUrl && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                <button 
                  onClick={() => setActiveImageIndex(0)}
                  className={`w-20 h-20 rounded-xl overflow-hidden relative flex-shrink-0 border-2 transition-all border-raspberry opacity-100`}
                >
                  <Image src={product.imageUrl} alt={`${product.name} thumbnail`} fill className="object-cover" sizes="80px" />
                </button>
                {/* Additional thumbnails would render here when backend supports multiple images array */}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-start">
            <h1 className="font-fraunces text-3xl md:text-4xl font-bold text-ink mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex text-yellow-500 text-sm">
                ★★★★★ <span className="text-ink/60 ml-1">({product.rating})</span>
              </div>
              <span className="text-ink/30">|</span>
              <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded animate-pulse">
                Limited Stock Available
              </span>
            </div>
            
            <div className="inline-flex items-center font-bold text-raspberry-deep text-3xl mb-6">₹{product.price}</div>
            
            <p className="text-ink/80 leading-relaxed mb-8">
              {product.desc}
            </p>

            {/* Color Swatches */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-sm text-ink uppercase tracking-wide">Color:</span>
                <span className="text-sm text-ink/70">{activeColor.name}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setActiveColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                      activeColor.name === color.name ? 'border-ink scale-110 shadow-md' : 'border-rose/20 hover:scale-105 shadow-sm'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select ${color.name}`}
                  >
                    {activeColor.name === color.name && <span className="text-white text-xs mix-blend-difference">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8 flex items-center gap-4">
              <span className="font-bold text-sm text-ink uppercase tracking-wide">Quantity:</span>
              <div className="flex items-center bg-white border border-rose/30 rounded-full overflow-hidden shadow-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-ink hover:bg-rose/20 transition-colors font-bold"
                >-</button>
                <div className="w-10 text-center font-bold text-ink">{quantity}</div>
                <button 
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center text-ink hover:bg-rose/20 transition-colors font-bold"
                >+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-white border-2 border-raspberry text-raspberry font-bold py-4 rounded-xl shadow-sm hover:bg-rose/10 transition-all"
              >
                {isAddingToCart ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
              
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-raspberry text-white font-bold py-4 rounded-xl shadow-lg hover:bg-raspberry-deep hover:-translate-y-0.5 transition-all"
              >
                Buy Now
              </button>
            </div>
            
            {/* Urgent Policies */}
            <div className="bg-rose/20 rounded-xl p-4 mb-8 text-xs text-ink/80 border border-rose/40">
              <p className="mb-1">⚠️ <strong>All Sales Are Final:</strong> No returns or refunds accepted. See our <Link href="/returns" className="underline">Returns Policy</Link>.</p>
              <p>⏳ <strong>Processing Time:</strong> Ready-to-ship in 2-3 days. Made-to-order in 1-3 weeks.</p>
            </div>
            
            {/* Static Delivery Estimate */}
            <div className="bg-white p-5 rounded-2xl border border-rose/30 shadow-sm mb-6">
              <h3 className="font-bold text-ink mb-1 flex items-center gap-2">
                🚚 Standard Delivery
              </h3>
              <p className="text-sm text-ink/80">3-5 Business Days across India.</p>
            </div>

            {/* Specifications Details Accordion (Mocked) */}
            <div className="border-t border-rose/30 pt-6 space-y-4">
              <details className="group cursor-pointer">
                <summary className="font-bold text-ink flex justify-between items-center outline-none">
                  Product Specifications & Sizing
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <div className="text-sm text-ink/70 mt-3 pl-2 leading-relaxed">
                  • 100% handmade with love<br/>
                  • Premium anti-pilling yarn<br/>
                  • Spot clean only with mild detergent<br/>
                  {product.cat === 'scarves' && "• Size Guide: Approximately 70 inches long by 8 inches wide. Wraps comfortably twice around the neck."}
                  {product.cat === 'bags' && "• Size Guide: Approximately 14x14 inches with a 10-inch handle drop."}
                  {product.cat === 'amigurumi' && "• Size Guide: Approximately 8-10 inches tall standing."}
                  {product.cat === 'accessories' && "• Size Guide: Standard one-size-fits-all."}
                  {product.cat === 'decor' && "• Size Guide: Standard throw blanket size (50x60 inches) unless specified otherwise."}
                </div>
              </details>
              <details className="group cursor-pointer">
                <summary className="font-bold text-ink flex justify-between items-center outline-none">
                  Shipping & Returns
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <div className="text-sm text-ink/70 mt-3 pl-2 leading-relaxed">
                  Free shipping on orders over ₹999. Ready-to-ship items dispatch in 2-3 days, and made-to-order items in 1-3 weeks. <strong>All sales are final. No returns or refunds accepted.</strong>
                </div>
              </details>
            </div>

          </div>
        </div>
        </>
        )}
      </main>

      <Footer />
    </div>
  );
}
