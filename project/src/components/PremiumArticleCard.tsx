import { PremiumArticle } from '../types';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface PremiumArticleCardProps {
  article: PremiumArticle;
  featured?: boolean;
}

export default function PremiumArticleCard({ article, featured = false }: PremiumArticleCardProps) {
  return (
    <article 
      className={`bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
        featured ? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-8' : ''
      }`}
    >
      {article.featured_image && (
        <div className={`relative ${featured ? 'h-full min-h-[300px]' : 'h-48'}`}>
          <img
            src={article.featured_image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-[#003366] text-white px-3 py-1 rounded-full text-sm font-open-sans">
              {article.category}
            </span>
          </div>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-[#003366] font-montserrat">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-2 font-open-sans">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center text-gray-500 text-sm mb-4 font-open-sans">
          <Calendar className="w-4 h-4 mr-2" />
          {format(new Date(article.created_at), 'dd MMMM yyyy', { locale: fr })}
        </div>
        <a
          href={`/premium/${article.slug}`}
          className="inline-flex items-center text-[#ff6600] hover:text-[#e65c00] font-semibold"
        >
          Lire l'article
          <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </article>
  );
}