import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoBar from "@/components/PromoBar";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";

const categories = [
  { name: "All", slug: "all", active: true },
  { name: "Scarves", slug: "scarves" },
  { name: "Amigurumi", slug: "amigurumi" },
  { name: "Bags", slug: "bags" },
  { name: "Home Decor", slug: "decor" },
  { name: "Accessories", slug: "accessories" },
];

export default async function Home() {
  const allProducts = await getAllProducts();
  const featuredProducts = allProducts.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <PromoBar />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 py-12 md:py-20 max-w-5xl mx-auto text-center">
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-raspberry-deep mb-6 leading-tight">
            Handmade with love,<br/> just for you.
          </h1>
          <p className="text-lg text-ink/80 max-w-2xl mx-auto mb-8">
            Cozy crochet creations to brighten your day. From adorable amigurumi to warm winter scarves, find your next favorite piece here.
          </p>
          <Link href="/shop" className="inline-block bg-raspberry text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-raspberry-deep transition-transform hover:-translate-y-1">
            Shop the Collection
          </Link>
        </section>

        {/* Categories (scrollable row) */}
        <section className="px-4 py-6 max-w-5xl mx-auto">
          <h2 className="font-fraunces text-2xl font-bold text-ink mb-6 px-2">Browse by Category</h2>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-2">
            {categories.map((cat) => (
              <Link 
                key={cat.slug} 
                href={`/shop?cat=${cat.slug}`}
                className={`flex-shrink-0 px-6 py-3 rounded-full font-bold text-sm transition-colors ${
                  cat.active ? 'bg-raspberry text-white' : 'bg-white text-ink/60 hover:bg-rose/20'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="px-6 py-12 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-fraunces text-2xl font-bold text-ink">Trending Now</h2>
            <Link href="/shop" className="text-sm font-bold text-raspberry hover:text-raspberry-deep">View All &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <Link href={`/product/${product.id}`} className="block relative h-36 md:h-48 flex flex-col items-center justify-center text-5xl cursor-pointer transition-colors" style={{ backgroundColor: product.bg === 'bg-rose' ? '#EFC4CE' : '#F5EEE3' }}>
                  <span className="group-hover:scale-110 transition-transform duration-300">{product.icon}</span>
                </Link>
                <div className="p-3 md:p-4">
                  <h3 className="font-bold text-sm text-ink line-clamp-1 mb-1 group-hover:text-raspberry transition-colors">
                    <Link href={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="text-xs text-yellow-500 mb-2">★★★★★ {product.rating}</div>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center font-bold text-raspberry-deep">₹{product.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
