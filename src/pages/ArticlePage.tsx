import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import { blogPosts, categories } from '../data/blog';
import type { BlogPost } from '../types';

interface ArticlePageProps {
  slug: string;
}

export default function ArticlePage({ slug }: ArticlePageProps) {
  const [articleRef, articleInView] = useInView({ triggerOnce: true });
  const [relatedRef, relatedInView] = useInView({ triggerOnce: true });

  const article = blogPosts.find((post) => post.slug === slug);
  const category = article ? categories.find((cat) => cat.id === article.category) : null;

  // Get related articles from the same category
  const relatedArticles = article
    ? blogPosts
        .filter((post) => post.category === article.category && post.slug !== article.slug)
        .slice(0, 3)
    : [];

  if (!article) {
    return (
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-center text-[#003366] font-montserrat">
            Article non trouvé
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-cover bg-center">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 51, 102, 0.7), rgba(0, 51, 102, 0.7)), url(${article.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <span className="inline-block bg-[#ff6600] text-white px-4 py-1 rounded-full text-sm mb-6 font-open-sans">
              {category?.name}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat">
              {article.title}
            </h1>
            <div className="flex items-center justify-center mb-8">
              <img
                src={article.author.image}
                alt={article.author.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="text-left">
                <p className="font-semibold font-montserrat">{article.author.name}</p>
                <p className="text-sm font-open-sans">{article.author.role}</p>
              </div>
            </div>
            <div className="flex items-center justify-center text-sm font-open-sans">
              <Calendar className="w-4 h-4 mr-2" />
              {format(new Date(article.publishedAt), 'dd MMMM yyyy', { locale: fr })}
              <Clock className="w-4 h-4 ml-6 mr-2" />
              {article.readingTime} min de lecture
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section ref={articleRef} className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className={`max-w-3xl mx-auto transform transition-all duration-1000 ${
            articleInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
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

            {/* Author Bio */}
            <div className="mt-12 p-8 bg-[#f5f5f5] rounded-lg">
              <div className="flex items-center mb-4">
                <img
                  src={article.author.image}
                  alt={article.author.name}
                  className="w-16 h-16 rounded-full mr-6"
                />
                <div>
                  <h3 className="text-xl font-bold text-[#003366] font-montserrat">
                    {article.author.name}
                  </h3>
                  <p className="text-gray-600 font-open-sans">{article.author.role}</p>
                </div>
              </div>
              <p className="text-gray-600 font-open-sans">
                Expert en domotique et automatisation, passionné par les nouvelles technologies
                et l'innovation dans l'habitat connecté.
              </p>
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
              {relatedArticles.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-[#003366] font-montserrat">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 font-open-sans">
                      {post.description}
                    </p>
                    <a
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-[#ff6600] hover:text-[#e65c00] font-semibold"
                    >
                      Lire l'article
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-[#003366]">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white font-montserrat">
            Restez informé
          </h2>
          <p className="text-xl mb-8 text-white font-open-sans">
            Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et conseils
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <div className="relative flex-grow">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
                />
              </div>
              <button className="bg-[#ff6600] text-white px-6 py-3 rounded-lg hover:bg-[#e65c00] transition-colors font-open-sans">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}