"use client";
import { createClient } from "@supabase/supabase-js";

export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY!
);
