import { createClient } from "@supabase/supabase-js";

const url = "https://jvymxsqwhpsnductyjgz.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2eW14c3F3aHBzbmR1Y3R5amd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2MzI3MDcsImV4cCI6MjA1MzIwODcwN30.s_WOOQnWgzi-lI7oPVvz0ipivQWzgPQ5sPxhoHhuMeI";
export const Supabase = createClient(url, key);
