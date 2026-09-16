import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, Clock, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';
import { DEMO_PROMOS } from '../data/promos';
import { useCart } from '../context/CartContext';

export const PromoSection: React.FC = () => {
  const { applyPromoCode, setIsCartOpen, showToast } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Live countdown timer for the promo banner (e.g. countdown until midnight)
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`📋 Kode promo ${code} berhasil disalin!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleClaimPromo = (code: string) => {
    applyPromoCode(code);
    setIsCartOpen(true);
  };

  return (
    <section id="promo" className="py-16 sm:py-24 bg-[#FFF3DC] relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#E85D04]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FFB703]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/15 text-[#E85D04] text-xs font-black uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 fill-[#E85D04]" />
            Penawaran Spesial Koh Timo
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#241A14] tracking-tight mb-4">
            LAGI ADA PROMO NIH! 🔥
          </h2>
          <p className="text-base sm:text-lg text-[#57463A]">
            Nikmati makan puas harga hemat dengan paket promo dan voucher diskon terbatas.
          </p>

          {/* Countdown timer pill */}
          <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white shadow-md border border-[#241A14]/10">
            <Clock className="w-4 h-4 text-[#E85D04]" />
            <span className="text-xs font-bold text-[#241A14]">Promo berakhir dalam:</span>
            <div className="flex items-center gap-1 text-xs font-mono font-bold text-[#E85D04]">
              <span className="bg-[#FFF7E8] px-1.5 py-0.5 rounded-md border border-[#E85D04]/20">
                {String(timeLeft.hours).padStart(2, '0')}j
              </span>
              <span>:</span>
              <span className="bg-[#FFF7E8] px-1.5 py-0.5 rounded-md border border-[#E85D04]/20">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="bg-[#FFF7E8] px-1.5 py-0.5 rounded-md border border-[#E85D04]/20">
                {String(timeLeft.seconds).padStart(2, '0')}d
              </span>
            </div>
          </div>
        </div>

        {/* Promo Posters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {DEMO_PROMOS.map((promo, idx) => (
            <motion.div
              key={promo.id}
              id={`promo-card-${promo.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white rounded-3xl overflow-hidden border-2 border-[#241A14]/10 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Poster Image with dynamic overlay badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FFF7E8]">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-[#E85D04] text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                      {promo.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-bold text-[#FFB703] uppercase tracking-wider block">
                      {promo.subtitle}
                    </span>
                    <h3 className="font-heading text-xl sm:text-2xl font-black leading-tight drop-shadow-md">
                      {promo.title}
                    </h3>
                  </div>
                </div>

                {/* Promo Details */}
                <div className="p-5 sm:p-6 space-y-3">
                  <p className="text-xs sm:text-sm text-[#57463A] leading-relaxed">
                    {promo.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#E85D04]">
                    <Sparkles className="w-4 h-4 text-[#FFB703]" />
                    <span>{promo.discountNote}</span>
                  </div>

                  {/* Promo Code Box */}
                  <div className="bg-[#FFF7E8] p-3 rounded-2xl border border-[#241A14]/10 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-[#57463A] uppercase font-bold block">
                        Kode Voucher
                      </span>
                      <span className="font-mono font-extrabold text-sm text-[#241A14] tracking-wider">
                        {promo.code}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyCode(promo.code)}
                      aria-label={`Salin kode ${promo.code}`}
                      className="px-3 py-1.5 rounded-xl bg-white border border-[#241A14]/15 hover:bg-[#E85D04] hover:text-white text-xs font-bold text-[#241A14] transition-colors flex items-center gap-1.5"
                    >
                      {copiedCode === promo.code ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  type="button"
                  id={`claim-promo-${promo.id}`}
                  onClick={() => handleClaimPromo(promo.code)}
                  className="w-full py-3 rounded-2xl bg-[#E85D04] hover:bg-[#D04F00] text-white font-heading font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <span>Klaim Promo Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-[#57463A]/70 mt-2">
                  *Promo Simulasi DEMO — Berlaku selama periode promo aktif
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
