"use client";

import { createBrowserClient } from "@supabase/ssr";

// import { Database } from "@/types/db//database.types";

export default function createClient() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return supabase;
}

export const supabaseClient = createClient();
