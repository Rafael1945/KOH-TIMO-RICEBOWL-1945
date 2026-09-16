import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Flame, Star, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { HERO_FOOD_IMAGE } from '../data/products';
import { useCart } from '../context/CartContext';
import { DEMO_PRODUCTS } from '../data/products';

export const HeroSection: React.FC = () => {
  const { setSelectedProduct } = useCart();
  const signatureProduct = DEMO_PRODUCTS[0]; // Ricebowl Ayam Sambal Matah Timo

  const scrollToMenu = () => {
    const menuSection = document.querySelector('#menu');
    if (menuSection) {
      const navHeight = 80;
      const targetPosition = menuSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleOrderHeroDish = () => {
    if (signatureProduct) {
      setSelectedProduct(signatureProduct);
    } else {
      scrollToMenu();
    }
  };

  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-32 pb-16 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FFF7E8] via-[#FFF7E8] to-[#FFF3DC]"
    >
      {/* Subtle organic background warm decorative shapes */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#FFB703]/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-48 -right-24 w-96 h-96 bg-[#E85D04]/10 rounded-full blur-2xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Brand, Headline, Subheadline, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Brand Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E85D04]/10 border border-[#E85D04]/20 text-[#E85D04] text-xs sm:text-sm font-bold mb-4"
            >
              <Flame className="w-4 h-4 text-[#E85D04] fill-[#E85D04]" />
              <span>Ricebowl Juara Rasa Khas Nusantara</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E85D04]" />
              <span className="text-[#241A14]/70 font-semibold">100% Halal</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black text-[#241A14] tracking-tight leading-[1.08] mb-5"
            >
              NASI BOWL ENAK,{' '}
              <span className="text-[#E85D04] inline-block underline decoration-[#FFB703] decoration-wavy decoration-from-font underline-offset-8">
                BIKIN NAGIH.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-[#57463A] max-w-xl font-normal leading-relaxed mb-8"
            >
              Ricebowl praktis dengan rasa yang bikin makan sederhana jadi luar biasa.
              Dibuat fresh setiap hari dengan bahan berkualitas dan bumbu rempah otentik.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <button
                id="hero-primary-cta"
                type="button"
                onClick={scrollToMenu}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#E85D04] hover:bg-[#D04F00] text-white text-base sm:text-lg font-extrabold shadow-xl shadow-[#E85D04]/30 hover:shadow-[#E85D04]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
              >
                <span className="text-xl">🍚</span>
                <span>Pesan Sekarang</span>
              </button>

              <button
                id="hero-secondary-cta"
                type="button"
                onClick={scrollToMenu}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-[#FFF7E8] text-[#241A14] border-2 border-[#241A14]/15 hover:border-[#E85D04]/40 text-base font-bold transition-all flex items-center justify-center gap-2 group"
              >
                <span>Lihat Menu</span>
                <ArrowDown className="w-4 h-4 text-[#E85D04] group-hover:translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Quick Value Metrics & Reassurance */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 pt-6 border-t border-[#241A14]/10 w-full max-w-lg grid grid-cols-3 gap-3 text-left"
            >
              <div>
                <p className="font-heading text-lg sm:text-xl font-extrabold text-[#241A14]">
                  Rp 22rb-an<span className="text-xs font-normal text-[#57463A] block">*Harga Demo</span>
                </p>
                <p className="text-xs text-[#57463A]">Ramah di Kantong</p>
              </div>
              <div className="border-l border-[#241A14]/10 pl-3">
                <div className="flex items-center gap-1 font-heading text-lg sm:text-xl font-extrabold text-[#241A14]">
                  <Star className="w-4 h-4 text-[#FFB703] fill-[#FFB703]" />
                  <span>4.9 / 5.0</span>
                </div>
                <p className="text-xs text-[#57463A]">5.000+ Ulasan Puas</p>
              </div>
              <div className="border-l border-[#241A14]/10 pl-3">
                <p className="font-heading text-lg sm:text-xl font-extrabold text-[#241A14] flex items-center gap-1">
                  <Clock className="w-4 h-4 text-[#E85D04]" />
                  <span>10 Menit</span>
                </p>
                <p className="text-xs text-[#57463A]">Cepat & Fresh</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Food Visual */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-square"
            >
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-[#E85D04] via-[#FFB703] to-[#E85D04] p-1.5 shadow-2xl shadow-[#E85D04]/30 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full rounded-[34px] overflow-hidden bg-white relative group">
                  <img
                    id="hero-food-visual"
                    src={HERO_FOOD_IMAGE}
                    alt="Ricebowl Ayam Sambal Matah Koh Timo"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient bottom overlay for label clarity */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241A14]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Food quick card details in bottom of photo */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFB703] text-[#241A14] text-[11px] font-extrabold uppercase mb-1">
                          Signature Dish ⭐
                        </span>
                        <h3 className="font-heading text-lg sm:text-xl font-bold leading-tight drop-shadow-sm">
                          Ayam Sambal Matah Timo
                        </h3>
                        <p className="text-xs text-white/90">Ayam krispi + telur omega + nasi hangat</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-white/80 block line-through">Rp 32.000</span>
                        <span className="font-heading text-lg sm:text-xl font-extrabold text-[#FFB703]">
                          Rp 28.000
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Freshly Cooked */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -top-4 -left-4 sm:-left-6 bg-white rounded-2xl p-3 sm:p-3.5 shadow-xl border border-[#241A14]/10 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E85D04]/10 text-[#E85D04] flex items-center justify-center font-bold text-lg">
                  🔥
                </div>
                <div>
                  <p className="text-xs text-[#57463A] font-medium">Bumbu Segar</p>
                  <p className="font-heading text-sm font-bold text-[#241A14]">Made by Order</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Best Value / Order Now button */}
              <motion.button
                type="button"
                onClick={handleOrderHeroDish}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                id="hero-dish-quick-order-btn"
                className="absolute -bottom-5 -right-3 sm:-right-5 bg-[#241A14] hover:bg-[#E85D04] text-white rounded-2xl p-3 sm:px-4 sm:py-3 shadow-xl border border-white/20 flex items-center gap-3 z-20 group transition-all duration-200 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FFB703] text-[#241A14] flex items-center justify-center font-extrabold text-sm group-hover:scale-110 transition-transform">
                  +
                </div>
                <div className="text-left">
                  <p className="text-[11px] text-white/80 uppercase font-semibold tracking-wider">Coba Menu Ini</p>
                  <p className="font-heading text-xs sm:text-sm font-bold text-white flex items-center gap-1">
                    <span>Pesan Langsung</span>
                    <span className="text-[#FFB703]">→</span>
                  </p>
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
