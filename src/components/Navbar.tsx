import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, UtensilsCrossed, PhoneCall, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'Promo', href: '#promo' },
    { label: 'Tentang Kami', href: '#tentang-kami' },
    { label: 'Lokasi', href: '#lokasi' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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

  const handleOrderClick = () => {
    setMobileMenuOpen(false);
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

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFF7E8]/95 backdrop-blur-md shadow-md shadow-[#241A14]/5 py-3 border-b border-[#E85D04]/10'
            : 'bg-[#FFF7E8] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            id="brand-logo"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D04] rounded-lg"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#E85D04] to-[#FFB703] flex items-center justify-center text-white shadow-md shadow-[#E85D04]/25 group-hover:scale-105 transition-transform duration-200">
              <span className="text-xl leading-none select-none">🍚</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading text-lg sm:text-xl font-extrabold tracking-tight text-[#241A14] group-hover:text-[#E85D04] transition-colors leading-none">
                KOH TIMO
              </span>
              <span className="font-heading text-[11px] sm:text-xs font-bold tracking-widest text-[#E85D04] uppercase leading-tight">
                RICEBOWL
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 rounded-xl text-sm font-semibold text-[#241A14]/80 hover:text-[#E85D04] hover:bg-[#E85D04]/5 transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Trigger Button */}
            <button
              id="navbar-cart-btn"
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Keranjang belanja dengan ${totalItems} item`}
              className="relative p-2.5 rounded-2xl bg-white border border-[#241A14]/10 hover:border-[#E85D04]/30 hover:bg-[#E85D04]/5 text-[#241A14] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D04]"
            >
              <ShoppingBag className="w-5 h-5 text-[#241A14]" />
              {totalItems > 0 && (
                <span
                  id="cart-count-badge"
                  className="absolute -top-1.5 -right-1.5 bg-[#E85D04] text-white text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale-in"
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Desktop Primary CTA */}
            <button
              id="navbar-order-cta"
              type="button"
              onClick={handleOrderClick}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#E85D04] hover:bg-[#D04F00] text-white text-sm font-bold shadow-lg shadow-[#E85D04]/25 hover:shadow-[#E85D04]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Pesan Sekarang</span>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className="md:hidden p-2.5 rounded-2xl bg-white border border-[#241A14]/10 text-[#241A14] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D04]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-panel"
            className="md:hidden bg-[#FFF7E8] border-b border-[#241A14]/10 px-4 pt-3 pb-6 shadow-xl transition-all animate-in fade-in slide-in-from-top-2"
          >
            <div className="flex flex-col gap-1.5 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  id={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-2.5 rounded-xl text-base font-semibold text-[#241A14] hover:text-[#E85D04] hover:bg-[#E85D04]/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-[#241A14]/10 flex flex-col gap-2">
              <button
                id="mobile-nav-order-btn"
                type="button"
                onClick={handleOrderClick}
                className="w-full py-3 rounded-2xl bg-[#E85D04] text-white text-base font-bold flex items-center justify-center gap-2 shadow-md shadow-[#E85D04]/20 active:scale-[0.98] transition-transform"
              >
                <span>🍚 Pesan Sekarang</span>
              </button>
              <div className="text-center text-xs text-[#57463A] mt-1 flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FFB703]" />
                <span>Nasi Bowl Enak, Bikin Nagih!</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
