import { createClient } from '@supabase/supabase-js';


export const supabase = createClient(
    process.env.SUPABASE_URL, // Replace with your Supabase URL
    process.env.SUPABASE_KEY  // Replace with your Supabase API Key
);
