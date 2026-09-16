import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UtensilsCrossed, AlertCircle } from 'lucide-react';
import { DEMO_PRODUCTS } from '../data/products';
import { ProductCategory } from '../types';
import { CategoryFilter } from './CategoryFilter';
import { SearchBar } from './SearchBar';
import { ProductCard } from './ProductCard';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<ProductCategory, number> = {
      semua: DEMO_PRODUCTS.length,
      ricebowl: DEMO_PRODUCTS.filter((p) => p.category === 'ricebowl').length,
      ayam: DEMO_PRODUCTS.filter((p) => p.subCategory === 'ayam').length,
      sapi: DEMO_PRODUCTS.filter((p) => p.subCategory === 'sapi').length,
      snack: DEMO_PRODUCTS.filter((p) => p.category === 'snack').length,
      minuman: DEMO_PRODUCTS.filter((p) => p.category === 'minuman').length,
    };
    return counts;
  }, []);

  // Filtered products logic
  const filteredProducts = useMemo(() => {
    return DEMO_PRODUCTS.filter((product) => {
      // Category filter match
      let matchesCategory = true;
      if (activeCategory === 'ricebowl') {
        matchesCategory = product.category === 'ricebowl';
      } else if (activeCategory === 'ayam') {
        matchesCategory = product.subCategory === 'ayam';
      } else if (activeCategory === 'sapi') {
        matchesCategory = product.subCategory === 'sapi';
      } else if (activeCategory === 'snack') {
        matchesCategory = product.category === 'snack';
      } else if (activeCategory === 'minuman') {
        matchesCategory = product.category === 'minuman';
      }

      // Search query match
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        matchesSearch =
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          (product.tags && product.tags.some((t) => t.toLowerCase().includes(query)));
      }

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#FFF7E8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-bold uppercase tracking-wider mb-3">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            Daftar Menu Pilihan
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#241A14] tracking-tight mb-4">
            Mau Makan Apa Hari Ini?
          </h2>
          <p className="text-base sm:text-lg text-[#57463A]">
            Pilih ricebowl favoritmu dengan aneka lauk lezat, sambal otentik, dan pelengkap segar.
            Semua dibuat hangat saat dipesan!
          </p>
        </div>

        {/* Filters and Search Bar Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          <CategoryFilter
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            categoryCounts={categoryCounts}
          />
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        {/* Demo data notice banner */}
        <div className="mb-6 p-3 rounded-2xl bg-white/70 border border-[#241A14]/8 flex items-center justify-between text-xs text-[#57463A]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E85D04] animate-pulse" />
            <span>
              Menampilkan <strong>{filteredProducts.length}</strong> menu lezat siap order.
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#E85D04] hidden sm:inline">
            *Menu & harga simulasi DEMO
          </span>
        </div>

        {/* Product Grid: 4 columns desktop, 2 columns tablet, 2 columns mobile */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty state */
          <div className="py-16 text-center bg-white rounded-3xl border border-[#241A14]/10 p-8">
            <div className="w-16 h-16 rounded-full bg-[#FFF7E8] text-[#E85D04] flex items-center justify-center mx-auto mb-4 text-2xl">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#241A14] mb-2">
              Menu tidak ditemukan
            </h3>
            <p className="text-sm text-[#57463A] max-w-md mx-auto mb-6">
              Tidak ada menu yang sesuai dengan kata kunci &quot;{searchQuery}&quot;. Coba cari kata kunci lain seperti &quot;ayam&quot;, &quot;sambal&quot;, atau &quot;sapi&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('semua');
              }}
              className="px-5 py-2.5 rounded-2xl bg-[#E85D04] text-white font-bold text-sm hover:bg-[#D04F00] transition-colors"
            >
              Reset Filter & Pencarian
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
