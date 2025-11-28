"use client";

import { Database } from "@/types/db/database.type";
import { createBrowserClient } from "@supabase/ssr";

// import { Database } from "@/types/db//database.types";

export default function createClient() {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    , {
      db: {
        schema: "public",
      }
    }
  );

  return supabase;
}

export const supabaseClient = createClient();
