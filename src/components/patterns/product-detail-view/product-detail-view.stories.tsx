import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ProductDetailView } from './product-detail-view';

const sampleProduct = {
  id: 'p1',
  name: 'Next.js E-Commerce SaaS Template',
  slug: 'nextjs-saas-template',
  description:
    'Production-ready Next.js 16 monorepo template with Tailwind v4, Framer Motion animations, and full TypeScript support. Includes pre-built layouts for business, portfolio, and e-commerce stores.',
  price: 49,
  originalPrice: 99,
  image:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
  category: 'Templates',
  rating: 4.9,
  reviewCount: 124,
  inStock: true,
  isNew: true,
  tags: ['nextjs', 'react19', 'monorepo', 'tailwind'],
};

const meta: Meta<typeof ProductDetailView> = {
  title: 'Patterns/ProductDetailView',
  component: ProductDetailView,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductDetailView>;

export const Default: Story = {
  args: {
    product: sampleProduct,
  },
};
