import { Product } from '@/types/ecommerce.types';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
  isAdding?: boolean;
}
