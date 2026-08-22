import { CheckoutFormData } from '@/types/ecommerce.types';

export interface CheckoutSectionProps {
  onSubmit?: (data: CheckoutFormData) => void;
  className?: string;
  isSubmitting?: boolean;
}
