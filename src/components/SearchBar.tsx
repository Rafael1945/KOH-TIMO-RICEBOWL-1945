import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full md:w-80">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#57463A]">
        <Search className="w-4 h-4 text-[#E85D04]" />
      </div>
      <input
        type="text"
        id="menu-search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Cari menu favoritmu..."
        className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#241A14]/15 rounded-2xl text-xs sm:text-sm text-[#241A14] placeholder-[#57463A]/60 focus:outline-none focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20 transition-all shadow-xs"
      />
      {searchQuery && (
        <button
          type="button"
          id="clear-search-btn"
          onClick={() => setSearchQuery('')}
          aria-label="Hapus pencarian"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#57463A] hover:text-[#E85D04]"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
