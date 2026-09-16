export type ProductCategory = 'semua' | 'ricebowl' | 'ayam' | 'sapi' | 'snack' | 'minuman';

export interface ProductOptionChoice {
  name: string;
  extraPrice: number;
}

export interface ProductOption {
  name: string;
  required?: boolean;
  choices: ProductOptionChoice[];
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subCategory?: 'ayam' | 'sapi' | 'snack' | 'minuman';
  description: string;
  price: number;
  formattedPrice: string;
  image: string;
  isBestSeller?: boolean;
  isPromo?: boolean;
  originalPrice?: number;
  spiceLevel?: 0 | 1 | 2 | 3;
  rating?: number;
  salesCount?: string;
  tags?: string[];
  options?: ProductOption[];
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  selectedOptions: Record<string, ProductOptionChoice>;
  spiceLevel?: number;
  notes?: string;
  itemTotal: number;
}

export interface PromoItem {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  code: string;
  image: string;
  validUntil: string;
  discountNote: string;
  terms: string[];
}

export interface Outlet {
  id: string;
  name: string;
  area: string;
  address: string;
  hours: string;
  phone: string;
  mapsUrl: string;
  badge?: string;
  isFlagship?: boolean;
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  rating: number;
  review: string;
  avatar: string;
  favoriteDish: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
