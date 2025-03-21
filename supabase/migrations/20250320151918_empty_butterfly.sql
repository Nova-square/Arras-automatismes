/*
  # Add Premium Content Tables

  1. New Tables
    - `premium_projects`
      - High-end project showcase
      - Detailed features and specifications
      - Client testimonials (anonymized)
    
    - `luxury_services`
      - Premium service offerings
      - Detailed service features
      - Exclusive benefits

  2. Security
    - Enable RLS on all tables
    - Public read access for published content
    - Admin-only write access
*/

-- Premium Projects Table
CREATE TABLE IF NOT EXISTS premium_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  images jsonb NOT NULL DEFAULT '[]',
  features text[] NOT NULL DEFAULT '{}',
  specifications jsonb NOT NULL DEFAULT '{}',
  client_name text,
  completion_date date,
  testimonial jsonb,
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Luxury Services Table
CREATE TABLE IF NOT EXISTS luxury_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  benefits jsonb NOT NULL DEFAULT '{}',
  image_url text,
  order_position integer,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE premium_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE luxury_services ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Public can view published premium projects"
  ON premium_projects
  FOR SELECT
  USING (published = true);

CREATE POLICY "Public can view published luxury services"
  ON luxury_services
  FOR SELECT
  USING (published = true);

-- Create Indexes
CREATE INDEX premium_projects_category_idx ON premium_projects (category);
CREATE INDEX premium_projects_featured_idx ON premium_projects (featured) WHERE featured = true;
CREATE INDEX luxury_services_order_idx ON luxury_services (order_position);

-- Add Search Capabilities
ALTER TABLE premium_projects ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('french', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('french', coalesce(description, '')), 'B')
  ) STORED;

CREATE INDEX premium_projects_search_idx ON premium_projects USING GIN (search_vector);