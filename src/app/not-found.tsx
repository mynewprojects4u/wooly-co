import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-oat">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white p-12 rounded-3xl shadow-sm border border-rose/30">
          <div className="text-8xl mb-6">🧶</div>
          <h1 className="font-fraunces text-4xl font-bold text-ink mb-4">Oops!</h1>
          <p className="text-ink/70 mb-8">
            We seem to have lost the thread. The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            href="/shop" 
            className="inline-block bg-raspberry text-white font-bold px-8 py-4 rounded-xl shadow-md hover:bg-raspberry-deep transition-all hover:-translate-y-1"
          >
            Back to Shop
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
