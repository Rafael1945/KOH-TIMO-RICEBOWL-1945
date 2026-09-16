import React from 'react';
import { Plus, Star, Flame } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { setSelectedProduct, addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If product has options, open modal so customer can customize choices, otherwise direct add
    if (product.options && product.options.length > 0) {
      setSelectedProduct(product);
    } else {
      addToCart(product, 1);
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => setSelectedProduct(product)}
      className="group bg-white rounded-3xl overflow-hidden border border-[#241A14]/8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Food Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF7E8]">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 rounded-full bg-[#E85D04] text-white text-[11px] font-extrabold uppercase shadow-md flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" />
              <span>Best Seller</span>
            </span>
          )}
          {product.isPromo && (
            <span className="px-2.5 py-1 rounded-full bg-[#FFB703] text-[#241A14] text-[11px] font-extrabold uppercase shadow-md">
              Promo 🔥
            </span>
          )}
        </div>

        {/* Spice Level Indicator */}
        {product.spiceLevel !== undefined && product.spiceLevel > 0 && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-full text-[11px] font-bold text-[#E85D04] shadow-sm flex items-center gap-0.5">
            {Array.from({ length: product.spiceLevel }).map((_, i) => (
              <Flame key={i} className="w-3 h-3 fill-[#E85D04] text-[#E85D04]" />
            ))}
          </div>
        )}

        {/* Sales count pill */}
        {product.salesCount && (
          <div className="absolute bottom-2.5 left-3 bg-[#241A14]/80 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] text-white/90 font-medium">
            {product.salesCount}
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-1 mb-1.5">
            <h3 className="font-heading text-base sm:text-lg font-bold text-[#241A14] group-hover:text-[#E85D04] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[#57463A] line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Price and Add CTA row */}
        <div className="pt-3 border-t border-[#241A14]/5 flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="text-[10px] text-[#57463A] uppercase tracking-wider block font-semibold">
              Harga Satuan
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading text-base sm:text-lg font-extrabold text-[#E85D04]">
                {product.formattedPrice}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#57463A]/60 line-through">
                  Rp {product.originalPrice.toLocaleString('id-ID')}
                </span>
              )}
            </div>
          </div>

          {/* Quick Add Button */}
          <button
            type="button"
            id={`btn-add-${product.id}`}
            onClick={handleQuickAdd}
            aria-label={`Tambah ${product.name} ke pesanan`}
            className="w-10 h-10 rounded-2xl bg-[#FFF7E8] hover:bg-[#E85D04] text-[#E85D04] hover:text-white border border-[#E85D04]/30 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-90"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
