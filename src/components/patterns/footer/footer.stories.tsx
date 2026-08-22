import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Footer } from './footer';

const meta: Meta<typeof Footer> = {
  title: 'Patterns/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Security', href: '#security' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '#about' },
          { label: 'Careers', href: '#careers' },
          { label: 'Blog', href: '#blog' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy', href: '#privacy' },
          { label: 'Terms', href: '#terms' },
        ],
      },
    ],
  },
};
