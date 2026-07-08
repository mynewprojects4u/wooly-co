import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ShippingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-oat text-ink">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-fraunces text-4xl font-bold text-raspberry-deep mb-8">Shipping Policy</h1>
        
        <div className="prose prose-rose max-w-none">
          <p className="mb-4 text-ink/80">Thank you for shopping at Wooly & Co. Here are the details regarding our shipping policies and processing times.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Processing Times</h2>
          <p className="mb-4 text-ink/80">Because all our items are handmade, processing times vary based on the product. <strong>Ready-to-ship</strong> items are typically dispatched within 2-3 business days. <strong>Made-to-order</strong> and custom items may take 1-3 weeks to create before they are shipped.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Shipping Rates</h2>
          <p className="mb-4 text-ink/80">We offer <strong>Free Shipping</strong> pan-India on all orders over ₹999. For orders under ₹999, a standard shipping fee of ₹60 applies.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Delivery Times</h2>
          <p className="mb-4 text-ink/80">Once dispatched, standard delivery across India takes 3-7 business days depending on your location. Delivery to remote areas may take longer.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Tracking Your Order</h2>
          <p className="mb-4 text-ink/80">Once your order is shipped, you will receive an email containing a tracking number and a link to track your package.</p>
          
          <p className="mt-12 text-sm text-ink/60">If you have any questions about your order's shipping status, please <Link href="/contact" className="text-raspberry hover:underline">contact us</Link>.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
