import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ComparisonTable } from './comparison-table';

const meta: Meta<typeof ComparisonTable> = {
  title: 'Patterns/ComparisonTable',
  component: ComparisonTable,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ComparisonTable>;

export const Default: Story = {
  args: {
    subtitle: 'Plans',
    title: 'Compare features across our pricing plans',
    tiers: ['Starter', 'Pro', 'Enterprise'],
    features: [
      { name: 'Components library access', values: { Starter: true, Pro: true, Enterprise: true } },
      {
        name: 'Staging environment previews',
        values: { Starter: 'Up to 3', Pro: 'Unlimited', Enterprise: 'Unlimited' },
      },
      { name: 'Custom domain mapping', values: { Starter: false, Pro: true, Enterprise: true } },
      {
        name: 'Automated code audits',
        values: { Starter: false, Pro: 'Weekly', Enterprise: 'Real-time' },
      },
      { name: '24/7 dedicated support', values: { Starter: false, Pro: false, Enterprise: true } },
    ],
  },
};
