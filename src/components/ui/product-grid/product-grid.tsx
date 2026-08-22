'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import { ProductCard } from '@/components/ui/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { StaggerContainer, StaggerItem } from '@/components/ui/motion';
import type { ProductGridProps } from './product-grid.types';
import { productGridVariants } from './product-grid.styles';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  columns = 3,
  className,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className={cn(productGridVariants({ columns }), className)}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col space-y-3 rounded-xl border border-border bg-card p-4 shadow-xs"
          >
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-10 w-full rounded-md mt-4" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-xl p-8 bg-muted/20">
        <p className="text-base font-semibold text-foreground">No products found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your search or category filters.
        </p>
      </div>
    );
  }

  // Generate a key based on product IDs to force Framer Motion to re-trigger
  // entrance animations when the filtered product list changes
  const gridKey = products.map((p) => p.id).join('-');

  return (
    <StaggerContainer
      key={gridKey}
      staggerChildren={0.08}
      className={cn(productGridVariants({ columns }), className)}
    >
      {products.map((product) => (
        <StaggerItem key={product.id}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
};
