import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { premiumContent } from '../lib/supabase';
import type { PremiumArticle, PremiumCategory } from '../types';
import PremiumArticleCard from '../components/PremiumArticleCard';
import PremiumCategoryFilter from '../components/PremiumCategoryFilter';
import SearchBar from '../components/SearchBar';
import NewsletterSignup from '../components/NewsletterSignup';

export default function PremiumArticlesPage() {
  const [articles, setArticles] = useState<PremiumArticle[]>([]);
  const [categories, setCategories] = useState<PremiumCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [introRef, introInView] = useInView({ triggerOnce: true });
  const [contentRef, contentInView] = useInView({ triggerOnce: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesData, categoriesData] = await Promise.all([
          premiumContent.getArticles(),
          premiumContent.getCategories()
        ]);
        setArticles(articlesData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Erreur lors du chargement des articles');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter articles based on category and search query
  const filteredArticles = articles.filter((article) => {
    if (activeCategory && article.category !== activeCategory) return false;
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(searchLower) ||
        (article.excerpt?.toLowerCase().includes(searchLower) ?? false)
      );
    }
    return true;
  });

  if (error) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section ref={introRef} className="py-16 px-4 bg-white">
        <div className={`container mx-auto transform transition-all duration-1000 ${
          introInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#003366] font-montserrat">
            Articles Premium
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-4xl mx-auto mb-12 font-open-sans">
            Découvrez nos articles exclusifs sur les dernières innovations en matière de domotique et d'automatisation
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Rechercher un article..."
            />
          </div>

          {/* Categories */}
          <PremiumCategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </section>

      {/* Articles Grid */}
      <section ref={contentRef} className="py-16 px-4 bg-[#f5f5f5]">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-[#ff6600] border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transform transition-all duration-1000 ${
              contentInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {filteredArticles.map((article) => (
                <PremiumArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSignup />
    </div>
  );
}