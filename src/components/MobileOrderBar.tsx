import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MobileOrderBar: React.FC = () => {
  const { totalItems, subtotal, setIsCartOpen } = useCart();

  const handleOrderClick = () => {
    if (totalItems > 0) {
      setIsCartOpen(true);
    } else {
      const menuSec = document.querySelector('#menu');
      if (menuSec) {
        menuSec.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      id="mobile-fixed-order-bar"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#241A14]/10 p-3 shadow-2xl safe-area-bottom"
    >
      <div className="flex items-center gap-3">
        {totalItems > 0 ? (
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex-1 py-3 px-4 rounded-2xl bg-[#E85D04] active:bg-[#D04F00] text-white font-heading font-extrabold text-sm flex items-center justify-between shadow-lg shadow-[#E85D04]/30"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 bg-[#FFB703] text-[#241A14] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <span>Lihat Pesanan</span>
            </div>
            <div className="flex items-center gap-1 font-bold">
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        ) : (
          <button
            type="button"
            id="mobile-bottom-order-cta"
            onClick={handleOrderClick}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#E85D04] active:bg-[#D04F00] text-white font-heading font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#E85D04]/30"
          >
            <span className="text-lg">🍚</span>
            <span>Pesan Sekarang</span>
          </button>
        )}
      </div>
    </div>
  );
};
