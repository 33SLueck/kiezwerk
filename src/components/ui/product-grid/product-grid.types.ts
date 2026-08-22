import { Product } from '@/types/ecommerce.types';

export type ProductGridColumns = 2 | 3 | 4;

export interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  columns?: ProductGridColumns;
  className?: string;
  isLoading?: boolean;
}
