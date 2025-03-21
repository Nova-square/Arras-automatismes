import { FAQ } from '../types';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface FAQItemProps {
  faq: FAQ;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function FAQItem({ faq, isExpanded, onToggle }: FAQItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center"
        onClick={onToggle}
      >
        <span className="font-semibold text-[#003366] font-montserrat">
          {faq.question}
        </span>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-[#ff6600]" />
        ) : (
          <ChevronRight className="w-5 h-5 text-[#ff6600]" />
        )}
      </button>
      {isExpanded && (
        <div className="px-6 py-4 bg-gray-50 font-open-sans">
          {faq.answer}
        </div>
      )}
    </div>
  );
}