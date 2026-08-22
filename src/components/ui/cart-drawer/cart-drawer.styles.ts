import { cva } from 'class-variance-authority';

export const cartDrawerOverlayVariants = cva(
  'fixed inset-0 z-50 bg-background/80 backdrop-blur-xs transition-opacity duration-300'
);
