import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, Heart, Sparkles } from 'lucide-react';
import { DEMO_REVIEWS } from '../data/reviews';

export const ReviewCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FFF7E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-black uppercase tracking-wider mb-3">
              <Heart className="w-3.5 h-3.5 fill-[#E85D04]" />
              Ulasan Pelanggan Setia
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#241A14] tracking-tight">
              Kata Mereka Tentang Koh Timo ❤️
            </h2>
            <p className="text-base text-[#57463A] mt-2 max-w-xl">
              Kepuasan dan senyuman di setiap gigitan adalah kebanggaan kami. Simak cerita mereka!
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="reviews-scroll-left-btn"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Ulasan sebelumnya"
              className="w-11 h-11 rounded-2xl bg-white border border-[#241A14]/10 flex items-center justify-center text-[#241A14] hover:bg-[#E85D04] hover:text-white disabled:opacity-40 transition-all shadow-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              id="reviews-scroll-right-btn"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Ulasan berikutnya"
              className="w-11 h-11 rounded-2xl bg-white border border-[#241A14]/10 flex items-center justify-center text-[#241A14] hover:bg-[#E85D04] hover:text-white disabled:opacity-40 transition-all shadow-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-none no-scrollbar"
        >
          {DEMO_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="snap-start w-[320px] sm:w-[380px] shrink-0 bg-white rounded-3xl p-6 sm:p-7 border border-[#241A14]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#FFB703] fill-[#FFB703]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#E85D04]/20" />
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-[#241A14] leading-relaxed mb-6 font-normal">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>

              {/* Customer details footer */}
              <div className="pt-4 border-t border-[#241A14]/8 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#E85D04]/20"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-sm font-bold text-[#241A14] truncate">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-[#57463A] truncate">{rev.role}</p>
                </div>
                <div className="text-right text-[11px] text-[#57463A]/70">
                  <span>{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Disclaimer notice */}
        <div className="mt-8 text-center">
          <span className="text-xs text-[#57463A] inline-flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full border border-[#241A14]/10">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB703]" />
            <span>*Ulasan pelanggan di atas merupakan data sampel DEMO</span>
          </span>
        </div>
      </div>
    </section>
  );
};
