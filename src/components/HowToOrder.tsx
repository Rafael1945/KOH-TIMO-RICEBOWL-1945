import React from 'react';
import { motion } from 'motion/react';
import { Utensils, MapPin, CreditCard, Smile, ArrowRight } from 'lucide-react';

export const HowToOrder: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Pilih Menu',
      description: 'Pilih ricebowl favoritmu.',
      sub: 'Cari lauk favorit mulai dari ayam sambal matah, sapi yakiniku, sampai snack kriuk.',
      icon: Utensils,
    },
    {
      step: '02',
      title: 'Pilih Cara Pesan',
      description: 'Online atau langsung ke outlet.',
      sub: 'Bisa lewat delivery cepat, takeaway bawa pulang, ataupun dine-in santai di outlet.',
      icon: MapPin,
    },
    {
      step: '03',
      title: 'Checkout',
      description: 'Lakukan pemesanan.',
      sub: 'Konfirmasi pilihan pesanan dan selesaikan transaksi dengan mudah & cepat.',
      icon: CreditCard,
    },
    {
      step: '04',
      title: 'Makan!',
      description: 'Tunggu sebentar dan nikmati Koh Timo.',
      sub: 'Pesanan dimasak fresh dan siap disantap hangat-hangat bikin kenyang bahagia.',
      icon: Smile,
    },
  ];

  const handleOrderNow = () => {
    const menuSec = document.querySelector('#menu');
    if (menuSec) {
      menuSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FFF7E8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-black uppercase tracking-wider mb-3">
            Mudah & Cepat
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#241A14] tracking-tight mb-4">
            Laper? Pesannya Gampang.
          </h2>
          <p className="text-base sm:text-lg text-[#57463A]">
            Hanya 4 langkah singkat untuk menikmati kelezatan Koh Timo Ricebowl di mana pun Anda berada.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-12">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.12 }}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#241A14]/10 shadow-sm relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF7E8] text-[#E85D04] group-hover:bg-[#E85D04] group-hover:text-white flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-heading font-black text-2xl text-[#241A14]/20 group-hover:text-[#E85D04] transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-black text-[#241A14] mb-1.5 group-hover:text-[#E85D04] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm font-bold text-[#241A14]/90 mb-2">
                    {item.description}
                  </p>
                  <p className="text-xs text-[#57463A] leading-relaxed">
                    {item.sub}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            type="button"
            id="how-to-order-cta-btn"
            onClick={handleOrderNow}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#E85D04] hover:bg-[#D04F00] text-white font-heading font-extrabold text-base sm:text-lg shadow-xl shadow-[#E85D04]/30 hover:shadow-[#E85D04]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <span>🍚 Pesan Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
