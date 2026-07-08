"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('mode') === 'signup') {
      setIsLogin(false);
    }
  }, [searchParams]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!supabase) {
      setError("Database connection error");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw new Error(error.message);
        }

        // Redirect based on role
        if (data.user?.email === 'suhanisharma180801@gmail.com') {
          router.push("/dashboard");
        } else {
          router.push("/account");
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          throw new Error(error.message);
        }

        if (data.user?.identities?.length === 0) {
           alert("An account with this email already exists.");
           setIsLogin(true);
        } else {
           alert("Signup Successful! You are now logged in.");
           router.push("/account");
        }
      }
      
      router.refresh();
      
    } catch (err: any) {
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-oat">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-rose/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-raspberry to-rose"></div>
          
          <h1 className="font-fraunces text-3xl font-bold text-ink mb-2">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-ink/60 mb-8">
            {isLogin ? "Log in to view your orders and saved items." : "Sign up to track orders and save your favorites."}
          </p>

          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-ink/80 uppercase tracking-wide mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-oat/50 border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-raspberry transition-colors"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-ink/80 uppercase tracking-wide mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-oat/50 border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-raspberry transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-xs font-bold text-raspberry bg-rose/20 p-3 rounded-lg border border-rose/30">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-raspberry text-white font-bold py-3 rounded-xl shadow-md hover:bg-raspberry-deep transition-colors mt-2 disabled:opacity-70"
            >
              {loading ? "Processing..." : (isLogin ? "Log In" : "Sign Up")}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-ink/60">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); setError(null); }} 
              className="font-bold text-raspberry hover:text-raspberry-deep underline underline-offset-2"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-oat text-ink/60">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
