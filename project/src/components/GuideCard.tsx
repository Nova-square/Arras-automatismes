import { ResourceGuide } from '../types';
import { Download } from 'lucide-react';

interface GuideCardProps {
  guide: ResourceGuide;
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <img
        src={guide.thumbnail}
        alt={guide.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <span className="inline-block bg-[#003366] text-white px-3 py-1 rounded-full text-sm mb-4 font-open-sans">
          {guide.category}
        </span>
        <h3 className="text-xl font-bold mb-2 text-[#003366] font-montserrat">
          {guide.title}
        </h3>
        <p className="text-gray-600 mb-4 font-open-sans">
          {guide.description}
        </p>
        <a
          href={guide.pdfUrl}
          className="inline-flex items-center text-[#ff6600] hover:text-[#e65c00] font-semibold"
        >
          <Download className="w-5 h-5 mr-2" />
          Télécharger le PDF
        </a>
      </div>
    </div>
  );
}