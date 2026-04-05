// Initialize Supabase from CDN globally
const supabaseUrl = 'https://ayjzjfhrbkfakkrgootl.supabase.co';
const supabaseKey = 'sb_publishable_xlDbQpfl2C38c-Drkm9aIg_yS1meBfO';

// Create a single supabase client for interacting with your database
window.supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
