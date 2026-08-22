'use client';

import * as React from 'react';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { ProductRating } from '@/components/ui/product-rating';
import { HoverScale } from '@/components/ui/motion';
import type { ProductCardProps } from './product-card.types';
import { productCardVariants } from './product-card.styles';

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  className,
  isAdding = false,
}) => {
  const {
    slug,
    name,
    description,
    price,
    originalPrice,
    image,
    category,
    rating,
    reviewCount,
    inStock,
    isNew,
  } = product;

  const productHref = `/products/${slug}`;

  const discountPercentage =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  return (
    <HoverScale scale={1.015} className={cn(productCardVariants(), className)}>
      {/* Product Image Container */}
      <Link
        href={productHref}
        className="relative aspect-square w-full overflow-hidden bg-muted block"
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {isNew && <Badge variant="default">New</Badge>}
          {discountPercentage && <Badge variant="destructive">-{discountPercentage}%</Badge>}
        </div>

        {!inStock && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xs flex items-center justify-center z-10">
            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
              Out of Stock
            </Badge>
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          {category}
        </div>

        <Link href={productHref} className="no-underline">
          <h3 className="text-base font-semibold text-foreground tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        <p className="text-xs text-muted-foreground line-clamp-2 mt-1 mb-3 flex-1">{description}</p>

        {rating !== undefined && (
          <div className="mb-3">
            <ProductRating rating={rating} reviewCount={reviewCount} size="sm" />
          </div>
        )}

        {/* Footer Price & Add to Cart Action */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-border/60">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-foreground">${price.toFixed(2)}</span>
              {originalPrice && originalPrice > price && (
                <span className="text-xs text-muted-foreground line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <Button
            size="sm"
            variant="primary"
            disabled={!inStock || isAdding}
            isLoading={isAdding}
            onClick={() => onAddToCart?.(product)}
            leadingIcon={<ShoppingCart className="h-4 w-4" />}
          >
            Add
          </Button>
        </div>
      </div>
    </HoverScale>
  );
};
