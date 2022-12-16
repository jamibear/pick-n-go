import { createClient } from "@supabase/supabase-js";

const supabaseUrl = `https://mtvjqfbmffncybjbxixp.supabase.co`;
const supabaseAnonKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10dmpxZmJtZmZuY3liamJ4aXhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1ODAwMTIsImV4cCI6MTk4MzE1NjAxMn0.JHAMr3ilWB8Jv5iv6cDPPZMkBXI9nmhk0fFNN2nSZng`;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
