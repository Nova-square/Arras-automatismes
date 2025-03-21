/*
  # Initial Schema Setup

  1. New Tables
    - projects
      - Project portfolio entries with details and images
    - blog_posts
      - Blog articles with content and metadata
    - quote_requests
      - Customer quote requests with details
    - contacts
      - Contact form submissions
    - newsletter_subscribers
      - Email subscribers for newsletter

  2. Security
    - Enable RLS on all tables
    - Add policies for data access
    - Secure customer data

  3. Indexes
    - Optimize query performance
    - Enable full-text search
*/

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  images jsonb NOT NULL DEFAULT '[]',
  features text[] NOT NULL DEFAULT '{}',
  client_name text,
  completion_date date,
  testimonial jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  author_id uuid NOT NULL,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  published boolean DEFAULT false,
  published_at timestamptz,
  featured_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Quote requests table
CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  project_type text NOT NULL,
  description text NOT NULL,
  budget numeric,
  preferred_contact_method text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  status text DEFAULT 'unread',
  created_at timestamptz DEFAULT now()
);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  active boolean DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public projects are viewable by everyone"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Public blog posts are viewable by everyone"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Quote requests viewable by authenticated users only"
  ON quote_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Contact messages viewable by authenticated users only"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Newsletter subscribers viewable by authenticated users only"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX projects_category_idx ON projects (category);
CREATE INDEX blog_posts_slug_idx ON blog_posts (slug);
CREATE INDEX blog_posts_published_at_idx ON blog_posts (published_at);
CREATE INDEX quote_requests_status_idx ON quote_requests (status);

-- Enable full-text search
ALTER TABLE projects ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('french', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('french', coalesce(description, '')), 'B')
  ) STORED;

CREATE INDEX projects_search_idx ON projects USING GIN (search_vector);

ALTER TABLE blog_posts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('french', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('french', coalesce(content, '')), 'B')
  ) STORED;

CREATE INDEX blog_posts_search_idx ON blog_posts USING GIN (search_vector);