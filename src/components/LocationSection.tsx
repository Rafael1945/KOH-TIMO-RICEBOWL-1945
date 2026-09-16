import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, ExternalLink, UtensilsCrossed, Sparkles } from 'lucide-react';
import { DEMO_OUTLETS } from '../data/outlets';

export const LocationSection: React.FC = () => {
  const handleOrderOutlet = (outletName: string) => {
    const menuSec = document.querySelector('#menu');
    if (menuSec) {
      menuSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="lokasi" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-black uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Cabang & Titik Pengiriman
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#241A14] tracking-tight mb-4">
            Temukan Koh Timo Terdekat
          </h2>
          <p className="text-base sm:text-lg text-[#57463A]">
            Kunjungi outlet kami untuk dine-in hangat atau pesan langsung untuk diantar ke tempat Anda.
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7E8] text-[#57463A] text-xs border border-[#241A14]/10">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB703]" />
            <span>*Alamat & cabang berikut merupakan data simulasi DEMO</span>
          </div>
        </div>

        {/* Outlet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {DEMO_OUTLETS.map((outlet, idx) => (
            <motion.div
              key={outlet.id}
              id={`outlet-card-${outlet.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[#FFF7E8]/50 rounded-3xl p-6 sm:p-7 border border-[#241A14]/10 hover:border-[#E85D04]/40 hover:bg-[#FFF7E8] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-bold text-[#E85D04] uppercase tracking-wider block mb-1">
                      {outlet.area}
                    </span>
                    <h3 className="font-heading text-xl sm:text-2xl font-black text-[#241A14]">
                      {outlet.name}
                    </h3>
                  </div>

                  {outlet.badge && (
                    <span className="px-2.5 py-1 rounded-full bg-[#E85D04] text-white text-[11px] font-bold shrink-0">
                      {outlet.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 my-4 text-xs sm:text-sm text-[#57463A]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#E85D04] shrink-0 mt-0.5" />
                    <span>{outlet.address}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#E85D04] shrink-0" />
                    <span>{outlet.hours}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#E85D04] shrink-0" />
                    <span>{outlet.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-[#241A14]/10 flex flex-wrap sm:flex-nowrap items-center gap-3">
                <a
                  href={outlet.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-[#FFF7E8] text-[#241A14] border border-[#241A14]/15 hover:border-[#E85D04]/40 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Lihat Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => handleOrderOutlet(outlet.name)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#E85D04] hover:bg-[#D04F00] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#E85D04]/20 transition-all"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>Pesan Sekarang</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
