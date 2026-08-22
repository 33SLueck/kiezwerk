'use client';

import * as React from 'react';
import { ShoppingBag, X, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import { MotionDiv, AnimatePresence } from '@/components/ui/motion';
import type { CartDrawerProps } from './cart-drawer.types';

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, removeItem, updateQuantity, clearCart, subtotal, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xs"
          />

          {/* Slide-over Drawer Panel */}
          <MotionDiv
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-card border-l border-border shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Your Shopping Cart</h2>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                  {totalItems}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-muted p-4 mb-3">
                    <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-base font-semibold text-foreground">Your cart is empty</p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                    Explore our products catalog and add items to your cart.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-4 rounded-xl border border-border/80 p-3 bg-background/50"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-16 w-16 rounded-lg object-cover bg-muted"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-foreground line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">
                          ${item.product.price.toFixed(2)}
                        </p>
                        <div className="mt-2">
                          <QuantitySelector
                            size="sm"
                            quantity={item.quantity}
                            onQuantityChange={(q) => updateQuantity(item.product.id, q)}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border bg-card p-6 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Taxes & Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="secondary" size="md" className="flex-1" onClick={clearCart}>
                    Clear Cart
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    className="flex-2"
                    onClick={onCheckout}
                    trailingIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Checkout (${subtotal.toFixed(2)})
                  </Button>
                </div>
              </div>
            )}
          </MotionDiv>
        </>
      )}
    </AnimatePresence>
  );
};
