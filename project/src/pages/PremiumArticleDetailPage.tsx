import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Mail, ChevronRight, Star } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import { premiumContent } from '../lib/supabase';
import type { PremiumArticle } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import NewsletterSignup from '../components/NewsletterSignup';
import PremiumArticleCard from '../components/PremiumArticleCard';

interface PremiumArticleDetailPageProps {
  slug: string;
}

export default function PremiumArticleDetailPage({ slug }: PremiumArticleDetailPageProps) {
  const [article, setArticle] = useState<PremiumArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<PremiumArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [contentRef, contentInView] = useInView({ triggerOnce: true });
  const [relatedRef, relatedInView] = useInView({ triggerOnce: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleData = await premiumContent.getArticleBySlug(slug);
        setArticle(articleData);

        // Fetch related articles from the same category
        const allArticles = await premiumContent.getArticles();
        const related = allArticles
          .filter(a => a.category === articleData.category && a.id !== articleData.id)
          .slice(0, 3);
        setRelatedArticles(related);
      } catch (err) {
        setError('Erreur lors du chargement de l\'article');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-red-600">{error || 'Article non trouvé'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: article.featured_image
            ? `linear-gradient(rgba(0, 51, 102, 0.7), rgba(0, 51, 102, 0.7)), url(${article.featured_image})`
            : 'linear-gradient(rgba(0, 51, 102, 0.7), rgba(0, 51, 102, 0.7))',
        }}
      >
        <div className={`absolute inset-0 flex items-center justify-center transform transition-all duration-1000 ${
          heroInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="container mx-auto px-4 text-center text-white">
            <span className="inline-block bg-[#ff6600] text-white px-4 py-1 rounded-full text-sm mb-6 font-open-sans">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat">
              {article.title}
            </h1>
            <div className="flex items-center justify-center text-sm font-open-sans">
              <Calendar className="w-4 h-4 mr-2" />
              {format(new Date(article.created_at), 'dd MMMM yyyy', { locale: fr })}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section ref={contentRef} className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className={`max-w-3xl mx-auto transform transition-all duration-1000 ${
            contentInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Social Share */}
            <div className="flex items-center justify-center mb-12 space-x-4">
              <span className="text-gray-600 font-open-sans flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Partager
              </span>
              <button className="text-[#1877f2] hover:opacity-80 transition-opacity">
                <Facebook className="w-6 h-6" />
              </button>
              <button className="text-[#1da1f2] hover:opacity-80 transition-opacity">
                <Twitter className="w-6 h-6" />
              </button>
              <button className="text-[#0a66c2] hover:opacity-80 transition-opacity">
                <Linkedin className="w-6 h-6" />
              </button>
              <button className="text-gray-600 hover:opacity-80 transition-opacity">
                <Mail className="w-6 h-6" />
              </button>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-4xl font-bold mb-8 text-[#003366] font-montserrat">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mt-12 mb-6 text-[#003366] font-montserrat">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold mt-8 mb-4 text-[#003366] font-montserrat">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-6 text-gray-600 leading-relaxed font-open-sans">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-6 space-y-2 list-disc list-inside font-open-sans">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-6 space-y-2 list-decimal list-inside font-open-sans">
                      {children}
                    </ol>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-[#ff6600] pl-6 my-8 italic text-gray-700 font-open-sans">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section ref={relatedRef} className="py-16 px-4 bg-[#f5f5f5]">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#003366] font-montserrat">
              Articles similaires
            </h2>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transform transition-all duration-1000 ${
              relatedInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {relatedArticles.map((article) => (
                <PremiumArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <NewsletterSignup />
    </div>
  );
}