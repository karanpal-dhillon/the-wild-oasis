import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ljrmzpfaurmckuyrytkk.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;

const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqcm16cGZhdXJtY2t1eXJ5dGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNjgzOTgsImV4cCI6MjAyNTc0NDM5OH0.vhTDipFNI2EyeKCdDFvu45AQEysOiZnqvlWG-QWAfsk`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
