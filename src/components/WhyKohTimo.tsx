import React from 'react';
import { motion } from 'motion/react';
import { Trophy, BadgePercent, PackageCheck, Repeat, Sparkles } from 'lucide-react';

export const WhyKohTimo: React.FC = () => {
  const points = [
    {
      number: '01',
      title: 'Rasa Juara',
      description: 'Rasa yang dibuat untuk cocok dengan selera pelanggan.',
      detail: 'Diracik dengan bumbu rempah otentik pilihan, menghasilkan cita rasa gurih, renyah, dan kaya aroma.',
      icon: Trophy,
      accent: 'from-[#E85D04] to-[#FF8C38]',
    },
    {
      number: '02',
      title: 'Harga Bersahabat',
      description: 'Makan enak tidak harus mahal.',
      detail: 'Mulai dari 20 ribuan, Anda sudah bisa menikmati semangkuk ricebowl premium lengkap dengan telur dan topping.',
      icon: BadgePercent,
      accent: 'from-[#FFB703] to-[#FFD166]',
    },
    {
      number: '03',
      title: 'Praktis',
      description: 'Cocok untuk makan sendiri maupun bersama teman.',
      detail: 'Kemasan mangkok higienis yang mudah dibawa, tidak tumpah, dan siap dinikmati di mana saja.',
      icon: PackageCheck,
      accent: 'from-[#241A14] to-[#4A382C]',
    },
    {
      number: '04',
      title: 'Bikin Nagih',
      description: 'Satu bowl sering kali belum cukup.',
      detail: 'Kombinasi nasi pulen hangat, lauk berlimpah, dan sambal segar yang bikin ingin nambah terus.',
      icon: Repeat,
      accent: 'from-[#E85D04] to-[#C74A00]',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Alasan Pelanggan Jatuh Hati
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#241A14] tracking-tight mb-4">
            Kenapa Koh Timo?
          </h2>
          <p className="text-base sm:text-lg text-[#57463A]">
            Kami percaya makanan lezat adalah hak setiap orang. Inilah alasan mengapa Koh Timo selalu jadi pilihan utama.
          </p>
        </div>

        {/* 4 Feature Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#FFF7E8]/60 hover:bg-[#FFF7E8] rounded-3xl p-6 sm:p-7 border border-[#241A14]/8 hover:border-[#E85D04]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading text-2xl font-black text-[#E85D04]/40 group-hover:text-[#E85D04] transition-colors">
                      {item.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#E85D04] group-hover:bg-[#E85D04] group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-black text-[#241A14] mb-2 group-hover:text-[#E85D04] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm font-bold text-[#241A14]/80 mb-2">
                    &ldquo;{item.description}&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm text-[#57463A] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
