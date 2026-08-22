import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ProductGrid } from './product-grid';

const sampleProducts = [
  {
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
  },
  {
    id: 'p2',
    name: 'Tailwind CSS Component Kit',
    slug: 'tailwind-component-kit',
    description: 'Over 100+ accessible React components with dark mode support.',
    price: 39,
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    category: 'UI Kits',
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
  },
  {
    id: 'p3',
    name: 'Framer Motion Animation Suite',
    slug: 'framer-motion-suite',
    description: 'Drop-in scroll reveals, page transitions, and micro-interactions.',
    price: 29,
    originalPrice: 49,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    category: 'Animations',
    rating: 4.7,
    reviewCount: 15,
    inStock: true,
  },
];

const meta: Meta<typeof ProductGrid> = {
  title: 'Primitives/ProductGrid',
  component: ProductGrid,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductGrid>;

export const Default: Story = {
  args: {
    products: sampleProducts,
    columns: 3,
  },
};

export const LoadingState: Story = {
  args: {
    products: [],
    isLoading: true,
    columns: 3,
  },
};
