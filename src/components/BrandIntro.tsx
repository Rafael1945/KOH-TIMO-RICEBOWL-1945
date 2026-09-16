import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, HeartHandshake, Wallet, ChefHat } from 'lucide-react';

export const BrandIntro: React.FC = () => {
  const features = [
    {
      id: 'brand-feature-fresh',
      icon: ChefHat,
      title: 'Fresh',
      subtitle: 'Bahan Berkualitas',
      description: 'Disajikan fresh untuk setiap pelanggan. Dimasak saat dipesan, menjaga kerenyahan dan kesegaran rasa.',
      badgeColor: 'bg-[#E85D04]/10 text-[#E85D04]',
      cardBorder: 'hover:border-[#E85D04]/40',
      emoji: '🥗',
    },
    {
      id: 'brand-feature-flavorful',
      icon: Sparkles,
      title: 'Flavorful',
      subtitle: 'Bumbu Meresap',
      description: 'Rasa yang dibuat untuk bikin nagih. Racikan rempah Nusantara dipadu bumbu modern yang pas di lidah.',
      badgeColor: 'bg-[#FFB703]/20 text-[#241A14]',
      cardBorder: 'hover:border-[#FFB703]/60',
      emoji: '🌶️',
    },
    {
      id: 'brand-feature-affordable',
      icon: Wallet,
      title: 'Affordable',
      subtitle: 'Porsi Mengenyangkan',
      description: 'Harga bersahabat tanpa mengorbankan rasa. Makan enak, puas, dan kenyang setiap hari tanpa bikin kantong bolong.',
      badgeColor: 'bg-[#241A14]/10 text-[#241A14]',
      cardBorder: 'hover:border-[#241A14]/30',
      emoji: '🪙',
    },
  ];

  return (
    <section id="tentang-kami" className="py-16 sm:py-20 bg-[#FFF7E8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            Cerita Di Balik Semangkuk Kenikmatan
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#241A14] tracking-tight mb-4">
            Kenalan Dulu Sama Koh Timo 👋
          </h2>
          <p className="text-base sm:text-lg text-[#57463A] leading-relaxed">
            Koh Timo Ricebowl hadir untuk menyajikan makanan yang praktis, lezat, dan cocok dinikmati kapan saja.
            Berawal dari kecintaan kami menyajikan ricebowl rumahan yang kaya rasa dan bikin kangen balik lagi.
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                id={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`group bg-white rounded-3xl p-7 sm:p-8 border border-[#241A14]/8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${item.cardBorder}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${item.badgeColor}`}>
                      <span>{item.emoji}</span>
                    </div>
                    <span className="text-xs font-bold text-[#57463A]/70 uppercase tracking-wider">
                      Nilai 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-black text-[#241A14] mb-2 group-hover:text-[#E85D04] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-[#E85D04] mb-3">{item.subtitle}</p>
                  <p className="text-sm sm:text-base text-[#57463A] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#241A14]/5 flex items-center gap-2 text-xs font-semibold text-[#241A14]/60">
                  <Icon className="w-4 h-4 text-[#E85D04]" />
                  <span>Komitmen Koh Timo untuk Anda</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
