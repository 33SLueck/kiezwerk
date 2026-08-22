import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ProductCard } from './product-card';

const mockProduct = {
  id: 'p1',
  name: 'Next.js E-Commerce SaaS Template',
  slug: 'nextjs-saas-template',
  description: 'Production-ready Next.js 16 monorepo template with Tailwind v4 and TypeScript.',
  price: 49,
  originalPrice: 99,
  image:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
  category: 'Templates',
  rating: 4.8,
  reviewCount: 42,
  inStock: true,
  isNew: true,
};

const meta: Meta<typeof ProductCard> = {
  title: 'Primitives/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    product: mockProduct,
  },
};

export const OutOfStock: Story = {
  args: {
    product: {
      ...mockProduct,
      inStock: false,
    },
  },
};
