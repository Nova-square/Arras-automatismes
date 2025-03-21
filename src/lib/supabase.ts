import { createClient } from '@supabase/supabase-js';

// Ensure environment variables are defined and properly formatted
let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate and format the Supabase URL
if (supabaseUrl && !supabaseUrl.startsWith('http')) {
  supabaseUrl = `https://${supabaseUrl}`;
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Les variables d\'environnement VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont requises'
  );
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(
    'VITE_SUPABASE_URL invalide. Format attendu: https://your-project.supabase.co'
  );
}

// Créer le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// API pour le contenu premium
export const premiumContent = {
  async getArticles() {
    const { data, error } = await supabase
      .from('premium_articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getArticleBySlug(slug: string) {
    const { data, error } = await supabase
      .from('premium_articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;
    return data;
  },

  async getCategories() {
    const { data, error } = await supabase
      .from('premium_categories')
      .select('*')
      .order('order_position', { ascending: true });

    if (error) throw error;
    return data;
  },

  async searchArticles(query: string) {
    const { data, error } = await supabase
      .from('premium_articles')
      .select('*')
      .eq('published', true)
      .textSearch('search_vector', query)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};