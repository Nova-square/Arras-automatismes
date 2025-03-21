export interface NavItem {
  label: string;
  href: string;
}

export interface Solution {
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  features: string[];
  client_name?: string;
  completion_date?: string;
  testimonial?: {
    text: string;
    rating: number;
  };
}

export interface LuxuryService {
  title: string;
  description: string;
  features: string[];
}

export interface PremiumArticle {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  author_id: string;
  published: boolean;
  featured_image?: string;
  created_at: string;
  updated_at: string;
}

export interface PremiumCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order_position?: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  publishedAt: string;
  readingTime: number;
  image: string;
  content: string;
  featured?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
}

export interface ResourceGuide {
  id: string;
  title: string;
  category: string;
  description: string;
  pdfUrl: string;
  thumbnail: string;
}

export interface VideoTutorial {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

export interface TechnicalDoc {
  title: string;
  type: string;
  size: string;
  url: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}


export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  publishedAt: string;
  readingTime: number;
  image: string;
  content: string;
  featured?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
}

export interface ResourceGuide {
  id: string;
  title: string;
  category: string;
  description: string;
  pdfUrl: string;
  thumbnail: string;
}

export interface VideoTutorial {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

export interface TechnicalDoc {
  title: string;
  type: string;
  size: string;
  url: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}