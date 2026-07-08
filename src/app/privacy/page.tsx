import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-oat text-ink">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-fraunces text-4xl font-bold text-raspberry-deep mb-8">Privacy Policy</h1>
        
        <div className="prose prose-rose max-w-none">
          <p className="mb-4 text-ink/80">Wooly & Co. ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and share your personal information when you visit or make a purchase from our website.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4 text-ink/80">We collect information that you provide to us directly, such as when you create an account, place an order, or subscribe to our newsletter. This may include your name, email address, shipping address, and phone number.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Payment Information</h2>
          <p className="mb-4 text-ink/80">We use Razorpay as our payment gateway. We do not store your credit card or UPI details on our servers. All payment data is securely processed by Razorpay.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
          <p className="mb-4 text-ink/80">We use your information to process your orders, communicate with you about your purchases, and send you marketing emails (only if you have opted in).</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Sharing Your Information</h2>
          <p className="mb-4 text-ink/80">We do not sell your personal information. We only share it with trusted third-party service providers (like shipping partners and payment gateways) necessary to fulfill your orders.</p>
          
          <p className="mt-12 text-sm text-ink/60">Last updated: July 2026. If you have any questions about this Privacy Policy, please <Link href="/contact" className="text-raspberry hover:underline">contact us</Link>.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
