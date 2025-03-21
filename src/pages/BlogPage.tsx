import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Search } from 'lucide-react';
import { blogPosts, categories } from '../data/blog';
import type { BlogPost } from '../types';
import BlogCard from '../components/BlogCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import NewsletterSignup from '../components/NewsletterSignup';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [introRef, introInView] = useInView({ triggerOnce: true });
  const [featuredRef, featuredInView] = useInView({ triggerOnce: true });
  const [postsRef, postsInView] = useInView({ triggerOnce: true });

  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter((post) => {
    if (activeCategory && post.category !== activeCategory) return false;
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.description.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  // Get featured post
  const featuredPost = blogPosts.find((post) => post.featured);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section ref={introRef} className="py-16 px-4 bg-white">
        <div className={`container mx-auto transform transition-all duration-1000 ${
          introInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#003366] font-montserrat">
            Blog Domotique
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-4xl mx-auto mb-12 font-open-sans">
            Découvrez nos articles, guides et conseils pour tout savoir sur la domotique
            et l'automatisation de votre habitat.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Rechercher un article..."
            />
          </div>

          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section ref={featuredRef} className="py-16 px-4 bg-[#f5f5f5]">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-[#003366] font-montserrat">
              À la une
            </h2>
            <div className={`transform transition-all duration-1000 ${
              featuredInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="mb-12">
                <BlogCard post={featuredPost} featured />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section ref={postsRef} className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transform transition-all duration-1000 ${
            postsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSignup />
    </div>
  );
}