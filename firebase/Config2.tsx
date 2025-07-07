import { createClient } from "@supabase/supabase-js";


// Create a single supabase client for interacting with your database
export const supabase = 
createClient(
    'https://jfepsomxwxkcmkfzwryx.supabase.co', 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmZXBzb214d3hrY21rZnp3cnl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NjcwMTIsImV4cCI6MjA2NzE0MzAxMn0.Fqe7hkMm_ElG3fVuRSTg9bvi4ooYztLLB6TYbQFEQwk')