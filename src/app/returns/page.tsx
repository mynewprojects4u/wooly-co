import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-oat">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-20">
        <h1 className="font-fraunces text-4xl font-bold text-ink mb-8 text-center">Returns & Refunds</h1>
        <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6 text-ink/80">
          <p className="text-xl font-bold text-raspberry-deep">All Sales Are Final</p>
          <p>Because every item at Wooly & Co. is meticulously handmade and often made-to-order, <strong>we do not accept returns, exchanges, or issue refunds</strong> once an order is placed.</p>
          
          <h2 className="font-bold text-ink text-xl mt-8 mb-4">Sizing & Fit</h2>
          <p>As sizes and measurements can vary slightly due to the handmade nature of each piece, please review our size guide carefully on the product page before ordering. We are unable to offer exchanges or refunds for fit issues.</p>
          
          <h2 className="font-bold text-ink text-xl mt-8 mb-4">Exceptions (Damaged or Incorrect Items)</h2>
          <p>We only accept requests for replacement if your item arrives damaged in transit or if we accidentally sent you the wrong item. Please <Link href="/contact" className="text-raspberry hover:underline">contact us</Link> within 48 hours of delivery with photographic evidence. We will evaluate the issue and make it right.</p>

          <h2 className="font-bold text-ink text-xl mt-8 mb-4">Cash on Delivery (COD) Returns</h2>
          <p>Refusal to accept a COD order at the time of delivery will result in permanent ban from placing future COD orders, as we incur non-refundable return-to-origin shipping costs on handcrafted items.</p>

          <h2 className="font-bold text-ink text-xl mt-8 mb-4">Cancellations</h2>
          <p>Orders cannot be cancelled or modified once they have been submitted. Please review your order carefully before checking out.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
