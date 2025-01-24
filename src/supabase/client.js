import { createClient } from "@supabase/supabase-js";

const env1 = import.meta.env.VITE_SUPABASE_URL;
const env2 = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const Supabase = createClient(env1, env2);
