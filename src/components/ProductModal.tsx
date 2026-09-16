import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Flame, Star, Check, Sparkles, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductOptionChoice } from '../types';

export const ProductModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, ProductOptionChoice>>({});
  const [notes, setNotes] = useState('');

  // Initialize options when product opens
  useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
      setNotes('');
      const initialOptions: Record<string, ProductOptionChoice> = {};
      if (selectedProduct.options) {
        selectedProduct.options.forEach((opt) => {
          if (opt.choices.length > 0) {
            // Pick first choice by default
            initialOptions[opt.name] = opt.choices[0];
          }
        });
      }
      setSelectedOptions(initialOptions);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const handleClose = () => {
    setSelectedProduct(null);
  };

  const handleOptionChange = (optionName: string, choice: ProductOptionChoice) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: choice,
    }));
  };

  const extraTotal = (Object.values(selectedOptions) as ProductOptionChoice[]).reduce(
    (sum, opt) => sum + (opt.extraPrice || 0),
    0
  );
  const unitPrice = selectedProduct.price + extraTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedOptions, notes.trim());
    setSelectedProduct(null);
  };

  return (
    <div
      id="product-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#241A14]/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div
        className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-[#241A14]/10 my-auto flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header & Close Button */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#FFF7E8] shrink-0">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <button
            type="button"
            id="close-product-modal-btn"
            onClick={handleClose}
            aria-label="Tutup detail produk"
            className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#241A14] flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on image */}
          <div className="absolute top-3.5 left-3.5 flex gap-2">
            {selectedProduct.isBestSeller && (
              <span className="px-3 py-1 rounded-full bg-[#E85D04] text-white text-xs font-extrabold uppercase shadow-md flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-white" />
                <span>Best Seller</span>
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full bg-[#241A14]/80 backdrop-blur-xs text-white text-xs font-semibold">
              Sample DEMO
            </span>
          </div>

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Title & Price */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h2 id="modal-product-title" className="font-heading text-xl sm:text-2xl font-black text-[#241A14] leading-snug">
                {selectedProduct.name}
              </h2>
              <div className="text-right shrink-0">
                <span className="font-heading text-xl sm:text-2xl font-black text-[#E85D04]">
                  Rp {unitPrice.toLocaleString('id-ID')}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="block text-xs text-[#57463A]/70 line-through">
                    Rp {selectedProduct.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-[#57463A] leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Quick badges (spice, ratings, etc.) */}
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[#241A14]/10 text-xs text-[#57463A]">
              {selectedProduct.rating && (
                <span className="flex items-center gap-1 font-bold text-[#241A14] bg-[#FFF7E8] px-2.5 py-1 rounded-lg border border-[#FFB703]/30">
                  <Star className="w-3.5 h-3.5 text-[#FFB703] fill-[#FFB703]" />
                  <span>{selectedProduct.rating} / 5.0</span>
                </span>
              )}
              {selectedProduct.spiceLevel !== undefined && (
                <span className="flex items-center gap-1 font-bold text-[#E85D04] bg-[#E85D04]/10 px-2.5 py-1 rounded-lg">
                  <Flame className="w-3.5 h-3.5 fill-[#E85D04]" />
                  <span>Level Pedas: {selectedProduct.spiceLevel === 0 ? 'Tidak Pedas' : `Level ${selectedProduct.spiceLevel}`}</span>
                </span>
              )}
              {selectedProduct.salesCount && (
                <span className="bg-gray-100 px-2.5 py-1 rounded-lg font-medium text-gray-700">
                  {selectedProduct.salesCount}
                </span>
              )}
            </div>
          </div>

          {/* Options / Customizations if available */}
          {selectedProduct.options && selectedProduct.options.length > 0 && (
            <div className="space-y-4 pt-2">
              <h4 className="font-heading text-sm font-extrabold text-[#241A14] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#E85D04]" />
                <span>Kustomisasi Pesanan</span>
              </h4>

              {selectedProduct.options.map((option) => (
                <div key={option.name} className="bg-[#FFF7E8]/70 p-4 rounded-2xl border border-[#241A14]/10">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-heading text-sm font-bold text-[#241A14]">
                      {option.name}
                    </span>
                    {option.required && (
                      <span className="text-[10px] uppercase font-bold text-[#E85D04] bg-[#E85D04]/10 px-2 py-0.5 rounded-md">
                        Wajib
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {option.choices.map((choice) => {
                      const isSelected = selectedOptions[option.name]?.name === choice.name;
                      return (
                        <button
                          key={choice.name}
                          type="button"
                          onClick={() => handleOptionChange(option.name, choice)}
                          className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between border ${
                            isSelected
                              ? 'bg-white border-[#E85D04] text-[#E85D04] shadow-xs font-bold'
                              : 'bg-white/60 border-[#241A14]/10 text-[#241A14] hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-[#E85D04] bg-[#E85D04]' : 'border-[#241A14]/30'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span>{choice.name}</span>
                          </div>
                          {choice.extraPrice > 0 && (
                            <span className="text-xs font-bold text-[#E85D04]">
                              +Rp {choice.extraPrice.toLocaleString('id-ID')}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Kitchen Notes */}
          <div>
            <label htmlFor="order-notes" className="block font-heading text-xs font-bold text-[#241A14] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#57463A]" />
              <span>Catatan Khusus untuk Dapur (Opsional)</span>
            </label>
            <input
              type="text"
              id="order-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Jangan terlalu pedas, kuah dipisah, banyakin serai..."
              className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[#241A14]/15 focus:border-[#E85D04] focus:ring-2 focus:ring-[#E85D04]/20 outline-none text-xs sm:text-sm text-[#241A14] placeholder-[#57463A]/50"
            />
          </div>
        </div>

        {/* Modal Footer with Quantity Controls & Add to Cart CTA */}
        <div className="p-4 sm:p-5 bg-[#FFF7E8] border-t border-[#241A14]/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Quantity Selector */}
          <div className="flex items-center justify-between w-full sm:w-auto bg-white rounded-2xl p-1 border border-[#241A14]/15">
            <button
              type="button"
              id="modal-decrease-qty"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Kurangi jumlah"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#241A14] hover:bg-[#FFF7E8] disabled:opacity-30 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span id="modal-qty-value" className="w-12 text-center font-heading font-extrabold text-base text-[#241A14]">
              {quantity}
            </span>
            <button
              type="button"
              id="modal-increase-qty"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Tambah jumlah"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#241A14] hover:bg-[#FFF7E8] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            id="modal-add-to-order-btn"
            onClick={handleAddToCart}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-[#E85D04] hover:bg-[#D04F00] text-white font-heading font-extrabold text-sm sm:text-base flex items-center justify-between shadow-lg shadow-[#E85D04]/25 hover:shadow-[#E85D04]/35 active:scale-[0.99] transition-all"
          >
            <span>Tambahkan ke Pesanan</span>
            <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
