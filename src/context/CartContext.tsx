import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ProductOptionChoice } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedOptions?: Record<string, ProductOptionChoice>, notes?: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  promoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kohtimo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [promoCode, setPromoCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('kohtimo_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to persist cart:', e);
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedOptions: Record<string, ProductOptionChoice> = {},
    notes = ''
  ) => {
    const optionsKey = Object.entries(selectedOptions)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v.name}`)
      .join('|');
    const cartItemId = `${product.id}-${optionsKey}-${notes || 'none'}`;

    // calculate item price including options
    const extraOptionsTotal = Object.values(selectedOptions).reduce(
      (sum, opt) => sum + (opt.extraPrice || 0),
      0
    );
    const unitPrice = product.price + extraOptionsTotal;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          itemTotal: unitPrice * newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId,
          product,
          quantity,
          selectedOptions,
          notes,
          itemTotal: unitPrice * quantity,
        };
        return [...prev, newItem];
      }
    });

    showToast(`✅ ${quantity}x "${product.name}" ditambahkan ke pesanan!`);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const extraOptionsTotal = (Object.values(item.selectedOptions) as ProductOptionChoice[]).reduce(
              (sum, opt) => sum + (opt.extraPrice || 0),
              0
            );
            const unitPrice = item.product.price + extraOptionsTotal;
            return {
              ...item,
              quantity: newQty,
              itemTotal: unitPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item dihapus dari keranjang.');
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setDiscount(0);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);

  const applyPromoCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'KOHTIMOHEMAT') {
      if (subtotal < 60000) {
        return { success: false, message: 'Minimal belanja Rp 60.000 untuk menggunakan voucher ini.' };
      }
      const disc = Math.min(20000, Math.round(subtotal * 0.25));
      setPromoCode(trimmed);
      setDiscount(disc);
      return { success: true, message: `Voucher hemat 25% berhasil diterapkan! (-Rp ${disc.toLocaleString('id-ID')})` };
    }
    if (trimmed === 'TIMOBUY2GET1') {
      const disc = 15000;
      setPromoCode(trimmed);
      setDiscount(disc);
      return { success: true, message: 'Promo Buy 2 Get 1 aktif! Potongan Rp 15.000 (DEMO promo)' };
    }
    if (trimmed === 'SIANGKENYANG') {
      const disc = 8000;
      setPromoCode(trimmed);
      setDiscount(disc);
      return { success: true, message: 'Promo Siang Kenyang aktif! Potongan Rp 8.000' };
    }
    return { success: false, message: 'Kode promo tidak valid atau sudah kadaluarsa (Coba: KOHTIMOHEMAT).' };
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscount(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        discount,
        promoCode,
        applyPromoCode,
        removePromoCode,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
