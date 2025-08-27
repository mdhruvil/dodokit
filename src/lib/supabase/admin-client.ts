import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../../supabase/database.types";

export function createAdminClient() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
  );
  return supabase;
}
