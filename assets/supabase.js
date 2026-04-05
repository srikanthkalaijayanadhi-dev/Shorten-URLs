// Initialize Supabase from CDN globally
const supabaseUrl = 'https://placeholder.supabase.co';
const supabaseKey = 'placeholder';

// Create a single supabase client for interacting with your database
window.supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
