'use client';

import * as React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { QuantitySelectorProps } from './quantity-selector.types';
import { quantityContainerVariants, quantityButtonVariants } from './quantity-selector.styles';

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  size = 'md',
  className,
  disabled = false,
}) => {
  const handleDecrement = () => {
    if (quantity > min && !disabled) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max && !disabled) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className={cn(quantityContainerVariants({ size }), className)}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || quantity <= min}
        aria-label="Decrease quantity"
        className={quantityButtonVariants({ size })}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>

      <span className="min-w-[2.5rem] text-center font-medium text-foreground select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || quantity >= max}
        aria-label="Increase quantity"
        className={quantityButtonVariants({ size })}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
