import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Header } from './header';

const meta: Meta<typeof Header> = {
  title: 'Patterns/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    navItems: [
      { label: 'Products', href: '#products' },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Resources', href: '#resources' },
    ],
  },
};
