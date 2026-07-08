"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-oat">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-20 text-center">
        <h1 className="font-fraunces text-4xl font-bold text-ink mb-6">Contact Us</h1>
        <p className="text-ink/80 mb-10">Have a question or want to request a custom order? Reach out to us below.</p>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm text-left max-w-xl mx-auto">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-ink mb-2">Name</label>
              <input type="text" className="w-full bg-oat/50 border border-line rounded-lg px-4 py-3 outline-none focus:border-raspberry" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink mb-2">Email</label>
              <input type="email" className="w-full bg-oat/50 border border-line rounded-lg px-4 py-3 outline-none focus:border-raspberry" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink mb-2">Message</label>
              <textarea rows={5} className="w-full bg-oat/50 border border-line rounded-lg px-4 py-3 outline-none focus:border-raspberry resize-none"></textarea>
            </div>
            <button type="button" onClick={() => alert("Message sent successfully!")} className="w-full bg-raspberry text-white font-bold py-4 rounded-xl hover:bg-raspberry-deep transition-colors mt-4">
              Send Message
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
