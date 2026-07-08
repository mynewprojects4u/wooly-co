import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CustomOrdersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-oat">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-20 text-center">
        <h1 className="font-fraunces text-4xl font-bold text-ink mb-6">Custom Orders</h1>
        <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6 text-ink/80 text-left">
          <p>Looking for something unique? We'd love to bring your vision to life! Whether it's a specific color combination, a custom size, or a completely new design, we're here to help.</p>
          
          <h2 className="font-bold text-ink text-xl mt-8 mb-4">How it works</h2>
          <ol className="list-decimal pl-5 space-y-3">
            <li><strong>Reach out:</strong> Send us your idea via our contact page.</li>
            <li><strong>Consultation:</strong> We'll discuss patterns, yarn types, colors, and pricing.</li>
            <li><strong>Creation:</strong> Once approved, a 50% non-refundable deposit is required before we start crocheting! The remaining balance is due prior to shipping.</li>
            <li><strong>Delivery:</strong> We'll carefully pack and ship your custom piece.</li>
          </ol>
          
          <div className="pt-8 text-center">
            <Link href="/contact" className="inline-block bg-raspberry text-white font-bold py-3 px-8 rounded-full hover:bg-raspberry-deep transition-colors">
              Request a Custom Order
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
