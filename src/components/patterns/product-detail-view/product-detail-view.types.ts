import { Product } from '@/types/ecommerce.types';

export interface ProductDetailViewProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
  className?: string;
}
