import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  if (!url || !key) {
    console.warn('⚠️ Supabase URL and Anon Key are missing. Using mock/local data fallback.');
    return null;
  }

  return createBrowserClient(url, key)
}
