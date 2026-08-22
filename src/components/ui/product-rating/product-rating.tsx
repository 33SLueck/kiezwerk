import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { ProductRatingProps } from './product-rating.types';
import { starSizeVariants } from './product-rating.styles';

export const ProductRating: React.FC<ProductRatingProps> = ({
  rating,
  reviewCount,
  size = 'md',
  className,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = star <= fullStars;
          const isHalf = star === fullStars + 1 && hasHalfStar;

          return (
            <Star
              key={star}
              className={cn(
                starSizeVariants({ size }),
                isFull
                  ? 'fill-amber-400 text-amber-400'
                  : isHalf
                    ? 'fill-amber-400/50 text-amber-400'
                    : 'fill-muted text-muted-foreground/30'
              )}
            />
          );
        })}
      </div>

      {reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground font-medium select-none">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
