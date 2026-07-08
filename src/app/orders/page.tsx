import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | Wooly & Co.",
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-oat">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        <h1 className="font-fraunces text-3xl md:text-4xl font-bold text-ink mb-8">My Orders</h1>
        
        {/* Placeholder for now since we don't have DB wired yet */}
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-rose/20">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="font-bold text-xl text-ink mb-2">No orders found</h2>
          <p className="text-ink/60 mb-6">Looks like you haven't placed any orders yet.</p>
          <Link href="/shop" className="inline-block bg-raspberry text-white font-bold px-8 py-3 rounded-full hover:bg-raspberry-deep transition-colors">
            Start Shopping
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
