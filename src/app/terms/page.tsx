import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-oat text-ink">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-fraunces text-4xl font-bold text-raspberry-deep mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-rose max-w-none">
          <p className="mb-4 text-ink/80">Welcome to Wooly & Co. By accessing our website, you agree to these Terms & Conditions. Please read them carefully.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. General</h2>
          <p className="mb-4 text-ink/80">All our products are handmade with care. Due to the nature of handmade items, slight variations in size, color, and design may occur, making each piece unique.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Processing & Shipping</h2>
          <p className="mb-4 text-ink/80">As each item is crafted by hand, processing times may vary. Ready-to-ship items typically dispatch within 2-3 business days. Made-to-order items may take 1-3 weeks. We offer free shipping pan-India on orders over ₹999.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Refunds & Exchanges</h2>
          <p className="mb-4 text-ink/80"><strong>All sales are final.</strong> Due to the time-intensive nature of handmade crochet products, we do not accept returns, exchanges, or refunds once an order has been placed. Please review your order carefully before checking out.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Custom Orders</h2>
          <p className="mb-4 text-ink/80">For custom commissions, a 50% non-refundable deposit is required upfront. The remaining balance is due prior to shipping.</p>
          
          <p className="mt-12 text-sm text-ink/60">Last updated: July 2026. If you have any questions, please <Link href="/contact" className="text-raspberry hover:underline">contact us</Link>.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
