import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "CRITICAL ERROR: Supabase environment variables are not loaded."
  );
  console.log("SUPABASE_URL loaded:", !!supabaseUrl); // true or false
  console.log("SUPABASE_ANON_KEY loaded:", !!supabaseAnonKey); // true or false
} else {
  console.log("Supabase environment variables loaded successfully.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
