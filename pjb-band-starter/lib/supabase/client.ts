import { createBrowserClient } from "@supabase/ssr";

/** Create the browser-side Supabase client when environment variables are configured. */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase is not configured. Add the public URL and anon key to .env.local.");
  }

  return createBrowserClient(url, anonKey);
}
