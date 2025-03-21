import { PremiumCategory } from '../types';

interface PremiumCategoryFilterProps {
  categories: PremiumCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function PremiumCategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: PremiumCategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <button
        className={`px-6 py-2 rounded-full font-semibold transition-colors ${
          activeCategory === ''
            ? 'bg-[#003366] text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-[#ff6600] hover:text-white'
        }`}
        onClick={() => onCategoryChange('')}
      >
        Tous les articles
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`px-6 py-2 rounded-full font-semibold transition-colors ${
            activeCategory === category.id
              ? 'bg-[#003366] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-[#ff6600] hover:text-white'
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}