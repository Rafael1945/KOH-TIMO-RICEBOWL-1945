import React from 'react';
import { motion } from 'motion/react';
import { Flame, Sparkles } from 'lucide-react';
import { DEMO_PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

export const BestSeller: React.FC = () => {
  const bestSellers = DEMO_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section id="best-seller" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-bold uppercase tracking-wider mb-3">
              <Flame className="w-3.5 h-3.5 fill-[#E85D04]" />
              Menu Paling Laris & Favorit
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#241A14] tracking-tight">
              Yang Paling Sering Balik Lagi
            </h2>
            <p className="text-base text-[#57463A] mt-2 max-w-xl">
              Bingung mau pilih yang mana? Mulai dari favorit pelanggan kami yang sudah terbukti bikin nagih!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#57463A] bg-[#FFF7E8] px-3 py-1.5 rounded-full border border-[#241A14]/10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB703]" />
              <span>*Data Menu & Harga DEMO</span>
            </span>
          </div>
        </div>

        {/* Best Seller Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductCard product={product} featured={true} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
