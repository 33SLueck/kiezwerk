import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { StatsSection } from './stats-section';

const meta: Meta<typeof StatsSection> = {
  title: 'Patterns/StatsSection',
  component: StatsSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatsSection>;

export const Default: Story = {
  args: {
    subtitle: 'Metrics',
    title: 'Trusted by creators and business leaders worldwide',
    items: [
      { value: '44M', label: 'Downloads', description: 'Across all packages and libraries' },
      {
        value: '$119M',
        label: 'Transaction value',
        description: 'Processed through client integrations',
      },
      { value: '46k+', label: 'Github stars', description: 'In our developer community' },
      { value: '99.9%', label: 'API Uptime', description: 'Ensuring 24/7 service availability' },
    ],
  },
};
