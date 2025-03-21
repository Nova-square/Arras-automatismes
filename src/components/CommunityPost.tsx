import { Star, MessageSquare } from 'lucide-react';

interface CommunityPostProps {
  post: {
    id: number;
    author: {
      name: string;
      avatar: string;
    };
    title: string;
    content: string;
    likes: number;
    comments: number;
    date: string;
  };
}

export default function CommunityPost({ post }: CommunityPostProps) {
  return (
    <div className="border-b pb-6 last:border-b-0 last:pb-0">
      <div className="flex items-center mb-4">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <p className="font-semibold text-[#003366] font-montserrat">
            {post.author.name}
          </p>
          <p className="text-sm text-gray-500 font-open-sans">
            {new Date(post.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 text-[#003366] font-montserrat">
        {post.title}
      </h3>
      <p className="text-gray-600 mb-4 font-open-sans">
        {post.content}
      </p>
      <div className="flex items-center space-x-6 text-gray-500">
        <button className="flex items-center hover:text-[#ff6600]">
          <Star className="w-5 h-5 mr-2" />
          {post.likes}
        </button>
        <button className="flex items-center hover:text-[#ff6600]">
          <MessageSquare className="w-5 h-5 mr-2" />
          {post.comments}
        </button>
      </div>
    </div>
  );
}