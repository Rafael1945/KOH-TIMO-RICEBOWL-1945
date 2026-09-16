import React from 'react';
import { ProductCategory } from '../types';

interface CategoryFilterProps {
  activeCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  categoryCounts: Record<ProductCategory, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const categories: { id: ProductCategory; label: string; icon: string }[] = [
    { id: 'semua', label: 'Semua Menu', icon: '✨' },
    { id: 'ricebowl', label: 'Ricebowl', icon: '🍚' },
    { id: 'ayam', label: 'Ayam', icon: '🍗' },
    { id: 'sapi', label: 'Sapi', icon: '🥩' },
    { id: 'snack', label: 'Snack', icon: '🥟' },
    { id: 'minuman', label: 'Minuman', icon: '🥤' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        const count = categoryCounts[cat.id] || 0;
        return (
          <button
            key={cat.id}
            id={`filter-category-${cat.id}`}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 shrink-0 ${
              isActive
                ? 'bg-[#E85D04] text-white shadow-md shadow-[#E85D04]/25 scale-[1.02]'
                : 'bg-white hover:bg-[#FFF7E8] text-[#241A14] border border-[#241A14]/10 hover:border-[#E85D04]/30'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-[#241A14]/5 text-[#57463A]'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
