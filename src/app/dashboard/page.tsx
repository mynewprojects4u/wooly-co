import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  // Route is protected by middleware

  return (
    <div className="min-h-screen flex flex-col bg-oat">
      <Header />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8 border-b border-rose/30 pb-4">
          <div>
            <h1 className="font-fraunces text-3xl font-bold text-ink mb-1">Owner Dashboard</h1>
            <p className="text-ink/60 text-sm">Manage products, pricing, and AI metadata.</p>
          </div>
          <div className="font-mono text-[10px] uppercase font-bold text-sage bg-sage/20 px-3 py-1.5 rounded-md">
            🔒 Admin Access
          </div>
        </div>

        <DashboardClient />
      </main>

      <Footer />
    </div>
  );
}
