// Supabase bağlantısı
import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://gxojgqzxtiadyosxqito.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4b2pncXp4dGlhZHlvc3hxaXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NjY3OTksImV4cCI6MjA2MzQ0Mjc5OX0.LC4WLpcVMGM3B9HFG4koJjJv4ICWD3778_mf3ZN9tDs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
