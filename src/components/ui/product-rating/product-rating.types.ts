export type ProductRatingSize = 'sm' | 'md' | 'lg';

export interface ProductRatingProps {
  rating: number; // 0 to 5
  reviewCount?: number;
  size?: ProductRatingSize;
  className?: string;
}
