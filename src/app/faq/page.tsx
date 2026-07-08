import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-oat">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-20">
        <h1 className="font-fraunces text-4xl font-bold text-ink mb-8 text-center">Frequently Asked Questions</h1>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-bold text-ink mb-2">How long does shipping take?</h2>
            <p className="text-ink/80 text-sm">Ready-to-ship items dispatch within 2-3 days, and made-to-order items typically take 1-3 weeks. Custom orders may take longer depending on complexity.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-bold text-ink mb-2">Do you ship internationally?</h2>
            <p className="text-ink/80 text-sm">Currently, we only ship within India. We hope to expand our shipping options soon!</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="font-bold text-ink mb-2">Are your amigurumi toys safe for babies?</h2>
            <p className="text-ink/80 text-sm">Yes! We use high-quality, hypoallergenic organic cotton and safety eyes. However, we always recommend adult supervision for children under 3 years old.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
