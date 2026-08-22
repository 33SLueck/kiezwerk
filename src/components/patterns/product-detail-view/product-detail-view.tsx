'use client';

import * as React from 'react';
import { ShoppingCart, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductRating } from '@/components/ui/product-rating';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import { FadeIn, HoverScale } from '@/components/ui/motion';
import type { ProductDetailViewProps } from './product-detail-view.types';
import { detailViewContainerVariants } from './product-detail-view.styles';

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onAddToCart,
  className,
}) => {
  const [quantity, setQuantity] = React.useState<number>(1);
  const [added, setAdded] = React.useState<boolean>(false);

  const {
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
    tags,
  } = product;

  const handleAddToCart = () => {
    onAddToCart?.(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className={cn(detailViewContainerVariants(), className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Product Image Gallery */}
        <FadeIn direction="left" duration={0.6}>
          <HoverScale
            scale={1.01}
            className="overflow-hidden rounded-2xl border border-border bg-muted shadow-md"
          >
            <img
              src={image}
              alt={name}
              className="w-full aspect-square object-cover object-center"
            />
          </HoverScale>
        </FadeIn>

        {/* Right Column: Product Details & Purchase Actions */}
        <FadeIn direction="right" duration={0.6} className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {category}
              </span>
              {isNew && <Badge variant="default">New Release</Badge>}
              {inStock ? (
                <Badge variant="success">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            <Heading level={1} size="xl" className="text-foreground font-bold tracking-tight">
              {name}
            </Heading>

            {rating !== undefined && (
              <div className="mt-3 flex items-center gap-3">
                <ProductRating rating={rating} reviewCount={reviewCount} size="md" />
                <span className="text-xs text-muted-foreground">• Verified Product</span>
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-3xl font-extrabold text-foreground">${price.toFixed(2)}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-lg text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <Text as="p" size="md" className="text-muted-foreground leading-relaxed">
            {description}
          </Text>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((tag, i) => (
                <Badge key={i} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Purchase Block */}
          <div className="pt-6 border-t border-border space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-foreground">Quantity:</span>
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                disabled={!inStock}
                size="md"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                disabled={!inStock}
                onClick={handleAddToCart}
                className="flex-1"
                leadingIcon={
                  added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />
                }
              >
                {added
                  ? 'Added to Cart!'
                  : `Add ${quantity} to Cart ($${(price * quantity).toFixed(2)})`}
              </Button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/60 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-primary" />
              <span>Free Updates</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
