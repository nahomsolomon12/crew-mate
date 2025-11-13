// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://LINK.supabase.co";
const SUPABASE_ANON_KEY = "key-goes-here";



export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
