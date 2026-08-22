export type QuantitySelectorSize = 'sm' | 'md' | 'lg';

export interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  size?: QuantitySelectorSize;
  className?: string;
  disabled?: boolean;
}
