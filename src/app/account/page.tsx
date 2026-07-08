import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  // Basic Auth Check
  if (!user) {
    redirect("/login");
  }

  const isOwner = user.email === 'suhanisharma180801@gmail.com';
  const userEmail = user.email || 'user@example.com';

  return (
    <div className="min-h-screen flex flex-col bg-oat">
      <Header />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Menu */}
          <aside className="w-full md:w-64 flex flex-col gap-2">
            <div className="bg-white p-6 rounded-3xl border border-rose/30 shadow-sm mb-4">
              <div className="w-12 h-12 bg-rose rounded-full flex items-center justify-center text-xl mb-3">
                👤
              </div>
              <p className="font-bold text-ink truncate" title={userEmail}>{userEmail}</p>
              <p className="text-xs text-ink/60">Member since 2024</p>
            </div>
            
            <nav className="flex flex-col gap-1">
              <button className="text-left px-4 py-3 rounded-xl bg-raspberry text-white font-bold transition-colors">
                My Orders
              </button>
              <button className="text-left px-4 py-3 rounded-xl bg-transparent text-ink hover:bg-rose/20 transition-colors">
                Saved Items
              </button>
              <button className="text-left px-4 py-3 rounded-xl bg-transparent text-ink hover:bg-rose/20 transition-colors">
                Account Settings
              </button>
              
              {isOwner && (
                <div className="mt-4 pt-4 border-t border-rose/30">
                  <p className="px-4 text-xs font-bold text-ink/60 uppercase tracking-wide mb-2">Admin</p>
                  <Link href="/dashboard" className="block w-full text-left px-4 py-3 rounded-xl bg-sage/20 text-sage-dark font-bold hover:bg-sage/40 transition-colors">
                    ⚙️ Owner Dashboard
                  </Link>
                </div>
              )}
            </nav>
          </aside>

          {/* Main Content */}
          <section className="flex-1">
            <h1 className="font-fraunces text-3xl font-bold text-ink mb-6">Recent Orders</h1>
            
            {/* Mock Order List */}
            <div className="bg-white p-6 rounded-3xl border border-rose/30 shadow-sm mb-4">
              <div className="flex justify-between items-center border-b border-line pb-4 mb-4">
                <div>
                  <p className="font-mono text-sm font-bold text-ink">WLY-842914</p>
                  <p className="text-xs text-ink/60">Placed on Oct 24, 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-raspberry-deep">₹899</p>
                  <span className="font-mono text-[10px] uppercase font-bold text-raspberry bg-rose/30 px-2 py-1 rounded-md">
                    Being Crocheted
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-rose rounded-xl flex items-center justify-center text-3xl">
                  🧣
                </div>
                <div>
                  <p className="font-bold text-ink text-sm">Cloud Scarf</p>
                  <p className="text-xs text-ink/60">Color: Rose • Qty: 1</p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-line">
                <button className="text-sm font-bold text-raspberry hover:underline">Track Package</button>
              </div>
            </div>

            <div className="bg-oat/50 border border-line border-dashed p-8 rounded-3xl text-center text-ink/60">
              No more past orders found. Time to treat yourself!
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
