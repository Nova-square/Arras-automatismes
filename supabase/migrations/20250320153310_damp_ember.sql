/*
  # Ajout des tables pour le contenu premium

  1. Nouvelles Tables
    - `premium_articles` : Articles de blog premium
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `title` (text)
      - `content` (text)
      - `excerpt` (text)
      - `category` (text)
      - `author_id` (uuid)
      - `published` (boolean)
      - `featured_image` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `search_vector` (tsvector)

    - `premium_categories` : Catégories des articles premium
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `order_position` (integer)

  2. Sécurité
    - Enable RLS sur toutes les tables
    - Politiques de sécurité pour l'accès public et authentifié

  3. Indexation
    - Index sur les slugs
    - Index de recherche full-text
    - Index sur les catégories
*/

-- Premium Articles Table
CREATE TABLE IF NOT EXISTS premium_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  category text NOT NULL,
  author_id uuid NOT NULL,
  published boolean DEFAULT false,
  featured_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('french', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('french', coalesce(content, '')), 'B')
  ) STORED
);

-- Premium Categories Table
CREATE TABLE IF NOT EXISTS premium_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  order_position integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE premium_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_categories ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Public can view published premium articles"
  ON premium_articles
  FOR SELECT
  USING (published = true);

CREATE POLICY "Public can view premium categories"
  ON premium_categories
  FOR SELECT
  USING (true);

-- Create Indexes
CREATE INDEX premium_articles_slug_idx ON premium_articles (slug);
CREATE INDEX premium_articles_category_idx ON premium_articles (category);
CREATE INDEX premium_articles_search_idx ON premium_articles USING GIN (search_vector);
CREATE INDEX premium_categories_slug_idx ON premium_categories (slug);
CREATE INDEX premium_categories_order_idx ON premium_categories (order_position);