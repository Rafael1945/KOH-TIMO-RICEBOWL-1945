import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, CheckCircle, Utensils, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
    discount,
    promoCode,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success?: boolean; text?: string } | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');

  if (!isCartOpen) return null;

  const finalTotal = Math.max(0, subtotal - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoFeedback({ success: res.success, text: res.message });
  };

  const handleSimulatedCheckout = () => {
    setCheckoutSuccess(true);
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setCheckoutSuccess(false);
    setPromoFeedback(null);
  };

  const generateWhatsAppOrderText = () => {
    let text = `Halo Koh Timo Ricebowl! Saya ingin memesan:\n\n`;
    cart.forEach((item, index) => {
      text += `${index + 1}. ${item.product.name} (x${item.quantity}) - Rp ${item.itemTotal.toLocaleString('id-ID')}\n`;
      const optionsStr = Object.entries(item.selectedOptions)
        .map(([k, v]) => `   • ${k}: ${(v as any).name}`)
        .join('\n');
      if (optionsStr) text += `${optionsStr}\n`;
      if (item.notes) text += `   • Catatan: ${item.notes}\n`;
    });
    text += `\nSubtotal: Rp ${subtotal.toLocaleString('id-ID')}`;
    if (discount > 0) {
      text += `\nVoucher (${promoCode}): -Rp ${discount.toLocaleString('id-ID')}`;
    }
    text += `\nTotal Pembayaran: Rp ${finalTotal.toLocaleString('id-ID')}`;
    text += `\nTipe Pesanan: ${orderType === 'delivery' ? 'Delivery' : 'Takeaway / Ambil Sendiri'}`;
    if (customerName) text += `\nNama Pelanggan: ${customerName}`;
    if (customerAddress) text += `\nAlamat Pengiriman: ${customerAddress}`;
    text += `\n\n(Pemesanan via Website Demo Koh Timo)`;
    return encodeURIComponent(text);
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-[#241A14]/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-4 sm:p-5 bg-[#FFF7E8] border-b border-[#241A14]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#E85D04] text-white flex items-center justify-center font-bold shadow-md shadow-[#E85D04]/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 id="cart-drawer-title" className="font-heading text-lg sm:text-xl font-black text-[#241A14]">
                Pesanan Saya
              </h2>
              <p className="text-xs text-[#57463A]">
                {totalItems} item di keranjang belanja
              </p>
            </div>
          </div>

          <button
            type="button"
            id="close-cart-btn"
            onClick={handleClose}
            aria-label="Tutup keranjang"
            className="w-9 h-9 rounded-full bg-white hover:bg-[#FFF7E8] border border-[#241A14]/10 text-[#241A14] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Checkout Succeeded View */}
        {checkoutSuccess ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle className="w-9 h-9" />
            </div>
            <h3 className="font-heading text-2xl font-black text-[#241A14] mb-2">
              Pesanan Berhasil Disiapkan!
            </h3>
            <p className="text-sm text-[#57463A] mb-4">
              Nomor Pesanan Simulasi: <strong className="text-[#E85D04]">#KT-{Math.floor(100000 + Math.random() * 900000)}</strong>
            </p>

            <div className="w-full bg-[#FFF7E8] p-4 rounded-2xl border border-[#241A14]/10 text-left text-xs text-[#57463A] mb-6 space-y-2">
              <p className="font-bold text-[#241A14] text-sm border-b border-[#241A14]/10 pb-1.5">
                Ringkasan Transaksi (Demo)
              </p>
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-bold text-[#241A14]">{totalItems} porsi</span>
              </div>
              <div className="flex justify-between">
                <span>Total Pembayaran:</span>
                <span className="font-bold text-[#E85D04] text-sm">Rp {finalTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>Metode:</span>
                <span className="font-bold text-[#241A14]">Bayar di Tempat / QRIS (Demo)</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2.5">
              <a
                id="send-whatsapp-order-btn"
                href={`https://wa.me/6281234567890?text=${generateWhatsAppOrderText()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5B] text-white font-heading font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <span>💬 Kirim Rincian Pesanan ke WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  clearCart();
                  handleClose();
                }}
                className="w-full py-3 px-4 rounded-2xl bg-[#E85D04] hover:bg-[#D04F00] text-white font-heading font-bold text-sm transition-colors"
              >
                Selesai & Pesan Menu Lain
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Cart State */
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-3xl bg-[#FFF7E8] text-[#E85D04] flex items-center justify-center mb-4 text-3xl">
              <Utensils className="w-10 h-10 text-[#E85D04]" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#241A14] mb-2">
              Keranjang Masih Kosong
            </h3>
            <p className="text-sm text-[#57463A] max-w-xs mb-6 leading-relaxed">
              Perut sudah mulai lapar? Yuk pilih ricebowl dan snack favoritmu dari menu Koh Timo!
            </p>
            <button
              type="button"
              onClick={() => {
                setIsCartOpen(false);
                const menuSec = document.querySelector('#menu');
                if (menuSec) menuSec.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-2xl bg-[#E85D04] hover:bg-[#D04F00] text-white font-heading font-bold text-sm shadow-md transition-all"
            >
              Lihat Menu Sekarang
            </button>
          </div>
        ) : (
          /* Active Cart Items List */
          <>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-[#FFF7E8]/50 p-3.5 rounded-2xl border border-[#241A14]/10 flex gap-3 items-start"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#241A14]/5 bg-white"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-heading text-sm font-bold text-[#241A14] truncate">
                        {item.product.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.cartItemId)}
                        aria-label={`Hapus ${item.product.name}`}
                        className="text-[#57463A]/60 hover:text-red-600 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Custom options description */}
                    {Object.keys(item.selectedOptions).length > 0 && (
                      <div className="text-[11px] text-[#57463A] mt-0.5 space-y-0.5">
                        {Object.entries(item.selectedOptions).map(([k, v]) => (
                          <span key={k} className="block text-[11px] text-[#57463A]/80">
                            • {(v as any).name}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.notes && (
                      <p className="text-[11px] text-[#E85D04] italic mt-0.5 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>&quot;{item.notes}&quot;</span>
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#241A14]/5">
                      <span className="font-heading font-extrabold text-sm text-[#E85D04]">
                        Rp {item.itemTotal.toLocaleString('id-ID')}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center bg-white rounded-xl border border-[#241A14]/15 p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          aria-label="Kurangi jumlah"
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-[#241A14] hover:bg-[#FFF7E8]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-heading font-bold text-xs text-[#241A14]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          aria-label="Tambah jumlah"
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-[#241A14] hover:bg-[#FFF7E8]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Order Options: Delivery or Takeaway */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#241A14] uppercase tracking-wider mb-1.5">
                  Tipe Pemesanan:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      orderType === 'delivery'
                        ? 'bg-[#E85D04] text-white border-[#E85D04]'
                        : 'bg-white text-[#241A14] border-[#241A14]/10 hover:bg-[#FFF7E8]'
                    }`}
                  >
                    🛵 Antar / Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      orderType === 'takeaway'
                        ? 'bg-[#E85D04] text-white border-[#E85D04]'
                        : 'bg-white text-[#241A14] border-[#241A14]/10 hover:bg-[#FFF7E8]'
                    }`}
                  >
                    🛍️ Ambil di Outlet
                  </button>
                </div>
              </div>

              {/* Customer Info for Demo */}
              <div className="space-y-2 pt-2">
                <input
                  type="text"
                  placeholder="Nama Pemesan (misal: Budi)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#241A14]/15 focus:outline-none focus:border-[#E85D04]"
                />
                {orderType === 'delivery' && (
                  <input
                    type="text"
                    placeholder="Alamat Pengiriman (misal: Jl. Mawar No. 12)"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#241A14]/15 focus:outline-none focus:border-[#E85D04]"
                  />
                )}
              </div>

              {/* Voucher Code Promo Input */}
              <div className="pt-2">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-[#57463A] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Kode Promo (KOHTIMOHEMAT)"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#241A14]/15 focus:outline-none focus:border-[#E85D04] uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-[#241A14] hover:bg-[#E85D04] text-white text-xs font-bold transition-colors"
                  >
                    Pakai
                  </button>
                </form>

                {promoFeedback && (
                  <p
                    className={`text-[11px] mt-1.5 font-medium ${
                      promoFeedback.success ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {promoFeedback.text}
                  </p>
                )}

                {promoCode && (
                  <div className="mt-1.5 flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
                    <span>Voucher <strong>{promoCode}</strong> aktif</span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-emerald-900 hover:underline font-bold text-[11px]"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Cart Footer Subtotal & Checkout */}
            <div className="p-4 sm:p-5 bg-[#FFF7E8] border-t border-[#241A14]/10 shrink-0 space-y-3">
              <div className="space-y-1.5 text-xs text-[#57463A]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-[#241A14]">
                    Rp {subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Potongan Diskon:</span>
                    <span className="font-bold">-Rp {discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#241A14] pt-1.5 border-t border-[#241A14]/10">
                  <span>Total Bayar:</span>
                  <span className="font-heading text-lg font-black text-[#E85D04]">
                    Rp {finalTotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                id="cart-checkout-btn"
                onClick={handleSimulatedCheckout}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#E85D04] hover:bg-[#D04F00] text-white font-heading font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#E85D04]/25 active:scale-[0.99] transition-all"
              >
                <span>Lanjutkan Pemesanan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#57463A]/80">
                *Simulasi Checkout Demo — Tidak ada tagihan pembayaran nyata
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
