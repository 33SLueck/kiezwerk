import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ProductRating } from './product-rating';

const meta: Meta<typeof ProductRating> = {
  title: 'Primitives/ProductRating',
  component: ProductRating,
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: 'Rating value between 0 and 5',
    },
    reviewCount: {
      control: 'number',
      description: 'Total review count',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of stars',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductRating>;

export const Default: Story = {
  args: {
    rating: 4.5,
    reviewCount: 128,
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ProductRating size="sm" rating={4} reviewCount={24} />
      <ProductRating size="md" rating={4.5} reviewCount={128} />
      <ProductRating size="lg" rating={5} reviewCount={512} />
    </div>
  ),
};
