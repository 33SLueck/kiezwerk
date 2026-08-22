import { Product, Category } from '@/types/ecommerce.types';

export interface ProductCatalogSectionProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  categories?: Category[];
  onAddToCart?: (product: Product) => void;
  className?: string;
}
