'use client';

import * as React from 'react';
import { CreditCard, Lock, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { useCart } from '@/hooks/use-cart';
import { validateCheckout } from '@/lib/validators/checkout';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { FormHelper } from '@/components/ui/form-helper';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/motion';
import { CheckoutFormData } from '@/types/ecommerce.types';
import type { CheckoutSectionProps } from './checkout-section.types';
import { checkoutSectionContainerVariants } from './checkout-section.styles';

export const CheckoutSection: React.FC<CheckoutSectionProps> = ({
  onSubmit,
  className,
  isSubmitting = false,
}) => {
  const { items, subtotal, totalItems } = useCart();
  const [formData, setFormData] = React.useState<Partial<CheckoutFormData>>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'card',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateCheckout(formData);
    if (!result.isValid) {
      setErrors(result.errors as Record<string, string>);
      return;
    }
    onSubmit?.(formData as CheckoutFormData);
  };

  const shippingCost = subtotal > 0 ? (subtotal > 100 ? 0 : 9.99) : 0;
  const grandTotal = subtotal + shippingCost;

  return (
    <div className={cn(checkoutSectionContainerVariants(), className)}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Store
          </Link>
          <Heading level={1} size="xl" className="text-foreground font-bold">
            Checkout & Payment
          </Heading>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="h-4 w-4 text-emerald-500" /> 256-bit SSL Encrypted
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left 7 Columns: Billing & Shipping Information */}
        <FadeIn direction="left" duration={0.5} className="lg:col-span-7 space-y-8">
          {/* Contact Information */}
          <Card className="p-6 space-y-4">
            <Heading level={3} size="md" className="font-semibold text-foreground">
              1. Contact Information
            </Heading>
            <FormField label="Email Address" required>
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              {errors.email && <FormHelper error>{errors.email}</FormHelper>}
            </FormField>
          </Card>

          {/* Shipping Address */}
          <Card className="p-6 space-y-4">
            <Heading level={3} size="md" className="font-semibold text-foreground">
              2. Shipping Address
            </Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="First Name" required>
                <Input
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                />
                {errors.firstName && <FormHelper error>{errors.firstName}</FormHelper>}
              </FormField>

              <FormField label="Last Name" required>
                <Input
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                />
                {errors.lastName && <FormHelper error>{errors.lastName}</FormHelper>}
              </FormField>
            </div>

            <FormField label="Street Address" required>
              <Input
                name="address"
                placeholder="123 Main Street, Suite 400"
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
              />
              {errors.address && <FormHelper error>{errors.address}</FormHelper>}
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="City" required>
                <Input
                  name="city"
                  placeholder="New York"
                  value={formData.city}
                  onChange={handleChange}
                  error={errors.city}
                />
                {errors.city && <FormHelper error>{errors.city}</FormHelper>}
              </FormField>

              <FormField label="Postal Code" required>
                <Input
                  name="postalCode"
                  placeholder="10001"
                  value={formData.postalCode}
                  onChange={handleChange}
                  error={errors.postalCode}
                />
                {errors.postalCode && <FormHelper error>{errors.postalCode}</FormHelper>}
              </FormField>

              <FormField label="Country" required>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="United States">United States</option>
                  <option value="Germany">Germany</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                </select>
              </FormField>
            </div>
          </Card>

          {/* Payment Method */}
          <Card className="p-6 space-y-4">
            <Heading level={3} size="md" className="font-semibold text-foreground">
              3. Payment Method
            </Heading>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'card' }))}
                className={cn(
                  'flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer select-none',
                  formData.paymentMethod === 'card'
                    ? 'border-primary bg-primary/5 text-primary font-semibold'
                    : 'border-border bg-background text-muted-foreground hover:bg-muted/50'
                )}
              >
                <CreditCard className="h-5 w-5 mb-1" />
                <span className="text-xs">Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'paypal' }))}
                className={cn(
                  'flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer select-none',
                  formData.paymentMethod === 'paypal'
                    ? 'border-primary bg-primary/5 text-primary font-semibold'
                    : 'border-border bg-background text-muted-foreground hover:bg-muted/50'
                )}
              >
                <span className="text-xs font-bold italic">PayPal</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'invoice' }))}
                className={cn(
                  'flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer select-none',
                  formData.paymentMethod === 'invoice'
                    ? 'border-primary bg-primary/5 text-primary font-semibold'
                    : 'border-border bg-background text-muted-foreground hover:bg-muted/50'
                )}
              >
                <span className="text-xs">Invoice</span>
              </button>
            </div>
          </Card>
        </FadeIn>

        {/* Right 5 Columns: Order Summary & Place Order */}
        <FadeIn direction="right" duration={0.5} className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-6 sticky top-6">
            <Heading
              level={3}
              size="md"
              className="font-semibold text-foreground border-b border-border pb-3"
            >
              Order Summary ({totalItems} items)
            </Heading>

            {/* Item List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.length === 0 ? (
                <Text size="sm" className="text-muted-foreground text-center py-4">
                  Your cart is empty.
                </Text>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-10 w-10 rounded-md object-cover bg-muted"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-foreground">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 pt-4 border-t border-border text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="font-medium text-foreground">
                  {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border">
                <span>Total Amount</span>
                <span className="text-primary">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              disabled={items.length === 0 || isSubmitting}
              leadingIcon={<ShieldCheck className="h-5 w-5" />}
            >
              Complete Order (${grandTotal.toFixed(2)})
            </Button>
          </Card>
        </FadeIn>
      </form>
    </div>
  );
};
