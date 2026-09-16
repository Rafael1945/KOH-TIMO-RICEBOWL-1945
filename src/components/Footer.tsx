import React from 'react';
import { Instagram, MessageCircle, Heart, UtensilsCrossed, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-[#241A14] text-white pt-16 pb-24 sm:pb-16 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E85D04] to-[#FFB703] flex items-center justify-center text-white shadow-lg">
                <span className="text-xl leading-none select-none">🍚</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading text-xl font-black tracking-tight text-white leading-none">
                  KOH TIMO
                </span>
                <span className="font-heading text-xs font-bold tracking-widest text-[#FFB703] uppercase leading-tight">
                  RICEBOWL
                </span>
              </div>
            </div>

            <p className="font-heading text-lg font-bold text-[#FFB703]">
              &ldquo;Ricebowl enak, praktis, bikin nagih.&rdquo;
            </p>

            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              Menyajikan semangkuk ricebowl hangat dengan racikan bumbu khas Nusantara dan bahan segar pilihan untuk menemani setiap harimu.
            </p>

            <div className="pt-2 text-xs text-white/50">
              *Koh Timo Ricebowl adalah situs landing page restoran demo.
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-sm font-extrabold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleLinkClick(e, '#home')}
                  className="hover:text-[#FFB703] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  onClick={(e) => handleLinkClick(e, '#menu')}
                  className="hover:text-[#FFB703] transition-colors"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#promo"
                  onClick={(e) => handleLinkClick(e, '#promo')}
                  className="hover:text-[#FFB703] transition-colors"
                >
                  Promo
                </a>
              </li>
              <li>
                <a
                  href="#lokasi"
                  onClick={(e) => handleLinkClick(e, '#lokasi')}
                  className="hover:text-[#FFB703] transition-colors"
                >
                  Lokasi
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-heading text-sm font-extrabold text-white uppercase tracking-wider">
              Social & Kontak
            </h4>
            <p className="text-xs text-white/70">
              Hubungi layanan pesanan katering & informasi outlet:
            </p>

            <div className="space-y-2">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#25D366] text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-white" />
                <span>WhatsApp: +62 812-3456-7890 (DEMO)</span>
              </a>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Koh Timo"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#E85D04] text-white flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Koh Timo"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#E85D04] text-white flex items-center justify-center transition-colors"
                >
                  <span className="font-bold text-sm">TT</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 Koh Timo Ricebowl. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> untuk pecinta kuliner
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Kembali ke atas"
              className="p-2 rounded-xl bg-white/10 hover:bg-[#E85D04] text-white transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
