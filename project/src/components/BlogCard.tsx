import { BlogPost } from '../types';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article 
      className={`bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
        featured ? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-8' : ''
      }`}
    >
      <div className={`relative ${featured ? 'h-full min-h-[300px]' : 'h-48'}`}>
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#003366] text-white px-3 py-1 rounded-full text-sm font-open-sans">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={post.author.image}
            alt={post.author.name}
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <p className="font-semibold text-[#003366] font-montserrat">
              {post.author.name}
            </p>
            <p className="text-gray-500 text-sm font-open-sans">
              {post.author.role}
            </p>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3 text-[#003366] font-montserrat">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2 font-open-sans">
          {post.description}
        </p>
        <div className="flex items-center text-gray-500 text-sm mb-4 font-open-sans">
          <Calendar className="w-4 h-4 mr-2" />
          {format(new Date(post.publishedAt), 'dd MMMM yyyy', { locale: fr })}
          <Clock className="w-4 h-4 ml-4 mr-2" />
          {post.readingTime} min de lecture
        </div>
        <a
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-[#ff6600] hover:text-[#e65c00] font-semibold"
        >
          Lire l'article
          <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </article>
  );
}